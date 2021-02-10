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

const AdminReducer = (state, action) => {
    switch(action.type) {
        case SEARCH_TEACHERS:
            return{
                ...state,
                teachers: action.payload.data
            }
        case SEARCH_TEACHER:
            return{
                ...state,
                teacher: action.payload
            }
        case SEARCH_STUDENTS:
            return{
                ...state,
                students: action.payload.data
            }
        case SEARCH_STUDENT:
            return{
                ...state,
                student: action.payload
            }
        case SEARCH_STUDENT_MARKS:
            return{
                ...state,
                student_marks: action.payload
            }
        case SEARCH_TESTS:
            return{
                ...state,
                testNotices: action.payload.data
            }
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data
            }
        default:
            return state
    }
}

export default AdminReducer;

