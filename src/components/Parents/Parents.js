import React, {useContext} from 'react'
import Table from '../Table/Table'
import AdminContext from '../../context/admin/adminContext'

const Parents = () => {

      // Use admin context
      const adminContext = useContext(AdminContext);

    return (
        <Table 
            heading="All Parents"
            title="Parent Id"
            linkTo="parents"
            query = "parents"
            persons = {adminContext.parents}
        />
    )
}

export default Parents
