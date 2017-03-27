import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
import Datamap from 'react-datamaps';

class CollectionMap extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  addClickHandlers(ref){
    if (ref && ref.map) {
      ref.map.svg.selectAll('.datamaps-subunit').on('click', (state) => {
        console.log("You clicked on "+state.properties.name);
      });
    }
  }

  prepareFillKeys(){
    let fillKeys = {};
    this.props.fullCollection.forEach(function(x){
      if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
        fillKeys[x.abbreviation] = {
          fillKey: 'Collected'
        };
      }else{
        fillKeys[x.abbreviation] = {
          fillKey: 'NotCollected'
        };
      }
    }, this);

    return (fillKeys);
  }

  prepareBubbles(){
    const radius = 5;
    let bubbles = [];

    this.props.fullCollection.forEach(function(x){
      if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
        bubbles.push(
          {
            name: x.name,
            radius,
            country: 'USA',
            latitude: x.latitude,
            longitude: x.longitude,
            fillKey: 'Collected'
          }
        );
      }
    }, this);

    return bubbles;
  }

  prepareMap(){
    let ourMap = (<Datamap scope="usa" height="650"
    ref={this.addClickHandlers}
    geographyConfig={{
      highlightFillColor: '#0DFFA6',
      highlightBorderColor: '#1D0CE8',
      highlightBorderWidth: 3
    }}
    fills={{
      'Collected': '#35B729',
      'NotCollected': '#E8AB0C'}}
      data={this.prepareFillKeys()}
      bubbles={this.prepareBubbles()}
        bubbleOptions={{
          borderWidth: 1,
          borderColor: '#E8AB0C'
        }}
      labels
      />);
    return ourMap;
  }

  render() {

    return (
      <Col className="hidden-sm hidden-xs" md={12}>
        {this.prepareMap()}
      </Col>
    );
  }
}

CollectionMap.propTypes = {
  userStore: React.PropTypes.object,
  collectionName: React.PropTypes.string,
  fullCollection: React.PropTypes.array,
  usersCollection: React.PropTypes.object
};

export default inject("userStore")(observer(CollectionMap));
