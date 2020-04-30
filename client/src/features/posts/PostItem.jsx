import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost,addlike,removelike } from "../../app/actions/postAction";
import classnames from 'classnames'

class PostItem extends Component {
onDeleteClick(id){
    this.props.deletePost(id);
}
onLikeClick(id){
    this.props.addlike(id)
}
onUnlikeClick(id){
    this.props.removelike(id)
}
findUserLike(likes){
    const {login} = this.props;
    if(likes.filter(like => like.user === login.user.id).length>0){
        return true;
    }
    else 
        return false;
}
  render() {
    const { post, login } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="com-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md--10">
            <p className="lead">{post.text}</p>
            <button type="button" onClick={this.onLikeClick.bind(this,post._id)}  className="btn btn-light mr-1">
              <i className={classnames('fas fa-thumbs-down',{'text-info':this.findUserLike(post.likes)})}  />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" onClick={this.onUnlikeClick.bind(this,post._id)} className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === login.user.id ? (
                <button onClick={this.onDeleteClick.bind(this,post._id)} type='button' className='btn btn-danger mr-1'>
                    <i className='fas fa-times'/>
                </button>
            ):null}
          </div>
        </div>
      </div>
    );
  }
}
const maptoState = (state) => ({
  login: state.login,
});

export default connect(maptoState,{deletePost,addlike,removelike})(PostItem);
