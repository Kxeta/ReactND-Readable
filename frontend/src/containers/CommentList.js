import React, { Component } from 'react';
import Moment from 'moment';
import { Typography, Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CommentsActions from '../actions/comments';
import { CommentFormDialog } from '../components';

class CommentList extends Component {
  state = {
    openCommentForm: false,
    showLoader: true,
  };

  handleCancel = () => {
    this.setState({
      openCommentForm: false,
    });
  };
  handleOpenCommentForm = () => {
    this.setState({
      openCommentForm: true,
    });
  };

  handleConfirm = commentBody => {
    const { loggedUser, post, sendComment } = this.props;
    sendComment({
      body: commentBody,
      authorID: loggedUser,
      parentID: post.id,
    });
  };

  async componentDidMount() {
    const { id } = this.props.post;
    if (id) {
      await this.props.getAllCommentsByPost(id);
    }
    this.setState({
      showLoader: false,
    });
  }

  render() {
    const { comments } = this.props;
    const { openCommentForm } = this.state;
    return (
      <div className="comments">
        <Typography variant="h6">
          {comments && comments.length > 0 ? 'Comments:' : 'No comments yet...'}
        </Typography>
        {comments && comments.length > 0 ? (
          comments.map((comment, key) => {
            const date = Moment(comment.timestamp);
            const momentDate = Moment(date).fromNow();
            return (
              <div key={key}>
                <p>{`Date: ${date.format('MM/DD/YYYY')} (${momentDate})`}</p>
                <p>{`Author: ${comment.author}`}</p>
                <p>{`votes: ${comment.voteScore}`}</p>
                <p>{`Body: ${comment.body}`}</p>
              </div>
            );
          })
        ) : (
          <Button color="primary" onClick={this.handleOpenCommentForm}>
            Be the first to comment!
          </Button>
        )}
        <CommentFormDialog
          open={openCommentForm}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    comments: state.comments.comments,
    isLoading: state.comments.isLoading,
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllCommentsByPost: CommentsActions.getAllCommentsByPost,
      sendComment: CommentsActions.sendComment,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);
