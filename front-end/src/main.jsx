import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import App from './App';
import './index.css';

const themes = {
  light: createTheme({
    palette: {
      mode: 'light'
    }
  }),
  dark: createTheme({
    palette: {
      mode: 'dark'
    }
  })
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={themes.dark}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
