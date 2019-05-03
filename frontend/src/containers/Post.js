import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as PostsActions from '../actions/posts';
import * as CommentsActions from '../actions/comments';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import {
  Header,
  PostMenuActions,
  Loader,
  PostCardActions,
} from '../components';
import { Paper, Typography, Divider } from '@material-ui/core';

import { UPVOTE, DOWNVOTE } from '../constants/utils';
import CommentList from './CommentList';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../components/AlertDialog';
import './Post.css';

export class Post extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  state = {
    postID: null,
    showLoader: true,
    showCommentLoader: true,
    openDialog: false,
  };

  toggleDeleteDialog = evt => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
    });
  };

  handleDelete = evt => {
    const { postID } = this.props.match.params;
    this.toggleDeleteDialog();
    this.props.deletePostById(postID);
    this.handleBack();
  };

  async componentDidMount() {
    const { postID } = this.props.match.params;
    if (postID !== 'new') {
      await this.props.getPostById(postID);
      await this.props.getAllCommentsByPost(postID);
    }
    this.setState({
      postID: postID,
      showLoader: false,
      showCommentLoader: false,
    });
  }

  handleBack = () => {
    const { history } = this.props;
    const { category } = this.props.match.params;
    this.setState(
      {
        showLoader: true,
      },
      () => {
        history.push(`/${category ? category : ''}`);
      },
    );
  };

  render() {
    const {
      isLoading,
      post,
      votePostById,
      loggedUser,
      history,
      comments,
    } = this.props;
    const { showLoader, postID, openDialog, showCommentLoader } = this.state;
    let date = null;
    let momentDate = null;
    const menuElements = [];
    if (post) {
      date = Moment(post.timestamp);
      momentDate = Moment(date).fromNow();
      if (post.author === loggedUser && postID) {
        menuElements.push({
          onClick: () => history.push(`/${post.category}/post/${postID}/edit`),
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
    }

    return (
      <div className="post-container">
        {(isLoading || showLoader) && !post ? (
          <Loader />
        ) : (
          <MuiThemeProvider theme={theme}>
            <AlertDialog
              open={openDialog}
              cancelText="No! Go back!"
              confirmText="Delete it, I'm sure!"
              alertText="Are you sure that you want to remove this post? It probably cannot be undone!!"
              alertTitle="Woow! Delete??"
              handleConfirm={this.handleDelete}
              handleCancel={this.toggleDeleteDialog}
            />
            <Header
              title={postID ? post.title : 'New Post'}
              goBack
              handleGoBack={this.handleBack}
            />
            <main className="content">
              <Paper className="post-main-content" elevation={5}>
                <header className="content-header">
                  <div>
                    <Typography variant="h5" color="primary">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle2">{`${
                      post.author
                    } - ${momentDate} (${date.format(
                      'MM/DD/YYYY',
                    )})`}</Typography>
                  </div>
                  {menuElements.length > 0 && (
                    <div>
                      <PostMenuActions menuElements={menuElements} />
                    </div>
                  )}
                </header>
                <Divider />
                <div className="post-body">
                  <Typography>{post.body}</Typography>
                </div>
                <PostCardActions
                  commentCount={comments && comments.length}
                  voteScore={post.voteScore}
                  handleUpVote={() => votePostById(postID, UPVOTE)}
                  handleDownVote={() => votePostById(postID, DOWNVOTE)}
                />
              </Paper>
              {showCommentLoader ? <Loader /> : <CommentList post={post} />}
            </main>
          </MuiThemeProvider>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    comments: state.comments.comments,
    isLoading: state.posts.isLoading,
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPostById: PostsActions.getPostById,
      votePostById: PostsActions.votePostById,
      deletePostById: PostsActions.deletePostById,
      getAllCommentsByPost: CommentsActions.getAllCommentsByPost,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Post),
);
