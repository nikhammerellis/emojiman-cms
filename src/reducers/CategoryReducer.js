import {
  FETCH_CATEGORIES
} from '../actions/actionTypes';

const INITIAL_STATE = {
  categories: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    default:
      return state;
  }
};
