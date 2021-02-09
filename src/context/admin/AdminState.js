import React, { useReducer } from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';
import {
    SEARCH_TEACHERS,
    SEARCH_STUDENTS,
    SEARCH_PARENTS
} from '../types';

const AdminState = props => {
    const initialState = {
        teachers: [],
        teacher: {}
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);

    // Get Tachers
    const searchTeachers = async () => {
        const res = await axios.get('http://localhost:4430/sandbox/student-management-system/api/teachers/read.php');
        console.log(await res);

        dispatch({
            type: SEARCH_TEACHERS,
            payload: res.data
        })
    }
    // Get Parents

    // Get Students

    return <AdminContext.Provider
        value={{
            teachers: initialState.teachers,
            teacher: initialState.teacher,
            searchTeachers,
        }}
    >
        {props.children}
    </AdminContext.Provider>
}

export default AdminState;