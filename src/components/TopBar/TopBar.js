import React from 'react'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import GroupAddSharpIcon from '@material-ui/icons/GroupAddSharp';
import {GiTeacher} from 'react-icons/gi'

import {TopSummaryStyles} from '../Styles/TopSummaryStyles'

const TopBar = ({icons, grades}) => {

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

    // Count grades
    const gradesCount = (gradeArr, teacherGrade) => gradeArr.filter(grade => grade === teacherGrade).length;
    

    return (
        <TopSummaryStyles>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Grade 8</p>
                </div>
                <div className="line"></div>
                <p className="count">{gradesCount(grades, "Grade 8")}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Grade 9</p>
                </div>
                <div className="line"></div>
                <p className="count">{gradesCount(grades, "Grade 9")}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}    
                    <p>Grade 10</p>
                </div>
                <div className="line"></div>
                <p className="count">{gradesCount(grades, "Grade 10")}</p>
            </div>
            <div className="cartegory-wrapper">
                <div className="cartegory">
                    {testing(icons)}
                    <p>Grade 11</p>
                </div>
                <div className="line"></div>
                <p className="count">{gradesCount(grades, "Grade 11")}</p>
            </div>
        </TopSummaryStyles>
    )
}

export default TopBar
