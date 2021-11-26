import React from 'react';
import authService from '../api-authorization/AuthorizeService';

interface Props {}

interface State {
  name: string;
  content: string;
}

export class Home extends React.Component<Props, State> {
  static displayName = Home.name;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      content: ''
    };
  }

  onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
  };

  handleSubmit = async () => {
    const token = await authService.getAccessToken();

    const response = await fetch('api/Categories', {
      method: 'POST',
      body: JSON.stringify(this.state),
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
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            name="content"
            type="text"
            value={this.state.content}
            onChange={this.onChange}
          />
          <button onClick={this.handleSubmit}>KLIK</button>
        </ul>
      </div>
    );
  }
}
