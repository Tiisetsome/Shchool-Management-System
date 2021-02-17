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
    SEARCH_CASES,
    SEARCH_TESTS
} from '../types';

const AdminReducer = (state, action) => {
    switch(action.type) {
        case SEARCH_TEACHERS:
            return{
                ...state,
                teachers: action.payload.data,
                loading: false,
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
        case SEARCH_STUDENTS:
            return{
                ...state,
                students: action.payload.data,
                loading: false,
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
                loading: false,
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
        case SEARCH_TESTS:
            return{
                ...state,
                testNotices: action.payload.data,
                loading: false,
            }
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data,
                loading: false,
            }
        case SEARCH_CASES:
            return{
                ...state,
                cases: action.payload.data
            }
        default:
            return state
    }
}

export default AdminReducer;

