import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {fetchTasksByProject, fetchUsers} from '../../app/tasksReducer';
import {ParamTypes} from '../../interfaces/tasks';
import TaskList from './taskList';
import AddTask from './addTask';
import TasksStatus from './taskStatus';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useParams } from 'react-router';
import useStyles from './useStyles';

const Tasks = () => {
  const classes = useStyles();
  const loading = useSelector((state:RootState) => state.tasks.loading)
  const tasks = useSelector( (state:RootState) => state.tasks.tasks);
  const users = useSelector( (state:RootState) => state.tasks.users)
  const dispatch = useDispatch();
  const {projectId} = useParams<ParamTypes>()

  useEffect( () => {
      dispatch(fetchTasksByProject(projectId));
      dispatch(fetchUsers())
  }, [projectId, dispatch]);

  return (
    <React.Fragment>
        <Container className={classes.tasksBox__container}>
          {loading ? <LinearProgress/> :
          (<React.Fragment>
            <TasksStatus tasks={tasks}/>
          <Card className={classes.tasksBox}>
            <CardContent>
              <TaskList tasks={tasks}/>
            </CardContent>
            <CardActions>
              <AddTask project={projectId} users={users}/>
            </CardActions>
          </Card>
          </React.Fragment>)}
        </Container>
    </React.Fragment>
  );
}

export default Tasks