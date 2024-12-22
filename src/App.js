import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '@theme/index';
import { HomePage } from '@pages/index';

import './App.css';
import { FileDataProvider } from './providers';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <FileDataProvider>
          <div className="App">
            <HomePage />
          </div>
        </FileDataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
