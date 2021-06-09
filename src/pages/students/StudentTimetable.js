import React from 'react'

import {ContentStyles} from '../../components/Styles/ContentStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'

const StudentTimetable = () => {
    return (
        <ContentStyles>
            <StudentSideNavs/>
            If you see this page it means you are authenticated a student
        </ContentStyles>
    )
}

export default StudentTimetable
