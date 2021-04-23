import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { announcementInterface } from '../../interfaces/Annoucement'
import useStyles from './useStyles'
import { Button, TextField } from '@material-ui/core'



const AnnouncementForm = ({ saveAnnouncement}: {saveAnnouncement: Function}) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [type,setType] = useState("");
    
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitValue = async (e:any) => {
    e.preventDefault();
    const newAnnouncement:announcementInterface = {
      title: title,
      content: content,
      type: type
    }
    await saveAnnouncement(newAnnouncement)
    
    handleClose()
  }

    return (
      <div className={classes.announcementForm}>
        <Button variant="contained"  className={classes.addAnnouncementBtn}onClick={handleClickOpen}>
         + Add Announcement
        </Button>
                     
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"> 
          <div className = {classes.formContainer}>
            <h2 id="simple-modal-title"> Add new announcement</h2>
              <form onSubmit={e => submitValue(e)} className={"add-announcement-form"}>
                  <TextField 
                    label="Title" 
                    onChange={e => setTitle(e.target.value)}
                    className={classes.formInput} 
                    variant="filled" 
                    required 
                    fullWidth/>
                  <TextField 
                    onChange={e => setContent(e.target.value)}
                    className={classes.formInput} 
                    label="Description" 
                    variant="filled" 
                    required 
                    fullWidth
                    multiline={true}
                    rows={10}/>
                  <div>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup aria-label="type" name="type1" value={type} onChange={e => setType (e.target.value)}>
                          <FormControlLabel value="important" control={<Radio />} label="Important" />
                          <FormControlLabel value="exams" control={<Radio />} label="Exams" />
                          <FormControlLabel value="task" control={<Radio />} label="Task" />
                        </RadioGroup>
                    </FormControl>
                  </div>
                  <div style= {{display:"flex", justifyContent:"center"}}>
                    <Button type="submit" >Submit</Button>
                  </div>
              </form>
          </div>
        </Dialog>
      </div>
)
}
export default AnnouncementForm


  



