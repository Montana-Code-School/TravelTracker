import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import { Col, Jumbotron } from 'react-bootstrap';
import SimplePieChart from 'react-simple-pie-chart';

class Piechart extends React.Component {

  constructor(){
    super();
    this.state = {
    };
  }

  createPieChart(collectionname){
    let percentComplete = this.props.userStore.getPercentageCompletion(collectionname);
    return(<SimplePieChart slices={[{color: '#ececec',value: (100-percentComplete)},{color: '#57ae81', value: percentComplete}
    ]}/>);
  }

  render() {
    if(this.props.userStore.getPercentageCompletion(this.props.collectionname).toFixed(2)>0) {
      return (
        <Col xs={6}>
          {this.props.collectionname}
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
