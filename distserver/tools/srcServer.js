'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _mongodbUri = require('mongodb-uri');

var _mongodbUri2 = _interopRequireDefault(_mongodbUri);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
var router = _express2.default.Router();

_mongoose2.default.Promise = global.Promise;
var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/traveltracker';
var mongooseUri = _mongodbUri2.default.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
_mongoose2.default.connect(mongooseUri, options);

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();
var PROD = process.env.NODE_ENV === 'production';

var userRoutes = require('../src/routes/userRoutes');
var parkRoutes = require('../src/routes/parkRoutes');
var elevationRoutes = require('../src/routes/elevationRoutes');
var stateRoutes = require('../src/routes/stateRoutes');
var mlbstadiumRoutes = require('../src/routes/mlbstadiumRoutes');
var nflstadiumRoutes = require('../src/routes/nflstadiumRoutes');
var airportRoutes = require('../src/routes/airportRoutes');
var facebookRoutes = require('../src/routes/facebookRoutes');

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use('/api', userRoutes);
app.use('/parks', parkRoutes);
app.use('/elevations', elevationRoutes);
app.use('/states', stateRoutes);
app.use('/mlbstadiums', mlbstadiumRoutes);
app.use('/nflstadiums', nflstadiumRoutes);
app.use('/airports', airportRoutes);
app.use('/facebook', facebookRoutes);

if (PROD) {
  app.use('/', _express2.default.static('dist'));
} else {
  // When not in production, enable hot reloading
  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: _webpackConfig2.default.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else if (!PROD) {
    console.log(('Starting app in dev mode, listening on port ' + port).green);
    (0, _open2.default)('http://localhost:' + port);
  } else {
    console.log('Starting app in production mode, listening on port ' + port);
  }
});