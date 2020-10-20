import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserLocal } from '../../Utils/Common';

const Header = (props) => {
  const { isLoggedIn } = props;

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

        {isLoggedIn ? null : <Link to={'/login'}>Log In</Link>}

        {isLoggedIn ? (
          <input type='button' onClick={handleLogout} value='Logout' />
        ) : null}

        {isLoggedIn ? null : <Link to={'/signup'}>Sign Up</Link>}
      </div>
    </nav>
  );
};

export default Header;
