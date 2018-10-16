import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Add";
import fire from "./fire";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ReactDOM from "react-dom";
import Mess from "./alert";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      description: "",
      method: "",
      date: "",
      subject: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAdd = () => {
    var element = {
      title: this.state.title,
      description: this.state.description,
      method: this.state.method,
      date: this.state.date,
      subject: this.state.subject
    };
    var child = "test" + Math.floor(Math.random() * 1000000);
             var confirmation = false;
       var hey = document.createElement("div");
        hey.setAttribute("id", "message");
        document.getElementById("body").appendChild(hey);
  if (this.state.title == "" || this.state.description == "" || this.state.date == "" || this.state.subject == "") {
        confirmation = false;
        ReactDOM.render(<Mess  message="Complete the fields !" />, document.querySelector('#message'));
    } else {
        confirmation = true;
    }
    if (confirmation == true) {
    fire
      .database()
      .ref(this.props.database)
      .child(child)
      .set(element);
            this.setState({ open: false });
                  ReactDOM.render(<Mess  message="Item added !" />, document.querySelector('#message'));

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
        <IconButton onClick={this.handleClickOpen} color="inherit">
          <MailIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Compose new exCal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the fields to submit your wished exCal :
            </DialogContentText>
            <TextField
        fullWidth
              onChange={this.handleChange}
              name="title"
              id="outlined-name"
              label="Title"
              margin="normal"
              variant="outlined"
            />
            <br />
            <TextField
        fullWidth
              onChange={this.handleChange}
              name="description"
              multiline
              rowsMax="4"
              id="outlined-multiline-flexible"
              label="Description"
              margin="normal"
              variant="outlined"
            />{" "}
            <br />
            <TextField
        fullWidth
              onChange={this.handleChange}
              name="method"
              multiline
              rowsMax="4"
              id="outlined-multiline-flexible"
              label="Instructions"
              margin="normal"
              variant="outlined"
            />
            <br />
            <form noValidate>
              <TextField
                fullWidth
                id="date"
                onChange={this.handleChange}
                label="Due"
                type="date"
                name="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel
                ref={ref => {
                  this.labelRef = ReactDOM.findDOMNode(ref);
                }}
                htmlFor="outlined-age-simple"
              >
                Subject
              </InputLabel>
              <Select
                value={this.state.subject}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    name="subject"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value={1}>Maths</MenuItem>
                <MenuItem value={2}>Physics</MenuItem>
                <MenuItem value={3}>Chemistry</MenuItem>
                <MenuItem value={4}>Biology</MenuItem>
                <MenuItem value={5}>Language</MenuItem>
                <MenuItem value={6}>History</MenuItem>
                <MenuItem value={7}>Geology</MenuItem>
                <MenuItem value={8}>Other</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
