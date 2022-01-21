import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import placeholder from 'Assets/placeholder-image.png';
import { actionCreators } from 'Stores/Offer';
import { ApplicationState } from 'Stores/store';
import { Heading4 } from 'Shared/Typography';
import { Photo } from 'Types/stores';
import { Container } from 'Hooks/useLoading';
import {
  StyledDetailsPanel,
  StyledImagesList,
  StyledImagesPanel,
  StyledListImage,
  StyledMainImage,
  StyledPanelsContainer,
  StyledRow,
  StyledLabel,
  StyledValue,
  StyledWrapper,
  StyledContentContainer
} from './ViewOffer.styled';
import { useTranslation } from 'react-i18next';

export const ViewOffer = ({
  match
}: RouteComponentProps<{ id: Id }>): JSX.Element => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const offer = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.offer : null
  );

  const isOfferLoading = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.isLoading : false
  );

  React.useEffect(() => {
    dispatch(actionCreators.getOffer(match.params.id));

    return () => {
      dispatch(actionCreators.clearOffer());
    };
  }, []);

  React.useEffect(() => {
    if (offer && offer.photos) {
      setSelectedImageIndex(0);
    }
  }, [offer]);

  if (!offer) {
    return <Redirect to={'/'} />;
  }

  const handleSelectingImageFactory = (index: number) => () => {
    setSelectedImageIndex(index);
  };

  const renderPhotosList = (): Nullable<JSX.Element[]> => {
    if (offer && offer.photos) {
      return offer.photos.map((photo: Photo, index: number) => (
        <StyledListImage
          key={photo.filename}
          onClick={handleSelectingImageFactory(index)}
        >
          <img src={photo.link} alt={photo.filename} />
        </StyledListImage>
      ));
    }

    return null;
  };

  return (
    <React.Fragment>
      <Container isLoading={isOfferLoading} />
      {offer.id && (
        <StyledWrapper>
          <Heading4>{offer.title}</Heading4>
          <StyledPanelsContainer>
            <StyledDetailsPanel>
              <StyledRow>
                <StyledLabel>{t('viewOffer.price')}</StyledLabel>
                <StyledValue>{offer.price} zł</StyledValue>
              </StyledRow>
              <StyledRow>
                <StyledLabel>{t('viewOffer.region')}</StyledLabel>
                <StyledValue>{offer.location.region.name}</StyledValue>
              </StyledRow>
              <StyledRow>
                <StyledLabel>{t('viewOffer.city')}</StyledLabel>
                <StyledValue>{offer.location.city.name}</StyledValue>
              </StyledRow>
              <StyledRow>
                <StyledLabel>{t('viewOffer.address')}</StyledLabel>
                <StyledValue>{`${offer.location.postalCode}, ${offer.location.street}`}</StyledValue>
              </StyledRow>
              <StyledContentContainer>{offer.content}</StyledContentContainer>
            </StyledDetailsPanel>
            <StyledImagesPanel>
              <StyledMainImage>
                <img
                  src={
                    offer.photos && offer.photos.length
                      ? offer.photos[selectedImageIndex].link
                      : placeholder
                  }
                  alt={
                    offer.photos && offer.photos.length
                      ? offer.photos[selectedImageIndex].filename
                      : 'No images'
                  }
                />
              </StyledMainImage>
              {offer.photos && offer.photos?.length > 1 && (
                <StyledImagesList>{renderPhotosList()}</StyledImagesList>
              )}
            </StyledImagesPanel>
          </StyledPanelsContainer>
        </StyledWrapper>
      )}
    </React.Fragment>
  );
};
