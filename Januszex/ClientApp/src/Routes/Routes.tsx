import React from 'react';
import { Route } from 'react-router-dom';

import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import { AddOffer } from 'Modules/AddOffer';
import { ViewOffer } from 'Modules/ViewOffer';
import { MyOffers } from 'Modules/MyOffers';

interface Props {
  isAuthenticated: boolean;
}

export const Routes = ({ isAuthenticated }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <AuthorizeRoute path="/add-offer" component={AddOffer} />
      {isAuthenticated && (
        <AuthorizeRoute path="/my-offers" component={MyOffers} />
      )}
      <Route exact path="/view-offer/:id" component={ViewOffer} />
    </React.Fragment>
  );
};
