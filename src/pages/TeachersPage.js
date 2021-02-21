import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AdminContext from '../context/admin/adminContext'

import TopBar from '../components/TopBar/TopBar'
import Teachers from '../components/Teachers/Teachers';
import { ContentStyles } from '../components/Styles/ContentStyles';
import SideNavigation from '../components/SideNavigation';

const TeachersPage = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers} = adminContext;

    const teacherGrades = [];

    if(teachers.length > 0){
        teachers.forEach(teacher => teacher.classes.forEach(grade => teacherGrades.push(grade)));
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Teachers</span></p>
                <TopBar icons="teacher" grades= {teacherGrades} />
                <Teachers/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(TeachersPage);