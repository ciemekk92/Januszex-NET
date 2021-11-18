import React from 'react';

export class Home extends React.Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        Strona główna
        <ul>
          <li>Wyszukiwarka</li>
          <li>Kategorie</li>
          <li>Ogłoszenia promowane</li>
        </ul>
      </div>
    );
  }
}
