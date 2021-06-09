import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {MdEventAvailable, MdAssessment} from 'react-icons/md'
import {AiFillNotification} from 'react-icons/ai'
import {BsPersonFill} from 'react-icons/bs'
import {FaBusinessTime} from 'react-icons/fa'
import {AiOutlinePoweroff} from 'react-icons/ai'

import AdminContext from '../../context/admin/adminContext'
import StudentContext from '../../context/students/studentContext'
import AuthContext from '../../context/authentication/authContext'

const StudentSideNavs = ({menuShow}) => {

    // Use context
    const adminContext = useContext(AdminContext)
    const authContext = useContext(AuthContext)
    const studentContext = useContext(StudentContext)

    // Reset states
    const resetStates = () => {
        adminContext.resetAdminState();
        studentContext.resetStudentState();
        authContext.logOutUser();
    }

    // Icons styles
    const style = {
        fontSize: "1.5rem",
        color: "rgb(233, 140, 0)"
    }

    // Link styles
    const linkStyles={
        color: "#fff"
    }

    console.log(menuShow)

    return (
        <SideStyles toggleMenuShow = {menuShow}>
            <ul>
                <div>
                    <Link to='/student_dashboard' style={{color: "#fff"}}>
                        <li> <AiFillDashboard style={style}/> Dashboard</li>
                    </Link>
                </div>
                <div>
                    <Link to='/student_dashboard/profile' style={{color: "#fff"}}>
                        <li> <BsPersonFill style={style}/> My Profile</li>
                    </Link>
                </div>
                <div>
                    <Link to='/student_dashboard/events' style={{color: "#fff"}}>
                        <li> <MdEventAvailable style={style}/> Events</li>
                    </Link>
                </div>
                <div>
                    <Link to='/student_dashboard/tests' style={{color: "#fff"}}>
                        <li> <AiFillNotification style={style}/> Test Notices</li>
                    </Link>
                </div>
                {/* <div>
                    <Link to='/student_dashboard/timetable' style={{color: "#fff"}}>
                        <li> <FaBusinessTime style={style}/> Timetable</li>
                    </Link>
                </div> */}
                <div>
                    <Link to='/student_dashboard/assessment' style={{color: "#fff"}}> 
                        <li> <MdAssessment style={style}/> Online Assessments</li>
                    </Link>
                </div>
                <div>
                    <Link to='/login' style={{color: "#fff"}}>
                        <li onClick={() => resetStates()}><AiOutlinePoweroff style={style}/> Logout</li>
                    </Link>
                </div>
            </ul>
        </SideStyles>
    )
}

const SideStyles = styled.aside`
    width: 100%;
    height: 100%;
    background-color: rgb(0, 4, 54);

    ul{
        color: #fff;
        padding: 2rem;

        li{
            padding: 1.5rem 0rem;
            position: relative;
            font-size: .8rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
        }

        li:hover{
            color: #E98C00;
        }

        .notices div,
        .forms div{
            padding-bottom: 0rem;
            margin-left: 4rem;
        }

        .notices div li,
        .forms div li{
            padding-top: 0rem;
            margin-bottom: 0rem;
        }

        div{
            position: relative;
        }

        div:before{
            content: "";
            bottom: 0;
            left: -2rem;
            width: calc(100% + 4rem);
            border-bottom: 0.1rem solid grey;
            position: absolute;
        }
    }

    @media screen and (max-width: 500px){
        display: ${(props) => props.toggleMenuShow == true? "block" : "none"};
        position: absolute;
        width: 100vw;
        height: 100%;
        top: 0;
        left: -1rem;
        z-index: 1000;
    }
        
`;


export default StudentSideNavs
