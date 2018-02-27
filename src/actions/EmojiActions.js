import firebase from 'firebase';
import axios from 'axios';
import {
  FETCH_EMOJIS
} from './actionTypes';

const ROOT_URL = 'https://us-central1-emojiman-f9fc3.cloudfunctions.net';

export const fetchEmojis = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('emojis');
    ref.on('value', snapshot => {
      const emojis = snapshotToArray(snapshot);
      dispatch({ type: FETCH_EMOJIS, payload: emojis });
    });
  };
};

export const createEmoji = (name, emoji, cats) => {
  return (dispatch) => {
    console.log(name, emoji, cats);

    let categories = {};
    cats.forEach(cat => {
      categories[cat] = true;
    });

    axios.post(`${ROOT_URL}/createEmoji`, {
      name, emoji, categories
    });
  };
};

export const editEmoji = (uid, name, emoji, cats) => {
  return (dispatch) => {
    console.log(uid, name, emoji, cats);
    let categories = {};
    cats.forEach(cat => {
      categories[cat] = true;
    });

    axios.post(`${ROOT_URL}/editEmoji`, {
      uid, name, emoji, categories
    });
    
  };
};

export const deleteEmoji = (uid) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/deleteEmoji`, {
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
