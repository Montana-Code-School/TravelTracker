import { extendObservable } from 'mobx';
import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class CollectionStore {
  constructor  () {
    extendObservable(this, {
      collectionname: "",
      displayname: "",
      collections: {}
    });
  }

  createDisplayName(collectionname){
    if (collectionname == "states"){
      return "United States";
    }
    else if (collectionname == "parks"){
      return "National Parks";
    }
    else if (collectionname == "elevations"){
      return "State Elevations";
    }
    else if (collectionname == "mlbstadiums"){
      return "MLB Stadiums";
    }
    else if (collectionname == "nflstadiums"){
      return "NFL Stadiums";
    }
    else if (collectionname == "airports"){
      return "US Airports";
    }
  }

}
