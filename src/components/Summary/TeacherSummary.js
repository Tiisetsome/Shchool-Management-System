import React, {useContext} from 'react'
import {GoLaw} from 'react-icons/go'
import {TiMessages} from 'react-icons/ti'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import styled from 'styled-components'

import AdminContext from '../../context/admin/adminContext'
import {TopSummaryStyles} from '../Styles/TopSummaryStyles';

const TeacherSummary = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {students, parents, teacher, cases, notices} = adminContext;

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "#fff",
        marginBottom: '.5rem'
    }

    // Count persons
    const countPersons = (teacher, learners, studentCases) => {
        console.log(learners)
        console.log(teacher);
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

    const countParents = (allParents) => {
        let counter = 0;
        allParents.forEach(parent => {
            parent.classes.forEach(parentClasses => {
                counter++;
            })
        })

        return counter;
    }

    // Inline styles
    const tests = {backgroundImage:"linear-gradient(rgb(13, 233, 148), rgb(0, 129, 80))", color: "#fff !important"}
    const learners = {backgroundImage:"linear-gradient(rgb(245, 71, 115), rgb(153, 8, 44))", color: "#fff !important"}
    const messages = {backgroundImage:"linear-gradient(rgb(231, 175, 55), rgb(141, 99, 7))", color: "#fff !important"}
    const studentCases = {backgroundImage:"linear-gradient(rgb(45, 60, 88), rgb(15, 26, 46))", color: "#fff !important"}

    return (
        <TeacherStyles>
            <div style={tests} className="cartegory-wrapper">
                <div className="cartegory">
                    <PeopleSharpIcon style={style}/>        
                    <p>Students</p>
                </div>
                <div className="line"></div>
                <p className="count">{Object.keys(teacher).length > 0 && students.length> 0 ? countPersons(teacher, students).finalStudents : 0}</p>
            </div>
            <div style={learners} className="cartegory-wrapper">
                <div className="cartegory">
                    <PeopleSharpIcon style={style}/>
                    <p>Parents</p>
                </div>
                <div className="line"></div>
                <p className="count">{parents.length > 0 && Object.keys(teacher).length > 0 ? countParents(parents) : 0}</p>
            </div>
            <div style={messages} className="cartegory-wrapper">
                <div className="cartegory">
                    <TiMessages style={style}/>
                    <p>Notices</p>
                </div>
                <div className="line"></div>
                <p className="count">{notices.length}</p>
            </div>
            <div style={studentCases} className="cartegory-wrapper">
                <div className="cartegory">
                    <GoLaw style={{...style, fontSize: '2rem', marginBottom: '.5rem'}}/>
                    <p>Cases</p>
                </div>
                <div className="line"></div>
                <p className="count">{Object.keys(teacher).length > 0 && students.length > 0 ? countPersons(teacher, students, cases).finalCases : 0}</p>
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
