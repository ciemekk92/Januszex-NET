import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ICategory, ICategoryFlat } from 'Types/stores';
import { OptionNode } from 'Types/utils';
import { Heading5, Heading6 } from 'Shared/Typography';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Category';
import { TextInput } from 'Shared/TextInput';
import { Accordion } from 'Shared/Accordion';
import { RadioField } from 'Shared/RadioField';
import { BinIcon, PencilIcon } from 'Shared/Icons';
import { FORM_MODE } from 'Shared/constants';
import { Api } from 'Utils/Api';
import { removeEmptyValues } from 'Utils/removeEmptyValues';
import { isDefined } from 'Utils/isDefined';
import { StyledLabel, StyledRow } from '../../ManagementPanel.styled';
import {
  StyledCategoryButton,
  StyledCategoriesContainer,
  StyledCategoryRow,
  StyledListItem,
  StyledUnorderedList
} from './CategoriesPanel.styled';

interface CategoryOptionNode extends OptionNode {
  children?: CategoryOptionNode[];
  parentId: Nullable<Id>;
}

interface CategoryInputData {
  name: string;
  parentId: Id;
}

const initialData: CategoryInputData = {
  name: '',
  parentId: ''
};

export const CategoriesPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [mode, setMode] = React.useState<FORM_MODE>(FORM_MODE.ADD);
  const [editedId, setEditedId] = React.useState<Id>('');
  const [inputData, setInputData] =
    React.useState<CategoryInputData>(initialData);

  const flatCategories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.flatCategories : [],
    shallowEqual
  );

  const categories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.categories : [],
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(actionCreators.getFlatCategories());
    dispatch(actionCreators.getCategories());
  }, []);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: CategoryInputData) => ({
      ...prevState,
      name: target.value
    }));
  };

  const handleSelectingCategoryFactory = (id: Id) => () => {
    setInputData((prevState: CategoryInputData) => ({
      ...prevState,
      parentId: id
    }));
  };

  const handleTogglingEditingCategoryFactory =
    (category: CategoryOptionNode) => () => {
      setInputData({
        name: category.label,
        parentId: category.parentId ? category.parentId : ''
      });
      setMode(FORM_MODE.EDIT);
      setEditedId(category.value);
    };

  const handleClearingInputs = () => {
    setInputData(initialData);
    setEditedId('');
    setMode(FORM_MODE.ADD);
  };

  const handleDeletingCategoryFactory = (id: Id) => async () => {
    try {
      const result = await Api.delete(`api/Category/${id}`);

      if (result.status === 204) {
        dispatch(actionCreators.getFlatCategories());
        dispatch(actionCreators.getCategories());
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAddingCategory = async () => {
    try {
      const result = await Api.post(
        'api/Category',
        removeEmptyValues(inputData)
      );

      if (result.status === 201) {
        dispatch(actionCreators.getFlatCategories());
        dispatch(actionCreators.getCategories());

        handleClearingInputs();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleEditingCategory = async () => {
    try {
      if (editedId) {
        const result = await Api.put(
          `api/Category/${editedId}`,
          removeEmptyValues(inputData)
        );

        if (result.status === 204) {
          dispatch(actionCreators.getFlatCategories());
          dispatch(actionCreators.getCategories());

          handleClearingInputs();
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isAddButtonDisabled = !inputData.name.length;

  const renderCategoriesList = (): JSX.Element[] => {
    const categories = flatCategories.map((category: ICategoryFlat) => (
      <StyledCategoryRow key={category.id}>
        <RadioField
          id={category.id}
          label={category.name}
          checked={inputData.parentId === category.id}
          onChange={handleSelectingCategoryFactory(category.id)}
        />
      </StyledCategoryRow>
    ));

    const emptyOption = (
      <StyledCategoryRow key="no_category">
        <RadioField
          id="no_parent"
          label={t('manage.categories.noParent')}
          checked={inputData.parentId === ''}
          onChange={handleSelectingCategoryFactory('')}
        />
      </StyledCategoryRow>
    );

    return [emptyOption, ...categories];
  };

  const renderCategoryInput = (): JSX.Element => {
    return (
      <React.Fragment>
        <StyledRow>
          <StyledLabel>{t('manage.categories.name')}</StyledLabel>
          <TextInput onChange={onChange} value={inputData.name} />
        </StyledRow>
        <Accordion
          name={t('manage.categories.parent')}
          component={
            <StyledCategoriesContainer>
              {renderCategoriesList()}
            </StyledCategoriesContainer>
          }
        />
        <StyledRow>
          <StyledCategoryButton
            onClick={
              mode === FORM_MODE.ADD
                ? handleAddingCategory
                : handleEditingCategory
            }
            disabled={isAddButtonDisabled}
          >
            {t(
              `manage.categories.${
                mode === FORM_MODE.ADD ? 'addCategory' : 'editCategory'
              }`
            )}
          </StyledCategoryButton>
          {mode === FORM_MODE.EDIT && (
            <StyledCategoryButton onClick={handleClearingInputs}>
              {t('manage.categories.clearInput')}
            </StyledCategoryButton>
          )}
        </StyledRow>
      </React.Fragment>
    );
  };

  const mapCategoriesChildren = (
    categoriesArr: ICategory[],
    currentDepth?: number
  ): CategoryOptionNode[] => {
    let depth: number = currentDepth ? currentDepth : 0;

    return categoriesArr.map((category: ICategory) => {
      if (isDefined(category.children)) {
        return {
          label: category.name,
          value: category.id,
          depth: depth,
          children: mapCategoriesChildren(category.children, depth + 1),
          parentId: category.parentId ? category.parentId : null
        };
      }

      return {
        label: category.name,
        value: category.id,
        depth,
        parentId: category.parentId ? category.parentId : null
      };
    });
  };

  const categoriesOptions = mapCategoriesChildren(categories);

  const renderCurrentCategoriesTree = (children?: CategoryOptionNode[]) => {
    if (children) {
      return children.map((option: CategoryOptionNode) => (
        <StyledUnorderedList key={`${option.label}_${option.depth}`}>
          <StyledListItem depth={option.depth}>
            <StyledLabel>{option.label}</StyledLabel>
            <PencilIcon
              onClick={handleTogglingEditingCategoryFactory(option)}
              size={18}
            />
            <BinIcon
              onClick={handleDeletingCategoryFactory(option.value)}
              size={18}
            />
          </StyledListItem>
          {renderCurrentCategoriesTree(option.children)}
        </StyledUnorderedList>
      ));
    }

    return;
  };

  return (
    <React.Fragment>
      <Heading5>{t('manage.categories.title')}</Heading5>
      {renderCategoryInput()}
      <Heading6>{t('manage.categories.deleteCategory')}</Heading6>
      {renderCurrentCategoriesTree(categoriesOptions)}
    </React.Fragment>
  );
};
