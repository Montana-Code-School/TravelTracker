/* importing neccessary extensions for the UserStore page */
import { extendObservable } from 'mobx';
import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

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
      failedLogin: false,
      newUserCreated: false,
      id: "",
      token: "",
      states: [],
      parks: [],
      mlbstadiums: [],
      airports: []
    });
    this.LoginUser = this.LoginUser.bind(this);
  }

  getActivityList(){
    let activityList = [];

    this.states.forEach(function(x){
      activityList.push(x);
    });

    this.parks.forEach(function(x){
      activityList.push(x);
    });

    this.mlbstadiums.forEach(function(x){
      activityList.push(x);
    });

    this.airports.forEach(function(x){
      activityList.push(x);
    });

    activityList.sort(function (a,b) {
      return a.date > b.date;
    });
    activityList.reverse();
    let preparedActivityList = [];

    activityList.forEach(function(x){
      preparedActivityList.push(<ListGroupItem key={x.name}><Glyphicon glyph="plus-sign" style={{color: "green"}}/>  {x.name}, {x.date}</ListGroupItem>);
    });

    return preparedActivityList;
  }

  getPercentageCompletion(collectionname){
    if(collectionname == "states"){return (this[collectionname].length/50)*100;}
    else if(collectionname == "parks"){return (this[collectionname].length/59)*100;}
    else if(collectionname == "mlbstadiums"){return (this[collectionname].length/30)*100;}
    else if(collectionname == "airports"){return (this[collectionname].length/529)*100;}
  }

  getDateCollectableAdded(collectablename, collectionname){
    let collectable = this[collectionname].find(function(y){
      return y.name==collectablename;
    });
    return collectable.date;
  }

  removeCollectable(username, collectablename, collectionname){
    let collectable = this[collectionname].find(function(y){
      return y.name==collectablename;
    });
    fetch(`/api/remove`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        collectable: collectable,
        collectionname: collectionname
      })
    }).then(result=>{
      let collectableposition = this[collectionname].indexOf(collectable);
      this[collectionname].splice(collectableposition, 1);}
    );
  }

  addCollectable(username, collectablename, collectionname){
    let collectable = {name: collectablename, date: new Date().toLocaleDateString()};
    fetch(`/api/add`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        collectable: collectable,
        collectionname: collectionname
      })
    }).then(this[collectionname].push(collectable));}

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
    this.mlbstadiums= [];
    this.airports= [];
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
        this.failedLogin=false;
        this.id = loginCred.id;
        this.admin = loginCred.admin;
        this.token = loginCred.token;
        this.loggedInUser = true;
        this.name = name.toLowerCase();
        this.states = loginCred.states;
        this.parks = loginCred.parks;
        this.mlbstadiums = loginCred.mlbstadiums;
        this.airports = loginCred.airports;
        this.newUserCreated = false;
        browserHistory.push('/Dashboard');
      } else {
        this.loggedInUser=false;
        this.failedLogin=true;
        this.name="";
        browserHistory.push('/Welcome');
      }
    });
  }
}
