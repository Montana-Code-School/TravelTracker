'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _State = require('../models/State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Importing variables as lets to our required imports */
var router = _express2.default.Router();

/* using a router function with the params of req res and next */
router.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* Using the router route to initiate the parks database via a get function with
the params of req, res and next, a fetch function is used from the NP parks API with a
Get method specif*/
router.route('/').get(function (req, res, next) {
  _State2.default.find().sort({ name: "ascending" }).exec(function (err, states) {
    if (err) {
      return next(err);
    } else {
      res.json(states);
    }
  });
});

module.exports = router;