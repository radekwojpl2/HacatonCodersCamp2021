import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from '../../config/axios';
import { GroupDisplay } from './groupDisplay';
import { Groups } from '../../types/groups';
import useGetData from '../../hooks/useGetData';
import { User } from '../../types/user';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
      width: '100vw',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateRows: 'repeat(1,2fr)',
      placeItems: 'center',
      gridRowGap: '50px'
      },
  item: {
    backgroundColor: "rgb(230, 230, 230)",
    padding: '20px'
  }
    });

const filterGroups = (groups: Groups, mentorId: string): Groups => {
  const filteredGroups = groups.result.filter(group => group.mentor === mentorId);
  return { numberOfGroups: filteredGroups.length, result: filteredGroups};
}


export const GroupCreate = (props: { groups: Groups, mentors: User[], users: User[] }) => {
  const classes = useStyles({});
  const groups = props.groups;
  const mentors = props.mentors;
  const users = useGetData<User[] | null>('authorization');
  const [userId, setUserId] = useState<string | null>();
  const [groupName, setGroupName] = useState('');
  const [mentorGroups, setMentorGroups] = useState<Groups| null>();
  const [mentorGroupId, setMentorGroupId] = useState<string | null>();
  const [mentor, setMentor] = useState<string | null>();
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const [groupDelete, setGroupDelete] = useState<string>('');
  
  const changeGroupName = (e: React.FormEvent) => {
    const value = (e.target as HTMLTextAreaElement).value; 
    setGroupName(value)
  }

  const changeMentor = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMentor(event.target.value as string);
    const newGroups = filterGroups(groups, event.target.value as string);
    setMentorGroups(newGroups);
  };
  
  const createGroup = () => {
    if (mentorGroups && mentorGroups.numberOfGroups > 1) {
      setErrorText("The mentor can only have two groups!")
      setOpen(true);
    } else if(!mentor || !groupName){
      setErrorText("Fill all of the inputs please")
      setOpen(true);
    } else {
    axios.post('/group/createGroup', {mentor: mentor, groupName: groupName}).then(() => window.location.reload())
    }
  }

  const changeMentorGroupId = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMentorGroupId(event.target.value as string);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const changeUserId = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserId(event.target.value as string);
  }

  const addUserToGroup = () => {
    axios.put(`/group/addMember/${mentorGroupId}`, {_id: userId})
     .then(() => window.location.reload())
     .catch((err)=> {
       if(!mentorGroupId) setErrorText("Please select a group!")
       else if(!userId)setErrorText("Please select a user!")
       else setErrorText("User is already in the group!") 
       setOpen(true)
      })
  }

  const changeGroupDelete = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroupDelete(event.target.value as string);
  }
  
  const deleteGroup = () => {
    axios.delete(`/group/deleteGroup/${groupDelete}`)
    .then(() => window.location.reload())
    .catch(()=> {
      setErrorText("Please select a group!")
      setOpen(true)
    })
  }


  return (
    <div className={classes.root}>
        <Paper className={classes.item} variant="outlined" >
            <Typography>
              {mentor? `You are currently logged as ${mentor}`: "loading"}
            </Typography>
        </Paper>
        <Paper className={classes.item} variant="outlined" >
            <Typography variant="h4">
              Create a group
            </Typography>
        </Paper>
          <InputLabel id="demo-simple-select-label">Choose mentor</InputLabel>
          {mentors ?   <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mentor}
            onChange={changeMentor}
            required
          >
            {mentors ? mentors.map(user => (
              <MenuItem key={user._id} value={user._id}>{user.firstName + ' ' + user.lastName}</MenuItem>
            )): "loading2"}
            </Select> : "loading"}
          
        <TextField 
          id="standard-basic"
          label="Name of the group" 
          onChange={e=>changeGroupName(e)}
          required
        />
        <Button 
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={createGroup}
        >
          Create
        </Button>
        <Paper className={classes.item} variant="outlined" >
        <Typography variant="h4">
          Add user to your group
        </Typography>
        </Paper>
        <InputLabel id="demo-simple-select-label">Select a group</InputLabel>
          {mentorGroups ?   <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mentorGroupId}
            onChange={changeMentorGroupId}
            required
          >
            {mentorGroups ? mentorGroups.result.map(group => (
              <MenuItem key={group._id} value={group._id}>{group.groupName}</MenuItem>
            )): "loading2"}
            </Select> : "loading"}
      
        <InputLabel id="demo-simple-select-label">Choose user</InputLabel>
          {users ?   <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userId}
            onChange={changeUserId}
            required
          >
            {users ? users.map(user => (
              <MenuItem key={user._id} value={user._id}>{user.firstName + ' ' + user.lastName}</MenuItem>
            )): "loading2"}
            </Select> : "loading"}
            <Button 
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={addUserToGroup}
        >
          Add a user to the group
        </Button>
        <Paper className={classes.item} variant="outlined" >
        <Typography variant="h4">
          Delete a group
        </Typography>
        </Paper>
        <InputLabel id="demo-simple-select-label">Select a group</InputLabel>
          {mentorGroups ?   <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mentorGroupId}
            onChange={changeGroupDelete}
            required
          >
            {mentorGroups ? mentorGroups.result.map(group => (
              <MenuItem key={group._id} value={group._id}>{group.groupName}</MenuItem>
            )): "loading2"}
            </Select> : "loading"}
            <Button 
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={deleteGroup}
        >
          Delete a group
        </Button>

        {mentorGroups && users ? 
         <Paper className={classes.item} variant="outlined" >
          <GroupDisplay groups={mentorGroups} users={users} /></Paper>
          : "loading"
        } 
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {errorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    
  );
}