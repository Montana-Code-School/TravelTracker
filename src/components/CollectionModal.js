/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Accordion, Panel, Button , Modal} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import styles from './style/CollectionStyle.css.js';
import './style/collection.css';

class CollectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }

  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {

    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Available Collections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LinkContainer to={{pathname: '/Dashboard'}}><NavItem>Home Page</NavItem></LinkContainer>
          <MenuItem divider/>
          <LinkContainer to={{pathname: '/Collection/states'}}><NavItem>States</NavItem></LinkContainer>
          <LinkContainer to={{pathname: '/Collection/parks'}}><NavItem>National Parks</NavItem></LinkContainer>
          <LinkContainer to={{pathname: '/Collection/elevations'}}><NavItem>Elevation by State</NavItem></LinkContainer>
          <MenuItem divider/>
          <LinkContainer to={{pathname: '/Collection/mlbstadiums'}}><NavItem>MLB Stadiums</NavItem></LinkContainer>
          <LinkContainer to={{pathname: '/Collection/nflstadiums'}}><NavItem>NFL Stadiums</NavItem></LinkContainer>
          <LinkContainer to={{pathname: '/Collection/airports'}}><NavItem>US Airports</NavItem></LinkContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CollectionModal.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object,
};


export default inject("userStore")(observer(CollectionModal));
