import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserLocal } from '../../Utils/Common';

const Login = () => {
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
        setUserLocal(response.data.token, response.data.user);
        console.log('Login with', response.data.user.username);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form>
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
        {error}
        <div>
          <input
            type='button'
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={loading}
          />
        </div>
      </form>
      <div>
        <Link to={'/'}>Go Back</Link>
      </div>
    </div>
  );
};

export default Login;
