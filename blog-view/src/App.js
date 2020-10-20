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
    <main>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => (
              <PostsList {...props} user={user} isLoggedIn={isLoggedIn} />
            )}
          />

          <Route
            path='/posts/:id'
            render={(props) => (
              <PostDetail {...props} user={user} isLoggedIn={isLoggedIn} />
            )}
          />

          <Route exact path='/login' render={(props) => <Login {...props} />} />

          <Route
            exact
            path='/signup'
            render={(props) => <Signup {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </main>
  );
};

export default App;
