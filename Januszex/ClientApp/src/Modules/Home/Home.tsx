import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { HomePageSearch } from 'Modules/HomePageSearch';
import { AllOffers } from 'Modules/AllOffers';
import { ApplicationState } from 'Stores/store';

export const Home = (): JSX.Element => {
  const offers = useSelector(
    (state: ApplicationState) => (state.offer ? state.offer.offers : []),
    shallowEqual
  );

  return (
    <React.Fragment>
      <HomePageSearch />
      <AllOffers data={offers} />
    </React.Fragment>
  );
};
