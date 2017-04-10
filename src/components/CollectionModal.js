/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Link } from 'react-router';
import { NavItem, Button , Modal} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
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
           <NavItem><Link to="/Collection/states">US States</Link></NavItem>
           <NavItem><Link to="/Collection/parks">National Parks</Link></NavItem>
           <NavItem><Link to="/Collection/elevations">State Elevations</Link></NavItem>
           <NavItem><Link to="/Collection/mlbstadiums">MLB Stadiums</Link></NavItem>
           <NavItem><Link to="/Collection/nflstadiums">NFL Stadiums</Link></NavItem>
           <NavItem><Link to="/Collection/airports">US Airports</Link></NavItem>
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
