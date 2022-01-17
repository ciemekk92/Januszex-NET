import React from 'react';
import { Route } from 'react-router-dom';

import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import { AddOffer } from 'Modules/AddOffer';
import { ViewOffer } from '../Modules/ViewOffer';

export const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <AuthorizeRoute path="/add-offer" component={AddOffer} />
      <Route exact path="/view-offer/:id" component={ViewOffer} />
    </React.Fragment>
  );
};
