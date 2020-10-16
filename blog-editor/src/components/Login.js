import React, { useState, useEffect } from 'react';

const Login = ({}) => {
  const handleSubmit = () => {};
  return (
    <div>
      <h1>Editor's Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input type='text' required></input>
        </div>
        <div>
          <label>Password</label>
          <input type='text' required></input>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
