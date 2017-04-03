import React from 'react';
import { inject, observer } from 'mobx-react';
import Datamap from 'react-datamaps';

class CollectionMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location: {latitude: null, longitude: null},
      theStates: ['AL', 'AK' , 'AS' , 'AZ' , 'AR' , 'CA', 'CO', 'CT' , 'DE' , 'DC' , 'FM' , 'FL' , 'GA' , 'GU' , 'HI' , 'ID' , 'IL',
        'IN' , 'IA' , 'KS' , 'KY' , 'LA' , 'ME' , 'MH' , 'MD' , 'MA' , 'MI' , 'MN' , 'MS' , 'MO' , 'MT' , 'NE' , 'NV' , 'NH' ,
        'NJ' , 'NM' , 'NY' , 'NC' , 'ND' , 'MP' , 'OH' , 'OK' , 'OR' , 'PW' , 'PA' , 'PR' , 'RI' , 'SC' , 'SD' , 'TN' , 'TX' ,
        'UT' , 'VT' , 'VI' , 'VA' , 'WA' , 'WV' , 'WI' , 'WY' ]
    };
  }

  componentDidMount(){
    const self = this;
    this.userLocation(
      function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        self.setState({location: {latitude: lat, longitude: lon}});
      }
    );
  }

  userLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    }
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
    let actualLat = this.state.location.latitude;
    let actualLong = this.state.location.longitude;
    // let compLat = x.latitude;
    // let compLong = x.longitude;

    if(this.state.location.latitude !== null) {

      if (actualLat >= 44.9912101476 -.5 && actualLat <= 44.9912101476 +.5 &&
          actualLong >= -110.691947937 -.5 && actualLong <= -110.691947937 +.5) {
        bubbles.push(
          {
            name: this.props.userStore.name + ", testing",
            radius: 20,
            country: 'USA',
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            fillKey: 'User'
          }
        );
        alert('are you at Yellostone?');
      } else {
        bubbles.push(
          {
            name: this.props.userStore.name + " is here!!",
            radius: 8,
            country: 'USA',
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            fillKey: 'User'
          }
        );
      }
    }

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
    const ourMap = this.prepareMap();

    return (
      <div>
        {ourMap}
      </div>
    );
  }
}

CollectionMap.propTypes = {
  collectionName: React.PropTypes.string,
  fullCollection: React.PropTypes.array,
  usersCollection: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(CollectionMap));
