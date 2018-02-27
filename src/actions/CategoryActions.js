import firebase from 'firebase';
import axios from 'axios';
import {
  FETCH_CATEGORIES
} from './actionTypes';

const ROOT_URL = 'https://us-central1-emojiman-f9fc3.cloudfunctions.net';

export const fetchCategories = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('categories');
    ref.on('value', snapshot => {
      const categories = snapshotToArray(snapshot);
      dispatch({ type: FETCH_CATEGORIES, payload: categories });
    });
  };
};

export const createCategory = (name, symbol) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/createCategory`, {
      name, symbol
    });
  };
};

export const editCategory = (uid, name, symbol) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/editCategory`, {
      uid, name, symbol
    });
  };
};

export const deleteCategory = (uid) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/deleteCategory`, {
      uid
    });
  };
};

const snapshotToArray = snapshot => {
    const returnArr = [];

    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item.uid = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
