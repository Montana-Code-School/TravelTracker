'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Park = require('../models/Park');

var _Park2 = _interopRequireDefault(_Park);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Importing variables as lets to our required imports */
var router = _express2.default.Router();

/* using a router function with the params of req res and next */
router.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/').get(function (req, res, next) {
  _Park2.default.find().sort({ name: "ascending" }).exec(function (err, parks) {
    if (err) {
      return next(err);
    } else {
      res.json(parks);
    }
  });
});

module.exports = router;