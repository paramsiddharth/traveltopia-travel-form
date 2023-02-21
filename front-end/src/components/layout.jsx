// import { Component } from 'react';
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
    <footer style={{ marginTop: 20 }}>
      &copy; Param Siddharth 2023-{ new Date().getFullYear() }
    </footer>
  </div>;
};

export default Layout;