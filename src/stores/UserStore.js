/* importing neccessary extensions for the UserStore page */
import { extendObservable } from 'mobx';
import { browserHistory } from 'react-router';

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
      parks: [],
      stadiums: []
    });
    this.LoginUser = this.LoginUser.bind(this);
  }

  getDateStateAdded(statename){
    let state = this.states.find(function(y){
      return y.name==statename;
    });

    return state.date;
  }

  getDateParkAdded(parkname){
    let park = this.parks.find(function(y){
      return y.name==parkname;
    });

    return park.date;
  }

  getDateStadiumAdded(stadiumname){
    let stadium = this.stadiums.find(function(y){
      return y.name==stadiumname;
    });

    return stadium.date;
  }

  removeState(name, statename){
    let state = this.states.find(function(y){
      return y.name==statename;
    });
    fetch(`/api/removeState`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        state: state
      })
    }).then(result=>{
      let a = this.states.indexOf(state);
      this.states.splice(a, 1);}
    );
  }

  addState(name, statename){
    let state = {name: statename, date: new Date().toLocaleDateString()};
    fetch(`/api/addState`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        state: state
      })
    }).then(this.states.push(state));}

  removePark(name, parkname){
    let park = this.parks.find(function(y){
      return y.name==parkname;
    });
    fetch(`/api/removePark`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        park: park
      })
    }).then(result=>{
      let a = this.parks.indexOf(park);
      this.parks.splice(a, 1);}
    );
  }

  addPark(name, parkname){
    let park = {name: parkname, date: new Date().toLocaleDateString()};
    fetch(`/api/addPark`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        park: park
      })
    }).then(this.parks.push(park));
  }

  removeStadium(name, stadiumname) {
    let stadium = this.stadiums.find(function(y){
      return y.name==stadiumname;
    });
    fetch(`/api/removeStadium`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        stadium: stadium
      })
    }).then(result=>{
      let a = this.stadiums.indexOf(stadium);
      this.stadiums.splice(a, 1);}
    );
  }

  addStadium(name, stadiumname){
    let stadium = {name: stadiumname, date: new Date().toLocaleDateString()};
    fetch(`/api/addStadium`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        stadium: stadium
      })
    }).then(this.stadiums.push(stadium));
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
    this.stadiums= [];
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
        this.name = name.toLowerCase();
        this.states = loginCred.states;
        this.parks = loginCred.parks;
        this.stadiums = loginCred.stadiums;
      } else {
        this.loggedInUser=false;
        this.name="";
        browserHistory.push('/Welcome');
      }
    });
  }
}
