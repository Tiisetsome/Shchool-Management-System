import React from 'react'
import styled from 'styled-components'

const Navigation = () => {
    return (
        <NavigationStyles>
            <h3>School logo</h3>
            <ul>
                <li>John Doe</li>
                <li>Logout</li>
            </ul>
        </NavigationStyles>
    )
}

const NavigationStyles = styled.nav`
    padding: 2rem;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    h3{
        margin-bottom: 0rem;
    }

    ul{
        width: 10rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li{
            font-family: Montserrat-Medium;
            font-size: .7rem;
        }
    }
`;

export default Navigation
