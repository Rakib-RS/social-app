import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

 class CreateProfile extends Component {
     constructor(props){
         super(props);
         this.state ={
             displaySocialInput:false,
             handle:'',
             company:'',
             website:'',
             status:'',
             location:'',
             skills:'',
             githubusrname:'',
             bio:'',
             twitter:'',
             facebook:'',
             linkedin:'',
             youtube:'',
             errors:{}
         }
     }
    render() {
        return (
            <div className='create-profile'>
                <div className='conatiner'>
                    <div className='row'>
                        <div className='col-md-8 m-auto' >
                            <h1 className='display-4 text-center'>create your profile</h1>
                            <p className='lead text-center'>
                                let's get some  information
                            </p>
                            <small className="d-block pb-3">* = required fileds</small>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
CreateProfile.propTypes ={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const maptoStateProps = (state) =>({
    profile:state.profile,
    errors:state.errors
})
export default connect(maptoStateProps) (CreateProfile);
