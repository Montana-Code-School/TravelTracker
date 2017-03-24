/* Importing the neccesary components*/
import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';
import Collection from './Collection';
import styles from './style/ControlBarStyle.css.js';

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

      let logoStyle = {position: "absolute", top: "1.25px", left: "1.25px", zIndex: "100"};
      let navbarStyle = {zIndex: "1", marginBottom:"40px", background:"rgb(53, 183, 41)", color: "white", boxShadow: "0px 1px 5px grey"};
      let trophyStyle = {position: "relative", left: "20%", top: ".5px",
        width: "50px", height: "49px"};
      let trophyStyle1 = {position: "relative", left: "20%", top: ".5px",
        width: "50px", height: "49px", border: "3px solid #cc851c"};
      let trophyStyle2 = {position: "relative", left: "20%", top: ".5px",
        width: "50px", height: "49px", border: "3px solid silver"};
      let trophyStyle3 = {position: "relative", left: "20%", top: ".5px",
        width: "50px", height: "49px", border: "3px solid gold"};
      let displayTrophy = [];

      if ((this.props.userStore.getPercentageCompletion("states") == 100)) {
        displayTrophy.push (
          <img key="states" style={trophyStyle3} src={require('../img/STtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("states") >= 80)) {
        displayTrophy.push (
          <img key="states" style={trophyStyle2} src={require('../img/STtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("states") >= 40)) {
        displayTrophy.push (
          <img key="states" style={trophyStyle1} src={require('../img/STtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("states") >= 1)) {
        displayTrophy.push (
          <img key="states" style={trophyStyle} src={require('../img/STtr.png')}/>
        );
      }

      if ((this.props.userStore.getPercentageCompletion("parks") == 100)) {
        displayTrophy.push (
          <img key="parks" style={trophyStyle3} src={require('../img/NPtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("parks") >= 80)) {
        displayTrophy.push (
          <img key="parks" style={trophyStyle2} src={require('../img/NPtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("parks") >= 40)) {
        displayTrophy.push (
          <img key="parks" style={trophyStyle1} src={require('../img/NPtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("parks") >= 1)) {
        displayTrophy.push (
          <img key="parks" style={styles.trophyStyle} src={require('../img/NPtr.png')}/>
        );
      }

      if ((this.props.userStore.getPercentageCompletion("stadiums") == 100)) {
        displayTrophy.push (
          <img key="stadiums" style={trophyStyle3} src={require('../img/BBtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("stadiums") >= 80)) {
        displayTrophy.push (
          <img key="stadiums" style={trophyStyle2} src={require('../img/BBtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("stadiums") >= 40)) {
        displayTrophy.push (
          <img key="stadiums" style={trophyStyle1} src={require('../img/BBtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("stadiums") >= 1)) {
        displayTrophy.push (
          <img key="stadiums" style={styles.trophyStyle} src={require('../img/BBtr.png')}/>
        );
      }

      if ((this.props.userStore.getPercentageCompletion("airports") == 100)) {
        displayTrophy.push (
          <img style={trophyStyle3} src={require('../img/APtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("airports") >= 80)) {
        displayTrophy.push (
          <img style={trophyStyle2} src={require('../img/APtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("airports") >= 40)) {
        displayTrophy.push (
          <img style={trophyStyle1} src={require('../img/APtr.png')}/>
        );
      } else if ((this.props.userStore.getPercentageCompletion("airports") >= 1)) {
        displayTrophy.push (
          <img key="airports" style={trophyStyle} src={require('../img/APtr.png')}/>
        );
      }

      return (
        <div>
          <div>
            <Navbar staticTop collapseOnSelect fluid style={styles.navbarStyle}>
              <Navbar .Header>
                <Navbar .Brand>
                  <img className="hidden-xs" style={styles.logoStyle} src={require('../img/barlogo.png')} width="165px" height="48px"/>
                  <img className="hidden-md hidden-lg hidden-sm" style={styles.logoStyle} src={require('../img/logocollapsed.png')} width="112px" height="51px"/>
                </Navbar .Brand>
              </Navbar .Header>
              <Navbar .Toggle />
              <Navbar .Collapse>
                {displayTrophy}
                <Nav pullRight>
                  <LinkContainer to={{pathname: '/Dashboard'}}><NavItem><Glyphicon glyph="user"/> {this.props.userStore.name}</NavItem></LinkContainer>
                  <NavDropdown id="dropdown" title="Collections">
                    <LinkContainer to={{pathname: '/Dashboard'}}><NavItem>Home Page</NavItem></LinkContainer>
                    <MenuItem divider/>
                    <LinkContainer to={{pathname: '/Collection/states'}}><NavItem>States</NavItem></LinkContainer>
                    <LinkContainer to={{pathname: '/Collection/parks'}}><NavItem>National Parks</NavItem></LinkContainer>
                    <LinkContainer to={{pathname: '/Collection/stadiums'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
                    <LinkContainer to={{pathname: '/Collection/airports'}}><NavItem>US Airports</NavItem></LinkContainer>
                  </NavDropdown>
                  <NavItem onClick={() => {this.logOutHandler();}}>LogOut</NavItem>
                </Nav>
              </Navbar .Collapse>
            </Navbar>
          </div>
        </div>
      );
    }
  }

  render() {
    let textStyle ={fontFamily: "Josefin Sans", background: "#F7F7F7"};
    return (
      <div style={textStyle}>
          {this.createNavBar()}
          {this.props.children}
          <style>
          @import url('https://fonts.googleapis.com/css?family=Josefin+Sans');
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
