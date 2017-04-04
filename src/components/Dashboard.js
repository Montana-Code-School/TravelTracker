import React from 'react';
import { inject, observer } from 'mobx-react';
import {  ListGroup, Row, Col, Jumbotron, Well, Button } from 'react-bootstrap';
import Piechart from './Piechart';
import styles from './style/DashboardStyle.css.js';
import Trophy from './Trophy';


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

  createTrophyCase(){
    if(this.props.userStore.loggedInUser){
      let displayTrophy = [
        <Trophy key="states" collectionName={"states"}/>,
        <Trophy key="parks" collectionName={"parks"}/>,
        <Trophy key="elevations" collectionName={"elevations"}/>,
        <Trophy key="mlbstadiums" collectionName={"mlbstadiums"}/>,
        <Trophy key="nflstadiums" collectionName={"nflstadiums"}/>,
        <Trophy key="airports" collectionName={"airports"}/>,];
      return displayTrophy;
    }
  }

  render() {

    if(this.props.userStore.checkForCollections()){
      return (
        <div>
          <div>
            <Col md={1}/>
            <Col md={2} style={{textAlign: "center"}}>
              <Well style={styles.wellStyle}>
                <Row>
                  <Piechart collectionname={"states"}/>
                  <Piechart collectionname={"parks"}/>
                </Row>
                <Row>
                  <Piechart collectionname={"mlbstadiums"}/>
                  <Piechart collectionname={"nflstadiums"}/>
                </Row>
                <Row>
                  <Piechart collectionname={"elevations"}/>
                  <Piechart collectionname={"airports"}/>
                </Row>
              </Well>
            </Col>
            <Col md={6}>
              <Well style={styles.wellStyle}>
                <div>
                  {this.createTrophyCase()}
                </div>
              </Well>
              <Well style={styles.wellStyle}>
                <div style={styles.trophyCase}>
                  <Button>View Collections</Button>
                </div>
              </Well>
            </Col>
            <Col md={2}>
              <Well style={styles.listStyle}>
              <h4 style={{textAlign: "center"}}>Recent Activity</h4>
              <ListGroup>
                {this.state.activityList}
              </ListGroup>
              </Well>
            </Col>
            <Col md={1}/>
          </div>
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
