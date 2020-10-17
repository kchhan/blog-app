import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');

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
    };
    axios
      .post('http://localhost:5000/api/auth/login', data)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
