import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';

class Collection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collection: []
    };
    this.fetchCollection = this.fetchCollection.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
    this.calcCollectionComp = this.calcCollectionComp.bind(this);
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

  calcCollectionComp() {
    return ((this.props.userStore[this.props.params.collectionname].length/this.state.collection.length)*100);
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};
    let progressStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto", width: "90%"};
    let imageStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto",
      width: "48vw", height: "65vh"};

    return (
      <div>
        <Row>
          <Col xs={12} md={9}>
            <div style={progressStyle}>
              <h3>{this.props.params.collectionname} collection: {this.calcCollectionComp().toFixed(0)}%</h3>
              <ProgressBar active now={this.calcCollectionComp()}/>
              <img style={imageStyle} src={require('../img/'+this.props.params.collectionname+'.jpg')}/>
            </div>
          </Col>
          <Col xs={12} md={3}>
            {this.props.params.collectionname}
            <ListGroup style={listStyle}>
              {this.prepareCollection()}
            </ListGroup>
          </Col>
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
