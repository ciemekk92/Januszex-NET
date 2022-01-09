import React, { Component } from 'react';
import { Route } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { Layout } from 'Modules/Layout/Layout';
import { Home } from 'Modules/Home';
import { FetchData } from 'Modules/FetchData';
import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from 'Modules/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'Modules/api-authorization/ApiAuthorizationConstants';

import './custom.css';
import { darkTheme, GlobalStyles } from 'Themes';
import { Routes } from './Routes/Routes';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles themeType="dark" />
        <Layout>
          <Route exact path="/" component={Home} />
          {/*<AuthorizeRoute path="/fetch-data" component={FetchData} />*/}
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
          <Routes />
        </Layout>
      </ThemeProvider>
    );
  }
}
