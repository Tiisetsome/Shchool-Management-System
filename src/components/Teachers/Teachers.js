import React from 'react'
import Table from '../Table/Table'

const Teachers = () => {
    return (
        <Table 
            title="Teacher Id"
            heading="All Teachers"
            linkTo = "teachers"
            query= "teachers"
        />
    )
}

export default Teachers
