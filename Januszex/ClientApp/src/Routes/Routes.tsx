import React from 'react';

import AuthorizeRoute from 'Modules/api-authorization/AuthorizeRoute';
import { AddOffer } from 'Modules/AddOffer';

export const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <AuthorizeRoute path="/add-offer" component={AddOffer} />
    </React.Fragment>
  );
};
