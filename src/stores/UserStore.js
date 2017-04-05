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
      userAlreadyExists: false,
      id: "",
      token: "",
      states: [],
      parks: [],
      mlbstadiums: [],
      nflstadiums: [],
      airports: [],
      elevations: []
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

    this.elevations.forEach(function(x){
      activityList.push(x);
    });

    this.mlbstadiums.forEach(function(x){
      activityList.push(x);
    });

    this.nflstadiums.forEach(function(x){
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
      preparedActivityList.push(<ListGroupItem key={x.name}><Glyphicon glyph="plus-sign" style={{color: "#57ae81"}}/>  {x.name}, {new Date(x.date).toLocaleDateString()}</ListGroupItem>);
    });

    return preparedActivityList;
  }

  checkForCollections(){
    if(this.states.length>0 || this.parks.length>0 || this.mlbstadiums.length>0 || this.nflstadiums.length>0 || this.elevations.length>0 || this.airports.length>0) {
      return true;
    }else{
      return false;
    }
  }

  getPercentageCompletion(collectionname){
    if(collectionname == "states"){return (this[collectionname].length/50)*100;}
    else if(collectionname == "parks"){return (this[collectionname].length/59)*100;}
    else if(collectionname == "elevations"){return (this[collectionname].length/50)*100;}
    else if(collectionname == "mlbstadiums"){return (this[collectionname].length/30)*100;}
    else if(collectionname == "nflstadiums"){return (this[collectionname].length/32)*100;}
    else if(collectionname == "airports"){return (this[collectionname].length/163)*100;}
  }

  getDateCollectableAdded(collectablename, collectionname){
    let collectable = this[collectionname].find(function(y){
      return y.name==collectablename;
    });
    return new Date(collectable.date).toLocaleDateString();
  }

  toggleCollectable(username, collectablename, collectionname){
    if(this[collectionname].find(function(y){return y.name==collectablename;})){
      this.removeCollectable(username, collectablename, collectionname);
    } else {
      this.addCollectable(username, collectablename, collectionname);
    }
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
    let collectable = {name: collectablename, date: new Date().toJSON()};
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
    }).then(this[collectionname].push(collectable));
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
    this.elevations= [];
    this.mlbstadiums= [];
    this.nflstadiums= [];
    this.airports= [];
    browserHistory.push('/Welcome');
  }

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
        this.elevations = loginCred.elevations;
        this.mlbstadiums = loginCred.mlbstadiums;
        this.nflstadiums = loginCred.nflstadiums;
        this.airports = loginCred.airports;
        this.newUserCreated = false;
        this.userAlreadyExists = false;
        this.failedLogin=false;
        browserHistory.push('/Dashboard');
      } else {
        this.loggedInUser=false;
        this.failedLogin=true;
        this.name="";
        browserHistory.push('/Welcome');
      }
    });
  }

  facebookLoginUser(response) {
    const self = this;
    fetch('facebook/usercheck', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: response.name
      })
    }).then(function(result){
      return result.json();
    }).then(function(result) {
      if(result.userfound) {
        self.LoginUser(response.name, response.id);
      } else {
        this.newUserCreated = true;
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: response.name,
            password: response.id,
            email: response.name
          })
        })
        .then(function(){
          self.LoginUser(response.name, response.id);
        });
      }
    });
  }

  googleLoginUser(response) {
    const self = this;
    fetch('facebook/usercheck', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: response.w3.ig
      })
    }).then(function(result){
      return result.json();
    }).then(function(result) {
      if(result.userfound) {
        self.LoginUser(response.w3.ig, response.googleId);
      } else {
        this.newUserCreated = true;
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: response.w3.ig,
            password: response.googleId,
            email: response.w3.ig
          })
        })
        .then(function(){
          self.LoginUser(response.w3.ig, response.googleId);
        });
      }
    });
  }

}
