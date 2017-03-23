import React from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col } from 'react-bootstrap';
import PieChart from 'react-simple-pie-chart';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
    };
    this.createPieChart = this.createPieChart.bind(this);
  }

  createPieChart(collectionname){
    let percentComplete = this.props.userStore.getPercentageCompletion(collectionname);
    return(<PieChart slices={[{color: '#35b729', value: percentComplete},
      {color: '#8FBC8F',value: (100-percentComplete)}]}/>);
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};
    let progressStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto", width: "90%"};
    let imageStyle = {position: "absolute", left: "0px", right: "0px", margin:"auto",
      width: "48vw", height: "65vh"};

    return (
      <div>
        <Row>
          <Col xs={12} md={9} style={{textAlign: "center"}}>
            <Col xs={3}/>
              <Col xs={3}>
                States
                {this.createPieChart("states")}
                {this.props.userStore.getPercentageCompletion("states").toFixed(0)}%
              </Col>
              <Col xs={3}>
                Parks
                {this.createPieChart("parks")}
                {this.props.userStore.getPercentageCompletion("parks").toFixed(0)}%
              </Col>
              <Col xs={3}>
                Stadiums
                {this.createPieChart("stadiums")}
                {this.props.userStore.getPercentageCompletion("stadiums").toFixed(0)}%
              </Col>
          </Col>
          <Col xs={12} md={3}>
            Recent Activity
            <ListGroup style={listStyle}>
              <ListGroupItem>activity list over here maybe</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
