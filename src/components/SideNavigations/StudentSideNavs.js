import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoSchoolSharp} from 'react-icons/io5'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io'

const StudentSideNavs = () => {

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
        <SideStyles>
            <ul>
                <Link to='/student_dashboard' style={{color: "#fff"}}>
                    <li> <AiFillDashboard style={style}/> Dashboard</li>
                </Link>
                <Link to='/student_dashboard/profile' style={{color: "#fff"}}>
                    <li> <GiTeacher style={style}/> My Profile</li>
                </Link>
                <Link to='/student_dashboard/events' style={{color: "#fff"}}>
                    <li> <PeopleSharpIcon style={style}/> Events</li>
                </Link>
                <Link to='/parents' style={{color: "#fff"}}>
                    <li> <IoIosPeople style={style}/> Timetable</li>
                </Link>
                <Link to='/events' style={{color: "#fff"}}> 
                    <li> <EventAvailableIcon style={style}/> Online Assessments</li>
                </Link>
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
        }

        li:before{
            content: "";
            bottom: 0;
            left: -2rem;
            width: calc(100% + 4rem);
            border-bottom: 0.1rem solid grey;
            position: absolute;
        }

        li.forms{
            display: block;
        }

        div:first-child{
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
        }

        div:last-child{
            
        }

        div:last-child li{
            margin-left: 4rem;
            padding-bottom: .5rem;
            cursor: pointer;
        }

        div:last-child li:before{
            border-bottom : none;
        }
    }
`;


export default StudentSideNavs
