import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Signup.css';

const Signup = (props) => {
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');
  const [code, setCode] = useInput('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

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
      username: username,
      password: password,
      confirm_password: confirmPassword,
      code: code,
    };

    setLoading(true);

    axios
      .post('http://localhost:5000/api/auth/admin/signup', data)
      .then((response) => {
        console.log(response);
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
  };

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

        <div className='signup-form-group'>
          <label htmlFor='signup-code' className='signup-label'>
            Editor Code
          </label>
          <input
            type='text'
            value={code}
            onChange={setCode}
            className='signup-input'
            required
          />
        </div>

        <div className='signup-errors'>
          {/* if there are errors they will show above sign up button */}
          <ul>
            {errors
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
      <div className='signup-redirect'>
        <Link to={'/'} className='signup-redirect-back'>
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default Signup;
