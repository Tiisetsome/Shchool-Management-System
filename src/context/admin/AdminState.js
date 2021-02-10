import React, { useReducer } from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';
import {
    SEARCH_TEACHER,
    SEARCH_TEACHERS,
    SEARCH_STUDENTS,
    SEARCH_STUDENT,
    SEARCH_STUDENT_MARKS,
    SEARCH_PARENTS,
    SEARCH_NOTICES,
    SEARCH_TESTS
} from '../types';

const AdminState = props => {
    const initialState = {
        teachers: [],
        students: [],
        student_marks: [],
        testNotices: [],
        notices: [],
        teacher: {},
        student: {},
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);

    // Get Tachers
    const searchTeachers = async (query) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/${query}/read.php`);
    
        dispatch({
            type: SEARCH_TEACHERS,
            payload: res.data
        })
    }

    // Get Single Teacher
    const searchTeacher = (id) => {
        const teacher = state.teachers.find(teacher => id === teacher.teacher_id);
        teacher.classes = teacher.classes.join(', ');

        dispatch({
            type: SEARCH_TEACHER,
            payload: teacher
        })
    }
    // Get Parents
   
    // Get Students
    const searchStudents = async (query) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/${query}/read.php`);
    
        dispatch({
            type: SEARCH_STUDENTS,
            payload: res.data
        })
    }

    // Get Single Student
    const searchStudent = (id) => {
        const student = state.students.find(student => id === student.student_id);
    
        dispatch({
            type: SEARCH_STUDENT,
            payload: student
        })
    }

    // Get Notices
    const searchNotices = async () => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/notices/read.php`);

        dispatch({
            type: SEARCH_NOTICES,
            payload: res.data
        })
    }

    // Get  Tests Notices
    const searchTestsNotices = async () => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/tests/read.php`);

        dispatch({
            type: SEARCH_TESTS,
            payload: res.data
        })
    }

    // Get Student Marks
    const searchStudentMarks = async (id) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/marks/read.php`);
        const student_marks = res.data.data.filter(student => id === student.student_id);

        dispatch({
            type: SEARCH_STUDENT_MARKS,
            payload: student_marks
        })
    }


    return <AdminContext.Provider
        value={{
            teachers: state.teachers,
            teacher: state.teacher,
            students: state.students,
            student: state.student,
            student_marks: state.student_marks,
            notices: state.notices,
            testNotices: state.testNotices,
            searchTeachers,
            searchTeacher,
            searchStudents,
            searchStudent,
            searchStudentMarks,
            searchNotices,
            searchTestsNotices,
        }}
    >
        {props.children}
    </AdminContext.Provider>
}

export default AdminState;