import {
  IS_FETCHING_COMMENT,
  RECEIVED_COMMENT,
  IS_FETCHING_COMMENTS,
  RECEIVED_COMMENTS,
  IS_SENDING_COMMENT,
  // SAVED_COMMENT,
  // EDITED_COMMENT,
  // DELETED_COMMENT,
} from '../constants/action-types';

const initialState = {
  isLoading: false,
  comments: [],
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING_COMMENTS:
    case IS_FETCHING_COMMENT:
    case IS_SENDING_COMMENT:
      return Object.assign({}, state, {
        ...state,
        isLoading: action.payload,
      });
    case RECEIVED_COMMENTS:
      return Object.assign({}, state, {
        ...state,
        comments: action.payload,
      });
    case RECEIVED_COMMENT:
      return Object.assign({}, state, {
        ...state,
        comments: [...state.comments, action.payload],
      });
    default:
      return state;
  }
}
export default categoryReducer;
