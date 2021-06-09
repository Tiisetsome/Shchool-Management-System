import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {HiOutlineRefresh} from 'react-icons/hi'
import AdminContext from '../../context/admin/adminContext'

import {ContentStyles} from '../Styles/ContentStyles'
import {TestNoticesStyles} from '../Styles/TestNoticesStyles'
import SideNavigation from '../SideNavigation'

const StudentCase = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {cases, searchCases} = adminContext;

    // Refresh notices
    const refreshNoticesHandler = () => {
         // Get notices
         searchCases();
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

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
        cursor: "pointer"
    }


    return (
        <ContentStyles>
            <SideNavigation/>
            <TestNoticesStyles className = 'notices'>
                    <p className="p-header">Home - <span>Student</span></p>
                    <div className='header'>
                        <p>Student Cases</p>
                        <HiOutlineRefresh style={style} onClick={()=> refreshNoticesHandler()} />
                    </div>
                    <div className="test-notices-wrapper">
                        {cases.length > 0 ? 
                            cases.map(studentCase => {
                                return <div className="test-notice" key={studentCase.id}>
                                    <p>{formatDate(studentCase.created_at)}</p>
                                    <p>{studentCase.fname} {studentCase.lname}</p>
                                    <p>{studentCase.message}</p>
                                    <p>Class : {studentCase.grade}</p>
                                </div>
                            }) : <div className="empty-data">There are no student cases.</div>
                        }
                    </div>
            </TestNoticesStyles>
        </ContentStyles>
    )
}

export default withRouter(StudentCase);
