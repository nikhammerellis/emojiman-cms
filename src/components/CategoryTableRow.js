import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editCategory, deleteCategory } from '../actions';


class CategoryTableRow extends Component {
  state = {
    name: this.props.data.name,
    symbol: this.props.data.symbol,
    uid: this.props.data.uid,
    isEditing: false
  };

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSymbolChange = (e) => {
    this.setState({ symbol: e.target.value });
  }

  handleUpdate = () => {
    //e.preventDefault();
    //console.log(this.state);
    const { uid, name, symbol } = this.state;
    this.props.editCategory(uid, name, symbol);
    this.setState({ isEditing: false });
  }


  render() {
    const { data } = this.props;

    if (this.state.isEditing) {
      return (
        <tr>
          <td>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2 mb-sm-0"
              id="inlineFormInput"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Example (optional)"
              value={this.state.symbol}
              onChange={this.onSymbolChange}
            />
          </td>
          <td>
            <button type="button" style={styles.actionButton} className="btn btn-info" onClick={this.handleUpdate}>Update</button>
            <button type="button" style={styles.actionButton} className="btn btn-danger" onClick={this.toggleEdit}>Cancel</button>
          </td>
        </tr>
      )
    }

    return(
      <tr>
        <td>{data.name}</td>
        <td>{data.symbol}</td>
        <td>
          <button type="button" style={styles.actionButton} className="btn btn-info" onClick={this.toggleEdit}>Edit</button>
          <button type="button" style={styles.actionButton} className="btn btn-danger" onClick={() => this.props.deleteCategory(data.uid)}>X</button>
        </td>
      </tr>
    );
  }
};

const styles = {
  actionButton: {
    marginLeft: 20
  }
};

export default connect(null, { editCategory, deleteCategory })(CategoryTableRow);
