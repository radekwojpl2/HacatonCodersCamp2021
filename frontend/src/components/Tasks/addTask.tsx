import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { AddTaskInterface} from '../../interfaces/tasks';
import { addTaskToProject } from '../../app/tasksReducer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './useStyles';

const AddTask = ({users, project}:AddTaskInterface) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false);
    const [task, setTask] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const changeVisibilty = () => {
        setOpen(!open)
        if(!open === true && inputRef.current !== null) {
            inputRef.current.focus()
        }
    }

    const closeAddTask = () => {
        changeVisibilty();
        setTask('');
        setDate('');
        setUser('')
    }

    const changeValue = (event: React.FormEvent, id:string) => {
        const target = event.target as HTMLTextAreaElement;
        const value= target.value;
        
        if (id === 'name') {
            setTask(value)
        } else if (id === 'deadline') {
            setDate(value)
        } 
        else {
            setUser(value)
        }
    }

    const addTask = () => {
        const data = {
            projectId: project,
            userId: user,
            name: task,
            description: 'nothing to add',
            deadline: new Date(date).getTime()
        };

        dispatch(addTaskToProject(data));
        closeAddTask()
    };

    return (
        <React.Fragment>
            <Button variant="contained"  onClick={changeVisibilty} className={classes.tasksBox__addBtn}>
                Add task
            </Button>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Task"
                        value={task}
                        fullWidth
                        onChange={(e) => changeValue(e, 'name')}
                        ref = {inputRef}
                        variant="filled"  
                    />
                    <TextField
                        id="deadline"
                        label="Deadline"
                        type="date"
                        value={date}
                        onChange={(e) => changeValue(e, 'deadline')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled" 
                    />
                    <TextField
                        margin="dense"
                        id="user"
                        label="User"
                        select
                        fullWidth
                        onChange={(e) => changeValue(e, 'user')}
                        value={user}
                        variant="filled"
                    >
                        {Object.keys(users).map( (user)  => {
                            return <MenuItem key={user} value={user}>
                                {`${users[user].firstName} ${users[user].lastName} (${users[user].role})`}
                            </MenuItem>
                        })}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={closeAddTask}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={addTask} disabled={ task.length >= 5  && date ? false : true}>
                        Add task
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
};

export default AddTask