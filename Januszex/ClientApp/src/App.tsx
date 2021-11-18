import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from 'Modules/Layout';
import { Home } from 'Modules/Home';
import { FetchData } from 'Modules/FetchData';
import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from 'Modules/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from 'Modules/api-authorization/ApiAuthorizationConstants';

import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthorizeRoute path="/fetch-data" component={FetchData} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
      </Layout>
    );
  }
}
