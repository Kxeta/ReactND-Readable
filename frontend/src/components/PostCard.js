import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  Divider,
} from '@material-ui/core';

import './PostCard.css';
import AlertDialog from './AlertDialog';
import PostCardActions from './PostCardActions';
import { PostMenuActions } from '.';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

export default class PostCard extends Component {
  static propTypes = {
    handleClick: PropTypes.func,
    handleClickEdit: PropTypes.func,
    onDeletePost: PropTypes.func,
    onDownVote: PropTypes.func,
    onUpVote: PropTypes.func,
    post: PropTypes.object,
    postOwner: PropTypes.bool,
  };

  state = {
    openActions: false,
    menuElement: null,
    openDialog: false,
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
    const date = Moment(timestamp);
    const momentDate = Moment(date).fromNow();
    const { openDialog } = this.state;
    const { post, postOwner, handleClick, handleClickEdit } = this.props;
    const menuElements = [
      {
        onClick: () => handleClick(post),
        content: (
          <Fragment>
            <OpenInNewIcon aria-label="View Post" />
            View Post
          </Fragment>
        ),
      },
    ];

    if (postOwner) {
      menuElements.push({
        onClick: () => handleClickEdit(post),
        content: (
          <Fragment>
            <EditIcon aria-label="Edit" />
            Edit
          </Fragment>
        ),
      });
      menuElements.push({
        onClick: this.toggleDeleteDialog,
        content: (
          <Fragment>
            <DeleteIcon aria-label="Delete" />
            Delete
          </Fragment>
        ),
      });
    }

    return (
      <Card className="post-card" id={id}>
        <AlertDialog
          open={openDialog}
          cancelText="No! Go back!"
          confirmText="Delete it, I'm sure!"
          alertText="Are you sure that you want to remove this post? It probably cannot be undone!!"
          alertTitle="Woow! Delete??"
          handleConfirm={this.handleDelete}
          handleCancel={this.toggleDeleteDialog}
        />
        <CardHeader
          action={<PostMenuActions menuElements={menuElements} />}
          title={category.toUpperCase()}
          subheader={`${author} - ${momentDate}`}
          titleTypographyProps={{ variant: 'h6', color: 'secondary' }}
        />
        <CardActionArea
          onClick={() =>
            this.props.handleClick && this.props.handleClick(this.props.post)
          }
        >
          <CardContent>
            <Typography variant="h5" color="primary">
              {title}
            </Typography>
            <Typography paragraph className="post-card-text">
              {body.length > 50 ? `${body.substring(0, 50)}...` : body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className="post-card-actions" disableActionSpacing>
          <PostCardActions
            commentCount={commentCount}
            voteScore={voteScore}
            handleUpVote={this.handleUpVote}
            handleDownVote={this.handleDownVote}
          />
        </CardActions>
      </Card>
    );
  }
}
