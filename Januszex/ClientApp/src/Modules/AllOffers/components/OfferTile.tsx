import React from 'react';
import {
  StyledTileContainer,
  StyledTileRow,
  StyledImage,
  TileLabel,
  TileValue
} from './OfferTile.styled';
import { IOffer } from 'Types/stores';
import { Heading5, Heading6 } from 'Shared/Typography';
import { useTranslation } from 'react-i18next';

interface Props {
  data: IOffer;
}

export const OfferTile = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledTileContainer>
      <StyledTileRow>
        {data.photos && data.photos.length && (
          <StyledImage>
            <img src={data.photos[0].link} />
          </StyledImage>
        )}
      </StyledTileRow>
      <StyledTileRow>
        <Heading5>{data.title}</Heading5>
      </StyledTileRow>
      <StyledTileRow>
        <TileLabel>{t('offerTile.price')}</TileLabel>
        <Heading6>{data.price} zł</Heading6>
      </StyledTileRow>
      <StyledTileRow>
        <TileValue>
          {data.location.region.name}, {data.location.city.name}
        </TileValue>
      </StyledTileRow>
    </StyledTileContainer>
  );
};
