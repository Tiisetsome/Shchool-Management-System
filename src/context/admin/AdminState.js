import React, { useReducer } from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';
import {
    SEARCH_TEACHER,
    SEARCH_TEACHERS,
    ADD_PERSON,
    SEARCH_STUDENTS,
    SEARCH_STUDENT,
    SEARCH_STUDENT_MARKS,
    SEARCH_PARENTS,
    SEARCH_PARENT,
    SEARCH_NOTICES,
    SEARCH_TESTS,
    SEARCH_CASES
} from '../types';

const AdminState = props => {
    const initialState = {
        teachers: [],
        students: [],
        student_marks: [],
        parents: [],
        testNotices: [],
        notices: [],
        cases: [],
        teacher: {},
        student: {},
        parent: {},
        addStatus: {status: false},
        loading: true,
        authenticated: true,
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);

    // Get Tachers
    const searchTeachers = async (query) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/${query}/read.php`);

        if(res.data.message){
            const emptyData = {data: []};
            dispatch({
                type: SEARCH_TEACHERS,
                payload: emptyData
            })
        } else {
            dispatch({
                type: SEARCH_TEACHERS,
                payload: res.data
            })
        }
    }

    // Get Single Teacher
    const searchTeacher = (id) => {
        const teacher = state.teachers.find(teacher => id === teacher.teacher_id);
        
        dispatch({
            type: SEARCH_TEACHER,
            payload: teacher
        })
    }

    // Add New Teacher
    const addPerson = async (details, query) => {
        const res = await axios.post(`http://localhost:4430/sandbox/student-management-system/api/${query}/create.php`, {
            ...details
        })

        console.log(res.data)

        dispatch({
            type: ADD_PERSON,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_PERSON,
                payload: {status: false}
            })
        }, 5000);
    }

    // Get Parents
    const searchParents = async (query) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/${query}/read.php`);
 
        if(res.data.message){
            const emptyData = {data: []};
            dispatch({
                type: SEARCH_PARENTS,
                payload: emptyData
            })
        } else {
            dispatch({
                type: SEARCH_PARENTS,
                payload: res.data
            })
        }
    }

    // Get Single Parent
    const searchParent = (id) => {
        const parent = state.parents.find(parent => id === parent.parent_id);
        
        dispatch({
            type: SEARCH_PARENT,
            payload: parent
        })
    }

   
    // Get Students
    const searchStudents = async (query) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/${query}/read.php`);

        if(res.data.message){
            const emptyData = {data: []};
            dispatch({
                type: SEARCH_STUDENTS,
                payload: emptyData
            })
        } else{
            dispatch({
                type: SEARCH_STUDENTS,
                payload: res.data
            })
        }
      
    }

    // Get Single Student
    const searchStudent = (id) => {
        const student = state.students.find(student => id === student.student_id);
    
        dispatch({
            type: SEARCH_STUDENT,
            payload: student
        })
    }

    // Delete Student
    const deletePerson = async (id, queryLink) => {
        const res = await axios.post(`http://localhost:4430/sandbox/student-management-system/api/${queryLink}/delete.php?`, {
            id: id
        })

        if(queryLink === 'student'){
            searchStudents(queryLink);
        }else if(queryLink === 'teachers'){
            searchTeachers(queryLink);
        }else if(queryLink === 'parents'){
            console.log(queryLink);
            searchParents(queryLink);
        }

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
        if(!res.data.message){
            const student_marks = res.data.data.filter(student => id === student.student_id);

            dispatch({
                type: SEARCH_STUDENT_MARKS,
                payload: student_marks
            })
        }
    }

    // Get Student Cases
    const searchCases = async () => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/cases/read.php`);

        if(res.data.message){
            const emptyData = {data: []};
            dispatch({
                type: SEARCH_CASES,
                payload: emptyData
            })
        } else(
            dispatch({
                type: SEARCH_CASES,
                payload: res.data
            })
        )
    }

    // Get Single person on search
    const getSinglePerson = (id) => {
        let persons = [];
        if(id.charAt(0) === "3"){
             persons = [...state.teachers];
        }else if (id.charAt(0) === "2"){
             persons = [...state.students];
        }else if(id.charAt(0) === "5"){
            persons = [...state.parents];
        }
        const person = persons.find(person => id === person.teacher_id || id === person.student_id || id === person.parent_id);

        return [person]
    }


    return <AdminContext.Provider
        value={{
            teachers: state.teachers,
            teacher: state.teacher,
            students: state.students,
            student: state.student,
            student_marks: state.student_marks,
            parents: state.parents,
            parent: state.parent,
            notices: state.notices,
            testNotices: state.testNotices,
            cases: state.cases,
            addStatus: state.addStatus,
            loading: state.loading,
            authenticated: state.authenticated,
            searchTeachers,
            searchTeacher,
            addPerson,
            searchStudents,
            searchStudent,
            searchStudentMarks,
            searchParents,
            searchNotices,
            searchTestsNotices,
            searchCases,
            getSinglePerson,
            searchParent,
            deletePerson,
        }}
    >
        {props.children}
    </AdminContext.Provider>
}

export default AdminState;