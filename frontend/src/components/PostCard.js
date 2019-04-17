import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Card, CardHeader, IconButton, CardContent } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './PostCard.css';

export default class PostCard extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  state = {
    openActions: false,
  };

  handleOpenActions = () => {
    const { openActions } = this.state;
    this.setState({
      openActions: !openActions,
    });
  };

  render() {
    const {
      id,
      author,
      timestamp,
      title,
      body,
      votescore,
      commentCount,
    } = this.props.post;
    const date = Moment(timestamp);
    const momentDate = Moment(date).fromNow();

    return (
      <Card className="post-card">
        <CardHeader
          action={
            <IconButton onClick={this.handleOpenActions}>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={`${author} - ${date.format('MM/DD/YYYY')}`}
        />
        <CardContent>
          <div>{body}</div>
        </CardContent>
      </Card>
    );
  }
}
