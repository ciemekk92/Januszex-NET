import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { actionCreators as offerActionCreators } from 'Stores/Offer';
import { actionCreators as categoryActionCreators } from 'Stores/Category';
import { ICategory, IOfferForCreation, Photo } from 'Types/stores';
import { TextInput } from 'Shared/TextInput';
import { TextArea } from 'Shared/TextArea';
import { FormField } from 'Shared/FormField';
import { NumericInput } from 'Shared/NumericInput';
import { Heading5 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/ButtonFilled';
import { MultiSelect } from 'Shared/MultiSelect';

import {
  StyledColumn,
  StyledImageContainer,
  StyledImagesRow,
  StyledRow,
  Wrapper
} from './AddOffer.styled';
import { ApplicationState } from '../../Stores/store';
import { ApiResponse } from '../../Types/Response';
import { flattenObject } from '../../Utils/flattenObject';
import { ImageInput } from '../../Shared/ImageInput';
import { isDefined } from '../../Utils/isDefined';
import { OptionNode } from 'Types/utils';
import { RemoveImageButton } from './components/RemoveImageButton';

const MANDATORY_FIELDS = [
  'title',
  'content',
  'location.street',
  'location.postalCode',
  'location.city.name',
  'location.region.name'
];

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
    },
    photos: []
  };

  React.useEffect(() => {
    dispatch(categoryActionCreators.getCategories());
  }, []);

  const history = useHistory();

  const [inputData, setInputData] =
    React.useState<IOfferForCreation>(initialData);

  const categories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.categories : [],
    shallowEqual
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const mapCategoriesChildren = (
    categoriesArr: ICategory[],
    currentDepth?: number
  ): OptionNode[] => {
    let depth: number = currentDepth ? currentDepth : 0;

    return categoriesArr.map((category: ICategory) => {
      if (isDefined(category.children)) {
        return {
          label: category.name,
          value: category.id,
          depth: depth,
          children: mapCategoriesChildren(category.children, depth + 1)
        };
      }

      return {
        label: category.name,
        value: category.id,
        depth
      };
    });
  };

  const categoriesOptions = mapCategoriesChildren(categories);

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

  const handleImageChange = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log('dupa');
    const reader = new FileReader();
    let width: number;
    let height: number;

    console.log({ target: target.files });

    if (target.files) {
      const file = target.files[0];
      const image = new Image();

      image.onload = () => {
        width = image.width;
        height = image.height;
      };

      reader.onload = ({ target }: ProgressEvent<FileReader>) => {
        if (target) {
          if (target.result) {
            image.src = target.result as string;
          }
        }

        const photo: Photo = {
          width,
          height,
          filename: uuidv4(),
          link: target!.result as string
        };

        setInputData((prevState: IOfferForCreation) => ({
          ...prevState,
          photos: [...inputData.photos, photo]
        }));
      };

      console.log(file);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const isSubmitButtonDisabled = (): boolean => {
    return (
      MANDATORY_FIELDS.some(
        (key: string) => !Boolean(flattenObject(inputData)[key])
      ) ||
      inputData.categoryIds.length === 0 ||
      inputData.categoryIds.length > 3
    );
  };

  const handleAddingOffer = async () => {
    const result = (await dispatch(
      offerActionCreators.createOffer(inputData)
    )) as unknown as ApiResponse;

    if (result.status === 201) {
      history.push('/');
    } else {
      console.log({ result: await result.json() });
    }
  };

  const handleSelectingCategories = (values: string[]) => {
    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      categoryIds: values
    }));
  };

  const handleRemovingImageFactory = (filename: string) => () => {
    setInputData((prevState) => ({
      ...prevState,
      photos: inputData.photos.filter(
        (photo: Photo) => photo.filename !== filename
      )
    }));
  };

  return (
    <Wrapper>
      <StyledRow>
        {console.log({ photos: inputData.photos })}
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
          <FormField label={t('addOffer.city')}>
            <TextInput name="name" onChange={onCityChange} />
          </FormField>
          <FormField label={t('addOffer.region')}>
            <TextInput name="name" onChange={onRegionChange} />
          </FormField>
        </StyledColumn>
        <StyledColumn>
          <MultiSelect
            onChange={handleSelectingCategories}
            options={categoriesOptions}
            selectedOptions={inputData.categoryIds}
          />
        </StyledColumn>
      </StyledRow>
      <Heading5>Zdjęcia</Heading5>
      <ImageInput onChange={handleImageChange} />
      <StyledRow>
        <StyledImagesRow>
          {inputData.photos.map((photo: Photo) => (
            <React.Fragment key={photo.filename}>
              <StyledImageContainer>
                <img
                  src={photo.link}
                  alt={t('addOffer.photoAlt') + photo.filename}
                />
                <RemoveImageButton
                  onClick={handleRemovingImageFactory(photo.filename)}
                />
              </StyledImageContainer>
            </React.Fragment>
          ))}
        </StyledImagesRow>
      </StyledRow>

      <StyledRow>
        <ButtonFilled
          disabled={isSubmitButtonDisabled()}
          onClick={handleAddingOffer}
        >
          {t('addOffer.submit')}
        </ButtonFilled>
      </StyledRow>
    </Wrapper>
  );
};
