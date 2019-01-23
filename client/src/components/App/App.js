import React, { Component } from 'react';

import './App.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginContainer from '../LoginContainer/LoginContainer';



class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          authenticated: false
      }
  }

  render() {
      const theme = createMuiTheme({
          palette: {
              primary: {
                  main: '#3d52d5',
                  light: '#797eff',
                  dark: '#002aa3'
              }, secondary: {
                  main: '#a5a5a5',
                  light: '#d6d6d6',
                  dark: '#767676'
              }, background: {
                  default: '#fafafa'
              }
          }
      });

     return (

      <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <LoginContainer />
      </MuiThemeProvider>
     );
  };
}

export default App;
