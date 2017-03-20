/* Importing the neccesary components*/
import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Col } from 'react-bootstrap';

/* making the class ControlBar function which is a React Component. Render to
actually diplay the ControlBar return content.*/
class ControlBar extends React.Component {
  render() {

    const dashStyle = {height: '50px', color: 'red', margin: '0px', padding:'0px'};

    return (
      <div>
      <Navbar>
      <div>
      <NavItem>
      <Col md={2}>
         <Navbar.Header>
           <Navbar.Brand>
           <img src="https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-04-2-512.png" width="100" height="100" alt=""/>
           </Navbar.Brand>
         </Navbar.Header>
      </Col>
      </NavItem>
      <Col md={2}>
        Welcome {this.props.userStore.name}
      </Col>
      <Col md={2}/>
      <Col md={2}/>
      <Col md={4}>
      <Nav pullRight>
        <NavDropdown eventKey={2} title="Collections" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1}>States</MenuItem>
          <MenuItem eventKey={2.2}>National Parks</MenuItem>
          <MenuItem eventKey={2.3}>5-Star Restaurants</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2.4}>Starbucks</MenuItem>
        </NavDropdown>
        <LinkContainer to={{pathname: "/"}}><NavItem eventKey={3}>LogOut</NavItem></LinkContainer>
      </Nav>
      </Col>



      </div>

      </Navbar>
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
