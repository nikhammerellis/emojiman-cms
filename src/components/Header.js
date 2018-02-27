import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import { fetchEmojis, fetchCategories, logoutUser } from '../actions';


class Header extends Component {
  componentWillMount() {

  }

  onLogoutPress = () => {
    this.props.logoutUser();
    this.props.history.replace('/');
  }

  render() {
    const { match } = this.props;
    const userEmail = sessionStorage.getItem('email');

    return (
      <div className='container'>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
          <span className="navbar-brand" href="#">Emojiman</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink to={`${match.path}/emojis`} className="nav-item nav-link">Emojis</NavLink>
              <NavLink to={`${match.path}/categories`} className="nav-item nav-link">Categories</NavLink>
              <NavLink to={`${match.path}/gifs`} className="nav-item nav-link">Gifs</NavLink>
            </div>
          </div>
          <span style={styles.email} className="nav-item">{userEmail}</span>
          <button type="button" className="btn btn-danger" onClick={this.onLogoutPress}>Log Out</button>
        </nav>
      </div>
    );
  }
}

const styles = {
  email: {
    color: '#D3D3D3',
    marginRight: 10
  }
};



export default withRouter(connect(null, { fetchEmojis, fetchCategories, logoutUser })(Header));
