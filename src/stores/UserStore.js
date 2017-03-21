/* importing neccessary extensions for the UserStore page */
import { extendObservable } from 'mobx';
import {browserHistory} from 'react-router';

/* Initializing class UserStore then exporting extendObservable
function with props this, and the {key: partner} values.
Inside the constructor function. */
export default class UserStore {
  constructor  () {
    extendObservable(this, {
      name: "",
      password: "",
      admin: false,
      email: "",
      loginMsg: "",
      loggedInUser: false,
      id: "",
      token: "",
      states: [],
      parks: []
    });
    this.LoginUser = this.LoginUser.bind(this);
  }

  toggleState(name, statename){

    if(this.states.indexOf(statename)>=0) {
      fetch(`/api/removeState`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          statename: statename
        })
      }).then(result=>{
        let a = this.states.indexOf(statename);
        this.states.splice(a, 1);}
      );
    } else {fetch(`/api/addState`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        statename: statename
      })
    }).then(this.states.push(statename));}
  }

  togglePark(name, parkname){

    if(this.parks.indexOf(parkname)>=0) {
      fetch(`/api/removePark`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          parkname: parkname
        })
      }).then(result=>{
        let a = this.parks.indexOf(parkname);
        this.parks.splice(a, 1);}
      );
    } else {fetch(`/api/addPark`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        parkname: parkname
      })
    }).then(this.parks.push(parkname));}
  }

  logUserOut(){
    this.name= "";
    this.password= "";
    this.admin= false;
    this.email= "";
    this.loginMsg= "";
    this.loggedInUser= false;
    this.id= "";
    this.token= "";
    this.states= [];
    this.parks= [];
    browserHistory.push('/Welcome');
  }

  /* Creating the function LoginUser with the name and password params
  using a fetch function with a post method looking to Accept and
  Content-Type of application in JSON format. body thus requires name and password.
  then an if else if else statements check to see if the loginCred matches and
  supplies a token and stores data as this. */

  LoginUser(name, password) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password
      })
    })
    .then(function(result) {
      return result.json();})
    .then(loginCred => {
      if (loginCred.success && loginCred.token) {
        this.id = loginCred.id;
        this.admin = loginCred.admin;
        this.token = loginCred.token;
        this.loggedInUser = true;
        this.name = name;
        this.states = loginCred.states;
        this.parks = loginCred.parks;
      } else {
        this.loggedInUser=false;
        this.name="";
        browserHistory.push('/Welcome');
      }
    });
  }
}
