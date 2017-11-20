import React from 'react';
import { render } from 'react-dom';
import Quiz from './quiz.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  overrides: {
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <Quiz/>
  </MuiThemeProvider>,
  document.querySelector('#app')
);
