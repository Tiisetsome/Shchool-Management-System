import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import StudentContext from '../../context/students/studentContext'
import StudentSummary from '../../components/Summary/StudentSummary'
import HomeContent from '../../components/HomeContent'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import MainContent from '../../components/Students/MainContent/MainContent'
import StudentAttandace from '../../components/StudentAttandace/StudentAttandace'

const StudentPage = () => {

    // Use student context
    const studentContext = useContext(StudentContext);
    
    // Destructure items
    const {notices, searchNotices} = studentContext;

    useEffect(() => {
       searchNotices();
    }, [])

    return (
      <ContentStyles>
            <StudentSideNavs/>
            <div>
                <p className="p-header">Home - <span>Admin</span></p>
                <StudentSummary/>
                <MainContent/>
                <StudentAttandace/>
            </div>
    </ContentStyles>
    )
}

export default withRouter(StudentPage);
