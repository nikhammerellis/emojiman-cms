import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import EmojiReducer from './EmojiReducer';
import CategoryReducer from './CategoryReducer';
import GifsReducer from './GifsReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  emojis: EmojiReducer,
  categories: CategoryReducer,
  images: GifsReducer
});

export default rootReducer;
