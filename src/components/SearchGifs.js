import React from 'react';
import App from './App';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';

class SearchGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      url: "",
      description: "",
      owner: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleNewGif = this.handleNewGif.bind(this);
    this.addNewImage = this.addNewImage.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleUrlChange(e) {
    this.setState({url: e.target.value});
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value});
  }

  handleNewGif(event) {
    event.preventDefault();
    this.addNewImage(this.state);

  }

  addNewImage(img) {
    fetch('/api/giphys', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         name: img.name,
         url: img.url,
         description: img.description,
         owner: img.owner
      })
    })
    .then(function(){
      alert ('Giggity giggity..');
      browserHistory.push('/Library');
    });
  }

  render() {
    return (
      <form method="" role="form">
          <legend>Add New Gif</legend>

          <div className="form-group">
            <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="keyword" placeholder="keyword"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleUrlChange} value={this.state.url}type="text" className="form-control" id="url" placeholder="url"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="description"/>
          </div>

          <button onClick={this.handleNewGif} type="submit" className="btn btn-primary">Submit</button>
       </form>
    );
  }
}

SearchGifs.propTypes = {
  addNewImage: React.PropTypes.func
};

export default inject("userStore")(observer(SearchGifs));
