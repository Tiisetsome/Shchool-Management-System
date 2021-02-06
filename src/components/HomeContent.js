import React from 'react'
import styled from 'styled-components'

const HomeContent = () => {
    return (
        <HomeContentStyles>
            <div className='calender'></div>
            <div className = 'notices'></div>
        </HomeContentStyles>
    )
}

const HomeContentStyles = styled.section`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    margin-bottom: 3rem;

    .calender{
        height: 20rem;
        background-color: pink;
    }

    .notices {
        background-color: orange;
    }
`;

export default HomeContent
