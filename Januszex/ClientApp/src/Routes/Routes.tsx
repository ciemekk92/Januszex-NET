import React from 'react';
import { Route } from 'react-router-dom';

import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import { AddEditOffer } from 'Modules/AddEditOffer';
import { ViewOffer } from 'Modules/ViewOffer';
import { MyOffers } from 'Modules/MyOffers';
import { ManagementPanel } from 'Modules/ManagementPanel';
import { ICurrentUser } from 'Types/stores';

interface Props {
  currentUser: Nullable<ICurrentUser>;
}

export const Routes = ({ currentUser }: Props): JSX.Element => {
  const isUserAdmin = (): boolean => {
    if (currentUser) {
      return currentUser.roles.includes('Admin');
    }

    return false;
  };

  return (
    <React.Fragment>
      <Route exact path="/view-offer/:id" component={ViewOffer} />
      <AuthorizeRoute path="/add-offer" component={AddEditOffer} />
      <AuthorizeRoute path="/edit-offer/:id" component={AddEditOffer} />
      {currentUser && <AuthorizeRoute path="/my-offers" component={MyOffers} />}
      {isUserAdmin() && (
        <AuthorizeRoute path="/manage" component={ManagementPanel} />
      )}
    </React.Fragment>
  );
};
