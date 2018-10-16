import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import fire from "./fire";
import Log from "./login";
import ReactDOM from "react-dom";
import Mess from "./alert";

/* fire.auth().signOut()
  .catch(function (err) {
    console.log(err);
  }); */
/*  
 fire.auth().createUserWithEmailAndPassword("adambouuudi@app.com", "123456").then(function (user) {
   user.updateProfile({displayName: "Jane Q. User"});
}).catch(function (error) {
  console.log(error);
}); */

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: "",
      username: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
      
      var ID = Math.random().toString(36).substr(2, 2).toUpperCase() + '-' + Math.random().toString(36).substr(2, 9);
      var nameuser = this.state.username;
      var confirmation = false;
       var hey = document.createElement("div");
        hey.setAttribute("id", "message");
        document.getElementById("body").appendChild(hey);
    if (this.state.password != this.state.confirm) {
        confirmation = false;
        ReactDOM.render(<Mess  message="Unmatching password !" />, document.querySelector('#message'));
    } else if (this.state.email == "" || this.state.password == "" || this.state.confirm == "" || this.state.username == "") {
        confirmation = false;
        ReactDOM.render(<Mess  message="Missing fields !" />, document.querySelector('#message'));
    } else {
        confirmation = true;
    }
    if (confirmation == true) {
        fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password).then(
          function(user) {
             fire.database().ref(fire.auth().currentUser.uid).set({
                  username: nameuser,
                  database: ID
              });
        })
        .catch(function(error) {
          // Handle Errors here.
          ReactDOM.render(<Mess  message={error.message} id="message" /> , document.querySelector('#message'));
          // ...
        });
    }  
    
  };
  handleClicked = () => {
    ReactDOM.render(<Log />, document.querySelector("#auth"));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="text">Username</InputLabel>
                <Input
                  onChange={this.handleChange}
                  id="text"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  onChange={this.handleChange}
                  id="email"
                  name="email"
                 autoComplete="email"
                  
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm</InputLabel>
                <Input
                  onChange={this.handleChange}
                  name="confirm"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                onClick={this.handleClick}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Button
                onClick={this.handleClicked}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
