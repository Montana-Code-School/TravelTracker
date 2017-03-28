import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup,
   ListGroupItem, Glyphicon, ProgressBar, Row, Col, Jumbotron } from 'react-bootstrap';
import Piechart from './Piechart';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      activityList: []
    };
    this.createActivityList = this.createActivityList.bind(this);
  }

  componentWillMount(){
    this.setState({
      activityList: this.props.userStore.getActivityList()
    });
  }

  createActivityList(){
    return this.props.userStore.getActivityList();
  }

  render() {
    let listStyle = {height:"77vh", overflowY: "scroll", border:"thin solid SlateGrey"};

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
              <ListGroup style={listStyle}>
                {this.state.activityList}
              </ListGroup>
            </Col>
            <Col md={1}/>
          </Row>
        </div>
      );
    } else {
      return (        
        <Jumbotron style={{textAlign: "center", width: "80vw"}}>Welcome to Travel Tracker!  Thank you for visiting our site.  To view the collections that are available
         to track, simply choose from the "Collections" drop down menu.  Safe travels.</Jumbotron>
      );
    }
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
