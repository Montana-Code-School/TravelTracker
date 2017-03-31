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

  prepareCollection(){
    return this.state.collection.map(function(x){
      const collectedHeader = (<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span>{x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>);
      if (this.props.userStore[this.props.params.collectionname].find(function(y){return y.name==x.name;})){
        return (
          <div>
          <ListGroupItem style={styles.panelStyle}  key={x.name} eventKey={x.name}>
          <Button bsStyle="primary" bsSize="large" onClick={this.open}>{<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>}
          </Button>

          <Modal show={this.state.showModal} onHide={this.close} eventKey={x.name}>
            <Modal.Header closeButton>
              <Modal.Title>test</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {x.description}
            </Modal.Body>
            <Modal.Footer>
              <Button block
              onTouchTap={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
              >Remove</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
          </ListGroupItem>
          </div>
        );
      } else {
        return (
          <div>
          <ListGroupItem style={styles.panelStyle} key={x.name} eventKey={x.name}>
          <Button bsStyle="primary" bsSize="large" onClick={this.open}>{x.name}
          </Button>
          <Modal show={this.state.showModal} onHide={this.close} eventKey={x.name}>
            <Modal.Header closeButton>
              <Modal.Title>{x.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {x.description}
            </Modal.Body>
            <Modal.Footer>
            <Button block
            onTouchTap={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
            >Add</Button>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
          </ListGroupItem>
          </div>
        );}
    },this);
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
            {this.prepareCollection()}
            <h4>Description</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <hr />
            <h4>Overflowing text to show scroll behavior</h4>
          </Modal.Body>
          <Modal.Footer>
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
