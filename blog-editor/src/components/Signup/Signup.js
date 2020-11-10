import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../../api-config';
import axios from 'axios';

import './Signup.css';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      confirm_password: confirmPassword,
      code: code,
    };

    setLoading(true);

    axios
      .post(`${API_ROOT}/api/auth/admin/signup`, data)
      .then((response) => {
        if (response.data.success === false) {
          // failed making user
          setLoading(false);
          return setErrors(response.data.errors);
        } else {
          // successfully made user
          setLoading(false);
          props.history.push('/login');
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrors(error);
      });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <section className='signup'>
      <h1 className='signup-title'>Editor Sign up</h1>

      <form className='signup-form'>
        <div className='signup-form-group'>
          <label htmlFor='username' className='signup-label'>
            Username
          </label>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-form-group'>
          <label htmlFor='password' className='signup-label'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-form-group'>
          <label htmlFor='confirmPassword' className='signup-label'>
            Confirm Password
          </label>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-form-group'>
          <label htmlFor='signup-code' className='signup-label'>
            Editor Code
          </label>
          <input
            type='text'
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-errors'>
          {/* if there are errors they will show above sign up button */}
          <ul>
            {errors.length > 0
              ? errors.map((error, index) => {
                  return <li key={index}>{error.msg}</li>;
                })
              : null}
          </ul>
        </div>

        <div className='signup-form-group'>
          <input
            type='button'
            value='Sign Up'
            onClick={handleSubmit}
            className='signup-input signup-submit'
          />
        </div>
      </form>

      <div className='signup-redirect'>
        <Link to={'/login'} className='signup-redirect-login'>
          Already have an account?
        </Link>
      </div>
    </section>
  );
};

export default Signup;
