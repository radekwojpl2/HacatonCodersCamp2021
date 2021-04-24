import React from 'react'
import CalendarView from './CalendarView'
import useStyles from './useStyles'



const Calendar = () => {
    const classes = useStyles()
    

    return(
        <div className={classes.calendarPage}>
            <h2>Calendar</h2>
            <CalendarView />
        </div>
    )
}

export default Calendar