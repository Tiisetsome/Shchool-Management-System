import {SET_AUTH_TEACHER,
        SET_AUTH_ADMIN,
        SET_AUTH_STUDENT,
        STOP_SESSION} from '../types'

const AuthReducer = (state, action) => {
    switch(action.type){
        case SET_AUTH_ADMIN:
            return{
                ...state,
                person_id: action.payload.person_id,
                isAuth: action.payload.isAuth,
                role: action.payload.role,
                errorStatus: false,
                errorMessage: '',
                isLoading: false
            }
        case SET_AUTH_TEACHER:
            return{
                ...state,
                person_id: action.payload.person_id,
                tcAuth: action.payload.isAuth,
                role: action.payload.role,
                errorStatus: false,
                errorMessage: '',
                isLoading: false
            }
        case SET_AUTH_STUDENT:
            return{
                ...state,
                person_id: action.payload.person_id,
                sdnAuth: action.payload.isAuth,
                role: action.payload.role,
                errorStatus: false,
                errorMessage: '',
                isLoading: false
            }
        case 'SERVER_CREDENTIALS_ERROR':
            return{
                ...state,
                errorMessage: action.payload.errorMessage,
                errorStatus: action.payload.errorStatus,
                isLoading: false
            }
        case 'SET_LOADING':
            return{
                ...state,
                isLoading: true
            }
        case STOP_SESSION:
            return{
                ...state,
                person_id: '',
                isAuth: false,
                tcAuth: false,
                sdnAuth: false,
                errorMessage: '',
                errorStatus: false,
                isLoading: false
            }
        default:
            return state
    }
}

export default AuthReducer;