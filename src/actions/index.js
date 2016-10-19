let commentId = 1;

export const addComment = (author, text) => ({
  type: 'ADD_COMMENT',
  id: commentId++,
  author: author,
  text: text
});

export const setComments = (commentList) => ({
  type: 'SET_COMMENTS',
  commentList: commentList
});
