import {
  IS_FETCHING_CATEGORIES,
  RECEIVED_CATEGORIES,
} from '../constants/action-types';
import { baseURL, headers } from '../constants/utils';

export const getAllCategories = () => dispatch => {
  dispatch({
    type: IS_FETCHING_CATEGORIES,
    payload: true,
  });
  return fetch(`${baseURL}/categories`, { headers })
    .then(res => {
      return res.json();
    })
    .then(json => {
      return dispatch({
        type: RECEIVED_CATEGORIES,
        payload: json.categories,
      });
    })
    .catch(err => console.error('Failed to fetch all categories', err))
    .then(() =>
      dispatch({
        type: IS_FETCHING_CATEGORIES,
        payload: false,
      }),
    );
};
