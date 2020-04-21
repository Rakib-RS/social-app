import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const privateRoute = ({component:Component,login,...rest}) => (
    <Route
        {...rest}
        render = {
            props =>
            login.isAuthenticated === true ?(
                <Component {...props}/>
            ):
            (
                <Redirect to='/login'/>
            )
        }
    
    />
)
privateRoute.propTypes ={
    login:PropTypes.object.isRequired
}
const maptoState = state =>({
    login: state.login
})
export default connect(maptoState) (privateRoute)
