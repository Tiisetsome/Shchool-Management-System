import React from 'react'
import SideNavigation from '../components/SideNavigation'
import Promotion from '../components/Table/Promotion'
import {ContentStyles} from '../components/Styles/ContentStyles'
import {withRouter} from 'react-router-dom'

const StudentPromotion = () => {
    return (
        <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Students</span></p>
                <Promotion/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(StudentPromotion);
