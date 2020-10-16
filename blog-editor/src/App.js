import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import PostsList from './components/PostsList'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={PostsList} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
