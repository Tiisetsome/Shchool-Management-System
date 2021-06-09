import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io'
import {MdEventAvailable, MdAssessment} from 'react-icons/md'
import {FaBusinessTime} from 'react-icons/fa'
import {AiFillNotification} from 'react-icons/ai'
import {BsFileEarmarkCheck} from 'react-icons/bs'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import GroupAddSharp from '@material-ui/icons/GroupAddSharp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {AiOutlinePoweroff} from 'react-icons/ai'
import {GiAchievement} from 'react-icons/gi'

import AdminContext from '../../context/admin/adminContext'
import StudentContext from '../../context/students/studentContext'
import AuthContext from '../../context/authentication/authContext'

const TeacherSideNavs = ({menuShow}) => {

    // Toggle links state
    const [toggleLinks, setToggleLinks] = useState({
        marksToggle: false,
        noticeToggle: false,
        formsToggle: false,
    });

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

    return (
        <SideStyles toggleMenuShow = {menuShow}>
            <ul>
                <div>
                    <Link to='/teacher_dashboard' style={{color: "#fff"}}>
                        <li> <AiFillDashboard style={style}/> Dashboard</li>
                    </Link>
                </div>
                <div>
                    <Link to='/teacher_dashboard/profile' style={{color: "#fff"}}>
                        <li> <GiTeacher style={style}/> My Profile</li>
                    </Link>
                </div>
                <div>
                    <Link to='/teacher_dashboard/events' style={{color: "#fff"}}>
                        <li> <MdEventAvailable style={style}/> Events</li>
                    </Link>
                </div>
                <div className="notices">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        noticeToggle: !toggleLinks.noticeToggle
                    })}><AiFillNotification style={style}/> Notices {toggleLinks.noticeToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                        {toggleLinks.noticeToggle? <div>
                            <Link to='/teacher_dashboard/upcomingTests' style={{color: "#fff"}}>
                                <li>Test Notices</li>
                            </Link>
                            <Link to='/teacher_dashboard/test_notice_add' style={{color: "#fff"}}>
                                <li>Add Test Notice</li>
                            </Link>
                        </div>: null}
                </div>
                {/* <div>
                    <Link to='/teacher_dashboard/timetable' style={{color: "#fff"}}>
                        <li> <FaBusinessTime style={style}/> Timetable</li>
                    </Link>
                </div> */}
                <div>
                    <Link to='/teacher_dashboard/students' style={{color: "#fff"}}>
                        <li> <PeopleSharpIcon style={style}/> Students</li>
                    </Link>
                </div>
                <div>
                    <Link to='/teacher_dashboard/parents' style={{color: "#fff"}}>
                        <li> <GroupAddSharp style={style}/> Parents</li>
                    </Link>
                </div>
                <div>
                    <Link to='/teacher_dashboard/assessment' style={{color: "#fff"}}> 
                        <li> <MdAssessment style={style}/> Online Assessments</li>
                    </Link>
                </div>
                <div className="notices">
                    <li className="from-link" onClick={() => setToggleLinks({
                        ...toggleLinks,
                        marksToggle: !toggleLinks.marksToggle
                    })}><BsFileEarmarkCheck style={style}/> Student Marks {toggleLinks.marksToggle? <IoIosArrowDown style={{fontSize: '1rem', cursor: "pointer"}}/> : <IoIosArrowForward style={{fontSize: '1rem'}}/>}</li>
                        {toggleLinks.marksToggle? <div>
                            <Link to='/form/missedTest' style={{color: "#fff"}}>
                                <li>Add Missed Test</li>
                            </Link>
                            <Link to='/form/marks' style={{color: "#fff"}}>
                                <li>Add Marks</li>
                            </Link>
                        </div>: null}
                </div>
                {authContext.role === "class teacher" ?  <div>
                    <Link to='/teacher_dashboard/promotion' style={{color: "#fff"}}>
                        <li><GiAchievement style={style}/> Student Promotion</li>
                    </Link>
                </div> : null}
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


export default TeacherSideNavs
