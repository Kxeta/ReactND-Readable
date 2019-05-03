import React from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ArrowBack, Menu } from '@material-ui/icons';

import './Header.css';
import { PropTypes } from 'prop-types';

const Header = props => {
  const {
    hasSidebar,
    title,
    handleDrawerToggle,
    goBack,
    handleGoBack,
    children,
  } = props;
  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={hasSidebar ? 'appBar' : ''}>
        <Toolbar>
          {hasSidebar && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerToggle}
              className="menuButton"
            >
              <Menu />
            </IconButton>
          )}
          {goBack && (
            <IconButton
              color="inherit"
              aria-label="Go back"
              onClick={handleGoBack}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" noWrap>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  goBack: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleGoBack: PropTypes.func,
  hasSidebar: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
