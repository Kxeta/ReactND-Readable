import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import { Typography } from '@material-ui/core';

import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container">
        <MuiThemeProvider theme={theme}>
          <main className="content">
            <Typography variant="h1" color="primary">
              Oh-oh!
            </Typography>
            <Typography>
              Looks like this content went somewhere I can't find...
            </Typography>
            <Typography>
              <Link to="/">Wanna try it again?</Link>
            </Typography>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(NotFound);
