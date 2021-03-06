import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HomePageSearch } from 'Modules/HomePageSearch';
import { AllOffers } from 'Modules/AllOffers';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Offer';
import { Container } from 'Hooks/useLoading';
import { OfferFilters } from 'Modules/OfferFilters';
import { StyledSearchWrapper } from './Home.styled';

export const Home = (): JSX.Element => {
  const dispatch = useDispatch();

  const offers = useSelector(
    (state: ApplicationState) => (state.offer ? state.offer.offers : []),
    shallowEqual
  );

  const areOffersLoading = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.isLoading : false
  );

  React.useEffect(() => {
    if (!offers.length) {
      dispatch(actionCreators.getOffers({ query: '' }));
    }
  }, []);

  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  return (
    <React.Fragment>
      <Container isLoading={areOffersLoading} />
      <div style={{ display: 'flex' }}>
        <button onClick={() => changeLanguage('pl')}>pl</button>
        <button onClick={() => changeLanguage('en-US')}>en</button>
      </div>
      <StyledSearchWrapper>
        <OfferFilters />
        <HomePageSearch />
      </StyledSearchWrapper>
      <AllOffers data={offers} />
    </React.Fragment>
  );
};
