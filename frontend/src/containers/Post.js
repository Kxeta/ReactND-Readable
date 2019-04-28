import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as PostsActions from '../actions/posts';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import {
  Header,
  PostMenuActions,
  Loader,
  PostCardActions,
} from '../components';
import { Paper, Typography, Divider } from '@material-ui/core';

import { upVote, downVote } from '../constants/utils';
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
    }
    this.setState({
      postID: postID,
      showLoader: false,
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
    const { isLoading, post, votePostById, loggedUser, history } = this.props;
    const { showLoader, postID, openDialog } = this.state;
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
              <Paper className="post-main-content">
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
                  commentCount={post.commentCount}
                  voteScore={post.voteScore}
                  handleUpVote={() => votePostById(postID, upVote)}
                  handleDownVote={() => votePostById(postID, downVote)}
                />
              </Paper>
              <CommentList />
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
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Post),
);
