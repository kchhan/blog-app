import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getUser } from './Utils/Common';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PostsList from './components/PostList/PostsList';
import PostDetail from './components/PostDetail/PostDetail';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
    return setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
