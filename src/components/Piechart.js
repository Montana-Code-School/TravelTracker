import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import SimplePieChart from 'react-simple-pie-chart';

class Piechart extends React.Component {

  constructor(){
    super();
    this.state = {
    };
  }

  createDisplayName(collectionname){
    if (collectionname == "states"){
      return "US States";
    }
    else if (collectionname == "parks"){
      return "National Parks";
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

  createPieChart(collectionname){
    let percentComplete = this.props.userStore.getPercentageCompletion(collectionname);
    return(<SimplePieChart slices={[{color: '#ececec',value: (100-percentComplete)},{color: '#57ae81', value: percentComplete}
    ]}/>);
  }

  render() {
    if(this.props.userStore.getPercentageCompletion(this.props.collectionname).toFixed(2)>0) {
      return (
        <Col xs={3}>
          {this.createDisplayName(this.props.collectionname)}
          <Link to={{pathname: '/Collection/'+this.props.collectionname}}>
            <div>
              {this.createPieChart(this.props.collectionname)}
              {this.props.userStore.getPercentageCompletion(this.props.collectionname).toFixed(0)}%
            </div>
          </Link>
        </Col>
      );
    } else {
      return (<div/>);
    }
  }
}

Piechart.propTypes = {
  userStore: React.PropTypes.object,
  collectionname: React.PropTypes.string
};

export default inject("userStore")(observer(Piechart));
