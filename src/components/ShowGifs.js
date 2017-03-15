import React from 'react';
import SoloImageWithButton from './SoloImageWithButton';

ShowGifs.propTypes = {
  gifs: React.PropTypes.object,
  addNewImage: React.PropTypes.func,
  noButton: React.PropTypes.bool,
  removeOurImage: React.PropTypes.func,
  deleteImage: React.PropTypes.func
};

function deleteOurImage() {
  this.props.deleteImage(this.props.img);
  alert("hit button");
}

function ShowGifs(props) {
  let images = props.gifs.map(function(img) {
    return (
      <SoloImageWithButton key={img.name} img={img}
        addNewImage={props.addNewImage} removeOurImage={props.removeOurImage}
        noButton={props.noButton} deleteImage={props.deleteImage}/>
    );
  });
  return (
    <div>
      {images}
    </div>
  );
}

export default ShowGifs;
