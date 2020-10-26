import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { getUser, removeUserLocal } from './Utils/Common';

import './App.css';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import PostsList from './components/PostList/PostsList';
import PostDetail from './components/PostDetail/PostDetail';
import PostForm from './components/PostForm/PostForm';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    }
    return setLoading(false);
  }, []);

  useEffect(() => {
    const user = getUser();
    if (!user) return;
    if (user.username === 'kchhan') {
      return setIsAdmin(true);
    }
    return setIsAdmin(false);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeUserLocal();
    setIsLoggedIn(false);
    setIsAdmin(false);
    history.push('/');
  };

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
              <PostsList
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
              />
            )}
          />

          <Route
            path='/new'
            render={(props) => (
              <PostForm
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                newDraft={true}
                isAdmin={isAdmin}
              />
            )}
          />

          <Route
            path='/drafts/:id'
            render={(props) => (
              <PostForm
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                newDraft={false}
                isAdmin={isAdmin}
              />
            )}
          />

          <Route
            path='/posts/:id'
            render={(props) => (
              <PostDetail
                {...props}
                user={user}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
              />
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
