import {
  FETCH_GIFS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  images: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GIFS:
      return {
        ...state,
        images: action.payload
      };
    default:
      return state;
  }
};
