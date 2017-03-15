import React from 'react';
import NavLink from './NavLink';

class Admin extends React.Component {
  render() {
    return (
    <div>
      <h1>Database Administration</h1>
        <ul>
          <li><NavLink to="/EditUser">Edit User Accouts</NavLink></li>
          <li><NavLink to="/Main">Main Menu</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>
        </ul>
      {this.props.children}
    </div>
    );
  }
}

Admin.propTypes = {
  LoginUser: React.PropTypes.func,
  imageStore: React.PropTypes.object,
  children: React.PropTypes.object
};

export default Admin;
