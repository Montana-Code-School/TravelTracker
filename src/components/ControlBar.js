/* Importing the neccesary components*/
import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';
import Collection from './Collection';

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

      return (
        <div>
          <div>
            <img className="hidden-xs" style={logoStyle} src={require('../img/barlogo.png')} width="165px" height="48px"/>
            <img className="hidden-md hidden-lg hidden-sm" style={logoStyle} src={require('../img/logocollapsed.png')} width="112px" height="51px"/>
          </div>
          <div>
            <Navbar staticTop collapseOnSelect fluid style={navbarStyle}>
              <Navbar .Toggle />
              <Navbar .Collapse>
                <Nav pullRight>
                  <LinkContainer to={{pathname: '/Dashboard'}}><NavItem><Glyphicon glyph="user"/> {this.props.userStore.name}</NavItem></LinkContainer>
                  <NavDropdown id="dropdown" title="Collections">
                    <LinkContainer to={{pathname: '/Collection/states'}}><NavItem>States</NavItem></LinkContainer>
                    <LinkContainer to={{pathname: '/Collection/parks'}}><NavItem>National Parks</NavItem></LinkContainer>
                    <LinkContainer to={{pathname: '/Collection/stadiums'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
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
    let textStyle ={fontFamily: "Josefin Sans"};
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
