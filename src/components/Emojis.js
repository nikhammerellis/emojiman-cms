import React, { Component } from 'react';
import { connect } from 'react-redux';
//import firebase from 'firebase';
//import { withRouter } from 'react-router-dom';

import { fetchEmojis, createEmoji } from '../actions';
//import AppContainer from './AppContainer';
import EmojiTableRow from './EmojiTableRow';

class Emojis extends Component {
    state = {
      name: '',
      emoji: '',
      categories: []
    };

  renderTableRows = () => {
    const { emojis } = this.props;

    return emojis.map((emoji, i) => {
      return (
        <EmojiTableRow data={emoji} key={i} />
      );
    });
  }

  removeRecent = (category) => {
    return category.name !== "Recent";
  }

  removePopular = (category) => {
    return category.name !== "Popular";
  }

  renderCategoryCheckboxes = () => {
    const { categories } = this.props;

    let removeRecent = categories.filter(this.removeRecent);
    let displayCategories = removeRecent.filter(this.removePopular);

    return displayCategories.map((category, i) => {
      return (
        <div className="form-check form-check-inline" key={i}>
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" value={category.name} onChange={this.onCheckboxChange}/> {category.name}
          </label>
        </div>
      );
    })
  }

  onCheckboxChange = (e) => {
    const categories = this.state.categories;
    let index;
    console.log(e.target.value);
    if(e.target.checked) {
      categories.push(e.target.value);
    } else {
      index = categories.indexOf(e.target.value);
      categories.splice(index, 1);
    }
    this.setState({ categories: categories })
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  onEmojiChange = (e) => {
    this.setState({ emoji: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, emoji, categories } = this.state;
    //send to action creator for firebase insertion
    this.props.createEmoji(name, emoji, categories);
    //clear component state
    this.setState({ name: '', emoji: '', categories: [] });
    //get all inputs
    const inputs = document.getElementsByTagName('input');
    //if inputs are checkboxes, uncheck all of them
    for (let i = 0; i < inputs.length; i++) {
      if(inputs[i].type === "checkbox"){
        inputs[i].checked = false;
      }
    }
  }

  render() {
    return (
      <div className="container">

      <h3 style={styles.h3}>Add an emoji</h3>

      <form style={styles.form}>

        <div className="col-4">
          <input
            type="text"
            style={styles.input}
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </div>

        <div className="col-4">
          <input
            type="text"
            className="form-control"
            placeholder="Emoji"
            value={this.state.emoji}
            onChange={this.onEmojiChange}
          />
        </div>

        <h3 style={styles.catSelect}>Select all that apply</h3>

        {this.renderCategoryCheckboxes()}


        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Create Emoji</button>
      </form>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Emoji</th>
              <th>Categories</th>
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
  catSelect: {
    marginTop: 20
  },
  form: {
    marginBottom: 30
  },
  actionButton: {
    marginLeft: 20
  },
  input: {
    marginBottom: 10
  }
}

const mapStateToProps = (state) => {
  const { emojis } = state.emojis;
  const { categories } = state.categories;

  return { emojis, categories };
};

export default connect(mapStateToProps, { fetchEmojis, createEmoji })(Emojis);
