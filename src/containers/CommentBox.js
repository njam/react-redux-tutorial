import React, {Component} from 'react';
import Remarkable from 'remarkable'
import CommentsApi from '../CommentsApi';
import {connect} from 'react-redux'
import {addComment, setComments} from '../actions/index';
import './CommentBox.css';

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup};
  },
  render: function() {
    return (
      <div className="comment">
        <span className="commentAuthor">
          {this.props.author}
        </span>
        <div className="content" dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        {this.props.commentList.map(comment =>
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        )}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} required="required" />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} required="required" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

CommentList = connect(
  (state) => {
    return {
      commentList: state
    };
  },
  (dispatch) => {
    return {};
  }
)(CommentList);

CommentForm = connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {
      onCommentSubmit: ({author, text}) => {
        dispatch(addComment(author, text))
      }
    }
  }
)(CommentForm);

var CommentBox = React.createClass({
  propTypes: {
    onSetComments: React.PropTypes.func.isRequired,
    commentsApi: React.PropTypes.instanceOf(CommentsApi).isRequired,
  },
  loadCommentsFromServer: function() {
    this.props.commentsApi.loadComments()
      .then(result => this.props.onSetComments(result))
  },
  handleCommentSubmit: function(comment) {
    throw new Error('not used');
    this.props.commentsApi
      .createComment(comment.author, comment.text)
      .then(comment => {
        this.props.onCommentAdd(comment.id, comment.author, comment.text)
      })
      .catch(error => {
        // this.setState({commentList: });
        throw error;
      })
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, 1000);
  },
  render: function() {
    return (
      <div className="commentBox">
        <CommentList />
        <CommentForm />
      </div>
    )
  }
});

CommentBox = connect(
  (state) => {
    return {};
  },
  (dispatch, ownProps) => {
    return {
      onSetComments: (commentList) => {
        dispatch(setComments(commentList))
      },
      commentsApi: ownProps.commentsApi
    }
  }
)(CommentBox);

export default CommentBox;
