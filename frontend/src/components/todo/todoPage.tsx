import React, { useEffect, useState } from 'react'
import {makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Task from './task'
import { Todo } from './todo'
import { getAllTodos } from './todoPageSlice';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "65px",
        padding: "10px",
        "& h2": {
            testAlign: "right"
        }
    },
    todos: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        "& li": {
            width: "auto",
        }
    },
 });

const TodoPage = () => {
    const dispatch = useAppDispatch()
    const classes = useStyles();
    const [isAddingTodo, setIsAddingTodo] = useState(false)
    const todos = useAppSelector(state => state.todo.todos)

    useEffect(() => {
        dispatch(getAllTodos())
    }, [dispatch])

    return(
        <div className={classes.container}>
            <h2>To do List</h2>
            <IconButton onClick={() => setIsAddingTodo(true)}>
                  <AddIcon />
            </IconButton>
            <div className={classes.todos}>
                {todos.map(task => <Task taskValue={task.value} taskChecked={task.checked} taskDate={task.date} taskId={task.id} key={task.id}/>)}
            </div>
            
            {isAddingTodo && <Todo setIsAddingTodo={setIsAddingTodo}/>}
        </div>
    )
}

export default TodoPage