class CommentsApi {

  /**
   * @return {Promise}
   */
  loadComments() {
    return fetch('http://localhost:3001/api/comments')
      .then(result => result.json());
  }

  /**
   * @param {String} author
   * @param {String} text
   * @return {Promise}
   */
  createComment(author, text) {
    var request = new Request('http://localhost:3001/api/comments', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({author: author, text: text})
    });

    return fetch(request).then(response => response.json());
  }

}

export default CommentsApi;
