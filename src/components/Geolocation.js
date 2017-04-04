compareLocation() {

  if(this.state.location.latitude !== null) {

    let actualLat = this.state.location.latitude;
    let actualLong = this.state.location.longitude;
    let compLat = x.latitude;
    let compLong = x.longitude;

    this.props.fullCollection.forEach(function(x){

      if (actualLat >= compLat -.5 && actualLat <= compLat +.5 &&
          actualLong >= compLong -.5 && actualLong <= compLong +.5) {
        return x.name;
        console.log('are you at' + x.name + '?');
      } else {
       return x.name;
       console.log('your are not at ' + x.name);
    }, this);
  }
}
}

compareLocation() {

  if(this.state.location.latitude !== null) {

    let actualLat = this.state.location.latitude;
    let actualLong = this.state.location.longitude;
    let compLat = x.latitude;
    let compLong = x.longitude;

    this.props.fullCollection.forEach(function(x){

      if (actualLat >= compLat -.5 && actualLat <= compLat +.5 &&
          actualLong >= compLong -.5 && actualLong <= compLong +.5) {
        return x.name;
        console.log('are you at' + x.name + '?');
      } else {
       return x.name;
       console.log('your are not at ' + x.name);
     };
   }
 }
}
