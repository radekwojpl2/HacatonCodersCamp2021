
import { announcementInterface } from '../../interfaces/Annoucement';
import DeleteAnnouncement from './DeleteAnnouncement'
import useStyles from './useStyles'
import { Card } from '@material-ui/core'


  
const SingleAnnouncement: React.FC<{ announcement: announcementInterface }> = ({ announcement }) => {
    const classes = useStyles()
    return (
         <Card  className={classes.announcementCard}>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <p>{announcement.type}</p>
            <DeleteAnnouncement id={announcement._id}/>
        </Card>)
}

export default SingleAnnouncement