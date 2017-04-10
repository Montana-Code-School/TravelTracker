/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Link } from 'react-router';
import { NavItem, Button , Modal} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import styles from './style/ModalStyle.css.js';
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
     <div>
       <Button style={{border: ".5px solid #ececec"}} className="btn btn-success" onClick={this.open}>Travel Tracker Collections</Button>
       <Modal bsSize="small" show={this.state.showModal} onHide={this.close}>
         <Modal.Header closeButton>
           <Modal.Title>Select your next collection:</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <NavItem>
            <Link to="/Collection/states" style={styles.modalStyle}>
              US States
            </Link>
           </NavItem>
           <NavItem>
            <Link to="/Collection/parks" style={styles.modalStyle}>
              National Parks
            </Link>
           </NavItem>
           <NavItem>
            <Link to="/Collection/elevations" style={styles.modalStyle}>
              State Elevations
            </Link>
           </NavItem>
           <NavItem>
            <Link to="/Collection/mlbstadiums" style={styles.modalStyle}>
              MLB Stadiums
            </Link>
           </NavItem>
           <NavItem>
            <Link to="/Collection/nflstadiums" style={styles.modalStyle}>
              NFL Stadiums
            </Link>
           </NavItem>
           <NavItem>
            <Link to="/Collection/airports" style={styles.modalStyle}>
              US Airports
            </Link>
           </NavItem>
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
