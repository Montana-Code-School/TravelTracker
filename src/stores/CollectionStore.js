import { extendObservable } from 'mobx';
import React from 'react';
import { browserHistory } from 'react-router';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

export default class CollectionStore {
  constructor  () {
    extendObservable(this, {
      collections: {}
    });
  }


}
