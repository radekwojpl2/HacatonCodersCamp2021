import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Todo } from './todo'

const useStyles = makeStyles({
    container: {
        marginTop: "65px",
        padding: "10px",
    },
 });

const TodoPage = () => {
    const classes = useStyles();
    const [isAddingTodo, setIsAddingTodo] = useState(false)
    const [todos, setTodos] = useState([])

    return(
        <div className={classes.container}>
        <div>
            {todos.map}
        </div>
        <button onClick={() => setIsAddingTodo(true)}>+</button>
        {isAddingTodo && <Todo setIsAddingTodo={setIsAddingTodo}/>}
        </div>
    )
}

export default TodoPage