import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoSchoolSharp} from 'react-icons/io5'
import {AiFillNotification} from 'react-icons/ai'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {Link} from 'react-router-dom'
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io'
import {GoLaw} from 'react-icons/go'
import {AiOutlinePoweroff} from 'react-icons/ai'
import {GiAchievement} from 'react-icons/gi'

import AdminContext from '../context/admin/adminContext'
import StudentContext from '../context/students/studentContext'
import AuthContext from '../context/authentication/authContext'

const SideNavigation = ({menuShow}) => {

    // Use context
    const adminContext = useContext(AdminContext)
    const authContext = useContext(AuthContext)
    const studentContext = useContext(StudentContext)

    // Toggle links state
    const [toggleLinks, setToggleLinks] = useState({
        noticeToggle: false,
        eventToggle: false,
        caseToggle: false,
        formsToggle: false,
    });

    // Reset states
    const resetStates = () => {
        adminContext.resetAdminState();
        studentContext.resetStudentState();
        authContext.logOutUser();
    }

    // Icons styles
    const style = {
        fontSize: "1.5rem",
        color: "rgb(233, 140, 0)",
        cursor: "pointer"
    }

    // Link styles
    const linkStyles={
        color: "#fff"
    }

    return (
        <SideStyles toggleMenuShow = {menuShow}>
            <ul>
                <div>
                    <Link to='/' style={{color: "#fff"}}>
                        <li> <AiFillDashboard style={style}/> Dashboard</li>
                    </Link>
                </div>
                <div>
                    <Link to='/teachers' style={{color: "#fff"}}>
                        <li> <GiTeacher style={style}/> Teachers</li>
                    </Link>
                </div>
                <div>
                    <Link to='/students' style={{color: "#fff"}}>
                        <li> <PeopleSharpIcon style={style}/> Students</li>
                    </Link>
                </div>
                <div>
                    <Link to='/parents' style={{color: "#fff"}}>
                        <li> <IoIosPeople style={style}/> Parents</li>
                    </Link>
                </div>
                <div className="notices">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        caseToggle: !toggleLinks.caseToggle
                    })}><GoLaw style={style}/> Cases {toggleLinks.caseToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                        {toggleLinks.caseToggle? <div>
                            <Link to='/cases' style={{color: "#fff"}}>
                                <li>Student Cases</li>
                            </Link>
                            <Link to='/form/case' style={{color: "#fff"}}>
                                <li>Add Case</li>
                            </Link>
                        </div>: null}
                </div>
                <div className="notices">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        eventToggle: !toggleLinks.eventToggle
                    })}><EventAvailableIcon style={style}/> Events {toggleLinks.eventToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                        {toggleLinks.eventToggle? <div>
                            <Link to='/events' style={{color: "#fff"}}>
                                <li>School Events</li>
                            </Link>
                            <Link to='/form/event' style={{color: "#fff"}}>
                                <li>Add Event</li>
                            </Link>
                        </div>: null}
                </div>
                <div className="notices">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        noticeToggle: !toggleLinks.noticeToggle
                    })}><AiFillNotification style={style}/> Notices {toggleLinks.noticeToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                        {toggleLinks.noticeToggle? <div>
                            <Link to='/notices/upcomingTests' style={{color: "#fff"}}>
                                <li>Test Notices</li>
                            </Link>
                            <Link to='/form/notice' style={{color: "#fff"}}>
                                <li>Add General Notice</li>
                            </Link>
                        </div>: null}
                </div>
                <div className="forms">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        formsToggle: !toggleLinks.formsToggle
                    })}><IoSchoolSharp style={style}/> Admission Forms {toggleLinks.formsToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                    {toggleLinks.formsToggle? <div>
                        <Link to='/form/teacher' style={{color: "#fff"}}>
                            <li>Add Teacher</li>
                        </Link>
                        <Link to='/form/student' style={{color: "#fff"}}>
                            <li>Add Student</li>
                        </Link>
                        <Link to='/form/parent' style={{color: "#fff"}}>
                            <li>Add Parent</li>
                        </Link>
                    </div>: null}
                </div>
                <div>
                    <Link to='/promotion' style={{color: "#fff"}}>
                        <li><GiAchievement style={style}/> Student Promotion</li>
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

export default SideNavigation
