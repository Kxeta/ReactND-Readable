import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: false,
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
    const { cancelText, confirmText, alertText } = this.props;
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
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
