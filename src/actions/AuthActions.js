import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  //LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPDATE_AUTHENTICATED,
  LOGOUT_USER_SUCCESS
} from './actionTypes';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const updateAuthenticated = (authenticated, isAdmin) => {
  return {
    type: UPDATE_AUTHENTICATED,
    authenticated,
    isAdmin
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    //dispatch({ type: LOGIN_USER });
    const successMsg = 'You have logged in';

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
          const isAdmin = snapshot.val().isAdmin;
          //const authenticated = true;
          //sessionStorage.setItem('isAdmin', isAdmin);
          //sessionStorage.setItem('authenticated', authenticated);
          //sessionStorage.setItem('email', email);
          if(isAdmin === false) {
            const errorMsg = 'You are not authorized';
            firebase.auth().signOut();
            dispatch({ type: LOGIN_USER_FAIL, errorMsg });
          } else {
            sessionStorage.setItem('isAdmin', isAdmin);
            sessionStorage.setItem('email', email);
            dispatch({ type: LOGIN_USER_SUCCESS, successMsg });
          }
        });
      })
      .catch(error => {
        console.log(error);
        if (error.code) {
          const errorMsg = error.message;
          dispatch({ type: LOGIN_USER_FAIL, errorMsg });
        } else {
          const errorMsg = 'An unknown error occured';
          dispatch({ type: LOGIN_USER_FAIL, errorMsg });
        }
      });
  };
};

export const createUser = ({ email, password }) => {
  return (dispatch) => {
  dispatch({ type: CREATE_USER });
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      firebase.database().ref(`users/${user.uid}`)
        .set({ isAdmin: false })
        .then(() => {
          const successMsg = 'Your account has been initialized';
          dispatch({ type: CREATE_USER_SUCCESS, successMsg });
          firebase.auth().signOut();
        })
        .catch(err => {
          console.log(err);
          const errorMsg = 'An error occurred';
          createUserFail(dispatch, errorMsg);
          //dispatch({ type: CREATE_USER_FAIL, errorMsg: err });
        });
    })
    .catch(error => {
      if (error.code) {
        const errorMsg = error.message;
        createUserFail(dispatch, errorMsg);
        //dispatch({ type: CREATE_USER_FAIL, errorMsg});
      } else {
        console.log(error);
        const errorMsg = 'An error occurred';
        createUserFail(dispatch, errorMsg);
        //dispatch({ type: CREATE_USER_FAIL, errorMsg });
      }
    });
  };
};

const createUserFail = (dispatch, errorMsg) => {
  dispatch({ type: CREATE_USER_FAIL, errorMsg });
};


export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('email');
    const successMsg = 'You have successfully logged out';
    dispatch({ type: LOGOUT_USER_SUCCESS, successMsg });
  }
};
