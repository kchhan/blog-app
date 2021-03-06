import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getUser, removeUserLocal } from './Utils/Common';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import PostsList from './components/PostList/PostsList';
import PostDetail from './components/PostDetail/PostDetail';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    removeUserLocal();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
    return setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <BrowserRouter>
        <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
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

          <Route
            exact
            path='/login'
            render={(props) => <Login {...props} updateLogin={handleLogin} />}
          />

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
