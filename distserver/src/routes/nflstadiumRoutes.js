'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Nflstadium = require('../models/Nflstadium');

var _Nflstadium2 = _interopRequireDefault(_Nflstadium);

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
  _Nflstadium2.default.find().sort({ name: "ascending" }).exec(function (err, nflstadiums) {
    if (err) {
      return next(err);
    } else {
      res.json(nflstadiums);
    }
  });
}).post(function (req, res, next) {

  var nflstadium = new _Nflstadium2.default();

  nflstadium.name = "Rogers Centre";
  nflstadium.description = "Toronto Blue Jays";
  nflstadium.state = "ONT";

  nflstadium.save(function (err, user, next) {
    if (err) {
      next(err);
    } else {
      res.json(nflstadium);
    }
  });
});

module.exports = router;