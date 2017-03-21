import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, Checkbox } from 'react-bootstrap';

class ControlBar extends React.Component {
  render() {

    const dashStyle = {height: '50px', color: 'red', margin: '0px', padding:'0px'};

    return (
      <div>
          <Navbar>
            <Navbar .Header><Navbar .Brand>Welcome, {this.props.userStore.name}</Navbar .Brand></Navbar .Header>
            <Nav pullRight>
              <NavDropdown title="Collections" id="basic-nav-dropdown">
                <LinkContainer to={{pathname: "/"}}><MenuItem>States</MenuItem></LinkContainer>
                <MenuItem>National Parks</MenuItem>
              </NavDropdown>
              <LinkContainer to={{pathname: "/"}}><NavItem eventKey={3}>LogOut</NavItem></LinkContainer>
            </Nav>
          </Navbar>
          {this.props.children}
      </div>
    );
  }
}

ControlBar.propTypes = {
  userStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default inject("userStore")(observer(ControlBar));
