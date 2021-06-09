import React from 'react'
import TeacherSideNavs from '../../components/SideNavigations/TeacherSideNavs'
import Promotion from '../../components/Table/Promotion'
import {ContentStyles} from '../../components/Styles/ContentStyles'
import {withRouter} from 'react-router-dom'

const RegularTeacherStudentPromotion = () => {
    return (
        <ContentStyles>
            <TeacherSideNavs/>
            <div>
                <p className="p-header">Home - <span>Students</span></p>
                <Promotion/>
            </div>
        </ContentStyles>
    )
}

export default withRouter(RegularTeacherStudentPromotion);
