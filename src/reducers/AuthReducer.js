import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_AUTHENTICATED,
  LOGOUT_USER_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  successMsg: '',
  errorMsg: '',
  authenticated: false,
  isAdmin: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        successMsg: action.successMsg
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        ...INITIAL_STATE,
        errorMsg: action.errorMsg
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        email: '',
        password: '',
        //authenticated: action.authenticated,
        //isAdmin: action.isAdmin,
        successMsg: action.successMsg,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        ...INITIAL_STATE,
        errorMsg: action.errorMsg
      };
    case UPDATE_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated,
        isAdmin: action.isAdmin
      };
    case LOGOUT_USER_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
