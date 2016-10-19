import React from 'react';
import Comment from './Comment'

var CommentList = React.createClass({
  propTypes: {
    commentList: React.PropTypes.instanceOf(Array).isRequired,
  },
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

export default CommentList;
