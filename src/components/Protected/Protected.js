import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const Protected = ({isAuth: isAuth, person_id: person_id, sdnAuth: sdnAuth, tcAuth: tcAuth, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            if(isAuth){
                console.log('yey')
                return <Component/>
            }else if(sdnAuth){
                return <Component/>
            }else if(tcAuth){
                return <Component/>
            }else{
                console.log('denined', isAuth)
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        }}/>
    )
}

export default Protected
