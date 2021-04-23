import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tasksBox: {
        margin: '2rem auto',
        width: '100% '
    },
    tasksBox__container: {
        width: '90%',
        minWidth: '90%',
        padding: '0'
    },
    tasksBox__addBtn: {
        margin: '0 auto'
    },
    tasksBox__card: {
        height: '100%'
    },
    tasksBox__subcard: {
        backgroundColor: 'rgba(209, 201, 201, 0.212)',
        margin: '0.5rem auto'
    },
    tasksBox__subtitle: {
        fontSize: '1.5rem',
        margin: '0.5rem 0',
        fontWeight: 'bold'
    },
    tasksBox__title: {
        fontSize: '1.5rem',
        margin: '1rem 0',
        fontWeight: 'bold'
    },
    tasksBox__date: {
        fontSize: '1rem',
        margin: '0.5rem 0'
    }

})

export default useStyles