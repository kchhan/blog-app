import React from 'react';

import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href='https://github.com/kchhan' target='_blank' rel="noopener noreferrer">
          <i className='fab fa-github-square fa-3x' />
        </a>
      </div>
      <div>
        <a href='https://www.linkedin.com/in/kevinchhan/' target='_blank' rel="noopener noreferrer">
          <i className='fab fa-linkedin fa-3x' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
