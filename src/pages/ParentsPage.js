import React, {useContext} from 'react'
import AdminContext from '../context/admin/adminContext'
import { withRouter } from 'react-router-dom';

import TopBar from '../components/TopBar/TopBar'
import Parents from '../components/Parents/Parents';
import { ContentStyles } from '../components/Styles/ContentStyles';
import SideNavigation from '../components/SideNavigation';

const ParentsPage = () => {

    // Use admin context
    const adminContext = useContext(AdminContext);

    // Destructure items
    const {parents} = adminContext;
    console.log(parents)

    const parentGrades = [];

    if(parents.length > 0){
        parents.forEach(parent => parent.classes.forEach(grade => parentGrades.push(grade)));
    }

    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Parents</span></p>
                <TopBar icons="parent" grades= {parentGrades} />
                <Parents parents = {parents}/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(ParentsPage);