import React from 'react';
import LoginPage from './LoginPage';
import NavLink from './NavLink';
import NewUser from './NewUser';
import { inject, observer } from 'mobx-react';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <h1>Your completion of National Parks is 78%</h1>
        </div>
        <div>
          <ul>
            <li><NavLink to="/LoginPage">Login Page</NavLink></li>
            <li><NavLink to="/NewUser">New User</NavLink></li>
          </ul>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object};

export default inject("userStore")(observer(App));
