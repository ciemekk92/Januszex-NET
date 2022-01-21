import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import authService from './AuthorizeService';
import { NavItem } from '../NavMenu/NavMenu.styled';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import {
  ClipboardIcon,
  KeyIcon,
  SwitchIcon,
  CogIcon,
  AdminIcon
} from 'Shared/Icons';
import { TranslateFunction } from 'Types/modules';
import { ICurrentUser } from 'Types/stores';

interface Props {
  t: TranslateFunction;
  currentUser: Nullable<ICurrentUser>;
}

interface State {
  isAuthenticated: boolean;
  userName: Nullable<string>;
}

class LoginMenu extends Component<Props, State> {
  _subscription: number | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  get isUserAdmin(): boolean {
    if (this.props.currentUser) {
      return this.props.currentUser.roles.includes('Admin');
    }

    return false;
  }

  render() {
    const { isAuthenticated, userName } = this.state;

    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true }
      };
      return this.authenticatedView(userName!, profilePath, logoutPath);
    }
  }

  authenticatedView(
    userName: string,
    profilePath: string,
    logoutPath: { pathname: string; state: { local: boolean } }
  ) {
    const { t } = this.props;

    return (
      <Fragment>
        {this.isUserAdmin && (
          <NavItem>
            <NavLink tag={Link} className="text-dark" to="/manage">
              <AdminIcon size={24} />
              {`${t('navigation.adminPanel')}`}
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={profilePath}>
            <CogIcon size={24} />
            {`${t('navigation.settings')}`}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={logoutPath}>
            <SwitchIcon size={24} />
            {t('navigation.logout')}
          </NavLink>
        </NavItem>
      </Fragment>
    );
  }

  anonymousView(registerPath: string, loginPath: string) {
    const { t } = this.props;

    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={registerPath}>
            <ClipboardIcon size={24} />
            {t('navigation.signUp')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={loginPath}>
            <KeyIcon size={24} />
            {t('navigation.login')}
          </NavLink>
        </NavItem>
      </Fragment>
    );
  }
}

export default withTranslation()(LoginMenu);
