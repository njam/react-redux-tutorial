import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import reducer from '../reducers/index'
import CommentBox from './CommentBox';
import CommentsApi from '../CommentsApi';

const store = createStore(reducer);
var commentsApi = new CommentsApi();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentBox commentsApi={commentsApi} store={store} />, div);
});
