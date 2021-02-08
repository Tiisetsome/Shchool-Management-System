import React from 'react'
import {IoDocumentTextSharp} from 'react-icons/io5'
import {GoLaw} from 'react-icons/go'
import {TiMessages} from 'react-icons/ti'
import {GiTeacher} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import styled from 'styled-components'

import {TopSummaryStyles} from '../Styles/TopSummaryStyles'

const TeacherSummary = () => {

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "#fff",
        marginBottom: '.5rem'
    }

    // Inline styles
    const tests = {backgroundImage:"linear-gradient(rgb(13, 233, 148), rgb(0, 129, 80))", color: "#fff !important"}
    const students = {backgroundImage:"linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44))", color: "#fff !important"}
    const messages = {backgroundImage:"linear-gradient(rgb(231, 175, 55), rgb(141, 99, 7))", color: "#fff !important"}
    const cases = {backgroundImage:"linear-gradient(rgb(45, 60, 88), rgb(15, 26, 46))", color: "#fff !important"}
    return (
             <TeacherStyles>
            <div style={tests} className="cartegory-wrapper">
                <div className="cartegory">
                    <IoDocumentTextSharp style={style}/>
                    <p>Upcoming Tests</p>
                </div>
                <div className="line"></div>
                <p className="count">520</p>
            </div>
            <div style={students} className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/parents.svg" alt=""/> */}
                    <PeopleSharpIcon style={style}/>
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">420</p>
            </div>
            <div style={messages} className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/teacher.svg" alt=""/> */}
                    <TiMessages style={style}/>
                    <p>Messages</p>
                </div>
                <div className="line"></div>
                <p className="count">18</p>
            </div>
            <div style={cases} className="cartegory-wrapper">
                <div className="cartegory">
                    {/* <img src="/imgs/event.svg" alt=""/> */}
                    <GoLaw style={{...style, fontSize: '2rem', marginBottom: '.5rem'}}/>
                    <p>Cases</p>
                </div>
                <div className="line"></div>
                <p className="count">5</p>
            </div>
        </TeacherStyles>
    )
}

const TeacherStyles = styled(TopSummaryStyles)`
    .cartegory-wrapper{
        p{
            color: #fff;
        }
    }
`;

export default TeacherSummary
