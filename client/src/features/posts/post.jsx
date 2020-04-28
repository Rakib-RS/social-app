import React, { Component } from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { getPosts } from "../../app/actions/postAction";
import PostFeed from "./PostFeed";

class post extends Component {
    componentDidMount(){
        this.props.getPosts();

    }
  render() {
    const {posts,loading} = this.props.post;
    let postContent;
    if(posts === null && loading){
        postContent = <div>Loading</div>
    }
    else{
        postContent =(
            <PostFeed posts={posts}/>
        )
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
         </div>
      </div>
    );
  }
}
const maptoState = (state) =>({
    post:state.post
})
export default connect(maptoState,{getPosts}) (post);
