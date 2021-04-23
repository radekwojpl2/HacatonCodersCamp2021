import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Groups} from '../../types/groups';
import { User } from '../../types/user';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import axios from '../../config/axios';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      width: '100vw',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateRows: 'repeat(1,2fr)',
      placeItems: 'center',
      gridRowGap: '50px'
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    button: {
      margin: theme.spacing(1),
    },
    item: {
      padding: '0.75em',
      backgroundColor: 'rgb(230,230,230)'
    }
  }),
);

export const GroupDisplay = ( props: {groups : Groups, users: User[]}) => {
  const classes = useStyles();
  const groups = props.groups;
  const users = props.users;

  const mapIdToName = () => {
    for(let i = 0; i < groups.numberOfGroups; i++) {
      users.forEach(user => {
        for(let j = 0; j < groups.result[i].members.length; j++) {
          if (groups.result[i].members[j]._id === user._id) {
            groups.result[i].members[j]._id = user.firstName + ' ' + user.lastName;
          }
        }
      })
    }
  }

  useEffect(() => {
    mapIdToName();
  }, [])

  mapIdToName();

  const deleteMember = (e: React.MouseEvent<{value: unknown}>) => {
    let id;
    console.log(e.currentTarget.value)
    let name = (e.currentTarget.value as string).split(/[ ,]+/);
    let group = name[2]
    users.forEach(user => {
      if (user.firstName === name[0] && name[1] === user.lastName) {
        id = user._id;
      }
    })
    axios.put(`/group/deleteMember/${group}`,  {_id: id}).then(() => window.location.reload());
  }

  return (
    <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className={classes.title}>
            Your groups
          </Typography>
          <div className={classes.demo}>
          <List >
              {groups ? groups.result.map(group => (
                  <ListItem key={group._id}>
                    <ListItemText>
                    <Paper className={classes.item} variant="outlined">
                      <Typography variant="h6">
                      {group.groupName}

                      </Typography>
                      </Paper>

                      <br></br>
                      <Typography variant="h6">
                      Members:
                      </Typography>
                      <List>
                        {group.members ? group.members.length === 0 ?
                        <p>This group has no members</p> : group.members.map(user => (
                          <ListItem key={user._id}>
                            <ListItemText>
                                {
                                  user._id
                                }
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    value={[user._id, group._id]}
                                    onClick={e => deleteMember(e)}
                                  >
                                    Delete
                                  </Button>
                            </ListItemText>
                          </ListItem>

                      )) : "loading"}
                    </List>
                  </ListItemText>
                </ListItem>
              )) : "loading"}
            </List>
          </div>
        </Grid>
    </div>
  );
}