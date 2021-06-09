import React, {useReducer} from 'react'
import StudentContext from './studentContext';
import StudentReducer from './studentReducer';
import {
    SEARCH_STUDENT,
    SEARCH_NOTICES,
    SEARCH_STUDENT_MARKS,
    SEARCH_TEST_NOTICES,
    SEARCH_MISSED_TESTS,
    SEARCH_ASSESSMENTS,
    SEND_MARKS,
    RESET_STATE,
    ASSESSMENT_PRIVILEGE,
    RESET_MARKS,
    STOP_SPINNER
} from '../types'
import axios from 'axios';

const StudentState = (props) => {

    const initialState = {
        student: {},
        notices: [],
        test_notices: [],
        missed_tests: [],
        student_marks: [],
        assessment_marks: {marked: false},
        student_assessments: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(StudentReducer, initialState);

    // Get Student
    const searchStudent = async (id) => {
        //const res = await axios.get(`student/read.php?id=${id}`);
        const res = await axios.get(`student/read.php?id=${id}`);
    
        // NOTE: YOU NEED TO CHANGE THIS BEHAVIOR
    
        dispatch({
            type: SEARCH_STUDENT,
            payload: res.data.data.filter(student => student.student_id === id)[0]
        })
    }

    // Get notices
    const searchNotices = async () => {
        //const res = await axios.get(`notices/read.php`);
        const res = await axios.get(`notices/read.php`);
        //You need to fix this behaviour
        console.log('Search notices called')
        console.log(res.data)
        if(!res.data.message){
            dispatch({
                type: SEARCH_NOTICES,
                payload: res.data
            })
        }

    }

    // Get Student Marks
    const searchStudentMarks = async (id) => {
        //const res = await axios.get(`marks/read.php`);
        const res = await axios.get(`marks/read.php`);
         if(!res.data.message){
            const student_mark = await res.data.data.filter(student => id === student.student_id);
            dispatch({
                type: SEARCH_STUDENT_MARKS,
                payload: student_mark
            })
        }
    }

    const getStudentSingleMark = (searchType) => {
        const filteredMarks = state.student_marks.filter(mark => mark.type === searchType);
        
        if(filteredMarks.length > 0){
            dispatch({
                type: SEARCH_STUDENT_MARKS,
                payload: filteredMarks
            })
        }
    }

    // Get test notices
    const searchTestNotices = async () => {
        //const res = await axios.get(`tests/read.php`);
        const res = await axios.get(`tests/read.php`);

        if(!res.data.message){
            dispatch({
                type: SEARCH_TEST_NOTICES,
                payload: res.data
            })
        }
    }

    // Get missed tests
    const searchMissedTests = async (id) => {
        //const res = await axios.get(`tests/missedTests/read.php?id=${id}`);
        const res = await axios.get(`tests/missedTests/read.php?id=${id}`);

        if(!res.data.message){
            dispatch({
                type: SEARCH_MISSED_TESTS,
                payload: res.data
            })
        }
    }

     // Get assessments
    const searchAssessments = async () => {
        const res = await axios.get(`assessments/read.php`);
        // const res = await axios.get(`assessments/read.php`);
        if(!res.data.message){
            dispatch({
                type: SEARCH_ASSESSMENTS,
                payload: res.data
            })
        } 
    }

    // Send Assessment Marks
    const sendMarks = async (assessment_marks) => {
        //const res = await axios.post(`assessments/marking.php`, assessment_marks);
        const res = await axios.post(`assessments/marking.php`, assessment_marks);

        dispatch({
            type: SEND_MARKS,
            payload: res.data
        })
    }

    // Disable  Assessment Privilege
    const stopPrivileges = async (student_id, privilege_id) => {
        //const res = await axios.put(`assessments/disable.php`, {
        const res = await axios.put(`assessments/disable.php`, {
            student_id,
            privilege_id
        });

        console.log(res.data)

        // dispatch({
        //     type: SEND_MARKS,
        //     payload: res.data
        // })
    }

    // Reset Marks Status
    const resetMarksStatus = () => {
        dispatch({
            type: RESET_MARKS
        })
    }

    // Stop loading spinner
    const stopSpinner = () => {
        console.log('Stop spinner fired')
        dispatch({
            type: STOP_SPINNER
        })
    }

    // Reset student state
    const resetStudentState = () => {
        dispatch({
            type: RESET_STATE
        })
    }

    return (
        <StudentContext.Provider
            value = {{
                student: state.student,
                notices: state.notices,
                test_notices: state.test_notices,
                missed_tests: state.missed_tests,
                loading: state.loading,
                student_marks: state.student_marks,
                student_assessments: state.student_assessments,
                assessment_marks: state.assessment_marks,
                searchStudent,
                searchNotices,
                searchTestNotices,
                searchMissedTests,
                searchStudentMarks,
                getStudentSingleMark,
                getStudentSingleMark,
                searchAssessments,
                sendMarks,
                stopPrivileges,
                resetStudentState,
                resetMarksStatus,
                stopSpinner,
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState
