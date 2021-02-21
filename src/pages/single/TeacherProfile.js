import React from 'react'
import { withRouter } from 'react-router-dom'

import TeacherSummary from '../../components/SinglePerson/TeacherSummary'
import SingleTeacher from '../../components/SinglePerson/SingleTeacher'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import SideNavigation from '../../components/SideNavigation'

const TeacherProfile = () => {
    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Teachers</span></p>
                <TeacherSummary/>
                <SingleTeacher to="hello"/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(TeacherProfile)
