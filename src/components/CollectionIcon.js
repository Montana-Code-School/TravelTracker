/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import styles from './style/IconStyle.css.js';


class CollectionIcon extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.createIcon = this.createIcon.bind(this);
  }

  getIcon(icon){
    return require('../img/icons/'
      + this.props.collectionName + '/'
      + this.props.collectionName + icon);
  }

  getIconImage(icon){
    return (
      <img
        key={this.props.collectionName}
        style={styles.trophyStyle}
        src={this.getIcon(icon)}
      />
    );
  }

  createIcon(){
    const percent = this.props.userStore.getPercentageCompletion(
      this.props.collectionName);
    const percentImages = [
      {pct: 100, img: 'gold'}, {pct: 80, img: 'silver'},
      {pct: 40, img: 'bronze'}, {pct: 0.1, img: 'grey'}];
    const result = percentImages.find(pi => percent >= pi.pct);
    return result ? this.getIconImage(result.img + ".png"): undefined;
  }

  render() {
    return (
      <Link to={{pathname: '/Collection/'+this.props.collectionName}}
        key={this.props.collectionName}
      >
        {this.createIcon()}
      </Link>
    );
  }
}

CollectionIcon.propTypes = {
  userStore: React.PropTypes.object,
  collectionName: React.PropTypes.string
};

export default inject("userStore")(observer(CollectionIcon));
