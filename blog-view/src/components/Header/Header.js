import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const {isLoggedIn} = props

  const handleClick = () => {
    return props.handleLogout();
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
          <input type='button' onClick={handleClick} value='Logout' />
        ) : null}

        {isLoggedIn ? null : <Link to={'/signup'}>Sign Up</Link>}
      </div>
    </nav>
  );
};

export default Header;
