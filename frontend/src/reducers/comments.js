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
        comments: action.payload.filter(
          comment => !comment.deleted && !comment.parentDeleted,
        ),
      });
    case RECEIVED_COMMENT:
    case DELETED_COMMENT:
    case EDITED_COMMENT:
      return Object.assign({}, state, {
        ...state,
        comments: state.comments
          .map(comment => {
            if (comment.id === action.payload.id) {
              return {
                ...action.payload,
              };
            }
            return comment;
          })
          .filter(comment => !comment.deleted && !comment.parentDeleted),
      });
    case SAVED_COMMENT:
      return Object.assign({}, state, {
        ...state,
        comments: [...state.comments, action.payload].filter(
          comment => !comment.deleted && !comment.parentDeleted,
        ),
      });
    default:
      return state;
  }
}
export default categoryReducer;
