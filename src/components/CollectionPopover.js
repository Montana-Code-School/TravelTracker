/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Accordion, Panel, Button , Modal, Popover, popoverClickRootClose} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import styles from './style/CollectionStyle.css.js';
import './style/collection.css';

class CollectionPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }

  const popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" title="test">
      <strong>test1</strong> test2
      <Button block
      onTouchTap={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
      >Remove</Button>
    </Popover>
  );

  if (this.props.userStore[this.props.params.collectionname].find(function(y){return y.name==x.name;})){
    return (
      <ListGroupItem>
        <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverClickRootClose}>
          <Button><ListGroupItem style={styles.panelStyle} header={<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>} key={x.name} eventKey={x.name}>
          {x.description}
          </ListGroupItem></Button>
        </OverlayTrigger>
      </ListGroupItem>
      );







CollectionPopover.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object,
};


export default inject("userStore")(observer(CollectionPopover));
