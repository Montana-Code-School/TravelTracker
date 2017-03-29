/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';
import Collection from './Collection';
import styles from './style/TrophyStyle.css.js';

class Trophy extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.createTrophy = this.createTrophy.bind(this);
  }

  createTrophy(){
    if ((this.props.userStore.getPercentageCompletion(this.props.collectionName) == 100)) {
      return (
        <img key={this.props.collectionName} style={styles.trophyStyle} src={require('../img/trophies/'+this.props.collectionName+'/'+this.props.collectionName+'gold.png')}/>
      );}
    else if ((this.props.userStore.getPercentageCompletion(this.props.collectionName) >= 80)) {
      return (
        <img key={this.props.collectionName} style={styles.trophyStyle} src={require('../img/trophies/'+this.props.collectionName+'/'+this.props.collectionName+'silver.png')}/>
      );}
    else if ((this.props.userStore.getPercentageCompletion(this.props.collectionName) >= 40)) {
      return (
        <img key={this.props.collectionName} style={styles.trophyStyle} src={require('../img/trophies/'+this.props.collectionName+'/'+this.props.collectionName+'bronze.png')}/>
      );}
    else if ((this.props.userStore.getPercentageCompletion(this.props.collectionName) > 0)) {
      return (
        <img key={this.props.collectionName} style={styles.trophyStyle} src={require('../img/trophies/'+this.props.collectionName+'/'+this.props.collectionName+'grey.png')}/>
      );}
  }

  render() {
    return (
      <Link to={{pathname: '/Collection/'+this.props.collectionName}} key={this.props.collectionName}>
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
