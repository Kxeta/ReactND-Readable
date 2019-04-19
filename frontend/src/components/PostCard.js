import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Moment from 'moment';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import './PostCard.css';
import AlertDialog from './AlertDialog';

export default class PostCard extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  state = {
    openActions: false,
    menuElement: null,
    openDialog: false,
  };

  handleToggleActions = evt => {
    const { openActions } = this.state;
    this.setState({
      openActions: !openActions,
      menuElement: openActions ? null : evt.currentTarget,
    });
  };

  handleUpVote = evt => {
    const { onUpVote, post } = this.props;
    return onUpVote && onUpVote(post.id);
  };
  handleDownVote = evt => {
    const { onDownVote, post } = this.props;
    return onDownVote && onDownVote(post.id);
  };

  toggleDeleteDialog = evt => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
    });
  };

  handleDelete = evt => {
    const { onDeletePost, post } = this.props;
    this.toggleDeleteDialog();
    return onDeletePost && onDeletePost(post.id);
  };

  render() {
    const {
      id,
      category,
      author,
      timestamp,
      title,
      body,
      voteScore,
      commentCount,
    } = this.props.post;
    const { openActions, menuElement, openDialog } = this.state;
    const { postOwner } = this.props;
    const date = Moment(timestamp);
    const momentDate = Moment(date).fromNow();

    return (
      <Card className="post-card" id={id}>
        <AlertDialog
          open={openDialog}
          cancelText="No! Go back!"
          confirmText="Delete it, I'm sure!"
          alertText="Are you sure that you want to remove this post? It probably cannot be undone!!"
          handleConfirm={this.handleDelete}
          handleCancel={this.toggleDeleteDialog}
        />
        <CardHeader
          action={
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
                <MenuItem
                  onClick={() =>
                    this.props.handleClick &&
                    this.props.handleClick(this.props.post)
                  }
                >
                  <OpenInNewIcon aria-label="View Post" />
                  View Post
                </MenuItem>
                {postOwner && [
                  <MenuItem
                    onClick={this.handleToggleActions}
                    key={`edit-${id}`}
                  >
                    <EditIcon aria-label="Edit" />
                    Edit
                  </MenuItem>,
                  <MenuItem
                    onClick={this.toggleDeleteDialog}
                    key={`delete-${id}`}
                  >
                    <DeleteIcon aria-label="Delete" />
                    Delete
                  </MenuItem>,
                ]}
              </Menu>
            </Fragment>
          }
          title={category.toUpperCase()}
          subheader={`${author} - ${momentDate}`}
        />
        <CardActionArea
          onClick={() =>
            this.props.handleClick && this.props.handleClick(this.props.post)
          }
        >
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography paragraph>{body}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="post-card-actions" disableActionSpacing>
          <div>
            <IconButton aria-label="Comment">
              <CommentIcon fontSize="small" color="primary" />
            </IconButton>
            <Typography>{`(${commentCount})`}</Typography>
          </div>
          <div>
            <IconButton aria-label="UpVote" onClick={this.handleUpVote}>
              <ThumbUpIcon fontSize="small" color="secondary" />
            </IconButton>
            <Typography>{voteScore}</Typography>
            <IconButton aria-label="DownVote" onClick={this.handleDownVote}>
              <ThumbDownIcon fontSize="small" color="error" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}
