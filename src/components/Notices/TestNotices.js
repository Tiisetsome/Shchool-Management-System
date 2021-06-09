import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {HiOutlineRefresh} from 'react-icons/hi'
import AdminContext from '../../context/admin/adminContext'

import {ContentStyles} from '../Styles/ContentStyles'
import {TestNoticesStyles} from '../Styles/TestNoticesStyles'
import SideNavigation from '../SideNavigation'

const TestNotices = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {testNotices, notices, searchNotices} = adminContext;
    console.log(testNotices)

    // Refresh notices
    const refreshNoticesHandler = () => {
         // Get notices
         searchNotices();
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
                    <p className="p-header">Home - <span>Test Notices</span></p>
                    <div className='header'>
                        <p>Notice Board</p>
                        <HiOutlineRefresh style={style} onClick={()=> refreshNoticesHandler()} />
                    </div>
                    <div className="test-notices-wrapper">
                        {testNotices.length > 0 ?
                            testNotices.map(notice => {
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

export default withRouter(TestNotices);
