import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Home from './components/Home';
import SearchGiphy from './components/SearchGiphy';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SearchGifs from './components/SearchGifs';
import LoginPage from './components/LoginPage';
import NewUser from './components/NewUser';
import Main from './components/Main';
import Library from './components/Library';
import ImageStore from './stores/ImageStore';
import UserStore from './stores/UserStore';
import { Provider } from 'mobx-react';
import ShowGifs from './components/ShowGifs';
import Admin from './components/Admin';
import EditUser from './components/EditUser';


const imageStore = new ImageStore () ;
const userStore = new UserStore () ;

render((
  <Provider imageStore = {imageStore} userStore = {userStore}>
    <Router history={browserHistory}>
      <Route>
        <Route path="/LoginPage" component={LoginPage}/>
        <Route path="/NewUser" component={NewUser}/>
        <Route path="/Admin" component={Admin}>
          <Route path="/EditUser" component={EditUser}/>

        </Route>
        <Route path="/Main" component={Main}>
          <Route path="/SearchGiphy" component={SearchGiphy}/>
          <Route path="/SearchGifs" component={SearchGifs}/>
          <Route path="/Library" component={Library}/>
        </Route>
      </Route>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
    </Provider>
), document.getElementById('app'));
