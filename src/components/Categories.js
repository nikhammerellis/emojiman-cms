import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createCategory, deleteCategory } from '../actions';

//import Editable from './Editable';
import CategoryTableRow from './CategoryTableRow';

class Categories extends Component {

  state = {
    name: '',
    symbol: ''
  };

  renderTableRows = () => {
    const { categories } = this.props;

    return categories.map((category, i) => {
      return (
        <CategoryTableRow data={category} key={i} />
      );
    });
  }


  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onSymbolChange = (e) => {
    this.setState({ symbol: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    const { name, symbol } = this.state;
    this.props.createCategory(name, symbol);
    this.setState({ name: '', symbol: '' });
  }

  render() {

    return (
      <div className="container">

        <h3 style={styles.h3}>Add a category</h3>

        <form className="form-inline" style={styles.form}>

          <label className="sr-only" htmlFor="inlineFormInput">Name</label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            id="inlineFormInput"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
          />

          <label className="sr-only" htmlFor="inlineFormInputGroup">Example</label>
          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Example (optional)"
              value={this.state.symbol}
              onChange={this.onSymbolChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Create Category</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Example</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>

      </div>
    );
  }
}

const styles = {
  h3: {
    marginTop: 60
  },
  form: {
    marginBottom: 30
  },
  actionButton: {
    marginLeft: 20
  }
}

const mapStateToProps = (state) => {
  const { categories } = state.categories;

  return { categories };
};

export default connect(mapStateToProps, { createCategory, deleteCategory })(Categories);
