import React, { Component } from "react";
import PropTypes from 'prop-types'
import { list } from "./api-user";
import { Paper } from "material-ui";
import { Typography } from "material-ui";
import { ListItemAvatar } from "material-ui";
import {ListItem,  ListItemText, Avatar} from "material-ui";
import { ListItemSecondaryAction } from "material-ui";
import { IconButton } from "material-ui";
import {withStyles} from 'material-ui/styles'
import {List} from 'material-ui'
import {Link} from 'react-router-dom'
import {Person, ArrowForward} from  "material-ui-icons"

const styles = theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle
    }
  })

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else
                this.setState({ users: data })
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    All Users
            </Typography>
                <List dense>
                    {this.state.users.map(function (item, i) {
                        return <Link to={"/users/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })}
                </List>
            </Paper>
        )
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
  }

export default withStyles(styles)(Users)