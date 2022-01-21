import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useOutsideClick } from 'Hooks';
import { FilterIcon } from 'Shared/Icons';
import { ICategoryFlat } from 'Types/stores';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Category';
import { actionCreators as offerActionCreators } from 'Stores/Offer';
import { Heading6 } from 'Shared/Typography';
import { RadioField } from 'Shared/RadioField';
import { SORT_PARAM_OPTIONS } from './constants';
import {
  StyledFiltersColumn,
  StyledFiltersContainer,
  StyledFiltersRow,
  StyledFiltersWrapper
} from './OfferFilters.styled';
import { StyledCategoryRow } from '../ManagementPanel/components/CategoriesPanel/CategoriesPanel.styled';
import { StyledDeleteButton } from 'Modules/ManagementPanel/ManagementPanel.styled';

export const OfferFilters = (): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Id>('');
  const [sortParams, setSortParams] = React.useState<string>('');

  const { t } = useTranslation();

  const ref = React.useRef<HTMLDivElement>(null);

  const flatCategories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.flatCategories : [],
    shallowEqual
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.getFlatCategories());
  }, []);

  const handleOpeningFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleClosingFilters = () => {
    setIsOpen(false);
  };

  useOutsideClick(ref, handleClosingFilters);

  const handleSelectingCategoryFactory = (value: Id) => () => {
    setSelectedCategory(value);
  };

  const renderCategoriesList = (): JSX.Element[] => {
    const categories = flatCategories.map((category: ICategoryFlat) => (
      <StyledCategoryRow key={category.id}>
        <RadioField
          id={category.id}
          label={category.name}
          checked={selectedCategory === category.id}
          onChange={handleSelectingCategoryFactory(category.id)}
        />
      </StyledCategoryRow>
    ));

    const emptyOption = (
      <StyledCategoryRow key="no_category">
        <RadioField
          id="no_parent"
          label={t('manage.categories.noParent')}
          checked={selectedCategory === ''}
          onChange={handleSelectingCategoryFactory('')}
        />
      </StyledCategoryRow>
    );

    return [emptyOption, ...categories];
  };

  const handleSettingSortParams = (value: string) => () => {
    setSortParams(value);
  };

  const renderSortParamsList = () => {
    const params = SORT_PARAM_OPTIONS.map(
      (param: { name: string; value: string }) => (
        <StyledCategoryRow key={param.value}>
          <RadioField
            id={param.value}
            label={t(param.name)}
            checked={sortParams === param.value}
            onChange={handleSettingSortParams(param.value)}
          />
        </StyledCategoryRow>
      )
    );

    const emptyOption = (
      <StyledCategoryRow key="no_category">
        <RadioField
          id="no_sort"
          label={t('filters.sort.noSort')}
          checked={sortParams === ''}
          onChange={handleSettingSortParams('')}
        />
      </StyledCategoryRow>
    );

    return [emptyOption, ...params];
  };

  const handleSubmit = async () => {
    await dispatch(
      offerActionCreators.getFilteredOffers(sortParams, selectedCategory)
    );
  };

  return (
    <StyledFiltersWrapper>
      <FilterIcon size={36} onClick={handleOpeningFilters} />
      {isOpen && (
        <StyledFiltersContainer ref={ref}>
          <StyledFiltersRow>
            <StyledFiltersColumn>
              <Heading6>{t('filters.sortTitle')}</Heading6>
              {renderSortParamsList()}
            </StyledFiltersColumn>
            <StyledFiltersColumn>
              <Heading6>{t('filters.categories')}</Heading6>
              {renderCategoriesList()}
            </StyledFiltersColumn>
          </StyledFiltersRow>
          <StyledFiltersRow>
            <StyledDeleteButton onClick={handleSubmit}>
              {t('filters.apply')}
            </StyledDeleteButton>
          </StyledFiltersRow>
        </StyledFiltersContainer>
      )}
    </StyledFiltersWrapper>
  );
};
