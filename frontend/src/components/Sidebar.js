import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = props => {
  return (
    <List>
      {props.list.map((item, index) => (
        <Link key={index} to={item.path}>
          <ListItem button key={index}>
            <ListItemText primary={item.name.toUpperCase()} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Sidebar;
