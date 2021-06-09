import React, {useContext, useEffect, useState, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {BiMenuAltRight} from 'react-icons/bi'
import {IoMdClose} from 'react-icons/io'

import AuthContext from '../../context/authentication/authContext'
import AdminContext from '../../context/admin/adminContext'
import StudentContext from '../../context/students/studentContext'
import StudentSummary from '../../components/Summary/StudentSummary'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import MainContent from '../../components/Students/MainContent/MainContent'
import StudentAttandace from '../../components/StudentAttandace/StudentAttandace'
import TestResults from '../../components/Table/TestResults'
import Search from '../../components/Forms/Search'
import MissedTests from '../../components/MissedTests/MissedTests'
import Spinner from '../../components/Spinner/Spinner';

const StudentPage = () => {

    // Use student and auth context
    const studentContext = useContext(StudentContext);
    const adminContext = useContext(AdminContext)
    const authContext = useContext(AuthContext);

    // Destructure items
    const {person_id} = authContext;
    const {missed_tests, student_marks, loading, searchNotices, searchTestNotices, searchMissedTests, searchStudentMarks, searchStudent, searchAssessments, getStudentSingleMark, stopSpinner} = studentContext;
    const {searchEvents} = adminContext;

    // Store test type on search
    const [testType, setTestType] = useState('');

    // Toggle state
    const [menuToggle, setMenuToggle] = useState(false);

    const toggleHandler = () => {
        setMenuToggle(!menuToggle)
    }

    // Update state
    const onChangeHandler = (e)=>{
        setTestType(e.target.value)
    }

    // Search single user
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(testType.length > 0 && testType !== " "){
            getStudentSingleMark(testType);
        }
    }

    
    const filterMissedTests = (currentStudent, missedTests) => {
        return missedTests.filter(missedTest => missedTest.student_id === currentStudent);
    }
    
    useEffect(() => {
        searchStudent(person_id);
        searchStudentMarks(person_id);
        searchTestNotices(person_id);
        searchMissedTests(person_id);
        searchNotices();
        searchEvents();
        searchAssessments();
        stopSpinner();
    }, [])
    
    const menuStyle = {
        fontSize: '1.3rem',
        color: "rgb(233, 140, 0)",
    }

    console.log(loading)

    return (
        <StudentPageStyles>
            {loading ? <Spinner/> :
                <Fragment>
                    <StudentSideNavs menuShow = {menuToggle}/>
                    <div className = "menu" onClick = {() => toggleHandler()}>
                        {menuToggle ?<IoMdClose style={menuStyle}/> : <BiMenuAltRight style={menuStyle}/>}
                    </div>
                    <section>
                        <p className="p-header">Home - <span>Admin</span></p>
                        <StudentSummary/>
                        <MainContent/>
                        <div className="results-summary">
                            <div className="marks">
                                <div className='header'>
                                        <p>All Tests</p>
                                        <Search 
                                            width
                                            text = "Enter type"
                                            onChangeHandler = {onChangeHandler}
                                            onSubmitHandler = {onSubmitHandler}
                                            personId= {testType}
                                            />
                                </div>
                                <TestResults student_marks={student_marks}/>
                            </div>
                            <div className="missed-tests">
                                <MissedTests missedTests = {filterMissedTests(person_id, missed_tests)}/>
                            </div>
                        </div>
                        <StudentAttandace/>
                    </section>
                </Fragment>
            }
        </StudentPageStyles>
    )
}

const StudentPageStyles = styled(ContentStyles)`

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

    .results-summary{
        margin-bottom: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        .marks{
            background: #fff;
            margin-top: 1rem;
        }

        .missed-tests{
            background: #fff;
            margin-top: 1rem;
        }
    }

    @media screen and (max-width: 500px){
        .results-summary{
            grid-template-columns: 1fr;
        }
    }
`

export default withRouter(StudentPage);
