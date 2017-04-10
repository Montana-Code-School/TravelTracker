import React from 'react';
import { inject, observer } from 'mobx-react';
import Datamap from 'react-datamaps';
import d3 from 'd3';
import './style/collectionMap.css';

class CollectionMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location: {latitude: null, longitude: null},
      theStates: ['AL', 'AK' , 'AS' , 'AZ' , 'AR' , 'CA', 'CO', 'CT' , 'DE' ,
        'DC' , 'FM' , 'FL' , 'GA' , 'GU' , 'HI' , 'ID' , 'IL', 'IN' , 'IA' ,
        'KS' , 'KY' , 'LA' , 'ME' , 'MH' , 'MD' , 'MA' , 'MI' , 'MN' , 'MS' ,
        'MO' , 'MT' , 'NE' , 'NV' , 'NH' , 'NJ' , 'NM' , 'NY' , 'NC' , 'ND' ,
        'MP' , 'OH' , 'OK' , 'OR' , 'PW' , 'PA' , 'PR' , 'RI' , 'SC' , 'SD' ,
        'TN' , 'TX' , 'UT' , 'VT' , 'VI' , 'VA' , 'WA' , 'WV' , 'WI' , 'WY' ]
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

  componentDidUpdate(){
    if(this.props.collectionName == "states"){
      d3.selectAll('.datamaps-subunit').on('click', (state) => {
        this.props.userStore.toggleCollectable(this.props.userStore.name, state.properties.name, this.props.collectionName);
      });
    } else{
      d3.selectAll('.datamaps-bubble').on('click', (bubble) => {
        if(bubble.collectablename != null)
          this.props.userStore.toggleCollectable(this.props.userStore.name, bubble.collectablename, this.props.collectionName);
      });
      d3.selectAll('.datamaps-subunit').on('click', () => {null;});
    }
  }

  userLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback);
    }
  }

  compareLocation() {
    let geolocation = null;

    if(this.state.location.latitude !== null) {

      let actualLat = parseFloat(this.state.location.latitude).toFixed(4);
      let actualLong = parseFloat(this.state.location.longitude).toFixed(4);

      this.props.fullCollection.forEach(function(x){
        let compLat = parseFloat(x.latitude).toFixed(4);
        let compLong = parseFloat(x.longitude).toFixed(4);

        if (((actualLong >= (compLong - 1)) && (actualLong <= (compLong - (-1)))) &&
        ((actualLat >= (compLat - 1)) && (actualLat <= (compLat - (-1))))) {
          return (
            geolocation = (
              <div style={{textAlign: "center"}}>
                <h3>You have been geolocated at {x.name}<img key={x.name} src={require('../img/trophies/geolocation/geolocation.png')}/></h3>
              </div>)
          );
        }
      },this);
    }
    return geolocation;
  }

  prepareFillKeys(){
    let fillKeys = {};
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
    const radius = 6;
    let bubbles = [];

    if(this.state.location.latitude !== null) {
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

    if(this.props.collectionName != "states"){
      this.props.fullCollection.forEach(function(x){
        if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
          bubbles.push(
            {
              name: x.name + ", " + x.description,
              collectablename: x.name,
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
            collectablename: x.name,
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
    geographyConfig={{
      highlightOnHover: false,
      popupOnHover: false
    }}
    fills={{
      'User': 'blue',
      'Collected': '#57ae81',
      'NotCollected': '#F89A7C',
      'defaultFill': '#bdbdbd'}}
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
    const geolocation = this.compareLocation();

    return (
      <div>
        {ourMap}
        {geolocation}
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
