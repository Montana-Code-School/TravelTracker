import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import Welcome from './components/Welcome';
import ControlBar from './components/ControlBar';
import NewUser from './components/NewUser';
import Dashboard from './components/Dashboard';
import Collection from './components/Collection';
import UserStore from './stores/UserStore';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'mobx-react';

const userStore = new UserStore();

render((
  <Provider userStore={userStore}>
    <Router history={browserHistory}>
      <Route path="/" component={ControlBar}>
        <IndexRoute component={Welcome}/>
        <Route path="/Welcome" component={Welcome}/>
        <Route path="/NewUser" component={NewUser}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Collection/:collectionname" component={Collection}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
