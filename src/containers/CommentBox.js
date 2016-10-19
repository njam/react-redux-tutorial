import React from 'react';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import CommentsApi from '../CommentsApi';
import {connect} from 'react-redux'
import {addComment, setComments} from '../actions/index';
import './CommentBox.css';

var CommentBox = React.createClass({
  propTypes: {
    commentList: React.PropTypes.instanceOf(Array).isRequired,
    commentsApi: React.PropTypes.instanceOf(CommentsApi).isRequired,
  },
  loadCommentsFromServer: function() {
    this.props.commentsApi.loadComments()
      .then(result => this.props.dispatch(setComments(result)))
  },
  handleCommentSubmit: function(comment) {
    this.props.dispatch(addComment(comment.author, comment.text));
    this.props.commentsApi
      .createComment(comment.author, comment.text);
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, 1000);
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentList commentList={this.props.commentList} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
});

CommentBox = connect(
  (state) => {
    return {
      commentList: state.comments
    };
  },
  (dispatch, ownProps) => {
    return {
      dispatch: dispatch,
      commentsApi: ownProps.commentsApi
    }
  }
)(CommentBox);

export default CommentBox;
