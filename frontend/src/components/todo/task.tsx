import React, {useState} from "react";
import {makeStyles, ListItem, Checkbox, TextField } from "@material-ui/core";
import { useAppDispatch } from "../../app/hooks";
import { deleteTodo, updateTodo } from "./todoPageSlice";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles=makeStyles({
   cursor: {
      cursor: "pointer"
   }
})

export const Task=({taskValue, taskChecked, updateTask, taskDate, taskId}: {taskValue: string, taskChecked: boolean, taskDate: any, taskId?: string, updateTask?: (_task: any)=>void})=>{
   const dispatch = useAppDispatch()
   const classes=useStyles()
   const [checked, setChecked]=useState<boolean>(taskChecked)
   const [value, setValue]=useState(taskValue)

   const handleChecked=(e: any)=>{
      const isChecked = e.target.parentNode.parentNode.classList.contains('Mui-checked')
      const task: [string, {}] = [e.target.id, {checked: !isChecked}]
      console.log(task)
      updateTask ? updateTask({
         value: value,
         checked: !checked,
         date: taskDate
      }) : dispatch(updateTodo(task))

      setChecked(prev=>!prev)
   }

   const handleValue=(e: any)=>{
      const task: [string, {}] = [e.target.id, {value: e.target.value}]
      
      updateTask ? updateTask({
         value: e.target.value,
         checked: checked,
         date: taskDate
      }) : dispatch(updateTodo(task))

      setValue(e.target.value)
   }

   const handleDelete = async (e: any) => {
      const id = e.currentTarget.id
      await dispatch(deleteTodo(id))
      window.location.reload()
   }
   return (
      <ListItem>
         <Checkbox checked={checked} onClick={handleChecked} id={taskId} />
         <TextField 
            value={value}
            disabled={checked}
            onChange={handleValue}
            id={taskId}/>
         {!updateTask && <DeleteIcon className={classes.cursor} id={taskId} onClick={handleDelete}/>}
      </ListItem>
   );
}

export default Task;
