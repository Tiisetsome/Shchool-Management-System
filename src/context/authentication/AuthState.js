import {useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {SEARCH_PERSON_AUTH,
        SET_AUTH_ADMIN,
        SET_AUTH_TEACHER,
        SET_AUTH_STUDENT,
        STOP_SESSION} from '../types'
import axios from 'axios'

const AuthState = (props) => {
    
    // Initial state
    const initialState = {
        person_id: '',
        isAuth: false,
        tcAuth: false,
        sdnAuth: false,
        isLoading: false,
        errorMessage: '',
        errorStatus: false,
        role: ''
    }

    // Call reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Search person
    const searchPerson = async (credentials) => {
        
        dispatch({
            type: 'SET_LOADING'
        })

        const res = await axios.post('auth/signIn.php', credentials)
        // const res = await axios.post('auth/signIn.php', credentials)
        const {isAuth, person, role} = res.data
        console.log(res.data)


        if(isAuth && person == 'teacher' && role == 'admin'){
            dispatch({
                type: SET_AUTH_ADMIN,
                payload: {
                    isAuth: isAuth,
                    person_id: credentials.person_id,
                    role: role
                }
            })
        }else if(isAuth && person == 'teacher' && (role == 'teacher' || role == 'class teacher')){
            dispatch({
                type: SET_AUTH_TEACHER,
                payload: {
                    isAuth: isAuth,
                    person_id: credentials.person_id,
                    role: role
                }
            })
        }else if(isAuth && person == 'student'){
            dispatch({
                type: SET_AUTH_STUDENT,
                payload: {
                    isAuth: isAuth,
                    person_id: credentials.person_id,
                    role: role
                }
            })
        } else {

            console.log(isAuth, person, role);
            dispatch({
                type: 'SERVER_CREDENTIALS_ERROR',
                payload: {
                    isAuth: isAuth,
                    role: '',
                    errorMessage: res.data.errorMsg,
                    errorStatus: true,
                }
            })
        }
    }

    // Kill all user sessions
    const logOutUser = () => {
        dispatch({
            type: STOP_SESSION
        })
    }

    return <AuthContext.Provider
        value = {{
            isAuth: state.isAuth,
            tcAuth: state.tcAuth,
            sdnAuth: state.sdnAuth,
            person_id: state.person_id,
            role: state.role,
            errorStatus: state.errorStatus,
            errorMessage: state.errorMessage,
            isLoading: state.isLoading,
            searchPerson: searchPerson,
            logOutUser: logOutUser,
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState;