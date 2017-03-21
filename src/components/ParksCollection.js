import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';

class ParksCollection extends React.Component {

  constructor(){
    super();
    this.state = {
      parks: []
    };
    this.fetchParks = this.fetchParks.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
    this.calcParkComp = this.calcParkComp.bind(this);
  }

  componentDidMount() {
    this.fetchParks();
  }

  prepareCollection(){
    return this.state.parks.map(function(x){
      if (this.props.userStore.parks.find(function(y){
        return y==x.name;
      })) {
        return <ListGroupItem onClick={() => {this.props.userStore.togglePark(this.props.userStore.name, x.name);}} key={x.name}><Glyphicon glyph="check" style={{color: "green"}}/>  {x.name}</ListGroupItem>;
      } else {return <ListGroupItem onClick={() => {this.props.userStore.togglePark(this.props.userStore.name, x.name);}} key={x.name}>{x.name}</ListGroupItem>;}
    },this);
  }

  fetchParks() {
    fetch(`/parks`)
    .then(result => result.json())
    .then(data => this.setState({parks: data}));
  }

  calcParkComp() {
    return ((this.props.userStore.parks.length/62)*100);
  }

  render() {
    let listStyle = {height:"80vh", overflowY: "scroll", border:"thin solid SlateGrey"};
    let progressStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto", width: "90%"};
    let progressStyle2 = {position: "absolute", left: "0px", right: "0px", margin:"auto"};
    return (
      <Row>
        <Col xs={12} md={9}>
          <div style={progressStyle}>
            <h3>National Parks collection: {this.calcParkComp().toFixed(0)}%</h3>
            <ProgressBar active now={this.calcParkComp()}/>
            <img style={progressStyle2} src={require('../img/NationalParks.jpg')}/>
          </div>
        </Col>
        <Col xs={12} md={3}>
          National Parks
          <ListGroup style={listStyle}>
            {this.prepareCollection()}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

ParksCollection.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(ParksCollection));
