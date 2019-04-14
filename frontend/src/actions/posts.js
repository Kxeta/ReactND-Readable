import uuid from 'uuid';
import {
  DELETED_POST,
  EDITED_POST,
  IS_FETCHING_CATEGORY_POSTS,
  IS_FETCHING_POST,
  IS_FETCHING_POSTS,
  IS_SENDING_POST,
  RECEIVED_CATEGORY_POSTS,
  RECEIVED_POST,
  RECEIVED_POSTS,
  SAVED_POST,
} from '../constants/action-types';
import { baseURL, headers } from '../constants/utils';

// Posts

export const getAllPosts = () => dispatch => {
  dispatch({
    type: IS_FETCHING_POSTS,
    payload: true,
  });
  return fetch(`${baseURL}/posts`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: RECEIVED_POSTS,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to fetch all posts', err))
    .then(() =>
      dispatch({
        type: IS_FETCHING_POSTS,
        payload: false,
      }),
    );
};

// Post

export const getPostById = postId => dispatch => {
  dispatch({
    type: IS_FETCHING_POST,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${postId}`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: RECEIVED_POST,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to fetch this post', err))
    .then(() =>
      dispatch({
        type: IS_FETCHING_POST,
        payload: false,
      }),
    );
};

export const sendPost = ({ title, body, authorID, category }) => dispatch => {
  /* PARAMS:
  id - UUID should be fine, but any unique id will work
  timestamp - timestamp in whatever format you like, you can use Date.now() if you like
  title - String
  body - String
  author - String
  category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
  */

  dispatch({
    type: IS_SENDING_POST,
    payload: true,
  });
  const timestamp = Date.now();
  const id = uuid.v1();
  const requestBody = {
    id,
    timestamp,
    title,
    body,
    author: authorID,
    category,
  };
  return fetch(`${baseURL}/posts`, {
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
        type: SAVED_POST,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to save this post', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_POST,
        payload: false,
      }),
    );
};

export const editPostById = ({ postId, title, postBody }) => dispatch => {
  dispatch({
    type: IS_SENDING_POST,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${postId}`, {
    headers,
    method: 'PUT',
    body: {
      title,
      body: postBody,
    },
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: EDITED_POST,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to edit this post', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_POST,
        payload: false,
      }),
    );
};

export const deletePostById = postId => dispatch => {
  dispatch({
    type: IS_SENDING_POST,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${postId}`, {
    headers,
    method: 'DELETE',
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: DELETED_POST,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to delete this post', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_POST,
        payload: false,
      }),
    );
};

export const votePostById = (postId, vote) => dispatch => {
  dispatch({
    type: IS_SENDING_POST,
    payload: true,
  });
  return fetch(`${baseURL}/posts/${postId}`, {
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
        type: SAVED_POST,
        payload: json,
      });
    })
    .catch(err => console.error('Failed to save your vote', err))
    .then(() =>
      dispatch({
        type: IS_SENDING_POST,
        payload: false,
      }),
    );
};

// Posts from Category

export const getAllPostsFromCategory = categoryID => dispatch => {
  dispatch({
    type: IS_FETCHING_CATEGORY_POSTS,
    payload: true,
  });
  return fetch(`${baseURL}/${categoryID}/posts`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      return dispatch({
        type: RECEIVED_CATEGORY_POSTS,
        payload: json,
      });
    })
    .catch(err =>
      console.error('Failed to fetch all posts for this category', err),
    )
    .then(() =>
      dispatch({
        type: IS_FETCHING_CATEGORY_POSTS,
        payload: false,
      }),
    );
};
