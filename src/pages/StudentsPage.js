import React, {useContext} from 'react'
import AdminContext from '../context/admin/adminContext'
import { withRouter } from 'react-router-dom';

import TopBar from '../components/TopBar/TopBar'
import Students from '../components/Students/Students';
import { ContentStyles } from '../components/Styles/ContentStyles';
import SideNavigation from '../components/SideNavigation';

const StudentsPage = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {students} = adminContext;

    const studentGrades = [];

    if(students.length > 0){
        students.forEach(student => studentGrades.push(student.grade));
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Students</span></p>
                <TopBar icons="student" grades= {studentGrades} />
                <Students/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(StudentsPage)