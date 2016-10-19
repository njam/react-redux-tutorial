import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './containers/CommentBox';
import CommentsApi from './CommentsApi';
import './index.css';
import logo from './logo.svg';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/index'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

var commentsApi = new CommentsApi();

ReactDOM.render(
  <Provider store={store}>
    <div className="App">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <CommentBox commentsApi={commentsApi} />
    </div>
  </Provider>,
  document.getElementById('root')
);
