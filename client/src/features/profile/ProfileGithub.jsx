import React, { Component } from 'react'

class ProfileGithub extends Component {
    constructor(props){
        super(props);
        this.state ={
            clientId:'80d8079fa9310702a7f8',
            clientSecret:'',
            count:5,
            sort:'created: asc',
            repos:[]
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default ProfileGithub;
