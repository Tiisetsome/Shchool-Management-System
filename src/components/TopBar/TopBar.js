import React from 'react'
import styled from 'styled-components'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {GiTeacher} from 'react-icons/gi'

import {TopSummaryStyles} from '../Styles/TopSummaryStyles'

const TopBar = ({icons}) => {

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "rgb(38, 218, 203)",
        marginBottom: '1rem'

    }

    // Render icon
    const testing = (icons)=>{
        return  icons == "teacher"? <GiTeacher style={{...style, color: "rgb(9, 95, 95)"}}/>:
                icons == "student"? <PeopleSharpIcon style={{...style,  color: "rgb(233, 140, 0)"}}/>:
                <GroupAddSharpIcon style={style}/>
    }

    return (
        <TopSummaryStyles>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Students</p>
                </div>
                <div className="line"></div>
                <p className="count">520</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">420</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}    
                    <p>Teachers</p>
                </div>
                <div className="line"></div>
                <p className="count">18</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Events</p>
                </div>
                <div className="line"></div>
                <p className="count">5</p>
            </div>
        </TopSummaryStyles>
    )
}

export default TopBar
