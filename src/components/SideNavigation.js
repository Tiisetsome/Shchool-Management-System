import React from 'react'
import styled from 'styled-components'
import {AiFillDashboard} from 'react-icons/ai'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {IoSchoolSharp} from 'react-icons/io5'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
const SideNavigation = () => {

    //Icons styles
    const style = {
        fontSize: "1.5rem",
        color: "rgb(233, 140, 0)"
    }

    return (
        <SideStyles>
            <ul>
                <li> <AiFillDashboard style={style}/> Dashboard</li>
                <li> <GiTeacher style={style}/> Teachers</li>
                <li> <PeopleSharpIcon style={style}/> Students</li>
                <li> <IoIosPeople style={style}/> Parents</li>
                <li> <EventAvailableIcon style={style}/> Events</li>
                <li> <IoSchoolSharp style={style}/> Admission Forms</li>
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
