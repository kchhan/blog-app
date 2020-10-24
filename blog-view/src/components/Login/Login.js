import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserLocal } from '../../Utils/Common';

import './Login.css';

const Login = (props) => {
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // sets values for form data
  function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return [value, handleChange];
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:5000/api/auth/login', data)
      .then((response) => {
        setLoading(false);
        console.log(response);
        // failed authentication
        if ((response.data === 'Wrong username or password')) {
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
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  };

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
            onChange={setUsername}
            className='login-input'
            required
          />
        </div>

        <div className='login-form-group'>
          <label className='login-label'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={setPassword}
            className='login-input'
            required
          />
        </div>

        <div className='login-errors'>
          {/* if there are errors they will show up above log in button */}
          {error}
        </div>

        <div className='login-form-group'>
          <input
            type='button'
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            className='login-input login-submit'
            disabled={loading}
          />
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
