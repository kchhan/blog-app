import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
    props.history.push('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Sign up</h1>

      <form>
        <div>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={setFirstName}
            required
          ></input>
        </div>

        <div>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={setLastName}
            required
          ></input>
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={username}
            onChange={setUsername}
            required
          ></input>
        </div>

        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={setPassword}
            required
          ></input>
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={setConfirmPassword}
            required
          ></input>
        </div>

        <div>
          {/* if there are errors they will show above sign up button */}
          {error}
        </div>

        <div>
          <input type='button' value='Sign Up' onClick={handleSubmit} />
        </div>
      </form>

      <div>
        <Link to={'/login'}>Already have an account?</Link>
      </div>
      <div>
        <Link to={'/'}>Go Back</Link>
      </div>
    </div>
  );
};

export default Signup;
