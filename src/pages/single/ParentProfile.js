import React from 'react'
import { withRouter } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';

import SingleParent from '../../components/SinglePerson/SingleParent';
import { ContentStyles } from '../../components/Styles/ContentStyles';

const ParentProfile = () => {
    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Parent</span></p>
                <SingleParent/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(ParentProfile);
