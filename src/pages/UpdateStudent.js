import React from 'react'
import {ContentStyles} from '../components/Styles/ContentStyles'
import {FormStyles} from '../components/Styles/FormStyles'
import SideNavigation from '../components/SideNavigation'
import UpdateStudentForm from '../components/Forms/update/UpdateStudentForm'

const UpdateStudent = () => {
    return (
        <ContentStyles>
            <SideNavigation/>
            <UpdateStudentForm/>
        </ContentStyles>
    )
}

export default UpdateStudent
