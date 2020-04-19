import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../app/actions/profileAction'
import PropTypes from 'prop-types';


class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render() {
        return (
            <div>
                gshgchs
            </div>
        )
    }
}
export default connect(null,{getCurrentProfile}) (Dashboard);
