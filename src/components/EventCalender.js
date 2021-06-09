import React, {useContext} from 'react'
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import AdminContext from '../context/admin/adminContext'

const EventCalender = () => {

    const adminContext = useContext(AdminContext);
    const {events} = adminContext;
    let EventSettingsModel = {
        dataSource: events
    }
    return <ScheduleComponent height="430px" currentView='Month' eventSettings={EventSettingsModel}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
}

export default EventCalender
