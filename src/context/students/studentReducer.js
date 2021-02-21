import {SEARCH_NOTICES} from '../types'

const StudentReducer = (state, action) => {
    switch(action.type){
        case SEARCH_NOTICES:
            return{
                ...state,
                notices: action.payload.data,
                loading: false,
            }
        default:
            return state
    }
}

export default StudentReducer;