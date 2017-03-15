import React from 'react';
import ShowGifs from './ShowGifs';
import { inject, observer } from 'mobx-react';

class Library extends React.Component {
  constructor() {
    super();
    this.loadImagesFromServer = this.loadImagesFromServer.bind(this);
  }

  componentDidMount() {
    this.loadImagesFromServer();
  }

  loadImagesFromServer() {
    fetch('/api/giphys')
      .then(function(result) {return result.json();})
      .then(images => this.props.imageStore.setImages(images));
  }

  render() {
    return (
      <div>
        <ShowGifs addNewImage={this.props.imageStore.addNewImage}
        gifs={this.props.imageStore.images} deleteImage={this.props.imageStore.deleteImage} noButton/>
        {this.props.children}
      </div>
    );
  }
}

Library.propTypes = {
  LoginUser: React.PropTypes.func,
  imageStore: React.PropTypes.object,
  children: React.PropTypes.object
};


export default inject("imageStore")(observer(Library));
