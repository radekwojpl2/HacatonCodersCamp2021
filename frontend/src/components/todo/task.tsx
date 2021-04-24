import React, {useState} from "react";
import {makeStyles, ListItem, Checkbox, TextField} from "@material-ui/core";
import { useAppDispatch } from "../../app/hooks";
import { updateTodo } from "./todoPageSlice";

const useStyles=makeStyles({
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
      
      updateTask && updateTask({
         value: e.target.value,
         checked: checked,
         date: taskDate
      })

      setValue(e.target.value)
   }

   const handleSubmit = (e: any) => {
      if (e.key === "Enter") {
         const task: [string, {}] = [e.target.id, {value: e.target.value}]
         dispatch(updateTodo(task)).then(() => window.location.reload())
      } 
   }

   return (
      <ListItem>
         <Checkbox checked={checked} onClick={handleChecked} id={taskId} />
         <TextField 
            value={value}
            disabled={checked}
            onChange={handleValue}
            onKeyDown={handleSubmit}
            id={taskId}/>
      </ListItem>
   );
}

export default Task;
