import React from 'react'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoSchoolSharp} from 'react-icons/io5'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {Link} from 'react-router-dom'

const SideNavigation = () => {

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
                <Link to='/' style={{color: "#fff"}}>
                    <li> <AiFillDashboard style={style}/> Dashboard</li>
                </Link>
                <Link to='/teachers' style={{color: "#fff"}}>
                    <li> <GiTeacher style={style}/> Teachers</li>
                </Link>
                <Link to='/students' style={{color: "#fff"}}>
                    <li> <PeopleSharpIcon style={style}/> Students</li>
                </Link>
                <Link to='/parents' style={{color: "#fff"}}>
                    <li> <IoIosPeople style={style}/> Parents</li>
                </Link>
                <Link to='/events' style={{color: "#fff"}}> 
                    <li> <EventAvailableIcon style={style}/> Events</li>
                </Link>
                <Link to='/forms' style={{color: "#fff"}}>
                    <li> <IoSchoolSharp style={style}/> Admission Forms</li>
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
    }
`;

export default SideNavigation