import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as CommentsActions from '../actions/comments';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import { PostMenuActions, PostCardActions } from '../components';
import { Paper, Typography, Divider } from '@material-ui/core';

import { UPVOTE, DOWNVOTE } from '../constants/utils';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from '../components/AlertDialog';
// import './Comment.css';

export class Post extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  state = {
    openDialog: false,
  };

  toggleDeleteDialog = evt => {
    const { openDialog } = this.state;
    this.setState({
      openDialog: !openDialog,
    });
  };

  handleDelete = evt => {
    const { id } = this.props.comment;
    this.toggleDeleteDialog();
    this.props.deleteCommentById(id);
  };

  componentDidMount() {}

  render() {
    const { comment, voteCommentById, loggedUser } = this.props;
    const { openDialog } = this.state;
    let date = null;
    let momentDate = null;
    const menuElements = [];
    if (comment) {
      date = Moment(comment.timestamp);
      momentDate = Moment(date).fromNow();
      if (comment.author === loggedUser) {
        menuElements.push({
          onClick: () => this.props.handleToggleForm(comment),
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
      <div className="comment-container">
        <MuiThemeProvider theme={theme}>
          <AlertDialog
            open={openDialog}
            cancelText="No! Go back!"
            confirmText="Delete it, I'm sure!"
            alertText="Are you sure that you want to remove this comment? It probably cannot be undone!!"
            alertTitle="Woow! Delete??"
            handleConfirm={this.handleDelete}
            handleCancel={this.toggleDeleteDialog}
          />
          <main className="content">
            <Paper className="comment-main-content" elevation={0}>
              <header className="content-header">
                <div>
                  <Typography variant="subtitle2">{`${
                    comment.author
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
                <Typography>{comment.body}</Typography>
              </div>
              <PostCardActions
                hideComments={true}
                voteScore={comment.voteScore}
                handleUpVote={() => voteCommentById(comment.id, UPVOTE)}
                handleDownVote={() => voteCommentById(comment.id, DOWNVOTE)}
              />
            </Paper>
          </main>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      voteCommentById: CommentsActions.voteCommentById,
      deleteCommentById: CommentsActions.deleteCommentById,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Post),
);
