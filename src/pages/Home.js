import React from 'react'
import {withRouter} from 'react-router-dom'

import TopSummary from '../components/TopSummary'
import HomeContent from '../components/HomeContent'
import { ContentStyles } from '../components/Styles/ContentStyles'
import SideNavigation from '../components/SideNavigation'

const Home = () => {
    return (
      <ContentStyles>
            <SideNavigation/>
            <div>
                <p className="p-header">Home - <span>Admin</span></p>
                <TopSummary/>
                <HomeContent/>
            </div>
    </ContentStyles>
    )
}

export default withRouter(Home);
