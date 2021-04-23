import React, {useState} from "react";
import {makeStyles, ListItem, Checkbox, TextField} from "@material-ui/core";

const useStyles=makeStyles({
})

export const Task=({taskValue, taskChecked, updateTask, taskDate}: {taskValue: string, taskChecked: boolean, taskDate: any, updateTask: (_task: any)=>void})=>{
   const classes=useStyles()
   const [checked, setChecked]=useState<boolean>(taskChecked)
   const [value, setValue]=useState(taskValue)

   const handleChecked=()=>{
      updateTask({
         value: value,
         checked: !checked,
         date: taskDate
      })

      setChecked(prev=>!prev)
   }

   const handleValue=(e: any)=>{
      updateTask({
         value: e.target.value,
         checked: checked,
         date: taskDate
      })

      setValue(e.target.value)
   }

   return (
      <ListItem>
         <Checkbox checked={checked} onClick={handleChecked}/>

         <TextField 
            value={value}
            disabled={checked}
            onChange={handleValue}/>
      </ListItem>
   );
}

export default Task;
