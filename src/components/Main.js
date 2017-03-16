import React from 'react';
import NavLink from './NavLink';

class Main extends React.Component {
  render() {
    return (
      <div>
        <div>Main</div>
        <div>
          <li><NavLink to="/">Home</NavLink></li>
        </div>
      </div>
    );
  }
}

export default Main;
