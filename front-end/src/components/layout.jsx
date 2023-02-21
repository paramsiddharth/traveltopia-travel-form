import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const NavItem = ({ href, children }) => (
  <Link to={href}>
    <Button color='info' variant='outlined'>
      { children }
    </Button>
  </Link>
);

const Layout = ({ children }) => {
  return <div className='App'>
    <Link to='/'>
      <h1>
        Travelopia
      </h1>
    </Link>
    <nav>
      <NavItem href='/'>
        Form
      </NavItem>
      {' '}
      <NavItem href='/dashboard'>
        Dashboard
      </NavItem>
    </nav>
    { children }
    <footer>
      &copy; Param Siddharth 2023-{ new Date().getFullYear() }
    </footer>
  </div>;
};

NavItem.propTypes = {
  href: String,
  children: [Component]
};

Layout.propTypes = {
  children: [Component]
};

export default Layout;