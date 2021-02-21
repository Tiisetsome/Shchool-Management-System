import React from 'react'
import { withRouter } from 'react-router-dom';

import TeacherSummary from '../../components/SinglePerson/TeacherSummary'
import SingleStudent from '../../components/SinglePerson/SingleStudent';
import { ContentStyles } from '../../components/Styles/ContentStyles'
import SideNavigation from '../../components/SideNavigation';

const StudentProfile = () => {
    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Students</span></p>
                <TeacherSummary icons="student"/>
                <SingleStudent />
            </div>
        </ContentStyles>
    )
}

export default withRouter(StudentProfile);
