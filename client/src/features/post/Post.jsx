import React, { Component } from "react";
import { connect } from "react-redux";
import { postDisplay } from "../../app/actions/postAction";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.postDisplay(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <div>loading</div>;
    } else {
      postContent = <PostItem post={post} showActions={false} />;
    }
    return (
      <div className="Post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const maptoState = (state) => ({
  post: state.post,
  login: state.login,
});

export default connect(maptoState, { postDisplay })(Post);
