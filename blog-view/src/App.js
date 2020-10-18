import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PostsList from './components/PostList/PostsList';
import PostDetail from './components/PostDetail/PostDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={PostsList} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/posts/:id' component={PostDetail} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
