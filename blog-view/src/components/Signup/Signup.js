import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../../api-config';
import axios from 'axios';

import './Signup.css';

const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };

    setLoading(true);

    axios
      .post(`${API_ROOT}/api/auth/signup`, data)
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
      <h1 className='signup-title'>Sign up</h1>

      <form className='signup-form'>
        <div className='signup-form-group'>
          <label htmlFor='firstname' className='signup-label'>
            First Name
          </label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-form-group'>
          <label htmlFor='lastname' className='signup-label'>
            Last Name
          </label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className='signup-input'
            required
          />
        </div>

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

        <div className='signup-errors'>
          {/* if there are errors they will show above sign up button */}
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error.msg}</li>;
            })}
          </ul>
        </div>

        <div className='signup-form-group'>
          <button onClick={handleSubmit} className='signup-input signup-submit'>
            Sign Up
          </button>
        </div>
      </form>

      <div className='signup-redirect'>
        <Link to={'/login'} className='signup-redirect-login'>
          Already have an account?
        </Link>
      </div>
      <div className='signup-redirect'>
        <Link to={'/'} className='signup-redirect-back'>
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default Signup;
