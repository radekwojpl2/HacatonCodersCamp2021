import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SupervisiorCard from './supervisiorCard'

const useStyles = makeStyles({
    maindiv: {
        padding: '100px'
    },
})

function EmployeesDashboard(){

    const classes = useStyles({});

    return (
            <div className={classes.maindiv}>
                <SupervisiorCard></SupervisiorCard>
            </div>
        
    )
}

export default EmployeesDashboard;