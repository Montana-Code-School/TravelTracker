import React from 'react';
import Datamap from 'react-datamaps';

class CollectionMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      theStates: ['AL', 'AK' , 'AS' , 'AZ' , 'AR' , 'CA', 'CO', 'CT' , 'DE' , 'DC' , 'FM' , 'FL' , 'GA' , 'GU' , 'HI' , 'ID' , 'IL',
        'IN' , 'IA' , 'KS' , 'KY' , 'LA' , 'ME' , 'MH' , 'MD' , 'MA' , 'MI' , 'MN' , 'MS' , 'MO' , 'MT' , 'NE' , 'NV' , 'NH' ,
        'NJ' , 'NM' , 'NY' , 'NC' , 'ND' , 'MP' , 'OH' , 'OK' , 'OR' , 'PW' , 'PA' , 'PR' , 'RI' , 'SC' , 'SD' , 'TN' , 'TX' ,
        'UT' , 'VT' , 'VI' , 'VA' , 'WA' , 'WV' , 'WI' , 'WY' ]
    };
  }

  userLocation() {
    let userLocation={};
    if (navigator.geolocation) {
      setTimeout(
        navigator.geolocation.getCurrentPosition(function(position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          console.log(lat, lon);
          userLocation = {latitude: lat, longitude: lon};
        }), 5000
      );

    } else {
      document.write('Your browser does not support GeoLocation :(');
    }
    console.log(userLocation);
    return (userLocation);
  }

  prepareFillKeys(){
    let fillKeys = {};
    let theStates = [];
    if(this.props.collectionName == "states"){
      this.props.fullCollection.forEach(function(x){
        if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
          fillKeys[x.states] = {
            fillKey: 'Collected'
          };
        }else{
          fillKeys[x.states] = {
            fillKey: 'defaultFill'
          };
        }
      }, this);
    }else{
      this.state.theStates.forEach(function(x){
        fillKeys[x] = {
          fillKey: 'defaultFill'
        };
      });
    }
    return fillKeys;
  }

  prepareBubbles(){
    const radius = 5;
    let bubbles = [];
    let userLocation=this.userLocation();
    console.log(userLocation);
    bubbles.push(
      {
        name: "Your Location",
        radius: 10,
        country: 'USA',
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        fillKey: 'User'
      }
    );
    if(this.props.collectionName != "states"){
      this.props.fullCollection.forEach(function(x){
        if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
          bubbles.push(
            {
              name: x.name + ", " + x.description,
              radius,
              country: 'USA',
              latitude: x.latitude,
              longitude: x.longitude,
              fillKey: 'Collected'
            }
          );
        }else{
          bubbles.push({
            name: x.name + ", " + x.description,
            radius,
            country: 'USA',
            latitude: x.latitude,
            longitude: x.longitude,
            fillKey: 'NotCollected'
          }
        );
        }
      }, this);
    }
    return bubbles;
  }

  prepareMap(){
    let fillKeys = this.prepareFillKeys();
    let ourMap = (<Datamap scope="usa"
    responsive
    height="450"
    // ref={this.addClickHandlers}
    geographyConfig={{
      highlightOnHover: false,
      popupOnHover: false
      // highlightFillColor: '#0DFFA6',
      // highlightBorderColor: '#1D0CE8',
      // highlightBorderWidth: 3
    }}
    fills={{
      'User': '#FF0000',
      'Collected': '#35B729',
      'NotCollected': '#FF7F50',
      'defaultFill': '#707070'}}
      data={fillKeys}
      bubbles={this.prepareBubbles()}
        bubbleOptions={{
          borderWidth: 1,
          borderColor: '#000000',
          fillOpacity: 1,
        }}
      labels
      />);
    return ourMap;
  }

  render() {

    return (
      <div>
        {this.prepareMap()}
      </div>
    );
  }
}

CollectionMap.propTypes = {
  collectionName: React.PropTypes.string,
  fullCollection: React.PropTypes.array,
  usersCollection: React.PropTypes.object
};

export default CollectionMap;
