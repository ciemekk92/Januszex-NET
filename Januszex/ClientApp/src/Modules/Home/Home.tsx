import React from 'react';
import authService from '../api-authorization/AuthorizeService';
import { HomePageSearch } from 'Modules/HomePageSearch';
import { AllOffers } from 'Modules/AllOffers';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../Stores/store';
import { actionCreators } from '../../Stores/Offer';

interface Category {
  id: string;
  name: string;
  created: string;
}

interface InputData {
  title: string;
  content: string;
}

const initialInputData: InputData = {
  title: '',
  content: ''
};

export const Home = (): JSX.Element => {
  const [inputData, setInputData] = React.useState<InputData>(initialInputData);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const dispatch = useDispatch();
  const offers = useSelector(
    (state: ApplicationState) => (state.offer ? state.offer.offers : []),
    shallowEqual
  );

  const handleLoadingCategories = async () => {
    const response = await fetch('/api/Category', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const categoriesData = await response.json();
    setCategories(categoriesData);
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [target.name]: target.value
    });
  };

  const handleFetchingOffers = (query: string) => {
    dispatch(actionCreators.getOffers({ query }));
  };

  const handleSearch = (query: string) => {
    handleFetchingOffers(query);
  };

  const handleSelectingCategory = (id: string) => () => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((el) => el !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const renderCategoriesList = () => {
    return categories.map((category) => (
      <li>
        <input
          checked={selectedCategories.includes(category.id)}
          type="checkbox"
          onChange={handleSelectingCategory(category.id)}
        />
        {category.name} | Stworzona: {category.created}
      </li>
    ));
  };

  const handleSubmit = async () => {
    const token = await authService.getAccessToken();

    const response = await fetch('api/Offer', {
      method: 'POST',
      body: JSON.stringify({
        ...inputData,
        categoryIds: selectedCategories
      }),
      headers: !token
        ? { 'Content-Type': 'application/json' }
        : {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    });

    if (response.status === 201) {
      handleFetchingOffers('');
    }
  };

  React.useEffect(() => {
    handleLoadingCategories();
  }, []);

  return (
    <div>
      <HomePageSearch handleSearch={handleSearch} />
      <ul>
        <li>Wyszukiwarka</li>
        <li>Kategorie</li>
        <li>Ogłoszenia promowane</li>
        <br />
        <ol>{renderCategoriesList()}</ol>
        <br />
        <input
          name="title"
          type="text"
          value={inputData.title}
          onChange={onChange}
        />
        <input
          name="content"
          type="text"
          value={inputData.content}
          onChange={onChange}
        />
        <button onClick={handleSubmit}>KLIK</button>
        <AllOffers data={offers} />
      </ul>
    </div>
  );
};
