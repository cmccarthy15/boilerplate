import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store} >
    <div>Hello, world!</div>
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
