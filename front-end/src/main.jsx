import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={themes.dark}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
