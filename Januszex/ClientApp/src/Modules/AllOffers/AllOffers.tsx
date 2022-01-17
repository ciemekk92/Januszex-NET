import React from 'react';

import { IOffer } from 'Types/stores';
import { StyledOffersContainer } from './AllOffers.styled';
import { OfferTile } from './components';
import { useHistory } from 'react-router-dom';

interface Props {
  data: IOffer[];
}

export const AllOffers = ({ data }: Props): JSX.Element => {
  const history = useHistory();

  const handleSelectingOffer = (id: Id) => {
    history.push(`/view-offer/${id}`);
  };

  const renderOfferTiles = (offer: IOffer) => (
    <OfferTile data={offer} key={offer.id} onClick={handleSelectingOffer} />
  );

  return (
    <StyledOffersContainer>{data.map(renderOfferTiles)}</StyledOffersContainer>
  );
};
