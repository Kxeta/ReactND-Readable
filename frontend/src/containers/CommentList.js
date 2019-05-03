import React, { Component, Fragment } from 'react';
import { Typography, Button, Paper, Fab } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CommentsActions from '../actions/comments';
import { CommentFormDialog } from '../components';
import AddIcon from '@material-ui/icons/AddComment';

import './CommentList.css';
import Comment from './Comment';
import { PropTypes } from 'prop-types';

class CommentList extends Component {
  state = {
    openCommentForm: false,
    openEditCommentForm: {},
  };

  handleCancel = () => {
    this.setState({
      openCommentForm: false,
      openEditCommentForm: {},
    });
  };
  handleToggleCommentForm = comment => {
    if (comment) {
      this.setState({
        openCommentForm: !this.state.openCommentForm,
        openEditCommentForm: comment,
      });
    } else {
      this.setState({
        openCommentForm: !this.state.openCommentForm,
      });
    }
  };

  handleConfirm = (comment, isEditing) => {
    const { loggedUser, post, sendComment, editCommentById } = this.props;
    if (isEditing) {
      editCommentById({
        commentID: comment.id,
        commentBody: comment.body,
      });
    } else {
      sendComment({
        body: comment,
        author: loggedUser,
        parentId: post.id,
      });
    }
  };
  render() {
    const { comments } = this.props;
    const { openCommentForm, openEditCommentForm } = this.state;
    return (
      <Paper className="comments" elevation={1}>
        <Fab
          color="secondary"
          aria-label="Add Comment"
          className="add-button"
          onClick={this.handleToggleCommentForm}
        >
          <AddIcon />
        </Fab>
        <Typography variant="h6" color="secondary">
          {comments && comments.length > 0 ? 'Comments:' : 'No comments yet...'}
        </Typography>
        {comments && comments.length > 0 ? (
          <Fragment>
            {comments.map((comment, key) => (
              <Comment
                comment={comment}
                key={key}
                handleToggleForm={this.handleToggleCommentForm}
              />
            ))}
          </Fragment>
        ) : (
          <Button color="primary" onClick={this.handleToggleCommentForm}>
            Be the first to comment!
          </Button>
        )}
        <CommentFormDialog
          open={openCommentForm}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
          comment={
            openEditCommentForm && openEditCommentForm.id
              ? openEditCommentForm
              : ''
          }
        />
      </Paper>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  editCommentById: PropTypes.func,
  loggedUser: PropTypes.string,
  post: PropTypes.object,
  sendComment: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    comments: state.comments.comments,
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendComment: CommentsActions.sendComment,
      editCommentById: CommentsActions.editCommentById,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);
