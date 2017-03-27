import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Row } from 'react-bootstrap';
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

  addClickHandlers(ref){
    if (ref && ref.map) {
      ref.map.svg.selectAll('.datamaps-subunit').on('click', (state) => {
        console.log("You clicked on "+state.properties.name);
      });
    }
  }

  // flatMapFill(){
  //   let fillKeys = {};
  //   fetch(`/states`)
  //   .then(result => result.json())
  //   .then(data => {
  //     data.forEach(function(x){
  //       fillKeys[x.states] = {
  //         fillKey: 'NotCollected'
  //       };
  //     });
  //   });
  //
  //   return fillKeys;
  // }

  prepareFillKeys(){
    let fillKeys = {};
    let theStates = [];
    if(this.props.collectionName == "states"){
      this.props.fullCollection.forEach(function(x){
        if(this.props.usersCollection.find(function(y){return y.name==x.name;})){
          fillKeys[x.states] = {
            fillKey: 'Collected'
          };
        }
      }, this);
    }else{
      this.state.theStates.forEach(function(x){
        fillKeys[x] = {
          fillKey: 'NotCollected'
        };
      });
    }

    return fillKeys;
  }

  prepareBubbles(){
    const radius = 5;
    let bubbles = [];
    if(this.props.collectionName != "states"){
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
    }

    return bubbles;
  }

  prepareMap(){
    let fillKeys = this.prepareFillKeys();
    let ourMap = (<Datamap scope="usa" height="650"
    ref={this.addClickHandlers}
    geographyConfig={{
      highlightFillColor: '#0DFFA6',
      highlightBorderColor: '#1D0CE8',
      highlightBorderWidth: 3
    }}
    fills={{
      'Collected': '#35B729',
      'NotCollected': '#707070',
      'defaultFill': '#707070'}}
      data={fillKeys}
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
