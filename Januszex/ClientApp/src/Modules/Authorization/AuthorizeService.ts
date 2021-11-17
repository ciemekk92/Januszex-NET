import { UserManager, WebStorageStateStore, User } from 'oidc-client';
import { ApplicationPaths, ApplicationName } from './ApiAuthorizationConstants';

export class AuthorizeService {
  // @ts-ignore
  userManager: UserManager;
  _callbacks: { callback: () => void; subscription: number }[] = [];
  _nextSubscriptionId = 0;
  // @ts-ignore
  _user?: User = null;
  _isAuthenticated = false;
  _popUpDisabled = true;

  async isAuthenticated() {
    const user = await this.getUser();
    return !!user;
  }

  async getUser() {
    if (this._user && this._user.profile) {
      return this._user.profile;
    }

    await this.ensureUserManagerInitialized();
    const user = await this.userManager.getUser();
    return user && user.profile;
  }

  async getAccessToken() {
    await this.ensureUserManagerInitialized();
    const user = await this.userManager.getUser();
    return user && user.access_token;
  }

  signIn = async (state: any) => {
    await this.ensureUserManagerInitialized();
    try {
      const silentUser = await this.userManager.signinSilent(
        this.createArguments()
      );
      this.updateState(silentUser);
      return this.success(state);
    } catch (silentError) {
      // User might not be authenticated, fallback to popup authentication
      console.log('Silent authentication error: ', silentError);

      try {
        if (this._popUpDisabled) {
          throw new Error(
            "Popup disabled. Change 'AuthorizeService.js:AuthorizeService._popupDisabled' to false to enable it."
          );
        }

        const popUpUser = await this.userManager.signinPopup(
          this.createArguments()
        );
        this.updateState(popUpUser);
        return this.success(state);
      } catch (popUpError: any) {
        if (popUpError.message === 'Popup window closed') {
          // The user explicitly cancelled the login action by closing an opened popup.
          return this.error('The user closed the window.');
        } else if (!this._popUpDisabled) {
          console.log('Popup authentication error: ', popUpError);
        }

        try {
          await this.userManager.signinRedirect(this.createArguments(state));
          return this.redirect();
        } catch (redirectError: any) {
          console.log('Redirect authentication error: ', redirectError);
          return this.error(redirectError);
        }
      }
    }
  };

  completeSignIn = async (url: string) => {
    try {
      await this.ensureUserManagerInitialized();
      const user = await this.userManager.signinCallback(url);
      this.updateState(user);
      return this.success(user && user.state);
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return this.error('There was an error signing in.');
    }
  };

  // We try to sign out the user in two different ways:
  // 1) We try to do a sign-out using a PopUp Window. This might fail if there is a
  //    Pop-Up blocker or the user has disabled PopUps.
  // 2) If the method above fails, we redirect the browser to the IdP to perform a traditional
  //    post logout redirect flow.
  signOut = async (state: any) => {
    await this.ensureUserManagerInitialized();
    try {
      if (this._popUpDisabled) {
        throw new Error(
          "Popup disabled. Change 'AuthorizeService.js:AuthorizeService._popupDisabled' to false to enable it."
        );
      }

      await this.userManager.signoutPopup(this.createArguments());
      this.updateState(undefined);
      return this.success(state);
    } catch (popupSignOutError) {
      console.log('Popup signout error: ', popupSignOutError);
      try {
        await this.userManager.signoutRedirect(this.createArguments(state));
        return this.redirect();
      } catch (redirectSignOutError: any) {
        console.log('Redirect signout error: ', redirectSignOutError);
        return this.error(redirectSignOutError);
      }
    }
  };

  completeSignOut = async (url: string) => {
    await this.ensureUserManagerInitialized();
    try {
      const response = await this.userManager.signoutCallback(url);
      // @ts-ignore
      this.updateState(null);
      // @ts-ignore
      return this.success(response && response.data);
    } catch (error: any) {
      console.log(`There was an error trying to log out '${error}'.`);
      return this.error(error);
    }
  };

  updateState = (user?: User) => {
    this._user = user;
    this._isAuthenticated = !!this._user;
    this.notifySubscribers();
  };

  subscribe = (callback: () => void) => {
    this._callbacks.push({
      callback,
      subscription: this._nextSubscriptionId++
    });
    return this._nextSubscriptionId - 1;
  };

  unsubscribe = (subscriptionId: number) => {
    const subscriptionIndex = this._callbacks
      .map((element, index) =>
        element.subscription === subscriptionId
          ? { found: true, index }
          : { found: false }
      )
      .filter((element) => element.found === true);
    if (subscriptionIndex.length !== 1) {
      throw new Error(
        `Found an invalid number of subscriptions ${subscriptionIndex.length}`
      );
    }

    // @ts-ignore
    this._callbacks.splice(subscriptionIndex[0].index, 1);
  }

  notifySubscribers() {
    for (let i = 0; i < this._callbacks.length; i++) {
      const callback = this._callbacks[i].callback;
      callback();
    }
  }

  createArguments = (state?: any) => {
    return { useReplaceToNavigate: true, data: state };
  };

  error = (message: string) => {
    return { status: AuthenticationResultStatus.Fail, message };
  };

  success = (state: any) => {
    return { status: AuthenticationResultStatus.Success, state };
  };

  redirect() {
    return { status: AuthenticationResultStatus.Redirect };
  }

  async ensureUserManagerInitialized() {
    if (this.userManager !== undefined) {
      return;
    }

    let response = await fetch(
      ApplicationPaths.ApiAuthorizationClientConfigurationUrl
    );
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}'`);
    }

    let settings = await response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    settings.userStore = new WebStorageStateStore({
      prefix: ApplicationName
    });

    this.userManager = new UserManager(settings);

    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
      this.updateState(undefined);
    });
  }

  static get instance() {
    return authService;
  }
}

const authService = new AuthorizeService();

export default authService;

export const AuthenticationResultStatus = {
  Redirect: 'redirect',
  Success: 'success',
  Fail: 'fail'
};
