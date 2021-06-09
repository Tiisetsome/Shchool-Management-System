import React, {useContext, useEffect} from 'react'
import {IoDocumentTextSharp} from 'react-icons/io5'
import {GoLaw} from 'react-icons/go'
import {IoIosPeople} from 'react-icons/io'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import styled from 'styled-components'
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

import {TopSummaryStyles} from '../Styles/TopSummaryStyles'

const TeacherSummary = () => {

    // Use admin and auth context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const {teacher, students, cases, events, testNotices, notices, parents, searchTestsNotices} = adminContext;
    const {role} = authContext;

    const countPersons = (teacher, learners, studentCases) => {

        // Filter learners by teacher's grades
        let filteredStudents = [];
        let grades = teacher.classes;
        let subjects = teacher.subjects;
        for(let i = 0; i < learners.length; i++){
            let matchedLearners = learners.filter(learner => learner.grade == grades[i] ? learner : null)
            if(matchedLearners.length > 0){
                filteredStudents = [...filteredStudents, ...matchedLearners]
            }
        }

        // Filter learners by teacher's subjects
        let finalStudentsArr= []
        for(let z = 0; z < learners.length; z++){
             filteredStudents.filter(student => student.subjects[z] === std(student.subjects[z], subjects, student))
        }

        function std(stdValue, subjects, student){
            subjects.forEach(sub => {
                if(sub == stdValue ){
                    finalStudentsArr = [...finalStudentsArr, student]
                    return sub;
                }
            })
        }

        let finalFilteredStudents = [... new Set(finalStudentsArr)]
        let studentIDs = []
        let studentIDsCases = []
        let finalStudentCase = []
        if(typeof studentCases !== "undefined"){
            finalFilteredStudents.forEach(newStd => studentIDs.push(newStd.student_id));
            studentCases.forEach(studentCase => studentIDsCases.push(studentCase.student_id))
            finalStudentCase = studentIDs.filter(studentID => studentIDsCases.includes(studentID))
        }

        // Count array lengths
        const finalStudents = [... new Set(finalStudentsArr)].length
        const finalCases = finalStudentCase.length
        
        return {
            finalStudents,
            finalCases
        };
    }

    useEffect(() => {
        searchTestsNotices();
    }, [])

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "#fff",
        marginBottom: '.5rem'
    }

    // Inline styles
    const tests = {backgroundImage:"linear-gradient(rgb(13, 233, 148), rgb(0, 129, 80))", color: "#fff !important"}
    const stusentStyles = {backgroundImage:"linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44))", color: "#fff !important"}
    const messages = {backgroundImage:"linear-gradient(rgb(231, 175, 55), rgb(141, 99, 7))", color: "#fff !important"}
    const casesStyles = {backgroundImage:"linear-gradient(rgb(45, 60, 88), rgb(15, 26, 46))", color: "#fff !important"}
    return (
             <TeacherStyles>
            <div style={tests} className="cartegory-wrapper">
                <div className="cartegory">
                    <IoDocumentTextSharp style={style}/>
                    <p>Upcoming Tests</p>
                </div>
                <div className="line"></div>
                <p className="count">{testNotices.length > 0 ? testNotices.length : 0}</p>
            </div>
            <div style={stusentStyles} className="cartegory-wrapper">
                <div className="cartegory">
                <IoIosPeople style={{...style, fontSize: '2.2rem', marginBottom: '0.4rem'}}/>
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">{parents.length}</p>
            </div>
            <div style={messages} className="cartegory-wrapper">
                <div className="cartegory">
                    <EventAvailableIcon style={style}/>
                    <p>Events</p>
                </div>
                <div className="line"></div>
                <p className="count">{events.length}</p>
            </div>
            <div style={casesStyles} className="cartegory-wrapper">
                <div className="cartegory">
                    <GoLaw style={{...style, fontSize: '2rem', marginBottom: '.5rem'}}/>
                    <p>Cases</p>
                </div>
                <div className="line"></div>
                <p className="count">{role == "admin" ? cases.length : countPersons(teacher, students, cases).finalCases}</p>
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
