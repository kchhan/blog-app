import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { getUser, removeUserLocal, setUserLocal } from './Utils/Common';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import PostsList from './components/PostList/PostsList';
import PostDetail from './components/PostDetail/PostDetail';
import PostForm from './components/PostForm/PostForm';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function guestLogin() {
    setIsLoggedIn(true);
    setUserLocal('GUESTTOKEN', 'Guest');
    setUser({ username: 'Guest' });
  }

  function handleLogout() {
    removeUserLocal();
    setIsLoggedIn(false);
  }

  // checks user on load
  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
    return setLoading(false);
  }, []);

  // updates login header state
  useEffect(() => {
    const user = getUser();
    if (!user) return;
  }, [isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <BrowserRouter>
        <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} />

        {isLoggedIn ? null : <Redirect to='/login' />}

        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <PostsList {...props} user={user} />}
          />

          <Route
            path='/new'
            render={(props) => (
              <PostForm
                {...props}
                type={'drafts'}
                user={user}
                newDraft={true}
                newPost={true}
              />
            )}
          />

          <Route
            path='/drafts/:id/edit'
            render={(props) => (
              <PostForm {...props} user={user} type='drafts' newDraft={false} />
            )}
          />

          <Route
            path='/posts/:id/edit'
            render={(props) => (
              <PostForm {...props} user={user} type='posts' newPost={false} />
            )}
          />

          <Route
            path='/posts/:id'
            render={(props) => (
              <PostDetail {...props} user={user} type='posts' />
            )}
          />

          <Route
            exact
            path='/login'
            render={(props) => (
              <Login
                {...props}
                updateLogin={handleLogin}
                handleGuestLogin={guestLogin}
              />
            )}
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
