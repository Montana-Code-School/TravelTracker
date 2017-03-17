import React from 'react';
import LoginPage from './LoginPage';
import NavLink from './NavLink';
import NewUser from './NewUser';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Grid, Col, Row, Image, Well } from 'react-bootstrap';


class App extends React.Component {

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
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleAdminChange(e) {
    this.setState({admin: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleLoginUser(event) {
    event.preventDefault();
    this.props.userStore.LoginUser(this.state.name, this.state.password);
    this.setState({name: "", password: ""});
  }

  render() {
    const parentStyle = {background: "url(http://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/national-parks-road-trips/sahale-arm-trail-cascades-national-park.jpg) no-repeat center center fixed", height: "100vh"};
    const wellStyle = {marginTop: "30%", opacity: ".95", fontFamily: "Julius Sans One", backgroundBlendMode: "overlay"};
    return (
      <div>
<<<<<<< HEAD
        <div style={parentStyle}>
        <Col md={2}/>
        <Col md={8}>
          <Well style={wellStyle}>
          <form method="" role="form">
              <legend>{this.state.loginMsg == "" ? "Please Log In": this.state.loginMsg}</legend>

              <div className="form-group">
                <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="username" placeholder="username"/>
              </div>

              <div className="form-group">
                <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password"/>
              </div>

              <button onClick={this.handleLoginUser} type="submit" className="btn btn-primary">Submit</button>
           </form>
           <Link to="/NewUser">New user</Link>
          </Well>
        </Col>
        <Col md={2}/>
       </div>
       <style>
       @import url('https://fonts.googleapis.com/css?family=Julius+Sans+One');
       </style>
=======
        <div>
          <h1>Your completion of National Parks is 78%</h1>
        </div>
        <div>
          <ul>
            <li><NavLink to="/LoginPage">Login Page</NavLink></li>
            <li><NavLink to="/NewUser">New User</NavLink></li>
          </ul>
        </div>
        {this.props.children}
>>>>>>> 3cc40cb6587f656dfb1c7ca7f38e1dd4c857b2db
      </div>





    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(App));
