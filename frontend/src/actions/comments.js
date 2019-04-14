import uuid from 'uuid';
import {
  IS_FETCHING_COMMENT,
  RECEIVED_COMMENT,
  IS_FETCHING_COMMENTS,
  RECEIVED_COMMENTS,
  IS_SENDING_COMMENT,
  SAVED_COMMENT,
  EDITED_COMMENT,
  DELETED_COMMENT,
} from '../constants/action-types';
import { baseURL, headers } from '../constants/utils';

// Comments from Post

export const getAllCommentsByPost = postID => dispatch => {
  dispatch({
    type: IS_FETCHING_COMMENTS,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${postID}/comments`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: RECEIVED_COMMENTS,
        payload: json,
      });
    })
    .catch(err =>
      console.error('Failed to fetch all comments from this post', err),
    )
    .then(() =>
      dispatch({
        type: IS_FETCHING_COMMENTS,
        payload: false,
      }),
    );
};

// Comment

export const getComment = commentID => dispatch => {
  dispatch({
    type: IS_FETCHING_COMMENT,
    payload: true,
  });
  return fetch(`${baseURL}/comments/${commentID}`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: RECEIVED_COMMENT,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to fetch this comment', err))
    .then(() =>
      dispatch({
        type: IS_FETCHING_COMMENT,
        payload: false,
      }),
    );
};

export const sendComment = ({ body, authorID, parentID }) => dispatch => {
  dispatch({
    type: IS_SENDING_COMMENT,
    payload: true,
  });
  const timestamp = Date.now();
  const id = uuid.v1();
  const requestBody = {
    id,
    timestamp,
    body,
    author: authorID,
    parentID,
  };
  return fetch(`${baseURL}/comments`, {
    headers,
    method: 'POST',
    body: requestBody,
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: SAVED_COMMENT,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to save this comment', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_COMMENT,
        payload: false,
      }),
    );
};

export const editCommentById = ({ commentID, commentBody }) => dispatch => {
  const timestamp = Date.now();
  dispatch({
    type: IS_SENDING_COMMENT,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${commentID}`, {
    headers,
    method: 'PUT',
    body: {
      timestamp,
      body: commentBody,
    },
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: EDITED_COMMENT,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to edit this comment', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_COMMENT,
        payload: false,
      }),
    );
};

export const deletePostById = commentID => dispatch => {
  dispatch({
    type: IS_SENDING_COMMENT,
    payload: true,
  });
  return fetch(`${baseURL}/comments/${commentID}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: DELETED_COMMENT,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to delete this post', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_COMMENT,
        payload: false,
      }),
    );
};

export const voteCommentById = (commentID, vote) => dispatch => {
  dispatch({
    type: IS_SENDING_COMMENT,
    payload: true,
  });
  return fetch(`${baseURL}/comments/${commentID}`, {
    headers,
    method: 'POST',
    body: {
      option: vote,
    },
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: SAVED_COMMENT,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to save your vote', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_COMMENT,
        payload: false,
      }),
    );
};
