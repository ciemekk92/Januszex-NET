import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

interface Props {}

interface State {
  userName?: string | null;
  isAuthenticated: boolean;
}

export class LoginMenu extends React.Component<Props, State> {
  _subscription: number;

  constructor(props: Props) {
    super(props);
    this._subscription = 0;

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

  populateState = async () => {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  };

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
      return this.authenticatedView(profilePath, logoutPath, userName);
    }
  }

  authenticatedView = (
    profilePath: string,
    logoutPath: { pathname: string; state: { local: boolean } },
    userName?: string | null
  ) => {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={profilePath}>
            Hello {userName}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={logoutPath}>
            Logout
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  };

  anonymousView = (registerPath: string, loginPath: string) => {
    return (
      <React.Fragment>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={registerPath}>
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to={loginPath}>
            Login
          </NavLink>
        </NavItem>
      </React.Fragment>
    );
  };
}
