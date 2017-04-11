import React from 'react';
import { inject, observer } from 'mobx-react';
import { ListGroup, ListGroupItem, Glyphicon, ProgressBar,
    Row, Col, Accordion, Panel, Button, Popover,
    OverlayTrigger } from 'react-bootstrap';
import './style/collection.css';
import CollectionMap from './CollectionMap';

class Collection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collection: [],
      isOpen: false,
    };
    this.fetchCollection = this.fetchCollection.bind(this);
    this.prepareCollection = this.prepareCollection.bind(this);
    this.prepareMobileCollection = this.prepareMobileCollection.bind(this);
  }

  componentWillMount() {
    this.fetchCollection(this.props.params.collectionname);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchCollection(nextProps.params.collectionname);
  }

  prepareMobileCollection(){
    return this.state.collection.map(function(x){
      if (this.props.userStore[this.props.params.collectionname].find(
        function(y){return y.name==x.name;})){
        return (
          <Panel
            header={<div><span>
            <Glyphicon glyph="check" style={{color: "#57ae81"}}/>
              </span>
                {x.name
                  +" - "
                  + this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>} key={x.name} eventKey={x.name}>
                {x.description}
          <Button block
          onTouchTap={() => {this.props.userStore.removeCollectable(this.props.userStore.name, x.name, this.props.params.collectionname);}}
          >Remove</Button>
          </Panel>);
      } else {
        return (
          <Panel header={x.name} key={x.name} eventKey={x.name}>
            {x.description}
            <Button block
            onTouchTap={() =>
              {this.props.userStore.addCollectable(
                this.props.userStore.name, x.name,
                this.props.params.collectionname);}
            }
            >Add</Button>
          </Panel>);}
    },this);
  }

  prepareCollection(){
    return this.state.collection.map(function(x){
      if (this.props.userStore[this.props.params.collectionname].find(
        function(y){return y.name==x.name;})){

        const popoverClickRootClose = (
          <Popover id="popover-trigger-click-root-close" title={x.name}>
            <div>{x.description}</div>
            <br/>
            <Button block
            onTouchTap={() => {
              this.props.userStore.removeCollectable(
                this.props.userStore.name,
                x.name,
                this.props.params.collectionname);}
            }
            >Remove</Button>
          </Popover>
        );
        return (
          <OverlayTrigger trigger="click" rootClose placement="left"
          overlay={popoverClickRootClose} key={x.name}>
            <ListGroupItem header={<div><span><Glyphicon glyph="check"
            style={{color: "#57ae81"}}/></span> {x.name +" - "+ this.props.userStore.getDateCollectableAdded(x.name, this.props.params.collectionname)}</div>}/>
          </OverlayTrigger>
        );

      } else {

        const popoverClickRootClose = (
          <Popover id="popover-trigger-click-root-close" title={x.name}>
            <div>{x.description}</div>
            <br/>
            <Button block
            onTouchTap={() => {
              this.props.userStore.addCollectable(
                this.props.userStore.name,
                x.name,
                this.props.params.collectionname);}
            }
            >Add</Button>
          </Popover>
        );
        return (
          <OverlayTrigger trigger="click" rootClose placement="left"
          overlay={popoverClickRootClose} key={x.name}>
            <ListGroupItem header={x.name}/>
          </OverlayTrigger>
        );
      }
    },this);
  }

  fetchCollection(collectionName) {
    fetch(`/`+collectionName)
    .then(result => result.json())
    .then(data => this.setState({collection: data}));
  }

  render() {
    return (
        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <h3 style={{textAlign: "center"}}>{this.props.collectionStore.createDisplayName(this.props.params.collectionname)} collection: {this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0)}%</h3>
            <ProgressBar active striped key="1" style={{border: ".5px solid #ececec"}} now={parseInt(this.props.userStore.getPercentageCompletion(this.props.params.collectionname).toFixed(0))}/>
          </Col>
          <Col xs={1}/>

          <Col xs={12} md={8}>
            <CollectionMap
            collectionName={this.props.params.collectionname}
            fullCollection={this.state.collection}
            usersCollection={
              this.props.userStore[this.props.params.collectionname]
            }
          />
          </Col>
          <Col xsHidden smHidden md={3}>
            <ListGroup>
              {this.prepareCollection()}
            </ListGroup>
          </Col>
          <Col xs={12} mdHidden lgHidden>
            <Accordion>
              {this.prepareMobileCollection()}
            </Accordion>
          </Col>
          <Col xsHidden smHidden md={1}/>
        </Row>
    );
  }
}

Collection.propTypes = {
  userStore: React.PropTypes.object,
  collectionStore: React.PropTypes.object,
  collectionname: React.PropTypes.string,
  params: React.PropTypes.object,
};


export default inject("userStore", "collectionStore")(observer(Collection));
