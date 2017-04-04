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

  createIcon(){
    const percent = this.props.userStore.getPercentageCompletion(
      this.props.collectionName);
    const percentImages =  0.1;

    if (percent >= percentImages){
      return (
        <img key={this.props.collectionName} style={styles.iconStyle}
        src={require('../img/icons/' + this.props.collectionName + '/' +
        this.props.collectionName + '.png')}/>);
    }
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
