import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem } from 'react-bootstrap';

class Main extends React.Component {
  render() {

    const dashStyle = {height: '50px', color: 'red', margin: '0px', padding:'0px'};

    return (
      <div>
        <div>
          <Navbar>
            <Navbar .Header><Navbar .Brand>Welcome, {this.props.userStore.name}</Navbar .Brand></Navbar .Header>
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
          </Navbar>
          <div>
            <li><NavLink to="/">Home</NavLink></li>
          </div>
        </div>
          <div>
            <h3>Collection % Goes Here once selected</h3>
          </div>
          <div id="map">
            <h1>THE MAP GOES HERE</h1>
          </div>
      </div>
    );
  }
}

Main.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Main));
