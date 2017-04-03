/* Importing the neccesary components*/
import React from 'react';
import { Link } from 'react-router';
import CollectionIcon from './CollectionIcon';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';
import Collection from './Collection';
import styles from './style/ControlBarStyle.css.js';
import './style/navBarStyle.css';
import injectTapEventPlugin from "react-tap-event-plugin";


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

  componentWillMount() {
    injectTapEventPlugin();
  }

  logOutHandler(){
    this.props.userStore.logUserOut();
  }

  createNavBar(){
    if(this.props.userStore.loggedInUser){
      let displayIcon = [
        <CollectionIcon key="states" collectionName={"states"}/>,
        <CollectionIcon key="parks" collectionName={"parks"}/>,
        <CollectionIcon key="mlbstadiums" collectionName={"mlbstadiums"}/>,
        <CollectionIcon key="airports" collectionName={"airports"}/>];

      return (
        <div>
          <Navbar staticTop collapseOnSelect fluid style={styles.navbarStyle}>
            <Navbar .Header>
              <Navbar .Brand>
                <Link to={{pathname: '/Dashboard'}}><img className="hidden-xs" style={styles.logoStyle} src={require('../img/barlogo.png')} width="209px" height="96px"/></Link>
                <Link to={{pathname: '/Dashboard'}}><img className="hidden-md hidden-lg hidden-sm" style={styles.logoStyle} src={require('../img/barlogo.png')} width="104.5px" height="48px"/></Link>
              </Navbar .Brand>
            <Navbar .Toggle />
            </Navbar .Header>
            <Navbar .Collapse>
              {displayIcon}
              <Nav pullRight>
                <LinkContainer to={{pathname: '/Dashboard'}}><NavItem><Glyphicon glyph="user"/> {this.props.userStore.name}</NavItem></LinkContainer>
                <NavDropdown id="basic-nav-dropdown" title="collections">
                  <LinkContainer to={{pathname: '/Dashboard'}}><NavItem>Home Page</NavItem></LinkContainer>
                  <MenuItem divider/>
                  <LinkContainer to={{pathname: '/Collection/states'}}><NavItem>States</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/parks'}}><NavItem>National Parks</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/mlbstadiums'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/Collection/elevations'}}><NavItem>Elevation by State</NavItem></LinkContainer>
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



ControlBar.propTypes = {
  userStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("userStore")(observer(ControlBar));
