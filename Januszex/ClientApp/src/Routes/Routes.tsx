import React from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { HomePage } from 'Modules/HomePage';

export const Routes = (props: RouteComponentProps): JSX.Element => {
  return (
    <React.Fragment>
      <Route exact path={'/'} component={HomePage} />
    </React.Fragment>
  );
};
