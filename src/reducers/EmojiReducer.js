import {
  FETCH_EMOJIS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  emojis: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EMOJIS:
      return {
        ...state,
        emojis: action.payload
      };
    default:
      return state;
  }
};
