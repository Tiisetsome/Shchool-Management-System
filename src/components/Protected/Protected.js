import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const Protected = ({isAuth: isAuth, sdnAuth: sdnAuth, component: Component, ...rest}) => {
    console.log(isAuth);
    return (
        <Route {...rest} render={(props) => {
            if(isAuth){
                return <Component/>
            } else if(sdnAuth){
                return <Component/>
            }else{
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        }}/>
    )
}

export default Protected
