import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoSchoolSharp} from 'react-icons/io5'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import {Link} from 'react-router-dom'
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io'

import AdminContext from '../context/admin/adminContext'

const SideNavigation = () => {

    const adminContext = useContext(AdminContext);

    // Toggle links state
    const [toggleLinks, setToggleLinks] = useState(false);

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
                <li className="forms">
                    <div onClick={() => setToggleLinks(!toggleLinks)}><IoSchoolSharp style={style}/> Admission Forms {toggleLinks? <IoIosArrowDown style={{fontSize: '1.2rem'}}/> : <IoIosArrowForward style={{fontSize: '1.2rem'}}/>}</div>
                    {toggleLinks? <div>
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
                </li>
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

export default SideNavigation
