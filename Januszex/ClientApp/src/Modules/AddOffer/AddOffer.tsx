import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { actionCreators as offerActionCreators } from 'Stores/Offer';
import { actionCreators as categoryActionCreators } from 'Stores/Category';
import { ICategory, IOfferForCreation } from 'Types/stores';
import { TextInput } from 'Shared/TextInput';
import { TextArea } from 'Shared/TextArea';
import { FormField } from 'Shared/FormField';
import { NumericInput } from 'Shared/NumericInput';
import { Heading5 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/ButtonFilled';
import { MultiSelect } from 'Shared/MultiSelect';

import { StyledColumn, StyledRow, Wrapper } from './AddOffer.styled';
import { ApplicationState } from '../../Stores/store';

export const AddOffer = (): JSX.Element => {
  const initialData: IOfferForCreation = {
    id: '',
    title: '',
    categoryIds: [],
    content: '',
    created: '',
    isActive: false,
    price: 0,
    user: {
      id: ''
    },
    location: {
      street: '',
      postalCode: '',
      city: {
        name: ''
      },
      region: {
        name: ''
      }
    }
  };

  const [inputData, setInputData] =
    React.useState<IOfferForCreation>(initialData);

  const categories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.categories : [],
    shallowEqual
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(categoryActionCreators.getCategories());
  }, []);

  const categoriesOptions = categories.map((category: ICategory) => ({
    label: category.name,
    value: category.id
  }));

  const onChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const onLocationChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [target.name]: target.value
      }
    }));
  };

  const onCityChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      location: {
        ...prevState.location,
        city: {
          ...prevState.location.city,
          [target.name]: target.value
        }
      }
    }));
  };

  const onRegionChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      location: {
        ...prevState.location,
        region: {
          ...prevState.location.region,
          [target.name]: target.value
        }
      }
    }));
  };

  const handleAddingOffer = async () => {
    const result = await dispatch(offerActionCreators.createOffer(inputData));

    console.log({ result });
  };

  const handleSelectingCategories = (values: string[]) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      categoryIds: values
    }));
  };

  return (
    <Wrapper>
      <StyledRow>
        <StyledColumn>
          <FormField label={t('addOffer.title')}>
            <TextInput name="title" onChange={onChange} />
          </FormField>
          <FormField label={t('addOffer.price')}>
            <NumericInput min={0} name="price" onChange={onChange} />
          </FormField>
        </StyledColumn>
        <StyledColumn>
          <FormField label={t('addOffer.content')}>
            <TextArea name="content" onChange={onChange} />
          </FormField>
        </StyledColumn>
      </StyledRow>
      <StyledRow>
        <Heading5>{t('addOffer.locationLabel')}</Heading5>
      </StyledRow>
      <StyledRow>
        <StyledColumn>
          <MultiSelect
            onChange={handleSelectingCategories}
            options={categoriesOptions}
            selectedOptions={inputData.categoryIds}
          />
        </StyledColumn>
        <StyledColumn>
          <FormField label={t('addOffer.street')}>
            <TextInput name="street" onChange={onLocationChange} />
          </FormField>
          <FormField label={t('addOffer.postalCode')}>
            <TextInput name="postalCode" onChange={onLocationChange} />
          </FormField>
          <FormField label={t('addOffer.city')}>
            <TextInput name="name" onChange={onCityChange} />
          </FormField>
          <FormField label={t('addOffer.region')}>
            <TextInput name="name" onChange={onRegionChange} />
          </FormField>
        </StyledColumn>
      </StyledRow>
      <StyledRow>
        <ButtonFilled onClick={handleAddingOffer}>
          {t('addOffer.submit')}
        </ButtonFilled>
      </StyledRow>
    </Wrapper>
  );
};
