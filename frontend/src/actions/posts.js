import {
  IS_FETCHING_CATEGORY_POSTS,
  RECEIVED_CATEGORY_POSTS,
  IS_FETCHING_POSTS,
  RECEIVED_POSTS,
} from '../constants/action-types';
import { baseURL, headers } from '../constants/utils';

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
    .catch(err =>
      console.error('Failed to fetch all posts for this category', err),
    )
    .then(() =>
      dispatch({
        type: IS_FETCHING_POSTS,
        payload: false,
      }),
    );
};
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
