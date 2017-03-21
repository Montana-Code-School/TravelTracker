import React from 'react';
import NavLink from './NavLink';
import NewUser from './NewUser';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Grid, Col, Row, Image, Well, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
    const parentStyle = {height:"100vh", width:"100vw", background: "url(http://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/national-parks-road-trips/sahale-arm-trail-cascades-national-park.jpg) no-repeat center center fixed"};
    const wellStyle = {position: "absolute", top: "0", bottom: "0", left: "0", right: "0", margin: "auto", opacity: ".95", fontFamily: "Josefin Sans", backgroundBlendMode: "overlay", height: "300px", width: "500px"};
    const logoStyle = {position: "absolute", top: "0px", left: "10px", zIndex: "100"};
    const newUserLinkStyle = {float: "right"};
    return (
      <div>
        <div>
          <img className="hidden-xs" style={logoStyle} src="https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-04-2-512.png" width="100" height="100"/>
        </div>
        <div style={parentStyle}>
          <Well style={wellStyle} bsSize="large">
            <Form>

                <legend>Log In to Travel Tracker</legend>

                <FormGroup controlId="formInlineName">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl onChange={this.handleNameChange} type="text" placeholder="username" />
                </FormGroup>

                <FormGroup controlId="formInlinePassword">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl onChange={this.handlePasswordChange} type="password" placeholder="password" />
                </FormGroup>

                <div style={newUserLinkStyle}>
                  <Link to ="/NewUser" >New User</Link>
                </div>
                <Link to="/StatesCollection"><Button onClick={this.handleLoginUser} type="submit" className="btn btn-primary">Submit</Button></Link>
            </Form>
          </Well>
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
