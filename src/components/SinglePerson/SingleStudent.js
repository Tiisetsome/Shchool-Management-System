import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import Search from '../Forms/Search'
import AdminContext from '../../context/admin/adminContext'
import {useParams} from 'react-router-dom'
import StudentAttandace from '../StudentAttandace/StudentAttandace'
import TestResults from '../Table/TestResults'

const SingleStudent = () => {

    // Store person id on search
    const [personId, setPersonId] = useState('');
    
    // Use admin contex
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {student, student_marks,  searchStudent, searchStudentMarks, getSinglePerson, setIndividuals} = adminContext;

    // Get Student id from params
    const {id} = useParams();

     // Update state
     const onChangeHandler = (e)=>{
        setPersonId(e.target.value)
    }

    // Search single user
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const person = getSinglePerson(personId);
        
        // Update table if passes test
        if(person.length > 0 && typeof person[0] !== "undefined"){
            console.log(person);
            //setIndividuals(person)
        }
    }

    useEffect(() => {
        
        // Get signle Student
        searchStudent(id);
        searchStudentMarks(id)
    }, [])

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
                <div className='missed-test-summary'>
                    <div className='header'>
                        <p>Missed Tests</p>
                    </div>
                    <div className="tests">
                        <div>
                            <p>12 March 2021</p>
                            <p>Life Orientation</p>
                            <p>The student was sick and notified the teacher before hand</p>
                            <p>Reason</p>
                        </div>
                        <div>
                            <p>25 June 2021</p>
                            <p>Mathematics</p>
                            <p>No valid reason</p>
                            <p>Reason</p>
                        </div>
                    </div>
                </div>
                <div className="results-summary">
                    <div className='header'>
                        <p>All Tests</p>
                        <Search 
                            width
                            text = "Enter type"
                            onChangeHandler = {onChangeHandler}
                            onSubmitHandler = {onSubmitHandler}
                            personId= {personId}
                        />
                    </div>
                    <TestResults student_marks = {student_marks}/>
                    {/* <table className="results-table">
                        <thead>
                            <tr>
                                <th>Test Type</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student_marks.map(student_mark => {
                                return <tr key={student_mark.id}>
                                    <td>June Exam</td>
                                    <td>{student_mark.subject}</td>
                                    <td>{student_mark.score}</td>
                                    <td>06/03/2021</td>
                                </tr>
                            })}
                        </tbody>
                    </table> */}
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

        .missed-test-summary{
            grid-area: missed-test;
            background: #fff;

            .tests{
                div{
                    margin: 2rem 1rem 1rem 1rem;

                    p{
                        margin-bottom: .8rem;
                    }

                    p:first-child{
                        color: rgb(182, 0, 0);
                        font-weight: 600;
                    }

                    p:nth-child(2){
                        font-weight: 600;
                        color: rgb(38, 218, 203);
                    }

                    p:last-child{
                        color: rgb(214, 214, 214);;
                    }
                }
            }
        }

        .results-summary{
            grid-area: results;
            background: #fff;
        }
    }
`;

export default SingleStudent
