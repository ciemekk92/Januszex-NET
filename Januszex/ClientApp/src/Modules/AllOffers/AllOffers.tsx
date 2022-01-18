import React from 'react';

import { IOffer } from 'Types/stores';
import { StyledOffersContainer } from './AllOffers.styled';
import { OfferTile } from './components';
import { useHistory } from 'react-router-dom';
import { Pagination } from '../../Shared/Pagination';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../Stores/store';

interface Props {
  data: IOffer[];
}

export const AllOffers = ({ data }: Props): JSX.Element => {
  const history = useHistory();

  const paginationProps = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.paginationProps : null
  );

  const handleSelectingOffer = (id: Id) => {
    history.push(`/view-offer/${id}`);
  };

  const renderOfferTiles = (offer: IOffer) => (
    <OfferTile data={offer} key={offer.id} onClick={handleSelectingOffer} />
  );

  const onPageChange = (page: number) => {
    console.log(page);
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
