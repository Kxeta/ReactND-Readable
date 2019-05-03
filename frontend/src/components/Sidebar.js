import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import './Sidebar.css';
import { PropTypes } from 'prop-types';

const Sidebar = props => {
  return (
    <List>
      {props.list.map((item, index) => (
        <Link key={index} to={item.path} className="list-link">
          <ListItem button key={index}>
            <ListItemText primary={item.name.toUpperCase()} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

Sidebar.propTypes = {
  list: PropTypes.array,
};

export default Sidebar;
