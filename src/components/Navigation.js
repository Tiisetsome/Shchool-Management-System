import React from 'react'
import {NavigationStyles} from '../components/Styles/NavigationStyles'

const Navigation = ({isAuth, logoutHandler}) => {
    return (
        <NavigationStyles isAuth = {isAuth}>
            <h3>School logo</h3>
            <ul>
                <li>John Doe</li>
                <li onClick={() => logoutHandler()}>Logout</li>
            </ul>
        </NavigationStyles>
    )
}

export default Navigation
