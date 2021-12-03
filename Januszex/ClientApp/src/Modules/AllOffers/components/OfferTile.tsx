import React from 'react';
import {
  StyledTileContainer,
  StyledTileRow,
  TileLabel,
  TileValue
} from './OfferTile.styled';
import { IOffer } from 'Types/stores';

interface Props {
  data: IOffer;
}

export const OfferTile = ({ data }: Props): JSX.Element => {
  return (
    <StyledTileContainer>
      <StyledTileRow>
        <h3>{data.title}</h3>
      </StyledTileRow>
      <StyledTileRow>
        <TileLabel>Opis: </TileLabel>
        <TileValue>{data.content}</TileValue>
      </StyledTileRow>
      <StyledTileRow>
        <TileLabel>Stworzone: </TileLabel>
        <TileValue>{data.created}</TileValue>
      </StyledTileRow>
    </StyledTileContainer>
  );
};
