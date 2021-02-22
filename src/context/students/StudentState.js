import React, {useReducer} from 'react'
import StudentContext from './studentContext';
import StudentReducer from './studentReducer';
import {
    SEARCH_STUDENT,
    SEARCH_NOTICES,
    SEARCH_STUDENT_MARKS
} from '../types'
import axios from 'axios';

const StudentState = (props) => {

    const initialState = {
        student: {},
        notices: [],
        student_marks: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(StudentReducer, initialState);

    // Get Student
    const searchStudent = async (id) => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/student/read.php?id=${id}`);
    
        dispatch({
            type: SEARCH_STUDENT,
            payload: res.data
        })
    }

    // Get notices
    const searchNotices = async () => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/notices/read.php`);

        dispatch({
            type: SEARCH_NOTICES,
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

    return (
        <StudentContext.Provider
            value = {{
                student: state.student,
                notices: state.notices,
                loading: state.loading,
                student_marks: state.student_marks,
                searchStudent: searchStudent,
                searchNotices: searchNotices,
                searchStudentMarks: searchStudentMarks,
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState
