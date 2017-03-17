import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem } from 'react-bootstrap';

class Dashboard extends React.Component {
  render() {

    const dashStyle = {height: '50px', color: 'red', margin: '0px', padding:'0px'};

    return (
      <div>
        <div>
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

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
