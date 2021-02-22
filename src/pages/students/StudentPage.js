import React, {useContext, useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

import StudentContext from '../../context/students/studentContext'
import StudentSummary from '../../components/Summary/StudentSummary'
import HomeContent from '../../components/HomeContent'
import { ContentStyles } from '../../components/Styles/ContentStyles'
import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import MainContent from '../../components/Students/MainContent/MainContent'
import StudentAttandace from '../../components/StudentAttandace/StudentAttandace'
import TestResults from '../../components/Table/TestResults'
import Search from '../../components/Forms/Search'
import MissedTests from '../../components/MissedTests/MissedTests'

const StudentPage = () => {

    // Use student context
    const studentContext = useContext(StudentContext);

    // Store test type on search
    const [testType, setTestType] = useState('');

    // Update state
    const onChangeHandler = (e)=>{
    setTestType(e.target.value)
    }

    // Search single user
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(testType);
    }

    
    // Destructure items
    const {notices, student_marks, searchNotices, searchStudentMarks} = studentContext;

    useEffect(() => {
       searchNotices();
       searchStudentMarks(20210111);
    }, [])

    return (
      <StudentPageStyles>
            <StudentSideNavs/>
            <section>
                <p className="p-header">Home - <span>Admin</span></p>
                <StudentSummary/>
                <MainContent/>
                <StudentAttandace/>
                <div className="results-summary">
                    <div className="marks">
                        <div className='header'>
                                <p>All Tests</p>
                                <Search 
                                    width
                                    text = "Enter type"
                                    onChangeHandler = {onChangeHandler}
                                    onSubmitHandler = {onSubmitHandler}
                                    personId= {20210111}
                                />
                        </div>
                        <TestResults student_marks={student_marks}/>
                    </div>
                    <div className="missed-tests">
                        <MissedTests/>
                    </div>
                </div>
            </section>
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
        }

        .missed-tests{
            background: #fff;
        }
    }
`

export default withRouter(StudentPage);
