import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';

import AdminContext from '../../context/admin/adminContext'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import {ContentStyles} from '../../components/Styles/ContentStyles'
import {TopSummaryStyles} from '../../components/Styles/TopSummaryStyles'
import Table from '../../components/Table/Table'

const RegularTeacherStudents = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {teacher, students} = adminContext;

    // Icons styles
    const style = {
        fontSize: "2rem",
        color: "rgb(38, 218, 203)",
        marginBottom: '1rem'

    }
  
    // Learners to be rendered
    const getStudents = (teacher, learners, groupGrade) => {
        
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

        let finalStudents = [... new Set(finalStudentsArr)]
        let gradeStudents = finalStudents.filter(student => student.grade === groupGrade).length
        
        return {
            allStudents: finalStudents,
            groupedStudents: gradeStudents
        };
    }

    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <div>
                <p className="p-header">Home - <span>Teachers</span></p>
                <TopSummaryStyles classes = {typeof teacher.classes !== "undefined"? teacher.classes.length : null}>
                {typeof teacher.classes !== "undefined"?
                    teacher.classes.map((grade, index) => {
                        return <div key={index} className="cartegory-wrapper">
                                    <div className="cartegory">
                                        <PeopleSharpIcon style={{...style,  color: "rgb(233, 140, 0)"}}/>
                                        <p>{grade}</p>
                                    </div>
                                    <div className="line"></div>
                                    <p className="count">{getStudents(teacher, students, grade).groupedStudents}</p>
                                    {/* <p className="count">{gradesCounter(grade, teacher.subjects, students)}</p> */}
                                </div>
                    }): null
                }
                </TopSummaryStyles>
                <Table 
                    title="Student Id"
                    heading="All Students"
                    linkTo = "teacher_dashboard/students"
                    query = "student"
                    updateLink = "update"
                    //persons = {students}
                    persons = {getStudents(teacher, students).allStudents}
                    role = "teacher" // The role needs to be dynamic
                />
            </div>
        </ContentStyles>
    )
}

export default withRouter(RegularTeacherStudents);
