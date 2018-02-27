import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { emailChanged, passwordChanged, loginUser, createUser, logoutUser } from '../actions';


class AuthForm extends Component {

  onEmailChange = (e) => {
    this.props.emailChanged(e.target.value);
  }

  onPasswordChange = (e) => {
    this.props.passwordChanged(e.target.value);
  }

  onLoginPress = () => {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });

    setTimeout(() => {
      const isAdmin = sessionStorage.getItem('isAdmin');
      console.log(isAdmin);
      if(isAdmin){
        this.props.history.replace('/admin/emojis');
      } else {
        return <Redirect exact to={{ pathname: '/' }} />;
      }
    }, 3000);
  }

  onCreatePress = () => {
    const { email, password } = this.props;
    this.props.createUser({ email, password });
  }


  render() {
    return (
      <div className="container">
        <h2>Sign in to admin console</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.onEmailChange}
              value={this.props.email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.onPasswordChange}
              value={this.props.password}
            />
          </div>
          <button style={styles.button} type="button" className="btn btn-primary" onClick={this.onLoginPress}>Sign in</button>
          <button style={styles.button} type="button" className="btn btn-primary" onClick={this.onCreatePress}>Request Account</button>
        </form>
        <span>{this.props.errorMsg}</span>
        <span>{this.props.successMsg}</span>
      </div>
    );
  }
}

const styles = {
  button: {
    margin: 20
  }
};

const mapStateToProps = (state) => {
  const { email, password, successMsg, errorMsg } = state.auth;

  return { email, password, successMsg, errorMsg };
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, createUser, logoutUser })(AuthForm);
