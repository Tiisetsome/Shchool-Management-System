import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {HiOutlineRefresh} from 'react-icons/hi'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

import {ContentStyles} from '../Styles/ContentStyles'
import {TestNoticesStyles} from '../Styles/TestNoticesStyles'
import SideNavigation from '../SideNavigation'
import StudentSideNavs from '../SideNavigations/StudentSideNavs'
import TeacherSideNavs from '../SideNavigations/TeacherSideNavs'

const Events = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const {teachers, testNotices, events, searchEvents} = adminContext;
    const {role, person_id} = authContext;
    
    // Refresh notices
    const refreshNoticesHandler = () => {
        // Get notices
        searchEvents();
    }
    
    // Extract current teacher
    const currentTeacher = teachers.find(teacher => teacher.teacher_id === person_id);
    console.log(currentTeacher)

     // Date format
     const formatDate = (noticeDate) => {

        // Get time
        const time = noticeDate.split(" ").splice(1, 2)[0];
        
        // Create months array
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        // Create new date and format it
        let fullDate = new Date(noticeDate);
            fullDate = `${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()} ${time}`;
        
        return fullDate;
    }

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

    return (
        <ContentStyles>
            {role === "admin" ? <SideNavigation/> : role === "teacher" || role === "class teacher" ? <TeacherSideNavs/> : <StudentSideNavs/>}
            <TestNoticesStyles className = 'notices'>
                    <p className="p-header">Home - <span>Events</span></p>
                    <div className='header'>
                        <p>School Events</p>
                        <HiOutlineRefresh style={style} onClick={()=> refreshNoticesHandler()} />
                    </div>
                    <div className="test-notices-wrapper">
                        {events.length > 0 ?
                            events.map(schoolEvent => {
                                return <div className="test-notice event-notice" key={schoolEvent.id}>
                                    <p>{formatDate(schoolEvent.created_at)}</p>
                                    <p>{schoolEvent.title}</p>
                                    <p>{schoolEvent.message}</p>
                                    {role !== "student" ? <p>By : {`${currentTeacher.fname} ${currentTeacher.lname}`}</p> : null}
                                </div>
                            }) : <div className="empty-data">Sorry, there are no events.</div>
                        }
                    </div>
            </TestNoticesStyles>
        </ContentStyles>
    )
}

export default withRouter(Events);
