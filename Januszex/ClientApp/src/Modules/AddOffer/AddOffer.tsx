import React from 'react';
import { useTranslation } from 'react-i18next';

import { TextInput } from 'Shared/TextInput';
import { IOffer } from 'Types/stores';
import { TextArea } from 'Shared/TextArea';
import { FormField } from 'Shared/FormField';
import { NumericInput } from 'Shared/NumericInput';
import { StyledColumn, Wrapper } from './AddOffer.styled';

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

  const { t } = useTranslation();

  const onChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputData((prevState: IOffer) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
