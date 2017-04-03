import React from 'react';
import { inject, observer } from 'mobx-react';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Accordion, Panel, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import styles from './style/CollectionStyle.css.js';
import './style/collection.css';
import CollectionMap from './CollectionMap';
import CollectionModal from './CollectionModal';

class Collection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collection: [],
    };
    this.fetchCollection = this.fetchCollection.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
  }

  componentWillMount() {
    this.fetchCollection(this.props.params.collectionname);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCollection(nextProps.params.collectionname);
  }

  prepareCollection(){
    return this.state.collection.map(function(x){
      if (this.props.userStore[this.props.params.collectionname].find(function(y){return y.name==x.name;})){

        const popoverClickRootClose = (
          <Popover id="popover-trigger-click-root-close" title={x.name}>
            <div>{x.description}</div>
            <div><img src={require("../img/coorsfield.jpg")} width="100px" height="100px"/></div>
            <Button block
            onTouchTap={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
            >Remove</Button>
          </Popover>
        );
        return (
          <ListGroupItem>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverClickRootClose}>
              <ListGroupItem style={styles.panelStyle} header={<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>} key={x.name} eventKey={x.name}>
              </ListGroupItem>
            </OverlayTrigger>
          </ListGroupItem>);

      } else {

        const popoverClickRootClose = (
          <Popover id="popover-trigger-click-root-close" title={x.name}>
            <div>{x.description}</div>
            <div><img src={require("../img/coorsfield.jpg")} width="100px" height="100px"/></div>          
            <Button block
            onTouchTap={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
            >Add</Button>
          </Popover>
        );

        return (
          <ListGroupItem>
            <OverlayTrigger trigger="click" rootClose placement="left" overlay={popoverClickRootClose}>
              <ListGroupItem style={styles.panelStyle} header={x.name} key={x.name} eventKey={x.name}>
              </ListGroupItem>
          </OverlayTrigger>
        </ListGroupItem>);
      }
    },this);
  }

  fetchCollection(collectionName) {
    fetch(`/`+collectionName)
    .then(result => result.json())
    .then(data => this.setState({collection: data}));
  }

  render() {
    return (
        <Row>
          <Col xs={12} md={8}>
            <CollectionMap
            collectionName={this.props.params.collectionname}
            fullCollection={this.state.collection}
            usersCollection={this.props.userStore[this.props.params.collectionname]}/>
          </Col>
          <Col xs={12} md={3}>
            <ListGroup style={styles.listStyle}>
              {this.prepareCollection()}
            </ListGroup>
          </Col>
          <Col xsHidden smHidden md={1}/>
        </Row>
    );
  }
}

Collection.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object,
};


export default inject("userStore")(observer(Collection));
