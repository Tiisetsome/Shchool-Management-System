import {
    SEARCH_STUDENT,
    SEARCH_NOTICES,
    SEARCH_STUDENT_MARKS,
    SEARCH_TEST_NOTICES,
    SEARCH_MISSED_TESTS,
    SEARCH_ASSESSMENTS,
    SEND_MARKS,
    RESET_STATE,
    RESET_MARKS,
    STOP_SPINNER
} from '../types'

const StudentReducer = (state, action) => {
    switch(action.type){
        case SEARCH_STUDENT:
            return{
                ...state,
                student: action.payload
            }
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data,
            }
        case SEARCH_STUDENT_MARKS:
            return{
                ...state,
                student_marks: action.payload
            }
        case SEARCH_TEST_NOTICES:
            return{
                ...state,
                test_notices: action.payload.data
            }
        case SEARCH_MISSED_TESTS:
            return{
                ...state,
                missed_tests: action.payload.data
            }
        case SEARCH_ASSESSMENTS:
            return{
                ...state,
                student_assessments: action.payload.data
            }
        case SEND_MARKS:
            return{
                ...state,
                assessment_marks: action.payload
            }
        case RESET_MARKS:
            return{
                ...state,
                assessment_marks: {marked: false}
            }
        case STOP_SPINNER:
            return{
                ...state,
                loading: false
            }
        case RESET_STATE:
            return{
                ...state,
                student: {},
                notices: [],
                test_notices: [],
                missed_tests: [],
                student_marks: [],
                assessment_marks: {marked: false},
                student_assessments: [],
                loading: true,
            }
        default:
            return state
    }
}

export default StudentReducer;