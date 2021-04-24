import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useStyles from './useStyles'
import { Button, TextField } from '@material-ui/core'
import { IAction } from './supervisiorCard'
import EditRounded from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';




const AddActionForm = ({ saveAction, actionData, typee, userID }: { saveAction: Function, actionData?: IAction, typee?: string, userID?: string }) => {

  const [open, setOpen] = React.useState(false);

  const [form, setForm] = useState({
    id: actionData?.id || '',
    title: actionData?.title || '',
    desc: actionData?.desc || '',
    personeToNotify: actionData?.personToNotify || '',
    type: actionData?.type || '',
  })

  const classes = useStyles()

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setForm(prev => ({
        ...prev,
        [e.target.id]: e.target.value
    }))
    }   

  const submitValue = async (e: any) => {
    e.preventDefault();
    await saveAction(userID, form)

    handleClose()
  }

  let button = null;

  if (typee == "ADD") {
    button = <Button variant="contained" className={classes.addAnnouncementBtn} onClick={handleClickOpen}>
      + Add Action
     </Button>
  }
  else {
    button = <IconButton onClick={handleClickOpen}><EditRounded /></IconButton>
  }


  return (
    <div className={classes.announcementForm}>
      {button}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <div className={classes.formContainer}>
          <h2 id="simple-modal-title"> Add employee new action</h2>
          <form onSubmit={e => submitValue(e)} onChange={handleFormChange} className={"add-announcement-form"}  >
            <TextField
              id="title"
              label="Title"
              className={classes.formInput}
              variant="filled"
              defaultValue={actionData && actionData.title}
              required
              fullWidth />
            <TextField
              id="type"
              label="Type"
              className={classes.formInput}
              variant="filled"
              defaultValue={actionData && actionData.type}
              required
              fullWidth />
            <TextField
              id='desc'
              label="Description"
              className={classes.formInput}
              variant="filled"
              defaultValue={actionData && actionData.desc}
              required
              fullWidth />
            <TextField
              id="personeToNotify"
              label="Persone To Notify"
              className={classes.formInput}
              defaultValue={actionData && actionData.personToNotify}
              variant="filled"
              required
              fullWidth />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" >Submit</Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  )
}
export default AddActionForm






