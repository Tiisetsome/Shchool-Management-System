import React from 'react'
import { withRouter } from 'react-router-dom'

import TeacherSummary from '../../components/SinglePerson/TeacherSummary'
import SingleParent from '../../components/SinglePerson/SingleParent'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'

const RegularTeacherParentProfile = () => {
    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <div>
                <p className="p-header">Home - <span>Teachers</span></p>
                <SingleParent to="hello"/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(RegularTeacherParentProfile)
