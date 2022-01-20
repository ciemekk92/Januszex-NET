import React from 'react';
import { Route } from 'react-router-dom';

import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import { AddEditOffer } from 'Modules/AddEditOffer';
import { ViewOffer } from 'Modules/ViewOffer';
import { MyOffers } from 'Modules/MyOffers';

interface Props {
  isAuthenticated: boolean;
}

export const Routes = ({ isAuthenticated }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <AuthorizeRoute path="/add-offer" component={AddEditOffer} />
      <AuthorizeRoute path="/edit-offer/:id" component={AddEditOffer} />
      {isAuthenticated && (
        <AuthorizeRoute path="/my-offers" component={MyOffers} />
      )}
      <Route exact path="/view-offer/:id" component={ViewOffer} />
    </React.Fragment>
  );
};
