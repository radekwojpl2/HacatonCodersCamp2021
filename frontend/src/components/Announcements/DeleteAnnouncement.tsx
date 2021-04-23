import axios from '../../config/axios'
import { useAppDispatch } from '../../app/hooks'
import { fetchAnnouncements } from './AnnouncementsSlice'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './useStyles'
import IconButton from '@material-ui/core/IconButton';

const DeleteAnnouncement = ({ id } : { id?: string }) => {
    const announcementId = id;
    const dispatch = useAppDispatch()


const deleteAnnouncement =  () => {
  
        axios
            .delete('/announcements/'+ announcementId)
            .then(res => {
                dispatch(fetchAnnouncements())
            })
            .catch(err => console.log(err))
    }
    const classes = useStyles()

    return (
        <IconButton className={classes.removeBtn} onClick={deleteAnnouncement}>
       <DeleteIcon />
      </IconButton>)
    }
export default DeleteAnnouncement