/* Importing the neccesary components*/
import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col, Glyphicon } from 'react-bootstrap';

/* making the class ControlBar function which is a React Component. Render to
actually diplay the ControlBar return content.*/
class ControlBar extends React.Component {
  constructor(){
    super();

    this.createNavBar = this.createNavBar.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler(){
    this.props.userStore.logUserOut();
  }

  createNavBar(){
    if(this.props.userStore.loggedInUser){
      let logoStyle = {position: "absolute", top: "0px", left: "10px", zIndex: "100"};
      let navbarStyle = {zIndex: "1", marginBottom:"80px", background:"none", borderBottom:"none"};
      return (
        <div>
          <div>
            <img className="hidden-xs" style={logoStyle} src={require('../img/thelogo.png')} width="150" height="150"/>
          </div>
          <div>
            <Navbar staticTop collapseOnSelect fluid style={navbarStyle}>
              <Nav pullRight>
                <Navbar .Text>
                <Glyphicon glyph="user"/> {this.props.userStore.name}
                </Navbar .Text>
                <NavDropdown id="dropdown" title="Collections">
                  <LinkContainer to={{pathname: '/StatesCollection'}}><NavItem>States</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/ParksCollection'}}><NavItem>National Parks</NavItem></LinkContainer>
                  <LinkContainer to={{pathname: '/StadiumsCollection'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
                </NavDropdown>
                <NavItem onClick={() => {this.logOutHandler();}}>LogOut</NavItem>
              </Nav>
            </Navbar>
          </div>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
          {this.createNavBar()}
          {this.props.children}
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
