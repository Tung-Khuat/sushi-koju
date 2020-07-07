import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { StoreProvider } from './store';
import AppRouter from './routes';

ReactDOM.render(
  <StoreProvider>
    <AppRouter />
  </StoreProvider>,
  document.getElementById('App'),
);
