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
    SEARCH_CASES,
    SEARCH_TEST_NOTICES,
    SEARCH_MISSED_TESTS,
    SEARCH_EVENTS,
    RESET_STATE,
    ADD_TEST_NOTICE,
    ADD_STUDENT_CASE,
    ADD_EVENT,
    ADD_STUDENT_MARKS,
    ADD_ASSESSMENT,
    UPDATE_PERSON,
    STOP_SPINNER,
    ADD_MISSED_TEST
} from '../types';

const AdminReducer = (state, action) => {
    switch(action.type) {
        case SEARCH_TEACHERS:
            return{
                ...state,
                teachers: action.payload.data,
            }
        case SEARCH_TEACHER:
            return{
                ...state,
                teacher: action.payload
            }
        case ADD_PERSON:
            return{
                ...state,
                addStatus: action.payload
            }
        case UPDATE_PERSON:
            return{
                ...state,
                addStatus: action.payload
            }
        case SEARCH_STUDENTS:
            return{
                ...state,
                students: action.payload.data,
            }
        case SEARCH_STUDENT:
            return{
                ...state,
                student: action.payload
            }
        case SEARCH_PARENTS:
            return{
                ...state,
                parents: action.payload.data,
            }
        case SEARCH_PARENT:
            console.log(action.payload)
            return{
                ...state,
                parent: action.payload
            }
        case SEARCH_STUDENT_MARKS:
            return{
                ...state,
                student_marks: action.payload
            }
        case SEARCH_TEST_NOTICES:
            return{
                ...state,
                testNotices: action.payload.data,
            }
        case SEARCH_MISSED_TESTS:
            return{
                ...state,
                missed_tests: action.payload.data
            }
        case ADD_MISSED_TEST:
        return{
            ...state,
            addStatus: action.payload
        }
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data,
            }
        case ADD_NOTICE:
            return{
                ...state,
                addStatus: action.payload
            }
        case SEARCH_CASES:
            return{
                ...state,
                cases: action.payload.data
            }
        case SEARCH_EVENTS:
            return{
                ...state,
                events: action.payload.data
            }
        case ADD_TEST_NOTICE:
            return{
                ...state,
                addStatus: action.payload
            }
        case ADD_EVENT:
            return{
                ...state,
                addStatus: action.payload
            }
        case ADD_STUDENT_CASE:
            return{
                ...state,
                addStatus: action.payload
            }
        case ADD_STUDENT_MARKS:
            return{
                ...state,
                addStatus: action.payload
            }
        case ADD_ASSESSMENT:
            return{
                ...state,
                addStatus: action.payload
            }
        case STOP_SPINNER:
            return{
                ...state,
                loading: false
            }
        case RESET_STATE:
            return{
                ...state,
                teachers: [],
                students: [],
                student_marks: [],
                parents: [],
                testNotices: [],
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
        default:
            return state
    }
}

export default AdminReducer;

