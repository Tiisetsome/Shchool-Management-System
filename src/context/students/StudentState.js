import React, {useReducer} from 'react'
import StudentContext from './studentContext';
import StudentReducer from './studentReducer';
import {SEARCH_NOTICES} from '../types'
import axios from 'axios';

const StudentState = (props) => {

    const initialState = {
        notices: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(StudentReducer, initialState);

    // Get notices
    const searchNotices = async () => {
        const res = await axios.get(`http://localhost:4430/sandbox/student-management-system/api/notices/read.php`);

        dispatch({
            type: SEARCH_NOTICES,
            payload: res.data
        })
    }

    return (
        <StudentContext.Provider
            value = {{
                notices: state.notices,
                loading: state.loading,
                searchNotices: searchNotices
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState
