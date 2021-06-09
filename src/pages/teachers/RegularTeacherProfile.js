import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import AdminContext from '../../context/admin/adminContext'

import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import {ContentStyles} from '../../components/Styles/ContentStyles'

const RegularTeacherProfile = () => {

    // Use student context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const{teacher, searchTeacher} = adminContext;

    useEffect(() => {
        // Get teacher data
        searchTeacher('30210124'); // The id should be dynamic
    }, [])

    return (
        <ProfileStyles>
            <TeacherSideNavs/>
            {typeof teacher !== 'undefined'?
                <div className='teacher_profile'>
                <p className="p-header">Home - <span>Events</span></p> 
                <div className='header'>
                    <p>Teacher Profile</p>
                </div>
                <div className='teacher_details'>
                    <div className="img-icon"></div>
                    <div className="details">
                        <p><span>Full Name</span> :  {teacher.fname} {teacher.lname}</p>
                        <p><span>Gender</span> : {teacher.gender}</p>
                        <p><span>Date Of Birth</span> : 05/04/1989</p>
                        <p><span>Phone Number</span> : 067 853 9874</p>
                        <p><span>Email Address</span>: {teacher.email} </p>
                        <p><span>Address</span> : {teacher.address}</p>
                        <p><span>Class</span> : {teacher.classes}</p>
                        <p><span>teacher ID</span> : {teacher.teacher_id}</p>
                    </div>
                </div>
            </div>: null
            }
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
    
    .teacher_profile{
        margin-bottom: 2rem;
        background: #fff;

        .teacher_details{
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
                    
                    span{
                        width: 8rem;
                        display: inline-block;
                        color: grey;
                    }
                }
            }
        }

    }
`;

export default withRouter(RegularTeacherProfile);
