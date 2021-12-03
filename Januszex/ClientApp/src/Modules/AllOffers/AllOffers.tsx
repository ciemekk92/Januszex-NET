import React from 'react';

import { IOffer } from 'Types/stores';
import { StyledOffersContainer } from './AllOffers.styled';
import { OfferTile } from './components';

interface Props {
  data: IOffer[];
}

export const AllOffers = ({ data }: Props): JSX.Element => {
  const renderOfferTiles = (offer: IOffer) => (
    <OfferTile data={offer} key={offer.id} />
  );

  return (
    <StyledOffersContainer>{data.map(renderOfferTiles)}</StyledOffersContainer>
  );
};
