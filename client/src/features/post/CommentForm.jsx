import React, { Component } from 'react'
import TextFiledGroupInput from '../../app/common/form/TextFiledGroupInput';
import {connect} from 'react-redux';
import {addComment} from '../../app/actions/postAction';

 class CommentForm extends Component {
     constructor(props){
         super(props);
         this.state={
             text:'',
             errors:{}
         }
         this.onSubmit = this.onSubmit.bind(this);
         this.onChange = this.onChange.bind(this);
     }
     onSubmit(e){
         e.preventDefault();
        const {user} = this.props.login;
        const {postId} = this.props;
       const newComment ={
            text:this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addComment(postId,newComment);
        this.setState({text:''});
     }
     onChange(e){
         this.setState({[e.target.name]:e.target.value})
     }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    render() {
        const {text,errors} = this.state;
        return (
            <div className='post-form mb-3'>
                <div className='card card-info'>
                    <div className='card-header bg-info text-white'>
                        Make a Comment

                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.onSubmit}>
                            <TextFiledGroupInput
                                placeholder='comment on this post'
                                name='text'
                                value={text}
                                onChange={this.onChange}
                                error={errors.text}
                            
                            />
                            <button type='submit' className='btn btn-dark'>
                                Submit

                            </button>

                        </form>

                    </div>

                </div>
                
            </div>
        )
    }
}

const maptoState = (state)=>({
    errors:state.errors,
    login:state.login
})
export default connect(maptoState,{addComment}) (CommentForm);
