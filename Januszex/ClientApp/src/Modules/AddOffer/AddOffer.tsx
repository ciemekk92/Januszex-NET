import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextInput } from 'Shared/TextInput';
import { IOffer } from 'Types/stores';
import { TextArea } from 'Shared/TextArea';
import { FormField } from 'Shared/FormField';
import { NumericInput } from 'Shared/NumericInput';
import { Heading5 } from 'Shared/Typography';
import { StyledColumn, StyledRow, Wrapper } from './AddOffer.styled';
import { ButtonFilled } from '../../Shared/ButtonFilled';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../Stores/Offer';

export const AddOffer = (): JSX.Element => {
  const initialData: IOffer = {
    id: '',
    title: '',
    categories: [],
    content: '',
    created: '',
    isActive: false,
    price: 0,
    user: {
      id: ''
    },
    location: {
      id: '',
      street: '',
      postalCode: '',
      city: {
        id: '',
        name: ''
      },
      region: {
        id: '',
        name: ''
      }
    }
  };

  const [inputData, setInputData] = React.useState<IOffer>(initialData);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData((prevState: IOffer) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const onLocationChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: IOffer) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [target.name]: target.value
      }
    }));
  };

  const onCityChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: IOffer) => ({
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
    setInputData((prevState: IOffer) => ({
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
    const result = await dispatch(actionCreators.createOffer(inputData));

    console.log({ result });
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
          <FormField label={t('addOffer.street')}>
            <TextInput name="street" onChange={onLocationChange} />
          </FormField>
          <FormField label={t('addOffer.postalCode')}>
            <TextInput name="postalCode" onChange={onLocationChange} />
          </FormField>
        </StyledColumn>
        <StyledColumn>
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
