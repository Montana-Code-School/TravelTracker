import React from 'react';
import { inject, observer } from 'mobx-react';
import {  ListGroup, Row, Col, Well } from 'react-bootstrap';
import Piechart from './Piechart';
import CollectionModal from './CollectionModal';
import styles from './style/DashboardStyle.css.js';
import Trophy from './Trophy';


class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      activityList: [],
    };
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

            <Col md={2} style={{textAlign: "center"}}>
              <Well style={styles.wellStyle}>
                <Row>
                  <Piechart collectionname={"states"}/>
                  <Piechart collectionname={"parks"}/>
                  <Piechart collectionname={"mlbstadiums"}/>
                  <Piechart collectionname={"nflstadiums"}/>
                  <Piechart collectionname={"elevations"}/>
                  <Piechart collectionname={"airports"}/>
                </Row>
              </Well>
            </Col>
                <Col md={1}/>
            <Col md={6}>
              <Well style={styles.wellStyle}>
              <h3>Trophy Case</h3><br/>
                  {this.createTrophyCase()}
              </Well>
              <Well style={styles.wellStyle}>
                <div>
                  <CollectionModal/>
                </div>
              </Well>
            </Col>
                        <Col md={1}/>
            <Col md={2}>
              <Well style={styles.listStyle}>
              <h4 style={{textAlign: "center"}}>Recent Activity</h4>
              <ListGroup>
                {this.state.activityList}
              </ListGroup>
              </Well>
            </Col>

          </div>
        </div>
      );
    } else {

      const bg = require('../img/highway.jpg');
      const imageStyle = {height:"90vh", width:"100vw",
        background: "url("+bg+") no-repeat center fixed",
        backgroundSize: "cover", display: "flex",
        alignItems: "center", justifyContent: "center"};

      return (
        <div>
          <div style={imageStyle}>
            <div style={{textAlign: "center"}}>
              <Well style={{border: "1px solid #bcbcbc", backgroundColor: "rgba(193, 193, 192, .5)"}}>
              <h4 style={{fontWeight: "bold"}}>Welcome to Travel Tracker!  Thank you for stopping by.</h4>
              <h4 style={{fontWeight: "bold"}}>View the assortment of options available in the "Collections"
              menu and pick your passion.</h4>
              <h4 style={{fontWeight: "bold"}}>Periodically check in on the Home Page to view
              your overall progress.</h4>
              <img style={styles.welcomeRibbon} src={require('../img/barlogo1.png')}/>
              <h2 style={{fontWeight: "bold"}}>Bon Voyage!
              Safe Travels!  Fair Winds and Following Seas!  Play Ball!</h2>
              <div>
                <CollectionModal/>
              </div>
              </Well>
            </div>
          </div>
        </div>
      );
    }
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
