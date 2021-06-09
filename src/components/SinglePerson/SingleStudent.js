import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import Search from '../Forms/Search'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'
import {useParams} from 'react-router-dom'
import StudentAttandace from '../StudentAttandace/StudentAttandace'
import TestResults from '../Table/TestResults'
import MissedTests from '../MissedTests/MissedTests'

const SingleStudent = () => {

    
    // Use admin context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);
    
    // Destructure items
    const {teacher, student, student_marks, missed_tests,  searchStudent, searchStudentMarks, searchMissedTests, getStudentSingleMark} = adminContext;
    const {role} = authContext;

    // Store test type from search form
    const [testType, setTestType] = useState('');
    
    // Get Student id from params
    const {id} = useParams();

     // Update state
     const onChangeHandler = (e)=>{
        setTestType(e.target.value)
    }

    // Search single user
    const onSubmitHandler = (e) => {
        e.preventDefault();
        getStudentSingleMark(testType);
    }

    
    // Learners to be rendered
    const getStudents = (marks, teacherSub) => {
        
        // Filter Marks by teacher's grades
        let finalMarks = [];
        if(marks.length > 0){
            for(let i = 0; i < marks.length; i++){
                if(marks[i].subject === filterMarks(marks[i].subject) || marks[i].subject === 'Online Assessment'){
                    finalMarks = [...finalMarks, marks[i]]
                }
            }
        }

        
        function filterMarks(studentMark){
            console.log(teacherSub)
            for(let z = 0; z < teacherSub.length; z++){
                console.log(studentMark)
                if(studentMark === teacherSub[z]){
                    return studentMark;
                }
            }
        }

        return finalMarks;
    }
    
    const filterMissedTests = (currentStudent, missedTests) => {
        return missedTests.filter(missedTest => missedTest.student_id === currentStudent);
    }

    useEffect(() => {
        searchStudent(id);
        searchStudentMarks(id)
        searchMissedTests(id);
    }, []);
    
    return (
        <StudentStyles>
            <div className="student-profile-summary">
                <div className="student-profile">
                    <div className='header'>
                        <p>Student Profile</p>
                    </div>
                    <div className='student-details'>
                        <div className="img-icon"></div>
                        <div className="details">
                            <p><span>Full Name</span> : {student.fname} {student.lname}</p>
                            <p><span>Gender</span> : {student.gender}</p>
                            <p><span>Date Of Birth</span> : 28/15/2002</p>
                            <p><span>Phone Number</span> : 067 853 9874</p>
                            <p><span>E-mail Address</span> : {student.email}</p>
                            <p><span>Admission Date</span> : 07/01/2010</p>
                            <p><span>Address</span> : {student.address}</p>
                            <p><span>Classes</span> : {student.grade}</p>
                            <p><span>Section</span> : A</p>
                            <p><span>Student ID</span> : {student.student_id}</p>
                        </div>
                    </div>
                </div>
                <MissedTests missedTests = {filterMissedTests(id, missed_tests)}/>
                <div className="results-summary">
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
                    <TestResults student_marks = {role === "admin" ? student_marks : getStudents(student_marks, teacher.subjects)}/>
                </div>
            </div>
            <StudentAttandace/>
        </StudentStyles>
    )
}

const StudentStyles = styled.section`
    .student-profile-summary{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "profile missed-test"
            "profile results";
        gap: 1rem;

        p{
            margin-bottom: 0rem;
        }

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
            }
        }

        .student-profile{
            grid-area: profile;
            background: #fff;

            .student-details{
                margin: 2rem 1rem 1rem 1rem;
                display: grid;
                grid-template-columns: 6rem 1fr;
                gap: 3rem;

                .img-icon{
                    width: 100%;
                    height: 6rem;
                    background: grey;
                }

                div:nth-child(2){
                    
                    p{
                        margin-bottom: 2rem;
                        color: black;
                        font-size: .7rem;
                        font-family: Montserrat-Regular;

                        span{
                            width: 8rem;
                            display: inline-block;
                            color: grey;
                        }
                    }
                }
            }

        }

        .results-summary{
            grid-area: results;
            background: #fff;
        }
    }

   @media screen and (max-width: 500px){

        .header p{
            font-weight: 550;
        }

        .student-profile-summary{
            grid-template-columns: 1fr;
            grid-template-areas:
                "profile"
                "missed-test"
                "results";

            .student-profile .student-details{
                gap: 1rem;

                
                div:nth-child(2){
                    
                    p{
                        margin-bottom: 1rem !important;
                    
                        span{
                            padding-bottom: 1rem;
                            display: block;
                        }
                    }
                }
            }
        }
   }
`;

export default SingleStudent
