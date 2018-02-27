import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { fetchEmojis, fetchCategories, updateAuthenticated } from './actions';


import AuthForm from './components/AuthForm';
import AdminContainer from './components/containers/AdminContainer';
import NotAuthorized from './components/NotAuthorized';



const checkAuth = () => {

  const isAdmin = sessionStorage.getItem('isAdmin');
  const authenticated = sessionStorage.getItem('authenticated');
  console.log('isAdmin: ', isAdmin);
  if(isAdmin === false || isAdmin === null) {
    return false;
  } else {
    return true;
  }
};


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => checkAuth()
        ? <Component {...props} {...rest} />
        : <Redirect exact to={{ pathname: '/' }} /> } />
  );
};


class App extends Component {
  componentWillMount() {
    //initialize firebase in the app
    const config = {
      apiKey: 'AIzaSyDLOD6BP0zAF18lJjUqgahVmbfKYPuepJE',
      authDomain: 'emojiman-f9fc3.firebaseapp.com',
      databaseURL: 'https://emojiman-f9fc3.firebaseio.com',
      projectId: 'emojiman-f9fc3',
      storageBucket: 'emojiman-f9fc3.appspot.com',
      messagingSenderId: '33553150243'
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    const email = sessionStorage.getItem('email');
    console.log('isAdmin: ', isAdmin);
    console.log('email: ', email);

  }

  render() {

    return (
      <div className="container">
        <PrivateRoute path="/admin" component={AdminContainer} />
        <Route exact path="/not-authorized" component={NotAuthorized} />
        <Route exact path="/" component={AuthForm} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { authenticated, isAdmin } = state.auth;

  return { authenticated, isAdmin };
};

export default withRouter(connect(mapStateToProps, { fetchEmojis, fetchCategories, updateAuthenticated })(App));
