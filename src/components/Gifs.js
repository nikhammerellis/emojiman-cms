import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';


class Gifs extends Component {

  state = {
    message: '',
  };
/*
  componentWillMount() {
    const imgSrc = [];
    firebase.database().ref('images').on('value', snapshot => {
      const images = snapshot.val();
      console.log(images);
      const keys = Object.keys(images);
      console.log(keys);
      for(var i = 0; i < keys.length; i++) {
        let current = images[keys[i]];
        imgSrc.push(current);
      }
      this.setState({
        images: imgSrc
      });
    });
  }
*/


  //move as much of this logic as possible to an action creator
  onChange = (e) => {
    const progressBar = this.refs.progressBar;
    const fileButton = this.refs.fileButton;
    //get file
    const file = e.target.files[0];
    //create storage ref
    const storageRef = firebase.storage().ref('images/' + file.name);
    //upload file
    const task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',
      //during upload
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = percentage;
      },
      //if error uploading
      (err) => {
        console.log(err);
        this.setState({ message: `Error uploading file: ${err}` });
      },
      //on upload complete
      () => {
        this.setState({ message: 'File successfully uploaded' });
        //insert metadata into firebase database
        const downloadURL = task.snapshot.downloadURL;
        const imagesRef = firebase.database().ref('images');
        imagesRef.push({
          name: file.name,
          url: downloadURL
        });

        //reset file input/progressBar/upload message
        setTimeout(() => {
          progressBar.value = 0;
          fileButton.value = null;
          this.setState({
            message: ''
          });
        }, 2000);
      }
    );
  }

  imgClick = (image) => {
    console.log(image.url);
    //window.open(image.url, '_self'); this is getting close
  }

  renderGifs = () => {
    const { images } = this.props;
    console.log(images);//things are being duplicated here, likely will work as intended when I build out the actions/reducers
    //page refesh shows that it only grabs one of each until a new one is added
    return images.map((image, i) => {
      return (
        <img src={image.url} style={styles.image} onClick={() => this.imgClick(image)} key={i}/>
      );
    });
  }

  render() {
    return (
      <div className="container">
      <h3 style={styles.h3}>Add a Gif</h3>

        <div style={styles.uploadContainer}>
          <progress style={styles.progressBar} value="0" max="100" ref="progressBar">0%</progress>
          <input type="file" ref="fileButton" onChange={this.onChange}/>
          <span>{this.state.message}</span>
        </div>
        <div style={styles.gifsContainer}>
          {this.renderGifs()}
        </div>
      </div>
    );
  }
};

const styles = {
  h3: {
    marginTop: 60
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBar: {
    marginBottom: 20
  },
  gifsContainer: {
    marginTop: 20,
    //backgroundColor: 'orange',
    width: '100%',
    height: 200
  },
  image: {
    width: 50,
    height: 50,
    margin: 20
  }
}

const mapStateToProps = (state) => {
  const { images } = state.images;

  return { images };
};

export default connect(mapStateToProps)(Gifs);
