import React from 'react';
import Paper from '@material-ui/core/Paper';
import { SchedulerDateTime, ViewState, EditingState, ChangeSet, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Resources,
  Toolbar,
  DateNavigator,
  WeekView,
  MonthView,
  ViewSwitcher,
  AppointmentTooltip,
  TodayButton,
  AppointmentForm, 
} from '@devexpress/dx-react-scheduler-material-ui';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addEvent, deleteEvent, getAllEvents, updateEvent } from './CalendarViewSlice';

const resources = [{
  fieldName: 'type',
  title: 'Type',
  instances: [
    { id: 'task', text: 'Task', color: '#ADB7FF' },
    { id: 'sprint-planning', text: 'Sprint Planning', color: '#C3B7CC' },
    { id: 'daily-scrum', text: 'Daily Scrum', color: '#EFD3D7' },
    { id: 'sprint-review', text: 'Sprint Review', color: '#7C88A2' },
    { id: 'sprint-retrospective', text: 'Sprint Retrospective', color: '#FCC5F1' },
    { id: 'sprint', text: 'The Sprint', color: '#CFD3DD' },
  ],
}];

const app = [{
  title: 'Website Re-Design Plan',
  startDate: new Date(2021, 3, 20, 9, 15),
  endDate: new Date(2021, 3, 20, 11, 30),
  id: 100,
  rRule: 'FREQ=DAILY;COUNT=3',
  exDate: '20180628T063500Z,20180626T061500Z',
}, {
  title: 'Book Flights to San Fran for Sales Trip',
  startDate: new Date(2021, 3, 25, 12, 11),
  endDate: new Date(2021, 3, 25, 13, 0),
  id: 101,
  rRule: 'FREQ=DAILY;COUNT=4',
  // exDate: '20180627T091100Z',
  allDay: true,
}]

const CalendarView = () => {
  const dispatch = useAppDispatch()
  const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());
  const events = useAppSelector(state => state.calendar.events)

  const commitChanges = ({added, changed, deleted}: ChangeSet) => {
    if (added) {
      const data = {
        title: added?.title,
        startDate: added?.startDate,
        endDate: added?.endDate,
        type: added?.type,
        rRule: added?.rRule,
        notes: added?.notes
      }
      console.log(data)
      dispatch(addEvent(data)).then(() => window.location.reload())
    } else if (changed) {
      dispatch(updateEvent(changed)).then(() => window.location.reload())

    } else if (deleted) {
      dispatch(deleteEvent(deleted)).then(() => window.location.reload())
    }
  }

  React.useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

  return(
    <Paper>
      <Scheduler
        data={events}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState
          onCommitChanges={commitChanges}
          />
          <IntegratedEditing />
          <WeekView
          startDayHour={8}
          endDayHour={16}
        />
        <WeekView
          name="work-week"
          displayName="Work Week"
          startDayHour={8}
          endDayHour={16}
          excludedDays={[0,6]}
        />
        <MonthView />
        <DayView
          startDayHour={8}
          endDayHour={16}
        /> 
        <Appointments />
        <AppointmentTooltip />
        <Resources
          data={resources}
        />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm />

      </Scheduler>
      
    </Paper>
  )
};

export default CalendarView