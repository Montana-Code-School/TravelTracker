Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  entry: [_path2.default.resolve(__dirname, 'src/index')],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new _webpack2.default.NoEmitOnErrorsPlugin()],
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader' }, { test: /(\.css)$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] }, { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }, { test: /\.(woff|woff2)$/, loader: 'url-loader',
      options: {
        prefix: 'font/',
        limit: '5000'
      }
    }, { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
      options: {
        limit: '10000',
        mimetype: 'application/octet-stream'
      }
    }, { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader',
      options: {
        limit: '10000',
        mimetype: 'image/svg+xml'
      }
    }, { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }]
  }
};