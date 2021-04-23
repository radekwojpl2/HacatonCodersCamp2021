import { makeStyles } from '@material-ui/core';

export const styleComponents = makeStyles({
    authorizationBox: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    formRegister: {
        width: '60vh',
        height: '50vh',
        boxShadow: '5px 5px 5px grey'
    },
    formLogin:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '60vh',
        height: '25vh',
        boxShadow: '5px 5px 5px grey'
    },
    formDiv: {
        width: '60vh',
        height: '20vh',
        display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"center",
    }, 
    textField: {
        width: '40vh',
        height: '6vh'
        
    }, 
    button: {
        width: '40vh',
        height: "50px",
    },
    changeFormbutton: {
        width: '30vh',
        height:'7vh',
        borderRadius:'0%',
        border:"0",
        borderBottom:"1px solid black",
    },
})
