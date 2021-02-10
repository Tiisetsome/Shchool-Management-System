import React from 'react'
import Table from '../Table/Table'

const Students = () => {
    return (
      <Table 
        title="Student Id"
        heading="All Students"
        linkTo = "students"
        query = "student"
      />
    )
}

export default Students
