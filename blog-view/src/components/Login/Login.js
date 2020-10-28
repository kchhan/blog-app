import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../../api-config';
import { setUserLocal } from '../../Utils/Common';
import axios from 'axios';

import './Login.css';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    setError(null);
    setLoading(true);

    axios
      .post(`${API_ROOT}/api/auth/login`, data)
      .then((response) => {
        setLoading(false);
        // failed authentication
        if (response.data === 'Wrong username or password') {
          return setError('Sorry. Wrong username or password');
        } else {
          // sets token in local storage
          setUserLocal(response.data.token, response.data.user);
          // redirects to post list
          props.history.push('/');
          // set logged in in parent component
          return props.updateLogin();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError('Something went wrong. Please try again later.');
      });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <section className='login'>
      <h1 className='login-title'>Log In</h1>

      <form className='login-form'>
        <div className='login-form-group'>
          <label htmlFor='username' className='login-label'>
            Username:
          </label>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='login-input'
            required
          />
        </div>

        <div className='login-form-group'>
          <label className='login-label'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='login-input'
            required
          />
        </div>

        <div className='login-errors'>
          {/* if there are errors they will show up above log in button */}
          {error}
        </div>

        <div className='login-form-group'>
          <button
            onClick={handleLogin}
            className='login-input login-submit'
            disabled={loading}
          >
            Log In
          </button>
        </div>
      </form>

      <div className='login-redirect'>
        <Link to={'/signup'} className='login-redirect-signup'>
          First Time?
        </Link>
      </div>
      <div className='login-redirect'>
        <Link to={'/'} className='login-redirect-back'>
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default Login;
