/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import Trophy from './Trophy';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';
import Collection from './Collection';
import styles from './style/ControlBarStyle.css.js';
import './style/navBarStyle.css';

/* making the class ControlBar function which is a React Component. Render to
actually diplay the ControlBar return content.*/
class ControlBar extends React.Component {
  constructor(){
    super();
    this.state = {
    };
    this.createNavBar = this.createNavBar.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler(){
    this.props.userStore.logUserOut();
  }

  createNavBar(){
    if(this.props.userStore.loggedInUser){
      let displayTrophy = [
        <Trophy key="states" collectionName={"states"}/>,
        <Trophy key="parks" collectionName={"parks"}/>,
        <Trophy key="mlbstadiums" collectionName={"mlbstadiums"}/>,
        <Trophy key="airports" collectionName={"airports"}/>];

      return (
        <div>
          <Navbar staticTop collapseOnSelect fluid style={styles.navbarStyle}>
            <Navbar .Header>
              <Navbar .Brand>
                <Link to={{pathname: '/Dashboard'}}><img className="hidden-xs" style={styles.logoStyle} src={require('../img/barlogo.png')} width="209px" height="96px"/></Link>
                <Link to={{pathname: '/Dashboard'}}><img className="hidden-md hidden-lg hidden-sm" style={styles.logoStyle} src={require('../img/logocollapsed.png')} width="112px" height="51px"/></Link>
              </Navbar .Brand>
            </Navbar .Header>
            <Navbar .Toggle />
            <Navbar .Collapse>
              {displayTrophy}
              <Nav pullRight>
                <LinkContainer to={{pathname: '/Dashboard'}}><NavItem><Glyphicon glyph="user"/> {this.props.userStore.name}</NavItem></LinkContainer>
                <NavDropdown id="dropdown" title="collections">
                  <LinkContainer to={{pathname: '/Dashboard'}}><NavItem>Home Page</NavItem></LinkContainer>
                  <MenuItem divider/>
                  <LinkContainer to={{pathname: '/Collection/states'}}><NavItem>States</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/parks'}}><NavItem>National Parks</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/mlbstadiums'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/airports'}}><NavItem>US Airports</NavItem></LinkContainer>
                </NavDropdown>
                <NavItem onClick={() => {this.logOutHandler();}}>log out</NavItem>
              </Nav>
            </Navbar .Collapse>
          </Navbar>
        </div>
      );
    }
  }

  render() {
    let textStyle ={fontFamily: "Open Sans", background: "#F7F7F7"};
    return (
      <div style={textStyle}>
          {this.createNavBar()}
          {this.props.children}
          <style>
          @import url('https://fonts.googleapis.com/css?family=Open+Sans:300');
          </style>
      </div>
    );
  }
}

/* Setting the propTypes of ControlBar userStore and children as React.PropTypes.*/

ControlBar.propTypes = {
  userStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("userStore")(observer(ControlBar));
