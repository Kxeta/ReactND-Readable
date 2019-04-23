import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types'

import { IconButton, Menu, MenuItem } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class PostMenuActions extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state = {
    openActions: false,
    menuElement: null,
  };

  handleToggleActions = evt => {
    const { openActions } = this.state;
    this.setState({
      openActions: !openActions,
      menuElement: openActions ? null : evt.currentTarget,
    });
  };

  render() {
    const { openActions, menuElement } = this.state;
    return (
      <Fragment>
        <IconButton
          onClick={this.handleToggleActions}
          aria-owns={openActions ? 'fade-menu' : undefined}
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={menuElement}
          open={openActions}
          onClose={this.handleToggleActions}
        >
          {this.props.menuElements.map((menuItem, key) => (
            <MenuItem onClick={menuItem.onClick} key={key}>
              {menuItem.content}
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }
}
