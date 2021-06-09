import React, {useContext} from 'react'
import {NavigationStyles} from '../components/Styles/NavigationStyles'
import {AiOutlinePoweroff} from 'react-icons/ai'
import {VscAccount} from 'react-icons/vsc'

import AdminContext from '../context/admin/adminContext'
import StudentContext from '../context/students/studentContext'

const Navigation = ({isAuth, logoutHandler, sdnAuth, tcAuth}) => {

    // Use admin context
    const adminContext = useContext(AdminContext)
    const studentContext = useContext(StudentContext)

    // Destructure items
    const {teacher} = adminContext;
    const {student} = studentContext;

    // Reset states
    const resetStates = () => {
        adminContext.resetAdminState();
        studentContext.resetStudentState();
        logoutHandler();
    }

    const style = {
        fontSize: "1rem",
        marginRight: ".8rem",
        color: "red"
    }

    console.log(teacher)

    return (
        <NavigationStyles isAuth = {isAuth} sdnAuth = {sdnAuth} tcAuth={tcAuth}>
            <h3>School logo</h3>
            <ul>
                <li style={{display : "flex", alignItems : "center"}}><VscAccount style={{...style, color: "green"}}/>{tcAuth ? teacher.fname: sdnAuth ? student.fname : 'Admin'}</li>
                <li onClick={() => resetStates()} style={{display : "flex", alignItems : "center"}}><AiOutlinePoweroff style={style}/> Logout</li>
            </ul>
        </NavigationStyles>
    )
}

export default Navigation
