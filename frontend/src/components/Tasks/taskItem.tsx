import RemoveTask from './removeTask';
import UserIcon from './userIcon';
import {Card, CardContent, CardActions, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {TaskPropsInterface} from '../../interfaces/tasks';
import useStyles from './useStyles';


const TaskItem = ({name, deadline, user, id}: TaskPropsInterface) => {
    const classes = useStyles();
    return (
        <Card id={id} className= {classes.tasksBox__subcard}>
            <Grid container justify="space-between" alignItems="stretch">
                <CardContent>
                    <Typography variant="h5" className={classes.tasksBox__subtitle}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.tasksBox__date}>
                        Deadline: {new Date(deadline).toLocaleDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <UserIcon userName={user} taskId={id}/>
                    <RemoveTask id={id}/>
                </CardActions>
            </Grid>
        </Card>
    )
};

export default TaskItem