import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import authService from './AuthorizeService';
import { NavItem } from '../NavMenu/NavMenu.styled';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { CogIcon } from '../../Shared/Icons/CogIcon';
import { ClipboardIcon, KeyIcon, SwitchIcon } from '../../Shared/Icons';

class LoginMenu extends Component {
  constructor(props) {
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
      return this.authenticatedView(userName, profilePath, logoutPath);
    }
  }

  authenticatedView(userName, profilePath, logoutPath) {
    const { t } = this.props;

    return (
      <Fragment>
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

  anonymousView(registerPath, loginPath) {
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
