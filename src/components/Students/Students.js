import React, {useContext} from 'react'
import Table from '../Table/Table'
import AdminContext from '../../context/admin/adminContext'

const Students = () => {

   // Use admin context
   const adminContext = useContext(AdminContext);

    return (
      <Table 
        title="Student Id"
        heading="All Students"
        linkTo = "students"
        updateLink = "update"
        query = "student"
        persons = {adminContext.students}
      />
    )
}

export default Students
