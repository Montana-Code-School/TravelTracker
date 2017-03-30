import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Jumbotron } from 'react-bootstrap';
import Piechart from './Piechart';
import styles from './style/DashboardStyle.css.js';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      activityList: []
    };
    this.createActivityList = this.createActivityList.bind(this);
  }

  componentWillMount() {
    this.setState({
      activityList: this.props.userStore.getActivityList()
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activityList: nextProps.userStore.getActivityList()
    });
  }

  createActivityList(){
    return this.props.userStore.getActivityList();
  }

  render() {

    if(this.props.userStore.checkForCollections()){
      return (
        <div>
          <Row>
            <Col xs={12} md={9} style={{textAlign: "center"}}>
              <Col xs={2}/>
              <Piechart collectionname={"states"}/>
              <Piechart collectionname={"parks"}/>
              <Piechart collectionname={"mlbstadiums"}/>
              <Col xs={2}/>
              <Piechart collectionname={"airports"}/>
            </Col>
            <Col xs={12} md={2}>
              Recent Activity
              <ListGroup style={styles.listStyle}>
                {this.state.activityList}
              </ListGroup>
            </Col>
            <Col md={1}/>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={styles.jumboStyle}>
          <Jumbotron>
            <h4>Welcome to Travel Tracker!  Thank you for stopping by.</h4>
            <h4>View the assortment of options available in the "Collections" menu and pick your passion.</h4>
            <h4>Periodically check in on the Home Page to view your overall progress.</h4>
            <img style={styles.welcomeRibbon} src={require('../img/logo.png')}/>
            <h3 style={{fontWeight: "bold"}}>Bon Voyage!  Safe Travels!  Fair Winds and Following Seas!  Play Ball!</h3>
          </Jumbotron>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
