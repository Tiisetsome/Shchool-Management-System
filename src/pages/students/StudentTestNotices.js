import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {HiOutlineRefresh} from 'react-icons/hi'
import StudentContext from '../../context/students/studentContext'


import {ContentStyles} from '../../components/Styles/ContentStyles'
import {TestNoticesStyles} from '../../components/Styles/TestNoticesStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
const StudentTestNotices = () => {

    // Use admin context
    const studentContext = useContext(StudentContext);

    // Destructure items
    const {student, test_notices, searchTestNotices} = studentContext;

    // Refresh notices
    const refreshNoticesHandler = () => {
         searchTestNotices();
    }

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

    const studentTestNotices = (currentStudent, allNotices) => {
        console.log(currentStudent.grade)

        const filteredTestNotices = allNotices.filter(currentNotice => currentNotice.grade === currentStudent.grade && currentNotice.subject === getStudentSub(currentNotice.subject));

        function getStudentSub(subject){
            for(let i = 0; i < currentStudent.subjects.length; i++){
                if(subject === currentStudent.subjects[i]){
                    return subject;
                }
            }
            return null;
        }

        return filteredTestNotices;
    }

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }

    return (
        <ContentStyles>
            <StudentSideNavs/>
            <TestNoticesStyles className = 'notices'>
                    <p className="p-header">Home - <span>Test Notices</span></p>
                    <div className='header'>
                        <p>Notice Board</p>
                        <HiOutlineRefresh style={style} onClick={()=> refreshNoticesHandler()} />
                    </div>
                    <div className="test-notices-wrapper">
                        { test_notices.length > 0 ?
                            studentTestNotices(student, test_notices).map(notice => {
                                return <div className="test-notice" key={notice.id}>
                                            <p>{formatDate(notice.created_at)}</p>
                                            <p>{notice.subject}</p>
                                            <p>{notice.message}</p>
                                            <p>Test date : {notice.test_date}</p>
                                       </div>
                            }) : <div className="empty-data">Sorry, there are no upcoming tests.</div>
                        }
                    </div>
            </TestNoticesStyles>
        </ContentStyles>
    )
}

export default withRouter(StudentTestNotices);
