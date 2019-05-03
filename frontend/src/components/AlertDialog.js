import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PropTypes } from 'prop-types';

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  static propTypes = {
    alertText: PropTypes.string,
    alertTitle: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    handleCancel: PropTypes.func,
    handleConfirm: PropTypes.func,
    open: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return {
        open: nextProps.open,
      };
    }
    return false;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { handleCancel } = this.props;
    this.setState({ open: false });
    handleCancel && handleCancel();
  };

  handleConfirm = () => {
    const { handleConfirm } = this.props;
    handleConfirm && handleConfirm();
  };

  render() {
    const { cancelText, confirmText, alertText, alertTitle } = this.props;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            {cancelText}
          </Button>
          <Button
            variant="contained"
            onClick={this.handleConfirm}
            className="error-button-contained"
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
