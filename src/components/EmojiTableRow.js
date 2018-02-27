import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteEmoji, editEmoji } from '../actions';

class EmojiTableRow extends Component {
  state = {
    name: this.props.data.name,
    emoji: this.props.data.emoji,
    categories: Object.keys(this.props.data.categories),
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

  onEmojiChange = (e) => {
    this.setState({ emoji: e.target.value });
  }

  removeRecent = (category) => {
    return category.name !== "Recent";
  }

  removePopular = (category) => {
    return category.name !== "Popular";
  }

  getChecked = (name) => {
    console.log(name);//returns all categories...
  }

  renderCategoryCheckboxes = () => {
    const { categories } = this.props;
    const { data } = this.props;
    //const { categories } = data;
    const catArr = Object.keys(data.categories);
    console.log(categories);//array of objects [{name: "Meh"}]
    console.log(catArr); //looks like ["Meh"]
    console.log(this.state.categories); //{Meh: true, Rage: true}
    let removeRecent = categories.filter(this.removeRecent);
    let displayCategories = removeRecent.filter(this.removePopular);

    return displayCategories.map((category, i) => {
      return (
        <div className="form-check" key={i}>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value={category.name}
              onChange={this.onCheckboxChange}
              defaultChecked={
                catArr.indexOf(category.name) > -1 ? true : false
              }
            />
            {category.name}
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

  handleUpdate = () => {
    //e.preventDefault();
    //console.log(this.state);
    const { uid, name, emoji, categories } = this.state;
    this.props.editEmoji(uid, name, emoji, categories);
    this.setState({ isEditing: false });
  }


  render() {
    const { data } = this.props;
    const { categories } = data;
    const catArr = Object.keys(categories);

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
              value={this.state.emoji}
              onChange={this.onEmojiChange}
            />
          </td>
          <td>
            {this.renderCategoryCheckboxes()}
          </td>
          <td>
            <button type="button" style={styles.actionButton} className="btn btn-info" onClick={this.handleUpdate}>Update</button>
            <button type="button" style={styles.editButton} className="btn btn-danger" onClick={this.toggleEdit}>Cancel</button>
          </td>
        </tr>
      )
    }

    return(
      <tr>
        <td>{data.name}</td>
        <td>{data.emoji}</td>
        <td>
          <ul>
            {
              catArr.map((category, i) => {
                return <li style={{listStyleType: 'none'}} key={i}>{category}</li>
              })
            }
          </ul>
        </td>
        <td>
          <button type="button" style={styles.actionButton} className="btn btn-info" onClick={this.toggleEdit}>Edit</button>
          <button type="button" style={styles.actionButton} className="btn btn-danger" onClick={() => this.props.deleteEmoji(data.uid)}>X</button>
        </td>
      </tr>
    );
  }
};

const styles = {
  actionButton: {
    marginLeft: 20
  },
  editButton: {
    marginLeft: 20,
    marginTop: 20
  }
};

const mapStateToProps = (state) => {
  const { categories } = state.categories;

  return { categories };
};

export default connect(mapStateToProps, { deleteEmoji, editEmoji })(EmojiTableRow);
