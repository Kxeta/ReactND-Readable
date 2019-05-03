import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './CommentFormDialog.css';
import { PropTypes } from 'prop-types';

class CommentFormDialog extends React.Component {
  state = {
    open: false,
    comment: {},
    commentBody: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      if (
        JSON.stringify(nextProps.comment) !== JSON.stringify(prevState.comment)
      ) {
        return {
          open: nextProps.open,
          comment: nextProps.comment,
          commentBody: nextProps.comment.body,
        };
      }
      return {
        open: nextProps.open,
      };
    }
    if (
      JSON.stringify(nextProps.comment) !== JSON.stringify(prevState.comment)
    ) {
      return {
        comment: nextProps.comment,
        commentBody: nextProps.comment.body,
      };
    }
    return false;
  }

  Transition = props => {
    return <Slide direction="up" {...props} />;
  };

  handleClose = () => {
    const { handleCancel } = this.props;
    this.setState({ open: false });
    handleCancel && handleCancel();
  };

  handleConfirm = () => {
    const { handleConfirm } = this.props;
    const { comment, commentBody } = this.state;
    handleConfirm &&
      handleConfirm(
        comment && comment.id ? { ...comment, body: commentBody } : commentBody,
        comment && comment.id,
      );
    this.handleClose();
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { dialogTitle } = this.props;
    const { commentBody } = this.state;
    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={this.Transition}
      >
        <AppBar>
          <Toolbar className="comment-form-toolbar">
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {dialogTitle}
            </Typography>
            <Button color="inherit" onClick={this.handleConfirm}>
              Send it!
            </Button>
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleConfirm} className="comment-form">
          <TextField
            id="commentBody"
            name="commentBody"
            label="Comment"
            InputLabelProps={{ shrink: commentBody ? true : false }}
            value={commentBody}
            onChange={this.handleInputChange}
            fullWidth
            multiline
            required
            rows="4"
          />
        </form>
      </Dialog>
    );
  }
}

CommentFormDialog.propTypes = {
  dialogTitle: PropTypes.string,
  handleCancel: PropTypes.func,
  handleConfirm: PropTypes.func,
};

export default CommentFormDialog;
