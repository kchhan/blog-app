import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Signup.css';

const Signup = (props) => {
  const [firstName, setFirstName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:5000/api/auth/signup', data)
      .then(() => {
        setLoading(false);
        props.history.push('/login');
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

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
            onChange={setFirstName}
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
            onChange={setLastName}
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
            onChange={setUsername}
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
            onChange={setPassword}
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
            onChange={setConfirmPassword}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-errors'>
          {/* if there are errors they will show above sign up button */}
          {error}
        </div>

        <div className="signup-form-group">
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
      <div className='signup-redirect'>
        <Link to={'/'} className='signup-redirect-back'>
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default Signup;
