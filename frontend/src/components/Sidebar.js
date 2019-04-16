import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = props => {
  return (
    <div>
      <div className="toolbar">{props.title}</div>
      <Divider />
      <List>
        {props.list.map((item, index) => (
          <Link to={item.path}>
            <ListItem button key={index}>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
