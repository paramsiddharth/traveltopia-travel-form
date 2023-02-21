import { Component } from 'react';

const Layout = ({ children }) => {
  return <div className='App'>
    <h1>Travelopia</h1>
    { children }
    <footer>
      &copy; Param Siddharth 2023-{ new Date().getFullYear() }
    </footer>
  </div>;
};

Layout.propTypes = {
  children: [Component]
};

export default Layout;