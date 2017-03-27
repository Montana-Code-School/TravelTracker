'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Airport = require('../models/Airport');

var _Airport2 = _interopRequireDefault(_Airport);

require('isomorphic-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* using a router function with the params of req res and next */
/* Importing variables as lets to our required imports */
router.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* Using the router route to initiate the parks database via a get function with
the params of req, res and next, a fetch function is used from the NP parks API with a
Get method specif*/
router.route('/').get(function (req, res, next) {
  _Airport2.default.find().sort({ name: "ascending" }).exec(function (err, airports) {
    if (err) {
      return next(err);
    } else {
      res.json(airports);
    }
  });
});

module.exports = router;