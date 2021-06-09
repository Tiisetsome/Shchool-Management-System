import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {GiTeacher} from 'react-icons/gi'
import AdminContext from '../context/admin/adminContext'

import {TopSummaryStyles} from './Styles/TopSummaryStyles'

const TopSummary = () => {

    // Use Admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teachers, students, parents, notices} = adminContext;

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "rgb(38, 218, 203)",
        marginBottom: '.5rem'

    }

    const countParents = (allParents) => {
        let counter = 0;
        allParents.forEach(parent => {
            parent.classes.forEach(parentClasses => {
                counter++;
            })
        })

        return counter;
    }
    console.log('Top summary rendered')

    return (
        <TopSummaryStyles>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    <PeopleSharpIcon style={style}/>
                    <p>Students</p>
                </div>
                <div className="line"></div>
                <p className="count">{students.length}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    <GroupAddSharpIcon style={{...style,  color: "rgb(233, 140, 0)"}}/>
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">{parents.length > 0 ? countParents(parents) : 0}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    <GiTeacher style={{...style, fontSize: '1.5rem', color: "rgb(9, 95, 95)"}}/>
                    <p>Teachers</p>
                </div>
                <div className="line"></div>
                <p className="count">{teachers.length}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    <EventAvailableIcon style={{fontSize: '1.5rem', marginBottom: '.5rem', color: "rgb(241, 55, 157)"}}/>
                    <p>Notices</p>
                </div>
                <div className="line"></div>
                <p className="count">{notices.length}</p>
            </div>
        </TopSummaryStyles>
    )
}

export default TopSummary
