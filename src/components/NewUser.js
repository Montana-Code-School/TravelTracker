import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import { Grid, Col, Row, Image, Well } from 'react-bootstrap';


class NewUser extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      admin: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
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
  handleNewUser(event) {
    event.preventDefault();
    this.NewUser(this.state);
    this.setState({name: "", password: "", email: ""});
  }

  NewUser(usr) {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: usr.name,
        password: usr.password,
        email: usr.email,
        admin: usr.admin
      })
    })
    .then(function(){
      alert ('User Account Created.  Please Log In');
      browserHistory.push('/LoginPage');
    });
  }

  render() {
    const parentStyle = {background: "url(http://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/national-parks-road-trips/sahale-arm-trail-cascades-national-park.jpg) no-repeat center center fixed",  backgroundColor: "transparent", height: "100vh", opacity:"0.8"};
    const wellStyle = {marginTop: "50%"};
    return (
      <div>
        <div style={parentStyle}>
        <Col md={2}/>
        <Col md={8}>
          <Well style={wellStyle}>
          <form method="" role="form">
              <legend>Please Register</legend>

              <div className="form-group">
                <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="username" placeholder="username" required="required"/>
              </div>

              <div className="form-group">
                <input onChange={this.handlePasswordChange} value={this.state.password}type="text" className="form-control" id="password" placeholder="password" required="required"/>
              </div>

              <div className="form-group">
                <input onChange={this.handleEmailChange} value={this.state.email}type="text" className="form-control" id="email" placeholder="email"/>
              </div>

              <button onClick={this.handleNewUser} type="submit" className="btn btn-primary">Submit</button>
           </form>
          </Well>
        </Col>
        <Col md={2}/>
       </div>
      </div>


    );
  }
}

NewUser.propTypes = {
  children: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(NewUser));
