import Fab from '@material-ui/core/Fab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useDispatch } from 'react-redux';
import {removeTaskFromProject} from '../../app/tasksReducer';
import {TaskDeleteInterface} from '../../interfaces/tasks';

const RemoveTask = ({id}:TaskDeleteInterface) => {

    const dispatch = useDispatch();

    const removeTask = (id:string) => {
        dispatch(removeTaskFromProject(id))
    }

    return (
        <Fab color="primary" aria-label="add" size="small" onClick={() => removeTask(id)}>
            <DeleteOutlineIcon/>
        </Fab>
    )
}

export default RemoveTask