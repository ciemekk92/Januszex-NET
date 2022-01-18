import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { TranslateFunction } from 'Types/modules';
import LoginMenu from 'Modules/api-authorization/LoginMenu';
import { HomeIcon, PriceTagIcon, UserIcon } from 'Shared/Icons';
import { Logo } from '../Logo';
import { NavItem } from './NavMenu.styled';

import './NavMenu.css';

interface Props {
  t: TranslateFunction;
  selectedTheme: string;
}

interface State {
  collapsed: boolean;
}

class NavMenu extends React.Component<Props, State> {
  static displayName = NavMenu.name;

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { t } = this.props;

    return (
      <header className="header-navbar">
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              <Logo selectedTheme={this.props.selectedTheme} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    <HomeIcon size={24} />
                    {t('navigation.home')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/add-offer">
                    <PriceTagIcon size={24} />
                    {t('navigation.add')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/my-offers">
                    <UserIcon size={24} />
                    {t('navigation.myOffers')}
                  </NavLink>
                </NavItem>
                <LoginMenu />
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default withTranslation()(NavMenu);
