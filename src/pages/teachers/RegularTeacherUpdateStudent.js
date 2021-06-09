import React from 'react'
import {ContentStyles} from '../../components/Styles/ContentStyles'
import {FormStyles} from '../../components/Styles/FormStyles'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import UpdateStudentForm from '../../components/Forms/update/UpdateStudentForm'

const RegularTeacherUpdateStudent = () => {
    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <UpdateStudentForm/>
        </ContentStyles>
    )
}

export default RegularTeacherUpdateStudent
