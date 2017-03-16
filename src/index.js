import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Home from './components/Home';
import Main from './components/Main';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LoginPage from './components/LoginPage';
import NewUser from './components/NewUser';
import UserStore from './stores/UserStore';
import { Provider } from 'mobx-react';

const userStore = new UserStore () ;

render((
  <Provider userStore = {userStore}>
    <Router history={browserHistory}>
      <Route>
        <Route path="/LoginPage" component={LoginPage}/>
        <Route path="/NewUser" component={NewUser}/>
      </Route>
      <Route path="/Main" component={Main}/>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
    </Provider>
), document.getElementById('app'));
