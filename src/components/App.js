import React from 'react';
import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import SearchGiphy from './SearchGiphy';
import LoginPage from './LoginPage';
import NavLink from './NavLink';
import NewUser from './NewUser';
import { inject, observer } from 'mobx-react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand} from 'react-bootstrap/lib/NavbarHeader';
import { LinkContainer } from 'react-router-bootstrap';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadImagesFromServer();
  }

  loadImagesFromServer() {
    fetch('/api/giphys')
      .then(function(result) {return result.json();})
      .then(images => this.props.imageStore.setImages(images));
  }

  render() {
    return (
    <div>
      <div>
        <h1>Find Your Perfect Giphy</h1>
      </div>
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/LoginPage'}}><NavItem>Login Page</NavItem></LinkContainer>
              <LinkContainer to={{pathname: '/NewUser'}}><NavItem>Create an Account</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight className="nav-bar-right"/>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
    );
  }
}

App.propTypes = {
  imageStore: React.PropTypes.object,
  children: React.PropTypes.object};

export default inject("imageStore")(observer(App));
