import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import {
  actionCreators,
  actionCreators as offerActionCreators
} from 'Stores/Offer';
import { actionCreators as categoryActionCreators } from 'Stores/Category';
import { ApplicationState } from 'Stores/store';
import { TextInput } from 'Shared/TextInput';
import { TextArea } from 'Shared/TextArea';
import { FormField } from 'Shared/FormField';
import { NumericInput } from 'Shared/NumericInput';
import { Heading5 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/ButtonFilled';
import { MultiSelect } from 'Shared/MultiSelect';
import { ImageInput } from 'Shared/ImageInput';
import { ApiResponse } from 'Types/Response';
import { OptionNode } from 'Types/utils';
import { ICategory, IOfferForCreation, Photo } from 'Types/stores';
import { flattenObject } from 'Utils/flattenObject';
import { isDefined } from 'Utils/isDefined';
import { Container } from 'Hooks/useLoading';
import { MANDATORY_FIELDS } from './fixtures';
import { RemoveImageButton } from './components/RemoveImageButton';
import {
  StyledColumn,
  StyledImageContainer,
  StyledImagesRow,
  StyledRow,
  Wrapper
} from './AddEditOffer.styled';
import { Api } from '../../Utils/Api';

enum MODE {
  ADD = 'ADD',
  EDIT = 'EDIT'
}

interface Props extends RouteComponentProps<{ id: Id }> {}

export const AddEditOffer = ({ match }: Props): JSX.Element => {
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

  const [mode, setMode] = React.useState<MODE>(MODE.ADD);

  const [inputData, setInputData] =
    React.useState<IOfferForCreation>(initialData);

  const [parentCategories, setParentCategories] = React.useState<Id[]>([]);

  const categories = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.categories : [],
    shallowEqual
  );

  const areCategoriesLoading = useSelector(
    (state: ApplicationState) =>
      state.category ? state.category.isLoading : false,
    shallowEqual
  );

  const areOffersLoading = useSelector(
    (state: ApplicationState) => (state.offer ? state.offer.isLoading : false),
    shallowEqual
  );

  const isLoading = areCategoriesLoading || areOffersLoading;

  React.useEffect(() => {
    if (match.params.id) {
      setMode(MODE.EDIT);

      Api.get(`api/Offer/${match.params.id}`)
        .then((response) => response.json())
        .then((json) => {
          const { categories, ...rest } = json;

          const categoryIds = categories.map(
            (category: ICategory) => category.id
          );

          setInputData((prevState) => ({
            ...prevState,
            ...rest
          }));

          handleSelectingCategories(categoryIds);
        });
    }
  }, [match.params.id]);

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
    const reader = new FileReader();
    let width: number;
    let height: number;

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

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const isSubmitButtonDisabled = (): boolean => {
    return (
      MANDATORY_FIELDS.some(
        (key: string) => !Boolean(flattenObject(inputData)[key])
      ) || !inputData.categoryIds.length
    );
  };

  const handleAddingOffer = async () => {
    const result = (await dispatch(
      offerActionCreators.createOffer(inputData)
    )) as unknown as ApiResponse;

    if (result.status === 201) {
      dispatch(actionCreators.getOffers({ query: '' }));
      history.push('/');
    } else {
      console.log({ result: await result.json() });
    }
  };

  const traverseCategories = (
    categoriesArr: ICategory[],
    currentIds?: Id[],
    startingIds?: Id[],
    parentsArray?: Id[]
  ) => {
    let arr = currentIds ? currentIds : startingIds ? [...startingIds] : [];
    let parentsArr: Id[] = parentsArray ? parentsArray : [];

    categoriesArr.forEach((category: ICategory) => {
      if (category.children) {
        const result = traverseCategories(
          category.children,
          arr,
          undefined,
          parentsArr
        );

        if (result.arr.length !== arr.length && category.parentId) {
          arr.push(category.parentId);
          parentsArr.push(category.parentId);
        }
      }

      if (arr.includes(category.id) && category.parentId) {
        arr.push(category.parentId);
        parentsArr.push(category.parentId);
      }
    });

    return { arr, parentsArr };
  };

  const handleSelectingCategories = (values: Id[]) => {
    const { arr, parentsArr } = traverseCategories(
      categories,
      undefined,
      values
    );
    const categoryIdsNoDupes = Array.from(new Set(arr));
    const parentIdsNoDupes = Array.from(new Set(parentsArr));

    console.log(parentsArr);

    const categoryIdsWithoutParents = categoryIdsNoDupes.filter(
      (cat: Id) => !parentIdsNoDupes.includes(cat)
    );

    setInputData((prevState: IOfferForCreation) => ({
      ...prevState,
      categoryIds: categoryIdsWithoutParents
    }));
    setParentCategories(parentIdsNoDupes);
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
    <React.Fragment>
      <Container isLoading={isLoading} />
      <Wrapper>
        <StyledRow>
          <StyledColumn>
            <FormField label={t('addOffer.title')}>
              <TextInput
                value={inputData.title}
                name="title"
                onChange={onChange}
              />
            </FormField>
            <FormField label={t('addOffer.price')}>
              <NumericInput
                value={inputData.price}
                min={0}
                name="price"
                onChange={onChange}
              />
            </FormField>
          </StyledColumn>
          <StyledColumn>
            <FormField label={t('addOffer.content')}>
              <TextArea
                value={inputData.content}
                name="content"
                onChange={onChange}
              />
            </FormField>
          </StyledColumn>
        </StyledRow>
        <StyledRow>
          <StyledColumn>
            <Heading5>{t('addOffer.locationLabel')}</Heading5>
            <FormField label={t('addOffer.street')}>
              <TextInput
                value={inputData.location.street}
                name="street"
                onChange={onLocationChange}
              />
            </FormField>
            <FormField label={t('addOffer.postalCode')}>
              <TextInput
                value={inputData.location.postalCode}
                name="postalCode"
                onChange={onLocationChange}
              />
            </FormField>
            <FormField label={t('addOffer.city')}>
              <TextInput
                value={inputData.location.city.name}
                name="name"
                onChange={onCityChange}
              />
            </FormField>
            <FormField label={t('addOffer.region')}>
              <TextInput
                value={inputData.location.region.name}
                name="name"
                onChange={onRegionChange}
              />
            </FormField>
          </StyledColumn>
          <StyledColumn>
            <Heading5>{t('addOffer.categories')}</Heading5>
            <MultiSelect
              onChange={handleSelectingCategories}
              options={categoriesOptions}
              selectedOptions={inputData.categoryIds}
              disabledOptions={parentCategories}
            />
          </StyledColumn>
        </StyledRow>
        <Heading5>{t('addOffer.photos')}</Heading5>
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
            {mode === MODE.ADD ? t('addOffer.submit') : t('addOffer.edit')}
          </ButtonFilled>
        </StyledRow>
      </Wrapper>
    </React.Fragment>
  );
};
