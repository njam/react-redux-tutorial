import React from 'react';
import ReactDOM from 'react-dom';
import App from './CommentBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('does something', () => {
  expect('foo').toEqual('foo');
});