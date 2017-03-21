import React from 'react';
import NavLink from './NavLink';
import NewUser from './NewUser';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Grid, Col, Row, Image, Well, Button } from 'react-bootstrap';

class Welcome extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      admin: false,
      email: "",
      loginMsg: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handleLoginUser(event) {
    this.props.userStore.LoginUser(this.state.name, this.state.password);
  }

  render() {
    const parentStyle = {background: "url(http://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/national-parks-road-trips/sahale-arm-trail-cascades-national-park.jpg) no-repeat center center fixed", height: "100vh"};
    const wellStyle = {marginTop: "30%", opacity: ".95", fontFamily: "Josefin Sans", backgroundBlendMode: "overlay", height: "40vh"};
    let logoStyle = {position: "absolute", top: "0px", left: "10px", zIndex: "100"};
    return (
      <div>
        <div>
          <img className="hidden-xs" style={logoStyle} src="https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-04-2-512.png" width="100" height="100"/>
        </div>
        <div style={parentStyle}>

          <Col sm={2}/>
          <Col sm={8}>

          <Well style={wellStyle} bsSize="large">

          <form method="" role="form">

              <legend>{this.state.loginMsg == "" ? "Log In to Travel Tracker": this.state.loginMsg}</legend>

              <div className="form-group">
                <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="username" placeholder="username"/>
              </div>

              <div className="form-group">
                <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password"/>
              </div>
              <Link to ="/NewUser">New User</Link>
              <Link to="/StatesCollection"><Button onClick={this.handleLoginUser} type="submit" className="btn btn-primary">Submit</Button></Link>
          </form>
          </Well>
        </Col>
        <Col md={2} lg={2} sm={2}/>
       </div>
       <style>
       @import url('https://fonts.googleapis.com/css?family=Josefin+Sans');
       </style>
      </div>
    );
  }
}

Welcome.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Welcome));
