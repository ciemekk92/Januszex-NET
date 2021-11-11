import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'Stores/store';
import { Main } from 'Modules/Main';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();
