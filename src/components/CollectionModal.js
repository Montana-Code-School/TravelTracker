/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Accordion, Panel, Button , Modal} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

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
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Description</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <hr />
            <h4>Overflowing text to show scroll behavior</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button block
              onClick={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
              onTouch={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}>Remove
            </Button>
            <Button block
              onClick={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
              onTouch={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}>Add
            </Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CollectionModal.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object,
};


export default inject("userStore")(observer(CollectionModal));
