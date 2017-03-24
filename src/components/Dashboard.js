import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
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

    return (
      <div>
        <Row>
          <Col xs={12} md={9} style={{textAlign: "center"}}>
            <Col xs={2}/>
              <Col xs={3}>
                States
                <Link to={{pathname: '/Collection/states'}}>
                  <div>
                    {this.createPieChart("states")}
                    {this.props.userStore.getPercentageCompletion("states").toFixed(0)}%
                  </div>
                </Link>
              </Col>
              <Col xs={3}>
                Parks
                <Link to={{pathname: '/Collection/parks'}}>
                  <div>
                    {this.createPieChart("parks")}
                    {this.props.userStore.getPercentageCompletion("parks").toFixed(0)}%
                  </div>
                </Link>
              </Col>
              <Col xs={3}>
                Stadiums
                <Link to={{pathname: '/Collection/stadiums'}}>
                  <div>
                    {this.createPieChart("stadiums")}
                    {this.props.userStore.getPercentageCompletion("stadiums").toFixed(0)}%
                  </div>
                </Link>
              </Col>
          </Col>
          <Col xs={12} md={2}>
            Recent Activity
            <ListGroup style={listStyle}>
              <ListGroupItem>activity list over here maybe</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={1}/>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
