import {
  IS_FETCHING_CATEGORIES,
  RECEIVED_CATEGORIES,
} from '../constants/action-types';

const initialState = {
  isFetching: false,
  categoriesList: [],
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING_CATEGORIES:
      return Object.assign({}, state, {
        ...state,
        isFetching: action.payload,
      });
    case RECEIVED_CATEGORIES:
      return Object.assign({}, state, {
        ...state,
        categoriesList: action.payload,
      });
    default:
      return state;
  }
}
export default categoriesReducer;
