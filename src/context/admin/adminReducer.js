import {
    SEARCH_TEACHERS,
    SEARCH_STUDENTS,
    SEARCH_PARENTS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SEARCH_TEACHERS:
            return{
                ...state,
                teachers: action.payload
            }
        default:
            return state
    }
}

