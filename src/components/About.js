import React from 'react';
import { Col } from 'react-bootstrap';

class About extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col xs={12}>
        <h2>About TravelTracker</h2>
        <h4>Thank you very much to all the
          technologies that made this project possible
        </h4>
        <ul>
          <li>NodeJS</li>
          <li>React</li>
          <li>Express</li>
          <li>Mobx</li>
          <li>Webpack</li>
          <li>Datamaps</li>
          <li>Piecharts</li>
        </ul>
      </Col>
    );
  }
}

About.propTypes = {
};


export default About;
