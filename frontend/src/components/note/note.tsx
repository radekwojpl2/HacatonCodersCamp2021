import React, {useState} from "react";
import {makeStyles, Dialog, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles({
   container: {
      margin: "10px",
   },
   btnContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      margin: "10px 0",
   },
   textField: {
      margin: "10px",
      minWidth: "280px",
   },
});

export const Note = () => {
   const classes = useStyles();
   const [title, setTitle] = useState("");
   const [text, setText] = useState("");

   const handleClose = () => {
      // close function from props to close Dialog
   };

   const handleTitle = (e: any) => {
      setTitle(e.target.value);
   };

   const handleText = (e: any) => {
      setText(e.target.value);
   };

   const handleSave = () => {
      //save to backend

      handleClose();
   };

   return (
      <div>
         <Dialog open={true} className={classes.container}>
            <TextField
               label="title"
               value={title}
               className={classes.textField}
               onChange={handleTitle}
            />

            <TextField
               multiline
               rows={2}
               rowsMax={10}
               value={text}
               className={classes.textField}
               onChange={handleText}
            />

            <div className={classes.btnContainer}>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleSave}>Save</Button>
            </div>
         </Dialog>
      </div>
   );
};
