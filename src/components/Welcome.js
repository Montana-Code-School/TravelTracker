import React from 'react';
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
    this.loginNotice = this.loginNotice.bind(this);
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
  handleLoginUser(e) {
    e.preventDefault();
    this.props.userStore.LoginUser(this.state.name, this.state.password);
  }

  loginNotice() {
    if(this.props.userStore.failedLogin){
      return (<h5 style={{color: "red"}}>Incorrect username or password.  Please try again</h5>);}
    else if(this.props.userStore.newUserCreated){
      return (<h5 style={{color: "green"}}>New User Created! Feel free to login</h5>);}
  }

  render() {
    const bg = require('../img/frontBackground-min.jpg');
    const parentStyle = {height:"100vh", width:"100vw", background: "url("+bg+") no-repeat center fixed", backgroundSize: "cover"};
    const wellStyle = {position: "fixed", top: "0px", bottom: "0px", left: "0px", right: "0px", margin: "auto", opacity: ".95", backgroundBlendMode: "overlay", height: "300px", width: "400px"};
    const logoStyle = {position: "absolute", top: "0px", left: "10px", zIndex: "100"};
    const newUserLinkStyle = {float: "right"};

    return (
      <div>
        <div>
          <img style={logoStyle} src={require('../img/barlogo.png')} width="209" height="96"/>
        </div>
        <div style={parentStyle}>
          <Well style={wellStyle} bsSize="large">
            <Form>

                <legend>Log In to Travel Tracker</legend>
                {this.loginNotice()}
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
                <Link to="/Dashboard"><Button onClick={this.handleLoginUser} type="submit" className="btn btn-primary">Submit</Button></Link>
            </Form>
          </Well>
       </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Welcome));
