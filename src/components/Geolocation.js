import React from 'react';
import { inject, observer } from 'mobx-react';
import styles from './style/TrophyStyle.css.js';

class Geolocation extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      location: {latitude: null, longitude: null}
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

  compareLocation() {
    let geolocation = null;

    if(this.state.location.latitude !== null) {

      let actualLat = parseFloat(this.state.location.latitude).toFixed(4);
      let actualLong = parseFloat(this.state.location.longitude).toFixed(4);

      this.props.fullCollection.forEach(function(x){
        let compLat = parseFloat(x.latitude).toFixed(4);
        let compLong = parseFloat(x.longitude).toFixed(4);

        if (((actualLong >= (compLong - 0.5))
          && (actualLong <= (compLong - (-0.5))))
          && ((actualLat >= (compLat - 0.5))
          && (actualLat <= (compLat - (-0.5))))) {
          return (
            geolocation = (<img key={x.name} style={styles.trophyStyle}
            src={require('../img/trophies/geolocation/geolocation.png')}/>)
          );
        }
      },this);
    }
    return geolocation;
  }

  render() {
    const geolocation = this.compareLocation();

    return (
      <div>
        {geolocation}
      </div>
    );
  }

}

Geolocation.propTypes = {
  collectionName: React.PropTypes.string,
  fullCollection: React.PropTypes.array,
  usersCollection: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Geolocation));
