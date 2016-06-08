import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './layouts/MainLayout.js';
import Home from './layouts/Home.js';

export default Root = () => (
  <Router history={browserHistory}>
    <Route path='/' component={ MainLayout } />
    <Route path='/home' component={ Home } />
  </Router>
);
