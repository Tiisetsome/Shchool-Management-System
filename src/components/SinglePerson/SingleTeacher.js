import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import {HiOutlineRefresh} from 'react-icons/hi'
import DataChart from '../Charts/DataChart'
import AdminContext from '../../context/admin/adminContext'
import {useParams} from 'react-router-dom'

const SingleTeacher = () => {

    // Use admin contex
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teacher, students, testNotices, searchTeacher, searchStudents, searchTestsNotices} = adminContext;

    // Get Teacher id from params
    const {id} = useParams();

    console.log(id);

    // Icons styles
    const style = {
        color: "rgb(38, 218, 203)",
    }

    const countStudents = (currentTeacher, allStudents) => {
        const {classes, subjects} = currentTeacher;
        
        // Count
        let filteredStudentsCount = [];
        let filterStudents = allStudents.filter(student => student.grade === getMatch(classes, student.grade));
            filterStudents.filter(currentStudent => currentStudent.subjects.forEach( subject => {
            if(subject === getMatch(subjects, subject)){
                filteredStudentsCount.push(currentStudent);
            }
        }));

        // Remove duplicates
        const countedStudents = [...new Set(filteredStudentsCount)];

        function countStudentsByGender(gender){
            return countedStudents.filter(currentStudent => currentStudent.gender === gender).length
        } 
        
        return [countStudentsByGender("male"), countStudentsByGender("female"), 0];
    }

    // Matching grade or class
    function getMatch(dataArr, compareValue){
        for(let count = 0; count < dataArr.length; count++){
            if(dataArr[count] === compareValue){
                return dataArr[count];
            }
        }
    }

    useEffect(() => {
        
        // Get signle teacher
        searchTeacher(id);
        //searchStudents('student');
        searchTestsNotices();
    }, [])

    return (
        <SingleStyles>
            <div className='teacher-profile'>
                <div className='header'>
                    <p>Teacher Profile</p>
                </div>
                <div className='teacher-details'>
                    <div className="img-icon"></div>
                    <div className="details">
                        <p><span>Full Name</span> :  {teacher.fname} {teacher.lname}</p>
                        <p><span>Gender</span> : {teacher.gender}</p>
                        <p><span>Date Of Birth</span> : 05/04/1989</p>
                        <p><span>Phone Number</span> : 067 853 9874</p>
                        <p><span>Employed Since</span> : 04/05/2005</p>
                        <p><span>Address</span> : {teacher.address}</p>
                        <p><span>Classes</span> : {teacher.classes}</p>
                        <p><span>Teacher ID</span> : {teacher.teacher_id}</p>
                        <p><span>Role</span> : Class Teacher</p>
                    </div>
                </div>
            </div>
            <div className='student-overview'>
                <div className='calender'>
                    <div className='header'>
                        <p>Student Overview</p>
                    </div>
                    <DataChart 
                        margin="2rem 0rem"
                        labels={['Male', 'Female']}
                        data = {Object.keys(teacher).length > 0 ? countStudents(teacher, students) : [30, 25, 0]}
                    />
                </div>
            </div>
            <div className='test-notices'>
                <div className='calender'>
                    <div className='header'>
                        <p>Upcoming Tests</p>
                        <HiOutlineRefresh style={style} />
                    </div>
                </div>
                <div className="notices">
                    {testNotices.map(notice => {
                        return <div key={notice.id}>
                            <p>{notice.test_date}</p>
                            <p>{notice.subject}</p>
                            <p>{notice.grade}</p>
                        </div>
                    })}
                </div>
            </div>
        </SingleStyles>
    )
}

const SingleStyles = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "profile data"
        "profile notice";
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

    .teacher-profile{
        grid-area: profile;
        background: #fff;

        .teacher-details{
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

    .student-overview{
        grid-area: data;
        background: #fff;
    }

    .test-notices{
        grid-area: notice;
        background: #fff;

        .notices{

            div{
                padding: 1rem 0rem;

                p{
                    margin: 0rem .5rem .7rem 1rem;;
                }

                p:first-child{
                    color: rgb(182, 0, 0);
                    font-weight: 500;
                }

                p:nth-child(2){
                    color: rgb(38, 218, 203);
                    font-weight: 500;
                }
            }

            div:nth-child(odd){
                background-color: rgb(245, 192, 201);
            }

            div:nth-child(even){
                background-color: rgb(248, 248, 171);
            }
        }
    }

    @media screen and (max-width: 500px){
        grid-template-columns: 1fr;
        grid-template-areas:
        "data"
        "profile"
        "notice";

        .teacher-profile{

            .teacher-details{
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

        .test-notices{
            margin-bottom: 1rem;
        }
    }
`;

export default SingleTeacher
