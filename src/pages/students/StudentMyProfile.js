import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import StudentContext from '../../context/students/studentContext'
import AuthContext from '../../context/authentication/authContext'

import StudentSideNavs from '../../components/SideNavigations/StudentSideNavs'
import {ContentStyles} from '../../components/Styles/ContentStyles'

const StudentMyProfile = () => {

    // Use student and auth context
    const studentContext = useContext(StudentContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const{student, searchStudent} = studentContext;
    const{person_id} = authContext;

    useEffect(() => {
        // Get student data
        searchStudent(person_id);
    }, [])

    return (
        <ProfileStyles>
            <StudentSideNavs/>
            <div className='student_profile'>
                <p className="p-header">Home - <span>Events</span></p> 
                <div className='header'>
                    <p>Student Profile</p>
                </div>
                <div className='student_details'>
                    <div className="img-icon"></div>
                    <div className="details">
                        <p><span>Full Name</span> :  {student.fname} {student.lname}</p>
                        <p><span>Gender</span> : {student.gender}</p>
                        <p><span>Date Of Birth</span> : 05/04/1989</p>
                        <p><span>Phone Number</span> : 067 853 9874</p>
                        <p><span>Email Address</span>: {student.email} </p>
                        <p><span>Address</span> : {student.address}</p>
                        <p><span>Class</span> : {student.grade}</p>
                        <p><span>Student ID</span> : {student.student_id}</p>
                    </div>
                </div>
            </div>
        </ProfileStyles>
    )
}

const ProfileStyles = styled(ContentStyles)`
    
    P{
        margin-bottom: 0rem;
    }
    
    .p-header{
        background: #F0F0F0 !important;
        padding-bottom: 2rem;
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
    
    .student_profile{
        margin-bottom: 2rem;
        background: #fff;
        font-family: Montserrat-Medium;


        .student_details{
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
                    font-size: .75rem;
                    font-family: Montserrat-Medium;

                    span{
                        width: 8rem;
                        display: inline-block;
                        color: grey;
                    }
                }
            }
        }

    }

    @media screen and (max-width: 500px){

        .header p{
            font-weight: 500;
        }
    
        .student_profile{
            margin-bottom: 2rem;

            .student_details{
                gap: 1rem;
    
                div:nth-child(2){
                    
                    p{
                        margin-bottom: 1rem !important;
                        font-size: .7rem !important;
                    
                        span{
                            padding-bottom: 1rem;
                            display: block;
                        }
                    }
                }
            }
    }
`;

export default StudentMyProfile
