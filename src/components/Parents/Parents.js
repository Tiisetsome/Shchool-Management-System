import React, {useContext} from 'react'
import Table from '../Table/Table'
import AdminContext from '../../context/admin/adminContext'

const Parents = () => {

      // Use admin context
      const adminContext = useContext(AdminContext);
      console.log(adminContext.parents)

    return (
        <Table 
            heading="All Parents"
            title="Parent Id"
            linkTo="parents"
            updateLink = "update"
            query = "parents"
            persons = {adminContext.parents}
        />
    )
}

export default Parents
