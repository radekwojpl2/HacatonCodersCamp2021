import React, {useState} from "react";
import {makeStyles, Dialog, ListItem, TextField, IconButton, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Task from "./task";

const useStyles = makeStyles({
   container: {
      padding: "10px",
   },
   input: {
      width: "auto",
   },
   btnContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      margin: "10px 0",
   },
   newTaskContainer: {
      marginLeft: "30px",
      width: "auto",
   },
});

export const Todo = ({ setIsAddingTodo }: {setIsAddingTodo: Function}) => {
   const classes = useStyles();
   const [tasks, setTasks] = useState<any>([]);
   const [taskText, setTaskText] = useState("");

   const handleKeyDown = (event: any) => {
      if (event.key === "Enter") handleAddTask();
   };

   const handleAddTask = () => {
      let date = new Date();

      setTasks((prev: any) => [
         ...prev,
         {
            date: date,
            checked: false,
            value: taskText,
         },
      ]);

      setTaskText("");
   };

   const handleClose = () => {
      setIsAddingTodo(false)
      // close function from props to close Dialog
   };

   const handleSave = () => {
      // save to backend //heroku
      console.log(tasks);

      handleClose();
   };

   const updateTask = (_task: any) => {
      const newTasks = tasks.map((task: any) => {
         if (task.date === _task.date) return _task;

         return task;
      });

      setTasks(newTasks);
   };

   return (
      <div>
         <Dialog open={true} className={classes.container}>
            {tasks.map((task: any, i: number) => {
               if (task.checked === false) {
                  return (
                     <Task
                        key={i}
                        taskDate={task.date}
                        updateTask={updateTask}
                        taskValue={task.value}
                        taskChecked={task.checked}
                     />
                  );
               }
            })}

            {tasks.map((task: any, i: number) => {
               if (task.checked === true) {
                  return (
                     <Task
                        key={i}
                        taskDate={task.date}
                        updateTask={updateTask}
                        taskValue={task.value}
                        taskChecked={task.checked}
                     />
                  );
               }
            })}

            <ListItem onKeyDown={handleKeyDown} className={classes.newTaskContainer}>
               <TextField
                  value={taskText}
                  className={classes.input}
                  onChange={e => setTaskText(e.target.value)}
               />

               <IconButton onClick={handleAddTask}>
                  <AddIcon />
               </IconButton>
            </ListItem>

            <div className={classes.btnContainer}>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleSave}>Save</Button>
            </div>
         </Dialog>
      </div>
   );
};
