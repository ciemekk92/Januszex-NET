import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IOffer } from 'Types/stores';
import { StyledOffersContainer } from './AllOffers.styled';
import { OfferTile } from './components';
import { Pagination } from 'Shared/Pagination';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from '../../Stores/Offer';

interface Props {
  data: IOffer[];
}

export const AllOffers = ({ data }: Props): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const paginationProps = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.paginationProps : null
  );

  const handleSelectingOffer = (id: Id) => {
    history.push(`/view-offer/${id}`);
  };

  const renderOfferTiles = (offer: IOffer) => (
    <OfferTile data={offer} key={offer.id} onClick={handleSelectingOffer} />
  );

  const onPageChange = async (page: number) => {
    await dispatch(
      actionCreators.getOffers({
        query: '',
        paginationParams: { PageNumber: page }
      })
    );

    window.scrollTo(0, 0);
  };

  return (
    <StyledOffersContainer>
      {data.map(renderOfferTiles)}
      <Pagination
        paginationProps={paginationProps}
        onPageChange={onPageChange}
      />
    </StyledOffersContainer>
  );
};
