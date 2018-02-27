import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { fetchEmojis, fetchCategories, fetchGifs } from '../../actions';

import Header from '../Header';
import Emojis from '../Emojis';
import Categories from '../Categories';
import Gifs from '../Gifs';


class AdminContainer extends Component {
  componentWillMount() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    console.log('isAdmin: ', isAdmin);
    if(isAdmin === false || null) {
      this.props.history.replace('/');
    } else {
      this.props.fetchEmojis();
      this.props.fetchCategories();
      this.props.fetchGifs();
    }
  }

  componentDidMount() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    const email = sessionStorage.getItem('email');
    console.log('isAdmin: ', isAdmin);
    console.log('email: ', email);
  }

  render() {
    const { match } = this.props;

    return (
      <div className="container">
          <Header />
          <Switch>
            <Route exact path={`${match.path}/emojis`} component={Emojis} />
            <Route exact path={`${match.path}/categories`} component={Categories} />
            <Route exact path={`${match.path}/gifs`} component={Gifs} />
          </Switch>
      </div>
    );
  }
};



export default connect(null, { fetchEmojis, fetchCategories, fetchGifs })(AdminContainer);
