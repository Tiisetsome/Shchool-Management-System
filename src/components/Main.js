import React from 'react'
import styled from 'styled-components'

import TopSummary from './TopSummary'
import HomeContent from './HomeContent'

const Main = () => {
    return (
        <MainStyles>
            <p>Home - <span>Admin</span></p>
            <TopSummary/>
            <HomeContent/>
        </MainStyles>
    )
}

const MainStyles = styled.section`
    width: 100%;
    padding-top: 3.5rem;

    p{
        color: grey;
        font-size: .8rem;

        span{
            color: rgb(233, 140, 0);
        }
    }
`;

export default Main
