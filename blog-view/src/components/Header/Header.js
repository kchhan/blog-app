import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div>
        <Link to={'/'}>Blog</Link>
      </div>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Log In</Link>
        <Link to={'/signup'}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Header;
