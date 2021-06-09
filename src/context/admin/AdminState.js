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
    ADD_NOTICE,
    SEARCH_TEST_NOTICES,
    SEARCH_MISSED_TESTS,
    SEARCH_CASES,
    SEARCH_EVENTS,
    SEARCH_ASSESSMENTS,
    RESET_STATE,
    ADD_TEST_NOTICE,
    ADD_EVENT,
    ADD_STUDENT_CASE,
    ADD_STUDENT_MARKS,
    ADD_ASSESSMENT,
    UPDATE_PERSON,
    DELETE_NOTICE,
    UPDATE_STUDENT_MARK,
    STOP_SPINNER,
    ADD_MISSED_TEST
} from '../types';

const AdminState = props => {
    const initialState = {
        teachers: [],
        students: [],
        student_marks: [],
        parents: [],
        testNotices: [],
        missed_tests: [],
        notices: [],
        events: [],
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
        //const res = await axios.get(`${query}/read.php`);
        const res = await axios.get(`${query}/read.php`);
        if(!res.data.message) {
            dispatch({
                type: SEARCH_TEACHERS,
                payload: res.data
            })
        }
    }

    //Get Single Teacher
    const searchTeacher = async (id) => {
        //const res = await axios.get(`teachers/read_single.php?id=${id}`)
        const res = await axios.get(`teachers/read_single.php?id=${id}`)
        
        dispatch({
            type: SEARCH_TEACHER,
            payload: res.data
        })
    }

    // Add Person
    const addPerson = async (details, query) => {
        const res = await axios.post(`${query}/create.php`, {
            ...details
        })

        dispatch({
            type: ADD_PERSON,
            payload: {...res.data}
        })

        if(query === "student"){
            searchStudents(query);
        }else if(query === "teachers"){
            searchTeachers(query);
        }else if(query === "parents"){
            searchParents(query);
        }

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_PERSON,
                payload: {status: false}
            })
        }, 5000);
    }
    // Update Person
    const updatePerson = async (details, query) => {
        const res = await axios.put(`${query}/update.php`, {
            ...details
        })

        dispatch({
            type: UPDATE_PERSON,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: UPDATE_PERSON,
                payload: {status: false}
            })
        }, 5000);
    }

    // Get Parents
    const searchParents = async (query) => {
        //const res = await axios.get(`${query}/read.php`);
        const res = await axios.get(`${query}/read.php`);
 
        if(!res.data.message) {
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
        //const res = await axios.get(`${query}/read.php`);
        const res = await axios.get(`student/read.php`);

        if(!res.data.message){
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

    // Promote student to next grade
    const promoteStudent = async (studentPromotionData) => {
        const res = await axios.put('/student/student_promotion/update.php', studentPromotionData);

        if(res.data.updated){
            searchStudents('student');
        }
    }

    // Delete Student
    const deletePerson = async (id, queryLink) => {
        //const res = await axios.post(`${queryLink}/delete.php?`, {
        const res = await axios.put(`${queryLink}/delete.php?`, {
            id: id
        })

        console.log(res.data);
        if(res.data.message){
            if(queryLink === 'student'){
                searchStudents(queryLink);
            }else if(queryLink === 'teachers'){
                searchTeachers(queryLink);
            }else if(queryLink === 'parents'){
                console.log(queryLink);
                searchParents(queryLink);
            }
        }

    }

    // Get Notices
    const searchNotices = async () => {
        //const res = await axios.get(`notices/read.php`);
        const res = await axios.get(`notices/read.php`);

        if(!res.data.message){
            dispatch({
                type: SEARCH_NOTICES,
                payload: res.data
            })
        }
    }

    // Add Notice
    const addNotice = async (notice) => {
        //const res = await axios.post(`notices/create.php?`, notice)
        const res = await axios.post(`notices/create.php?`, notice)
        console.log(res.data)
        dispatch({
            type: ADD_NOTICE,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_NOTICE,
                payload: {status: false}
            })
        }, 5000);
    }

    // Delete general notice
    const deleteGeneralNotice = async (id) => {
        const res = await axios.put('notices/delete.php', {id: id});
        if(res.data.deleted){
            searchNotices();
        }
    }

    // Get  Tests Notices
    const searchTestsNotices = async () => {
        //const res = await axios.get(`tests/read.php`);
        const res = await axios.get(`tests/read.php`);

        if(!res.data.message){
            dispatch({
                type: SEARCH_TEST_NOTICES,
                payload: res.data
            })
        }
    }

    // Add Test Notice
    const addTestNotice = async (testNotice) => {
        //const res = await axios.post(`tests/create.php`, testNotice)
        const res = await axios.post(`tests/create.php`, testNotice)
        
        dispatch({
            type: ADD_TEST_NOTICE,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_TEST_NOTICE,
                payload: {status: false}
            })
        }, 5000);
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

    // Get Student Marks
    const searchStudentMarks = async (id) => {
        //const res = await axios.get(`marks/read.php`);
        const res = await axios.get(`marks/read.php`);
        if(!res.data.message){
            const student_marks = res.data.data.filter(student => id === student.student_id);

            dispatch({
                type: SEARCH_STUDENT_MARKS,
                payload: student_marks
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

    // Add student marks
    const addMarks = async (studentMark) => {
        //const res = await axios.post(`marks/create.php?`, studentMark)
        const res = await axios.post(`marks/create.php?`, studentMark)

        dispatch({
            type: ADD_NOTICE,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_NOTICE,
                payload: {status: false}
            })
        }, 5000);
    }

    // Update student mark
    const updateMarks = async (studentMark) => {
        const res = await axios.put(`marks/update.php`, studentMark);

        if(res.data.updated){
            console.log(res.data)
        }
    }

    // Delete student mark
    const deleteMarks = async (id) => {
        const res = await axios.put(`marks/delete.php`, {id:id})
        console.log(res.data)
        if(res.data.deleted){
            searchStudentMarks(id);
        }
    }

    // Get Student Cases
    const searchCases = async () => {
        //const res = await axios.get(`cases/read.php`);
        const res = await axios.get(`cases/read.php`);

        if(!res.data.message){
            dispatch({
                type: SEARCH_CASES,
                payload: res.data
            })
        }
    }

    // Add student case
    const addCase = async (studentCase) => {
        //const res = await axios.post(`cases/create.php`, studentCase)
        const res = await axios.post(`cases/create.php`, studentCase)
        
        dispatch({
            type: ADD_STUDENT_CASE,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_STUDENT_CASE,
                payload: {status: false}
            })
        }, 5000);
    }

    // Get Events
    const searchEvents = async () => {
        //const res = await axios.get(`events/read.php`);
        const res = await axios.get(`events/read.php`);
        
        if(!res.data.message){
            console.log(res.data)
            dispatch({
                type: SEARCH_EVENTS,
                payload: res.data
            })
        }
    }

    // Add event
    const addEvent = async (schoolEvent) => {
        //const res = await axios.post(`events/create.php`, schoolEvent)
        const res = await axios.post(`events/create.php`, schoolEvent)
        console.log(res.data)
        console.log(schoolEvent)
        
        dispatch({
            type: ADD_EVENT,
            payload: {...res.data}
        })

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_EVENT,
                payload: {status: false}
            })
        }, 5000);
    }

    // Get assessments
    const searchAssessments = async () => {
        //const res = await axios.get(`assessments/read.php`);
        const res = await axios.get(`assessments/read.php`);

        console.log(res.data.data)
        // dispatch({
        //     type: SEARCH_ASSESSMENTS,
        //     payload: res.data
        // })
    }

    // Add student assessment
    const addAssessment = async (assessment) => {
        //const res = await axios.post(`assessments/create.php`, assessment)
        const res = await axios.post(`assessments/create.php`, assessment)
        console.log(res.data)
        
        // dispatch({
        //     type: ADD_ASSESSMENT,
        //     payload: {...res.data}
        // })

        // // Reset the status after sometime
        // setTimeout(() => {
        //     dispatch({
        //         type: ADD_ASSESSMENT,
        //         payload: {status: false}
        //     })
        // }, 5000);
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

    // Add missed test
    const addMissedTest = async (missedTest) => {
        const res = await axios.post(`tests/missedTests/create.php`, missedTest);

        dispatch({
            type: ADD_MISSED_TEST,
            payload: {...res.data}
        })

        console.log(res.data);

        // Reset the status after sometime
        setTimeout(() => {
            dispatch({
                type: ADD_PERSON,
                payload: {status: false}
            })
        }, 5000);

    }

    // Stop loading spinner
    const stopSpinner = () => {
        console.log('Stop spinner fired')
        dispatch({
            type: STOP_SPINNER
        })
    }

    // Reset state
    const resetAdminState = () => {
        dispatch({
            type: RESET_STATE,
        })
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
            events: state.events,
            cases: state.cases,
            testNotices: state.testNotices,
            missed_tests: state.missed_tests,
            cases: state.cases,
            addStatus: state.addStatus,
            loading: state.loading,
            authenticated: state.authenticated,
            searchTeachers,
            searchTeacher,
            addPerson,
            addNotice,
            searchStudents,
            searchStudent,
            searchStudentMarks,
            getStudentSingleMark,
            searchParents,
            searchNotices,
            searchTestsNotices,
            searchMissedTests,
            searchCases,
            getSinglePerson,
            searchParent,
            searchEvents,
            searchAssessments,
            deletePerson,
            resetAdminState,
            addTestNotice,
            addEvent,
            addCase,
            addMarks,
            addAssessment,
            updatePerson,
            promoteStudent,
            deleteGeneralNotice,
            updateMarks,
            deleteMarks,
            stopSpinner,
            addMissedTest
        }}
    >
        {props.children}
    </AdminContext.Provider>
}

export default AdminState;