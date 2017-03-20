import React from 'react';
import NavLink from './NavLink';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavbarBrand, NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class Dashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      states: []
    };
    this.fetchStates = this.fetchStates.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
  }

  componentDidMount() {
    this.fetchStates();
  }

  prepareCollection(){
    return this.state.states.map(function(x){

      


      return <ListGroupItem onClick={() => {this.props.userStore.toggleState(this.props.userStore.name, x.name);}} key={x.name}>{x.name}</ListGroupItem>;



    },
    this
  );
  }

  fetchStates() {
    fetch(`/states`)
    .then(result => result.json())
    .then(data => this.setState({states: data}));
  }


  render() {
    return (
      <div>
        <div>
          <div>
            <li><NavLink to="/">Home</NavLink></li>
          </div>
        </div>
          <div>
            <h3>Collection % Goes Here once selected</h3>
          </div>
          <div>
            <ListGroup>
              {this.prepareCollection()}
            </ListGroup>
          </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Dashboard));
