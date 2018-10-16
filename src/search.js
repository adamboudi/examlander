import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {update} from "./index"

export default class FormDialog extends React.Component {
  state = {
    open: true,
    message: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
              document.getElementById("search").remove();

  };
  handleAdd = () => {
      if (this.state.message!=""){
          document.getElementById("search").remove();
          update(this.state.message);
            this.setState({ open: false });
      }

  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Exam Land</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To view your exams, please enter your Exam Land Id. <br />
              Are you an <a href="http://examonaut.herokuapp.com"> examonaut </a> ?
            </DialogContentText>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              id="name"
              label="Exam Land ID"
              name="message"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Enter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}