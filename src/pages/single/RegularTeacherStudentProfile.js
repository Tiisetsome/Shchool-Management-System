import React from 'react'
import { withRouter } from 'react-router-dom';

import TeacherSummary from '../../components/SinglePerson/TeacherSummary'
import SingleStudent from '../../components/SinglePerson/SingleStudent';
import { ContentStyles } from '../../components/Styles/ContentStyles'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs';

const StudentProfile = () => {
    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <div>
                <p className="p-header">Home - <span>Students</span></p>
                <TeacherSummary icons="student"/>
                <SingleStudent />
            </div>
        </ContentStyles>
    )
}

export default withRouter(StudentProfile);
