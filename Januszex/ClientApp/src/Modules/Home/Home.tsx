import React from 'react';
import authService from '../api-authorization/AuthorizeService';

interface Props {}

interface State {
  inputData: {
    title: string;
    content: string;
  };
  categories: {
    id: string;
    name: string;
    created: string;
  }[];
  selectedCategories: string[];
}

export class Home extends React.Component<Props, State> {
  static displayName = Home.name;

  constructor(props: Props) {
    super(props);

    this.state = {
      inputData: {
        title: '',
        content: ''
      },
      categories: [],
      selectedCategories: []
    };
  }

  async componentDidMount() {
    await this.handleLoadingCategories();
  }

  get categoriesList() {
    return this.state.categories.map((category) => (
      <li>
        <input
          checked={this.state.selectedCategories.includes(category.id)}
          type="checkbox"
          onChange={this.handleSelectingCategory(category.id)}
        />
        {category.name} | Stworzona: {category.created}
      </li>
    ));
  }

  onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      inputData: {
        ...this.state.inputData,
        [target.name]: target.value
      }
    });
  };

  handleLoadingCategories = async () => {
    const response = await fetch('/api/Category', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const categoriesData = await response.json();
    this.setState({ ...this.state, categories: categoriesData });
  };

  handleSelectingCategory = (id: string) => () => {
    if (this.state.selectedCategories.includes(id)) {
      this.setState({
        ...this.state,
        selectedCategories: this.state.selectedCategories.filter(
          (el) => el !== id
        )
      });
    } else {
      this.setState({
        ...this.state,
        selectedCategories: [...this.state.selectedCategories, id]
      });
    }
  };

  handleSubmit = async () => {
    const token = await authService.getAccessToken();

    const response = await fetch('api/Offer', {
      method: 'POST',
      body: JSON.stringify({
        ...this.state.inputData,
        categoryIds: this.state.selectedCategories
      }),
      headers: !token
        ? { 'Content-Type': 'application/json' }
        : {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    });

    const data = await response.json();
    console.log({ data });
  };

  render() {
    return (
      <div>
        Strona główna
        <ul>
          <li>Wyszukiwarka</li>
          <li>Kategorie</li>
          <li>Ogłoszenia promowane</li>
          <br />
          <ol>{this.categoriesList}</ol>
          <br />
          <input
            name="title"
            type="text"
            value={this.state.inputData.title}
            onChange={this.onChange}
          />
          <input
            name="content"
            type="text"
            value={this.state.inputData.content}
            onChange={this.onChange}
          />
          <button onClick={this.handleSubmit}>KLIK</button>
        </ul>
      </div>
    );
  }
}
