import React, { Component } from 'react';


class NotAuthorized extends Component {
  render() {
    return (
      <div className='container'>
        <h1>You are not authorized to view this page</h1>
      </div>
    );
  }
};

export default NotAuthorized;
