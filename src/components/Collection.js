import React from 'react';
import { inject, observer } from 'mobx-react';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Accordion, Panel, Button} from 'react-bootstrap';
import styles from './style/CollectionStyle.css.js';
import './style/collection.css';
import CollectionMap from './CollectionMap';

class Collection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collection: []
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
        const collectedHeader = (<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span>{x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>);
        return (
          <Panel style={styles.panelStyle} header={<div><span><Glyphicon glyph="check" style={{color: "#57ae81"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>} key={x.name} eventKey={x.name}>
          {x.description}
          <Button block
          onClick={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
          onTouch={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
          >Remove</Button>
          </Panel>);
      } else {
        return (
          <Panel style={styles.panelStyle} header={x.name} key={x.name} eventKey={x.name}>
            {x.description}
            <Button block
            onClick={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
            onTouch={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
            >Add</Button>
          </Panel>);}
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
            <Accordion style={styles.listStyle}>
              {this.prepareCollection()}
            </Accordion>
          </Col>
          <Col xsHidden smHidden md={1}/>
        </Row>
    );
  }
}

Collection.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object
};

export default inject("userStore")(observer(Collection));
