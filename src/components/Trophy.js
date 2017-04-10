/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import './style/geolocation.css';


class Trophy extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.createTrophy = this.createTrophy.bind(this);
    this.getTrophy = this.getTrophy.bind(this);
  }

  getTrophy(trophy){
    return require('../img/trophies/'
      + this.props.collectionName + '/'
      + this.props.collectionName + trophy);
  }

  getTrophyImage(trophy){
    return (
      <img
        key={this.props.collectionName}
        className="cards"
        src={this.getTrophy(trophy)}
      />
    );
  }

  createTrophy(){
    const percent = this.props.userStore.getPercentageCompletion(
      this.props.collectionName);
    const percentImages = [
      {pct: 100, img: 'gold'}, {pct: 80, img: 'silver'},
      {pct: 40, img: 'bronze'}, {pct: 0.1, img: 'grey'}];
    const result = percentImages.find(pi => percent >= pi.pct);
    return result ? this.getTrophyImage(result.img + ".png"): undefined;
  }

  render() {
    return (
      <Link to={{pathname: '/Collection/'+this.props.collectionName}}
        key={this.props.collectionName}>
        {this.createTrophy()}
      </Link>
    );
  }
}

Trophy.propTypes = {
  userStore: React.PropTypes.object,
  collectionName: React.PropTypes.string
};

export default inject("userStore")(observer(Trophy));
