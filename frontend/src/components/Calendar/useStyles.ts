import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    calendarPage: {
        padding: "0 2.5%",
        margin: "65px 0",
        "& h2": {
            textAlign: "center",
            padding: "2.5%"
        }
    },
    calendarHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        margin: "auto",
        "& button": {
            margin: "auto 10px",
        }
    },
    button: {
        padding: "5px",
        textAlign: "center"
    },
    calendarBody: {
        display: "flex",
        flexWrap: "wrap",
    },
    table: {
        minWidth: 650,
      },
})

export default useStyles