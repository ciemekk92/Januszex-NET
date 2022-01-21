import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import placeholder from 'Assets/placeholder-image.png';
import { Heading5, Heading6 } from 'Shared/Typography';
import { BinIcon, PencilIcon } from 'Shared/Icons';
import { Container } from 'Hooks/useLoading';
import { actionCreators } from 'Stores/Offer';
import { actionCreators as categoryActionCreators } from 'Stores/Category';
import { ApplicationState } from 'Stores/store';
import { ICategory, IOffer } from 'Types/stores';
import {
  StyledButton,
  StyledButtonContainer,
  StyledCategoriesRow,
  StyledCategoryChip,
  StyledImageContainer,
  StyledLabel,
  StyledOfferPanel,
  StyledOffersContainer,
  StyledTextDataContainer,
  StyledTextRow,
  StyledValue,
  StyledWrapper
} from './MyOffers.styled';
import { Api } from '../../Utils/Api';

export const MyOffers = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(actionCreators.getUserOffers());
    dispatch(categoryActionCreators.getCategories());
  }, []);

  const areOffersLoading: boolean = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.isLoading : false
  );

  const areCategoriesLoading: boolean = useSelector((state: ApplicationState) =>
    state.category ? state.category.isLoading : false
  );

  const isLoading = areOffersLoading || areCategoriesLoading;

  const userOffers: IOffer[] = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.userOffers : []
  );

  const renderImage = (offer: IOffer) => {
    if (offer.photos && offer.photos.length) {
      return <img src={offer.photos[0].link} />;
    }

    return <img src={placeholder} />;
  };

  const getCategoryNames = (category: ICategory, currentNames: string[]) => {
    let namesArr: string[] = currentNames;

    namesArr.unshift(category.name);
    if (category.parent) {
      getCategoryNames(category.parent, namesArr);
    }

    return namesArr;
  };

  const renderCategories = React.useCallback(
    (categories?: ICategory[]): Nullable<JSX.Element[]> => {
      if (!categories) {
        return null;
      }

      let initialArr: string[] = [];
      let finalArr: string[] = [];

      categories.forEach((category: ICategory) => {
        finalArr = [...finalArr, ...getCategoryNames(category, initialArr)];
      });

      return finalArr.map((categoryName: string, index: number) => (
        <StyledCategoryChip key={index}>{categoryName}</StyledCategoryChip>
      ));
    },
    [userOffers]
  );

  const handleViewingOfferFactory = (id: Id) => () => {
    history.push(`/view-offer/${id}`);
  };

  const handleEditingOfferFactory = (id: Id) => () => {
    if (id) {
      history.push(`/edit-offer/${id}`);
    }
  };

  const handleDeletingOfferFactory = (id: Id) => async () => {
    const result = await Api.delete(`/api/Offer/${id}`);

    if (result.status === 204) {
      dispatch(actionCreators.getUserOffers());
    }
  };

  const renderOfferPanels = (): JSX.Element | JSX.Element[] => {
    if (userOffers.length) {
      return userOffers.map((offer: IOffer) => (
        <StyledOfferPanel key={offer.id}>
          <StyledImageContainer onClick={handleViewingOfferFactory(offer.id)}>
            {renderImage(offer)}
          </StyledImageContainer>
          <StyledTextDataContainer>
            <Heading6>{offer.title}</Heading6>
            <StyledTextRow>
              <StyledLabel>{t('myOffers.created')}</StyledLabel>
              <StyledValue>
                {new Date(offer.created).toLocaleDateString()}
              </StyledValue>
            </StyledTextRow>
            <StyledTextRow>
              <StyledLabel>{t('myOffers.city')}</StyledLabel>
              <StyledValue>{offer.location.city.name}</StyledValue>
            </StyledTextRow>
            <StyledTextRow>
              <StyledLabel>{t('myOffers.region')}</StyledLabel>
              <StyledValue>{offer.location.region.name}</StyledValue>
            </StyledTextRow>
            <StyledCategoriesRow>
              {renderCategories(offer.categories)}
            </StyledCategoriesRow>
          </StyledTextDataContainer>
          <StyledButtonContainer>
            <StyledButton onClick={handleEditingOfferFactory(offer.id)}>
              <PencilIcon />
            </StyledButton>
            <StyledButton onClick={handleDeletingOfferFactory(offer.id)}>
              <BinIcon />
            </StyledButton>
          </StyledButtonContainer>
        </StyledOfferPanel>
      ));
    }

    return <Heading6>{t('myOffers.noOffers')}</Heading6>;
  };

  return (
    <StyledWrapper>
      <Container isLoading={isLoading} />
      <Heading5>{t('myOffers.title')}</Heading5>
      <StyledOffersContainer>{renderOfferPanels()}</StyledOffersContainer>
    </StyledWrapper>
  );
};
