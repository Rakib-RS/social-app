import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../app/actions/postAction";

class CommentItem extends Component {
  onDeleteClick(postId,commentId) {
    this.props.deleteComment(postId,commentId);
  }

  render() {
    const { comment, login, postId } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="com-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md--10">
            <p className="lead">{comment.text}</p>
            {comment.user === login.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this,postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const maptoState = (state) => ({
  login: state.login,
});

export default connect(maptoState, { deleteComment })(
  CommentItem
);
