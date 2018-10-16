import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import fire from "./fire";
import ReactDOM from "react-dom";
import Mess from "./alert";



const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class CardView extends React.Component {
  state = { expanded: false,
      links: ["","https://cdn.dribbble.com/users/488314/screenshots/3317015/drib.png","https://cdn.dribbble.com/users/146798/screenshots/2484828/react_illo_800x600.png","https://cdn.dribbble.com/users/146798/screenshots/4140115/chemistry-flask-animation.gif","https://cdn.dribbble.com/users/335953/screenshots/3967736/dna.jpg","https://cdn.dribbble.com/users/59947/screenshots/4470587/muti-1.jpg","https://cdn.dribbble.com/users/63407/screenshots/3659995/dribbble_prison_cellular.png","https://cdn.dribbble.com/users/1543246/screenshots/4308259/3_drib.jpg","https://cdn.dribbble.com/users/1363206/screenshots/5366713/rubix_dribbble-01_4x.jpg"] };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleRemove = () => {
    {
      var e = this.props.id;
      fire
        .database()
        .ref(this.props.database +"/"+ e)
        .remove();
               var hey = document.createElement("div");
        hey.setAttribute("id", "message");
        document.getElementById("body").appendChild(hey);
              ReactDOM.render(<Mess  message="Item deleted !" />, document.querySelector('#message'));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.title}
          subheader={"Due: "+ this.props.date}
        />
        <CardMedia
          className={classes.media}
          image={this.state.links[this.props.subject]}
        />
        <CardContent>
          <Typography component="p">{this.props.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="h6">
              Instructions:
            </Typography>
            <Typography paragraph>{this.props.method}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardView);
