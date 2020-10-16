import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({}) => {
  const [firstName, setFirstName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');

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
    axios
      .post('http://localhost:5000/api/auth/signup', data)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
