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
        return (
          <Panel style={styles.panelStyle} header={<div><span><Glyphicon glyph="check" style={{color: "green"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>} key={x.name} eventKey={x.name}>0
            {x.description} <Button onClick={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}>Remove From Collection</Button>
          </Panel>);
      } else {
        return (
          <Panel style={styles.panelStyle} header={x.name} key={x.name} eventKey={x.name}>
            {x.description} <Button onClick={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}>Add To Collection</Button>
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
        <Row className="show-grid">
          <Col xs={12} md={9}>
              <Col xsHidden smHidden md={1}/>
              <Col md={11}>
                <h3>{this.props.params.collectionname} collection: {this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0)}%</h3>
                <ProgressBar active style={{border: ".5px solid black", background: "white"}} now={parseInt(this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0))}/>
              </Col>
              <Col xsHidden smHidden md={1}/>
              <Col style={styles.mapStyle} xsHidden smHidden md={10}>
                <CollectionMap
                collectionName={this.props.params.collectionname}
                fullCollection={this.state.collection}
                usersCollection={this.props.userStore[this.props.params.collectionname]}/>
              </Col>
              <Col xsHidden smHidden md={1}/>
          </Col>
          <Col xs={12} md={2}>
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
