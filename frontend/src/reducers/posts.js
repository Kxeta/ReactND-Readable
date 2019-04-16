import {
  // DELETED_POST,
  // EDITED_POST,
  IS_FETCHING_CATEGORY_POSTS,
  IS_FETCHING_POST,
  IS_FETCHING_POSTS,
  IS_SENDING_POST,
  RECEIVED_CATEGORY_POSTS,
  RECEIVED_POST,
  RECEIVED_POSTS,
  // SAVED_POST,
} from '../constants/action-types';

const initialState = {
  isLoading: false,
  postsList: [],
  post: null,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING_CATEGORY_POSTS:
    case IS_FETCHING_POST:
    case IS_FETCHING_POSTS:
    case IS_SENDING_POST:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.payload,
      });
    case RECEIVED_CATEGORY_POSTS:
    case RECEIVED_POSTS:
      return Object.assign({}, state, {
        ...state,
        postsList: action.payload,
      });
    case RECEIVED_POST:
      return Object.assign({}, state, {
        ...state,
        post: action.payload,
      });
    default:
      return state;
  }
}
export default categoryReducer;
