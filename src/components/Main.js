import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import NavLink from './NavLink';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand } from 'react-bootstrap/lib/NavbarHeader';

class Main extends React.Component {
  render() {
    return (
    <div>
      <h1>Main Page Bitches, Welcome {this.props.userStore.name}</h1>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{pathname: '/SearchGiphy'}}><NavItem>Search Giphy</NavItem></LinkContainer>
            <LinkContainer to={{pathname: '/SearchGifs'}}><NavItem>Add Your Own Gif</NavItem></LinkContainer>
            <LinkContainer to={{pathname: '/Library'}}><NavItem>Your Gifs</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight className="nav-bar-right"/>
        </Navbar.Collapse>
      </Navbar>
      {this.props.children}
    </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Main));
