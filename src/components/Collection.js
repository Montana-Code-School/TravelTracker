import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';
import styles from './style/CollectionStyle.css.js';

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
    this.fetchCollection();
  }

  componentWillReceiveProps(nextProps) {
    fetch(`/`+nextProps.params.collectionname)
    .then(result => result.json())
    .then(data => this.setState({collection: data}));
  }

  prepareCollection(){
    return this.state.collection.map(function(x){
      if (this.props.userStore[this.props.params.collectionname].find(function(y){return y.name==x.name;})){
        return (<ListGroupItem onClick={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}} key={x.name}>
        <Glyphicon glyph="check" style={{color: "green"}}/>  {x.name}, {this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</ListGroupItem>);
      } else {return <ListGroupItem onClick={() => {this.props.userStore.addCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}} key={x.name}>{x.name}</ListGroupItem>;}
    },this);
  }

  fetchCollection() {
    fetch(`/`+this.props.params.collectionname)
    .then(result => result.json())
    .then(data => this.setState({collection: data}));
  }

  render() {

    return (
      <div>
        <Row>
          <Col xs={12} md={9}>
            <div style={styles.progressStyle}>
              <h3>{this.props.params.collectionname} collection: {this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0)}%</h3>
              <ProgressBar active style={{border: ".5px solid black", background: "white"}} now={this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0)}/>
              <img style={styles.imageStyle} src={require('../img/'+this.props.params.collectionname+'.jpg')}/>
            </div>
          </Col>
          <Col xs={12} md={2}>
            {this.props.params.collectionname}
            <ListGroup style={styles.listStyle}>
              {this.prepareCollection()}
            </ListGroup>
          </Col>
          <Col md={1}/>
        </Row>
      </div>
    );
  }
}

Collection.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object
};

export default inject("userStore")(observer(Collection));
