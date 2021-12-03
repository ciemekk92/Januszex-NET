import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from 'Stores/store';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);
