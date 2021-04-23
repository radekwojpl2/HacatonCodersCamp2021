import React from 'react';
import {TasksInterface, Tasks} from '../../interfaces/tasks';
import TaskItem from './taskItem';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

const TaskList = ({tasks}:TasksInterface) => {
    const classes= useStyles();

    const projectTasks =  ( tasks:Tasks) => {
        return Object.keys(tasks).map( task => {
            return <TaskItem  key={task} 
                id={task}
                name={tasks[task].name} 
                deadline={tasks[task].deadline}
                user={tasks[task].user !== null ? 
                        `${tasks[task].user!.name}` 
                        : null}
                 />
        })
    }

    return (
        <React.Fragment>
            <Typography variant="h4" align='center' className={classes.tasksBox__title}>
                All tasks for this project
            </Typography>
            { projectTasks(tasks)}
        </React.Fragment>
    )
};

export default TaskList