import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserLocal } from '../../Utils/Common';

const Header = () => {
  const handleLogout = () => {
    removeUserLocal();
  };

  return (
    <nav>
      <div>
        <Link to={'/'}>Blog</Link>
      </div>
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>Log In</Link>
        <Link to={'/signup'}>Sign Up</Link>
        <input type='button' onClick={handleLogout} value='Logout' />
      </div>
    </nav>
  );
};

export default Header;
