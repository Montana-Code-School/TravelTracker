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
      activityList: []
    };
    this.createPieChart = this.createPieChart.bind(this);
    this.createActivityList = this.createActivityList.bind(this);

  }

  componentWillMount(){
    this.setState({
      activityList: this.props.userStore.getActivityList()
    });
  }

  createPieChart(collectionname){
    let percentComplete = this.props.userStore.getPercentageCompletion(collectionname);
    return(<PieChart slices={[{color: '#35b729', value: percentComplete},
      {color: '#8FBC8F',value: (100-percentComplete)}]}/>);
  }

  createActivityList(){
    return this.props.userStore.getActivityList();
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};

    return (
      <div>
        <Row>
          <Col xs={12} md={9} style={{textAlign: "center"}}>
            <Col xs={2}/>
              <Col xs={3}>
                US States
                <Link to={{pathname: '/Collection/states'}}>
                  <div>
                    {this.createPieChart("states")}
                    {this.props.userStore.getPercentageCompletion("states").toFixed(0)}%
                  </div>
                </Link>
              </Col>
              <Col xs={3}>
                National Parks
                <Link to={{pathname: '/Collection/parks'}}>
                  <div>
                    {this.createPieChart("parks")}
                    {this.props.userStore.getPercentageCompletion("parks").toFixed(0)}%
                  </div>
                </Link>
              </Col>
              <Col xs={3}>
                MLB Stadiums
                <Link to={{pathname: '/Collection/stadiums'}}>
                  <div>
                    {this.createPieChart("stadiums")}
                    {this.props.userStore.getPercentageCompletion("stadiums").toFixed(0)}%
                  </div>
                </Link>
              </Col>
              <Col xs={3}>
                US Airports
                <Link to={{pathname: '/Collection/airports'}}>
                  <div>
                    {this.createPieChart("airports")}
                    {this.props.userStore.getPercentageCompletion("airports").toFixed(0)}%
                  </div>
                </Link>
              </Col>
          </Col>
          <Col xs={12} md={2}>
            Recent Activity
            <ListGroup style={listStyle}>
              {this.state.activityList}
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
