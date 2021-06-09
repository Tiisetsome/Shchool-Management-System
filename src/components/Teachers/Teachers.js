import React, {useContext} from 'react'
import Table from '../Table/Table'
import AdminContext from '../../context/admin/adminContext'

const Teachers = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);
    return (
        <Table 
            title="Teacher Id"
            heading="All Teachers"
            linkTo = "teachers"
            updateLink = "update"
            query= "teachers"
            persons = {adminContext.teachers}
        />
    )
}

export default Teachers
