import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
