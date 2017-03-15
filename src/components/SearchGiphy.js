import React from 'react';
import ShowGifs from './ShowGifs';
import SoloImageWithButton from './SoloImageWithButton';
import App from './App';
import { inject, observer } from 'mobx-react';


class SearchGiphy extends React.Component {

  constructor() {
    super();
    this.state = {
      keyword: "",
      foundImages: []
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeOurImage = this.removeOurImage.bind(this);
  }

  removeOurImage(image) {
    const selectedImage = function(img) {
      return image.name !== img.name;
    };
    const filtered = this.state.foundImages.filter(selectedImage);
    this.setState({foundImages: filtered});
  }

  handleKeywordChange(e) {
    this.setState({keyword: e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&limit=6&api_key=dc6zaTOxFJmzC`)
      .then(function(result) {return result.json();})
      .then(data => this.setState({
        foundImages: this.convertToShowGifs(this.state.keyword, data.data)}));
  }

  convertToShowGifs(keyword, foundImages) {
    return foundImages.map(image => ({
      name: image.id,
      url: image.images.original.url,
      description: keyword
    }));
  }

  render() {
    return (
      <div>
      <form method="" role="form">
          <legend>Search Giphy for Images</legend>

          <div className="form-group">
            <input onChange={this.handleKeywordChange} value={this.state.keyword}
            type="text" className="form-control" id="keyword" placeholder="keyword"/>
          </div>

          <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>

      </form>
        <ShowGifs addNewImage={this.props.imageStore.addNewImage}
        gifs={this.state.foundImages} removeOurImage={this.removeOurImage} noButton={false}/>

      </div>

    );
  }
}

SearchGiphy.propTypes = {
  addNewImage: React.PropTypes.func,
  imageStore: React.PropTypes.object
};

export default inject ("imageStore")(observer(SearchGiphy));
