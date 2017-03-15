import React from 'react';
import {browserHistory} from 'react-router';
import NavLink from './NavLink';

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
    let user1 = {name: this.state.name, password: this.state.password, email: this.state.email};
    console.log(user1);
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
    return (
      <div>
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
       <div>
          <li><NavLink to="/">Home</NavLink></li>
        </div>
      </div>
    );
  }
  }

  NewUser.propTypes = {
    NewUser: React.PropTypes.func
  };

  export default NewUser;
