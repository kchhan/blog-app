import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Header.css';

const Header = (props) => {
  const { isLoggedIn } = props;

  const history = useHistory();

  function handleClick() {
    props.handleLogout();
    return history.push('/login');
  }

  return (
    <nav className='navbar'>
      <div className='nav-group'>
        <Link to={'/'} className='title'>
          KCHHAN: BLOG
        </Link>
      </div>

      <div className='nav-group nav-links'>
        {isLoggedIn ? (
          <Link to={'/'} className='link home'>
            HOME
          </Link>
        ) : null}

        {isLoggedIn ? null : (
          <Link to={'/login'} className='link log-in'>
            LOG IN
          </Link>
        )}

        {isLoggedIn ? (
          <button onClick={handleClick} className='link log-out'>
            LOG OUT
          </button>
        ) : null}

        {isLoggedIn ? null : (
          <Link to={'/signup'} className='link sign-up'>
            SIGN UP
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
