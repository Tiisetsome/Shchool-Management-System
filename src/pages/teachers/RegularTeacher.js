import React, {useContext, useEffect, useState, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {BiMenuAltRight} from 'react-icons/bi'
import {IoMdClose} from 'react-icons/io'

import AuthContext from '../../context/authentication/authContext'
import AdminContext from '../../context/admin/adminContext'
import StudentContext from '../../context/students/studentContext'
import TeacherSummary from '../../components/Summary/TeacherSummary'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import MainContent from '../../components/Teachers/MainContent/MainContent'
import Spinner from '../../components/Spinner/Spinner';

const ReagularTeacher = () => {

    // Use student & Auth context
    const studentContext = useContext(StudentContext);

    // Use admin context
    const authContext = useContext(AuthContext);
    const adminContext = useContext(AdminContext);
    
    // Destructure items
    const {loading, searchStudents, searchParents, searchTeachers, searchTeacher, searchNotices, searchCases, searchEvents, searchTestsNotices, stopSpinner} = adminContext;
    const {person_id} = authContext;

    // Toggle state
    const [menuToggle, setMenuToggle] = useState(false);

    const toggleHandler = () => {
        setMenuToggle(!menuToggle)
    }

    
    const menuStyle = {
        fontSize: '1.3rem',
        color: "rgb(233, 140, 0)",
    }

    useEffect(() => {
       searchTeacher(person_id);
       searchNotices();
       searchCases();
       searchTeachers('teachers');
       searchStudents('student');
       searchParents('parents');
       searchEvents()
       searchTestsNotices();
       stopSpinner()
    }, [])

    return (
      <RegularTeacherStyles>
            {loading ? <Spinner person={'teacher'} /> :
                <Fragment>
                    <TeacherSideNavs menuShow = {menuToggle}/>
                    <div className = "menu" onClick = {() => toggleHandler()}>
                        {menuToggle ?<IoMdClose style={menuStyle}/> : <BiMenuAltRight style={menuStyle}/>}
                    </div>
                    <section>
                        <p className="p-header">Home - <span>Teacher</span></p>
                        <TeacherSummary/>
                        <MainContent/>
                    </section>
                </Fragment>
            }
    </RegularTeacherStyles>
    )
}

const RegularTeacherStyles = styled(ContentStyles)`

    .header{
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
        color: black;

        p{
            font-weight: 600;
            color: black !important;
            margin-bottom: 0rem;
        }
    }

    section{
        margin-bottom: 1rem;
    }

`

export default withRouter(ReagularTeacher);
