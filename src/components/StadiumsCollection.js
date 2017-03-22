import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';

class StadiumCollection extends React.Component {

  constructor(){
    super();
    this.state = {
      stadiums: []
    };
    this.fetchStadiums = this.fetchStadiums.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
    this.calcStadiumComp = this.calcStadiumComp.bind(this);
  }

  componentDidMount() {
    this.fetchStadiums();
  }

  prepareCollection(){
    return this.state.stadiums.map(function(x){
      if (this.props.userStore.stadiums.find(function(y){
        return y.name==x.name;
      })) {
        return (<ListGroupItem onClick={() => {this.props.userStore.removeStadium(this.props.userStore.name, x.name);}}
          key={x.name}><Glyphicon glyph="check" style={{color: "green"}}/>  {x.name}, {this.props.userStore.getDateStadiumAdded(x.name)}</ListGroupItem>);
      } else {return <ListGroupItem onClick={() => {this.props.userStore.addStadium(this.props.userStore.name, x.name);}} key={x.name}>{x.name}</ListGroupItem>;}
    },this);
  }

  fetchStadiums() {
    fetch(`/stadiums`)
    .then(result => result.json())
    .then(data => this.setState({stadiums: data}));
  }

  calcStadiumComp() {
    return ((this.props.userStore.stadiums.length/30)*100);
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};
    let progressStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto", width: "90%"};
    let imageStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto",
      width: "48vw", height: "65vh", border: "2px solid black"};
    return (
      <Row>
        <Col xs={12} md={9}>
          <div style={progressStyle}>
            <h3>Major League Baseball stadiums collection: {this.calcStadiumComp().toFixed(0)}%</h3>
            <ProgressBar active now={this.calcStadiumComp()}/>
            <img style={imageStyle} src={require('../img/mlb1.png')}/>
          </div>
        </Col>
        <Col xs={12} md={3}>
          Major League Baseball Stadiums
          <ListGroup style={listStyle}>
            {this.prepareCollection()}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

StadiumCollection.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(StadiumCollection));
