import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
   
    addAnnouncementBtn: {
        display: "block",
        margin: "0 0 0 auto"
    },
    removeBtn: {
        position: "absolute",
        top: "52.5%",
        right: 0,
        margin: "0 2.5%",
    },
    announcementForm: {
        padding: '10px',
        backgroundColor: 'white',
        "& h2": {
            textAlign: "center"
        },
        "& button": {
            display: "block",
            margin: "10px auto"
        }
    },
    formInput: {
        margin: "5px 0"
    },
    announcementCard: {
        backgroundColor: "#f5f5f5",
        position: "relative",
        margin: "20px auto",
        padding: "25px 15% 25px 2.5%",
    },
    
    formContainer:{
      padding: "5%",
      "& h2": {
        textAlign: 'center'
    },
  }
})

export default useStyles