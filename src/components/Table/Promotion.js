import React, {useContext, useState, useEffect} from 'react'
import {TableStyles} from '../Styles/TableStyles';
import AdminContext from '../../context/admin/adminContext'
import AuthContext from '../../context/authentication/authContext'

const Promotion = () => {

    // Use admin and auth context
    const adminContext = useContext(AdminContext);
    const authContext = useContext(AuthContext);

    // Destructure items
    const {students, teachers, promoteStudent} = adminContext;
    const {role, person_id} = authContext;

    // States
    const [activeClass, setActiveClass] = useState({
        tempStudentId : '',
        active: false
    });

    const [allStudents, setAllStudents] = useState([])
    
    const promoteToNextGrade = (studentId) => {

        // Find student by id
        let student = allStudents.find(student => student.student_id === studentId);

        // Extract grade
        let studentGrade = student.grade;

        // Increment grade
        let studentGradeArr = studentGrade.split(" ");
        let [gradeString, gradeNumber] = studentGradeArr;
        if(gradeNumber < 12){
            gradeNumber++;
            let newGrade = gradeString.concat(" ", gradeNumber);
            // Update grade
            promoteStudent({
                student_id: studentId,
                grade: newGrade
            })
        }

        setActiveClass({
            ...activeClass,
            tempStudentId: " ",
            active : false
        })

    }

    const studentsInTeacherClass = (currentStudents) => {
        // Find current teacher
        const currentTeacher = teachers.find(teacher => teacher.teacher_id === person_id);
        // Find students that are in the same class as teacher
        const tempStudents = currentStudents.filter(student => student.grade === getMatch(student.grade, currentTeacher.classes));
        // Final students that are in teacher's class and doing same subjects
        const myStudents = [];
              currentTeacher.subjects.forEach(subject => {
                  tempStudents.forEach(student => {
                      if(subject === getMatch(subject, student.subjects)){
                        myStudents.push(student);
                      }
                  })
              })
        return [...new Set(myStudents)];
    }

    function getMatch(comparer, dataArrayToCompare){
        for(let counter = 0; counter < dataArrayToCompare.length; counter++){
            if(comparer === dataArrayToCompare[counter]){
                return comparer;
            }
        }
    }

    const toggleActiveClass = (studentId) => {
        setActiveClass({
            ...activeClass,
            tempStudentId: studentId,
            active : !activeClass.active
        })
    }

    const displayStudents = () => {
        return allStudents.map(student => {
            return <tr key={student.id}>
                        <td>{student.student_id}</td>
                        <td>
                            <div></div>
                        </td>
                        <td>{student.fname}</td>
                        <td>{student.lname}</td>
                        <td>{student.gender}</td>
                        <td>{student.grade}</td>
                        <td>
                            <p onClick={() => toggleActiveClass(student.student_id)} className="promote-btn">Promote</p>
                        </td>
                    </tr>
        })
    }

    useEffect(() => {
        if(role == "admin"){
            setAllStudents(students);
        }else if(role == "class teacher"){
            const currentTeacherStudents = studentsInTeacherClass(students);
            setAllStudents(currentTeacherStudents);
            console.log('yey')
        }
    }, [])

    return (
            <TableStyles test ={'red'}>
                {activeClass.active? <div className="backdrop"></div> : null}
                <div className="header">
                    <p>Student Promotion</p>
                </div>
                <table className="teachers-table">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Gender</th>
                            <th>Class</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStudents.length > 0 ? displayStudents() : null}
                    </tbody>
                </table>
                {activeClass.active? <div className="confirm">
                    <p>Warning! This operation will move the current student data to archive and you cannot revert back.</p>
                    <p>Do you want to continue?</p>
                    <div className="buttons">
                        <div onClick={() => promoteToNextGrade(activeClass.tempStudentId)}>Yes</div>
                        <div onClick={() => toggleActiveClass(" ")}>No</div>
                    </div>
                </div>: null}
        </TableStyles>
    )
}

export default Promotion;
