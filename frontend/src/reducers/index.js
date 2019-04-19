import { combineReducers } from 'redux';
import categories from './categories';
import comments from './comments';
import posts from './posts';
import user from './user';

export const Reducers = combineReducers({
  categories,
  comments,
  posts,
  user,
});

export default Reducers;
