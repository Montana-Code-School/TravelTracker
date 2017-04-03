import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import uriUtil from 'mongodb-uri';
import path from 'path';
import config from '../webpack.config.dev';
import morgan from 'morgan';
import open from 'open';
import colors from 'colors';
import mongoose from 'mongoose';

/* eslint-disable no-console */
let router = express.Router();

mongoose.Promise = global.Promise;
let mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/traveltracker';
let mongooseUri = uriUtil.formatMongoose(mongodbUri);
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);

const port = process.env.PORT || 3000;
const app = express();
const PROD = process.env.NODE_ENV === 'production';

let userRoutes = require('../src/routes/userRoutes');
let parkRoutes = require('../src/routes/parkRoutes');
let elevationRoutes = require('../src/routes/elevationRoutes');
let stateRoutes = require('../src/routes/stateRoutes');
let mlbstadiumRoutes = require('../src/routes/mlbstadiumRoutes');
let airportRoutes = require('../src/routes/airportRoutes');
let facebookRoutes = require('../src/routes/facebookRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/parks', parkRoutes);
app.use('/elevations', elevationRoutes);
app.use('/states', stateRoutes);
app.use('/mlbstadiums', mlbstadiumRoutes);
app.use('/airports', airportRoutes);
app.use('/facebook', facebookRoutes);



if (PROD) {
  app.use('/', express.static('dist'));
} else {
  // When not in production, enable hot reloading
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}



app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else if (!PROD) {
    console.log(('Starting app in dev mode, listening on port ' + port).green);
    open(`http://localhost:${port}`);
  } else {
    console.log('Starting app in production mode, listening on port ' + port);
  }
});
