import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import SideNavigation from './SideNavigation'
import Main from './Main'

const Content = () => {
    return (
        <ContentStyles>
          <SideNavigation/>
          <Main/>
        </ContentStyles>
    )
}

const ContentStyles = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr;
    grid-gap: 2rem; 
    margin-right: 2rem;
`;

export default withRouter(Content);
