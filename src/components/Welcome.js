import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { Well, Button, Form, FormGroup,
  ControlLabel, FormControl } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import FontAwesome from 'react-fontawesome';
import './style/welcome.css';

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
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
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
      return (<h5 style={{color: "red"}}>
      Incorrect username or password.  Please try again</h5>);}
    else if(this.props.userStore.newUserCreated){
      return (<h5 style={{color: "green"}}>
      New User Created! Feel free to login</h5>);}
    else if(this.props.userStore.userAlreadyExists){
      return (<h5 style={{color: "red"}}>
      Username taken... Please sign up with a different name</h5>);}
  }

  responseFacebook(response){
    this.props.userStore.facebookLoginUser(response);
  }

  responseGoogle(response){
    this.props.userStore.googleLoginUser(response);
  }

  render() {
    const bg = require('../img/frontBackground-min.jpg');
    const parentStyle = {height:"100vh", width:"100vw",
      background: "url("+bg+") no-repeat center fixed",
      backgroundSize: "cover"};
    const wellStyle = {position: "fixed", top: "0px",
      bottom: "0px", left: "0px", right: "0px", margin: "auto",
      opacity: ".95", backgroundBlendMode: "overlay",
      height: "400px", width: "350px"};
    const logoStyle = {position: "fixed" , top: "0px",
      left: "10px", zIndex: "100"};
    const newUserLinkStyle = {float: "right"};

    return (
      <div>
        <div>
          <img style={logoStyle} src={require('../img/barlogo1.png')}
            width="275px" height="150px"/>
        </div>
        <div style={parentStyle}>
          <Well style={wellStyle} bsSize="large">

            <Form>

                <legend>Log In to Travel Tracker</legend>
                {this.loginNotice()}
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    onChange={this.handleNameChange}
                    type="text"
                    placeholder="username"
                  />
                </FormGroup>

                <FormGroup controlId="formInlinePassword">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    onChange={this.handlePasswordChange}
                    type="password"
                    placeholder="password"
                  />
                </FormGroup>

                <div style={newUserLinkStyle}>
                  <Link
                    to ="/NewUser"
                    style={{color: "#4eb14d"}}
                  >New User</Link>
                </div>
                <Link
                  to="/Welcome">
                <Button
                  onClick={this.handleLoginUser}
                  onTouchTap={this.handleLoginUser}
                  type="submit"
                  className="btn btn-success"
                >Submit</Button></Link>
            </Form>
            <br/>
            <div style={{textAlign: "center"}}>
            <FacebookLogin
              appId="1676339145713512"
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon="fa-facebook"
              cssClass="facebookbtn"
              textButton = " Login with Facebook"
            />
            <GoogleLogin
              clientId="862765406840-becil6hhhlsoi01tokb673lpol5odret.apps.googleusercontent.com"
              className="googlebtn"
              redirect_uri="https://mysterious-stream-55753.herokuapp.com/Dashboard"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            >
              <FontAwesome name="google"/>
              <span> Login with Google</span>
            </GoogleLogin>
            </div>
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
