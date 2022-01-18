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
import placeholder from 'Assets/placeholder-image.png';

interface Props {
  data: IOffer;
  onClick: (id: Id) => void;
}

export const OfferTile = ({ data, onClick }: Props): JSX.Element => {
  const { t } = useTranslation();

  const onClickFactory = (id: Id) => () => {
    onClick(id);
  };

  const renderImage = () => {
    if (data.photos && data.photos.length) {
      return <img src={data.photos[0].link} />;
    }

    return <img src={placeholder} />;
  };

  return (
    <StyledTileContainer onClick={onClickFactory(data.id)}>
      <StyledTileRow>
        <StyledImage>{renderImage()}</StyledImage>
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
