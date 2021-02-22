import {
    SEARCH_STUDENT,
    SEARCH_NOTICES,
    SEARCH_STUDENT_MARKS
} from '../types'

const StudentReducer = (state, action) => {
    switch(action.type){
        case SEARCH_STUDENT:
            return{
                ...state,
                student: action.payload.data[0]
            }
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data,
                loading: false,
            }
        case SEARCH_STUDENT_MARKS:
            return{
                ...state,
                student_marks: action.payload.data
            }
        default:
            return state
    }
}

export default StudentReducer;