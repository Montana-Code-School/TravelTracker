import React from 'react';
import SearchGiphy from './SearchGiphy';
import App from './App';
import { inject, observer } from 'mobx-react';
import {Col, Image, Button, Glyphicon} from 'react-bootstrap';

class SoloImageWithButton extends React.Component {

  constructor() {
    super();
    this.addOurImage = this.addOurImage.bind(this);
    this.deleteOurImage = this.deleteOurImage.bind(this);
  }
  addOurImage() {
    let image = this.props.img;
    image.owner = this.props.userStore.id;
    this.props.addNewImage(this.props.img);
    this.props.removeOurImage(this.props.img);
  }
  deleteOurImage() {
    this.props.deleteImage(this.props.img);
  }

  render() {
    let ourButton = (
      <button onClick={this.addOurImage}
      type="submit" className="btn btn-primary">Add To My List</button>
    );

    let deleteButton;
      if (this.props.img.owner && (this.props.img.owner._id === this.props.userStore.id) || this.props.userStore.admin) {
      deleteButton = (
        <button onClick={this.deleteOurImage}
        type="submit" className="btn btn-danger">Delete This Image</button>
      );
    } else {
      deleteButton = "";
    }

    let addedby = (
      this.props.img && this.props.img.owner) ?
      "Added by: " + this.props.img.owner.name : "";

    const imageWellStyle = {maxWidth: 280, margin: '0px', padding:'0px'};

    return(
      <div className="text-center col-lg-3 col-md-4 col-sm-6" key={this.props.img.name}>
        <div style={imageWellStyle}>
          <Image height="280" width="280" src={this.props.img.url} rounded/>
          {this.props.noButton ? deleteButton : ourButton}
          <h3>{this.props.img.description}</h3>
          <h4>{addedby}</h4>
        </div>
      </div>
    );
  }
}

SoloImageWithButton.propTypes = {
  img: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  noButton: React.PropTypes.bool,
  removeOurImage: React.PropTypes.func,
  deleteImage: React.PropTypes.func,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(SoloImageWithButton));
