import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import Welcome from './components/Welcome';
import ControlBar from './components/ControlBar';
import ParksCollection from './components/ParksCollection';
import StatesCollection from './components/StatesCollection';
import StadiumsCollection from './components/StadiumsCollection';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NewUser from './components/NewUser';
import UserStore from './stores/UserStore';
import { Provider } from 'mobx-react';

const userStore = new UserStore () ;

render((
  <Provider userStore = {userStore}>
    <Router history={browserHistory}>
      <Route path="/" component={ControlBar}>
        <IndexRoute component={Welcome}/>
        <Route path="/Welcome" component={Welcome}/>
        <Route path="/NewUser" component={NewUser}/>
        <Route path="/StatesCollection" component={StatesCollection}/>
        <Route path="/ParksCollection" component={ParksCollection}/>
        <Route path="/StadiumsCollection" component={StadiumsCollection}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
