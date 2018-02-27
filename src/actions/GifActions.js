import firebase from 'firebase';
import axios from 'axios';
import {
  FETCH_GIFS
} from './actionTypes';

export const fetchGifs = () => {
  return (dispatch) => {
    const ref = firebase.database().ref('images');
    ref.on('value', snapshot => {
      const images = snapshotToArray(snapshot);
      dispatch({ type: FETCH_GIFS, payload: images });
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
