webpackHotUpdate(0,{

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(47);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(45);

var _index4 = _interopRequireDefault(_index3);

var _react2 = __webpack_require__(0);

var _react3 = _interopRequireDefault(_react2);

var _index5 = __webpack_require__(46);

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDatamaps = __webpack_require__(581);

var _reactDatamaps2 = _interopRequireDefault(_reactDatamaps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  CollectionMap: {
    displayName: 'CollectionMap'
  }
};

var _UsersJayalan17DocumentsProjectsTravelTrackerNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: '/Users/jayalan17/Documents/Projects/TravelTracker/src/components/CollectionMap.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersJayalan17DocumentsProjectsTravelTrackerNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: '/Users/jayalan17/Documents/Projects/TravelTracker/src/components/CollectionMap.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersJayalan17DocumentsProjectsTravelTrackerNode_modulesReactTransformHmrLibIndexJs2(_UsersJayalan17DocumentsProjectsTravelTrackerNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var CollectionMap = _wrapComponent('CollectionMap')(function (_React$Component) {
  _inherits(CollectionMap, _React$Component);

  function CollectionMap(props) {
    _classCallCheck(this, CollectionMap);

    var _this = _possibleConstructorReturn(this, (CollectionMap.__proto__ || Object.getPrototypeOf(CollectionMap)).call(this, props));

    _this.state = {
      theStates: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']
    };
    return _this;
  }

  _createClass(CollectionMap, [{
    key: 'userLocation',
    value: function userLocation() {
      var lat = "";
      var lon = "";
      var userLocation = {};
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          console.log(lat, lon);
          userLocation = { latitude: lat, longitude: lon };
          console.log(userLocation);
        });
      } else {
        document.write('Your browser does not support GeoLocation :(');
      }
      console.log(userLocation);
      return lat, lon;
    }
  }, {
    key: 'prepareFillKeys',
    value: function prepareFillKeys() {
      var fillKeys = {};
      var theStates = [];
      if (this.props.collectionName == "states") {
        this.props.fullCollection.forEach(function (x) {
          if (this.props.usersCollection.find(function (y) {
            return y.name == x.name;
          })) {
            fillKeys[x.states] = {
              fillKey: 'Collected'
            };
          } else {
            fillKeys[x.states] = {
              fillKey: 'defaultFill'
            };
          }
        }, this);
      } else {
        this.state.theStates.forEach(function (x) {
          fillKeys[x] = {
            fillKey: 'defaultFill'
          };
        });
      }
      return fillKeys;
    }
  }, {
    key: 'prepareBubbles',
    value: function prepareBubbles() {
      var radius = 5;
      var bubbles = [];

      var userNow = this.userLocation();

      console.log(userNow);
      bubbles.push({
        name: "Your Location",
        radius: 8,
        country: 'USA',
        latitude: 45.6639085,
        longitude: -111.0621144,
        fillKey: 'User'
      });
      if (this.props.collectionName != "states") {
        this.props.fullCollection.forEach(function (x) {
          if (this.props.usersCollection.find(function (y) {
            return y.name == x.name;
          })) {
            bubbles.push({
              name: x.name + ", " + x.description,
              radius: radius,
              country: 'USA',
              latitude: x.latitude,
              longitude: x.longitude,
              fillKey: 'Collected'
            });
          } else {
            bubbles.push({
              name: x.name + ", " + x.description,
              radius: radius,
              country: 'USA',
              latitude: x.latitude,
              longitude: x.longitude,
              fillKey: 'NotCollected'
            });
          }
        }, this);
      }
      return bubbles;
    }
  }, {
    key: 'prepareMap',
    value: function prepareMap() {
      var fillKeys = this.prepareFillKeys();
      var ourMap = _react3.default.createElement(_reactDatamaps2.default, { scope: 'usa',
        responsive: true,
        height: '450'
        // ref={this.addClickHandlers}
        , geographyConfig: {
          highlightOnHover: false,
          popupOnHover: false
          // highlightFillColor: '#0DFFA6',
          // highlightBorderColor: '#1D0CE8',
          // highlightBorderWidth: 3
        },
        fills: {
          'User': '#FF0000',
          'Collected': '#35B729',
          'NotCollected': '#FF7F50',
          'defaultFill': '#707070' },
        data: fillKeys,
        bubbles: this.prepareBubbles(),
        bubbleOptions: {
          borderWidth: 1,
          borderColor: '#000000',
          fillOpacity: 1
        },
        labels: true
      });
      return ourMap;
    }
  }, {
    key: 'render',
    value: function render() {

      return _react3.default.createElement(
        'div',
        null,
        this.prepareMap()
      );
    }
  }]);

  return CollectionMap;
}(_react3.default.Component));

CollectionMap.propTypes = {
  collectionName: _react3.default.PropTypes.string,
  fullCollection: _react3.default.PropTypes.array,
  usersCollection: _react3.default.PropTypes.object
};

exports.default = CollectionMap;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uTWFwLmpzPzg5YWQiXSwibmFtZXMiOlsicHJvcHMiLCJzdGF0ZSIsInRoZVN0YXRlcyIsImxhdCIsImxvbiIsInVzZXJMb2NhdGlvbiIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwicG9zaXRpb24iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudCIsIndyaXRlIiwiZmlsbEtleXMiLCJjb2xsZWN0aW9uTmFtZSIsImZ1bGxDb2xsZWN0aW9uIiwiZm9yRWFjaCIsIngiLCJ1c2Vyc0NvbGxlY3Rpb24iLCJmaW5kIiwieSIsIm5hbWUiLCJzdGF0ZXMiLCJmaWxsS2V5IiwicmFkaXVzIiwiYnViYmxlcyIsInVzZXJOb3ciLCJwdXNoIiwiY291bnRyeSIsImRlc2NyaXB0aW9uIiwicHJlcGFyZUZpbGxLZXlzIiwib3VyTWFwIiwiaGlnaGxpZ2h0T25Ib3ZlciIsInBvcHVwT25Ib3ZlciIsInByZXBhcmVCdWJibGVzIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJDb2xvciIsImZpbGxPcGFjaXR5IiwicHJlcGFyZU1hcCIsIkNvbXBvbmVudCIsIkNvbGxlY3Rpb25NYXAiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJhcnJheSIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUUseUJBQVlBLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDVkEsS0FEVTs7QUFFaEIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLGlCQUFXLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYyxJQUFkLEVBQXFCLElBQXJCLEVBQTRCLElBQTVCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLEVBQStDLElBQS9DLEVBQXNELElBQXRELEVBQTZELElBQTdELEVBQW9FLElBQXBFLEVBQTJFLElBQTNFLEVBQWtGLElBQWxGLEVBQXlGLElBQXpGLEVBQWdHLElBQWhHLEVBQXVHLElBQXZHLEVBQThHLElBQTlHLEVBQ1QsSUFEUyxFQUNGLElBREUsRUFDSyxJQURMLEVBQ1ksSUFEWixFQUNtQixJQURuQixFQUMwQixJQUQxQixFQUNpQyxJQURqQyxFQUN3QyxJQUR4QyxFQUMrQyxJQUQvQyxFQUNzRCxJQUR0RCxFQUM2RCxJQUQ3RCxFQUNvRSxJQURwRSxFQUMyRSxJQUQzRSxFQUNrRixJQURsRixFQUN5RixJQUR6RixFQUNnRyxJQURoRyxFQUN1RyxJQUR2RyxFQUVULElBRlMsRUFFRixJQUZFLEVBRUssSUFGTCxFQUVZLElBRlosRUFFbUIsSUFGbkIsRUFFMEIsSUFGMUIsRUFFaUMsSUFGakMsRUFFd0MsSUFGeEMsRUFFK0MsSUFGL0MsRUFFc0QsSUFGdEQsRUFFNkQsSUFGN0QsRUFFb0UsSUFGcEUsRUFFMkUsSUFGM0UsRUFFa0YsSUFGbEYsRUFFeUYsSUFGekYsRUFFZ0csSUFGaEcsRUFFdUcsSUFGdkcsRUFHVCxJQUhTLEVBR0YsSUFIRSxFQUdLLElBSEwsRUFHWSxJQUhaLEVBR21CLElBSG5CLEVBRzBCLElBSDFCLEVBR2lDLElBSGpDLEVBR3dDLElBSHhDO0FBREEsS0FBYjtBQUZnQjtBQVFqQjs7OzttQ0FFYztBQUNiLFVBQUlDLE1BQU0sRUFBVjtBQUNBLFVBQUlDLE1BQU0sRUFBVjtBQUNBLFVBQUlDLGVBQWEsRUFBakI7QUFDQSxVQUFJQyxVQUFVQyxXQUFkLEVBQTJCO0FBQ3pCRCxrQkFBVUMsV0FBVixDQUFzQkMsa0JBQXRCLENBQXlDLFVBQVNDLFFBQVQsRUFBbUI7QUFDMUQsY0FBSU4sTUFBTU0sU0FBU0MsTUFBVCxDQUFnQkMsUUFBMUI7QUFDQSxjQUFJUCxNQUFNSyxTQUFTQyxNQUFULENBQWdCRSxTQUExQjtBQUNBQyxrQkFBUUMsR0FBUixDQUFZWCxHQUFaLEVBQWlCQyxHQUFqQjtBQUNBQyx5QkFBZSxFQUFDTSxVQUFVUixHQUFYLEVBQWdCUyxXQUFXUixHQUEzQixFQUFmO0FBQ0FTLGtCQUFRQyxHQUFSLENBQVlULFlBQVo7QUFDRCxTQU5EO0FBT0QsT0FSRCxNQVFPO0FBQ0xVLGlCQUFTQyxLQUFULENBQWUsOENBQWY7QUFDRDtBQUNESCxjQUFRQyxHQUFSLENBQVlULFlBQVo7QUFDQSxhQUFRRixLQUFLQyxHQUFiO0FBQ0Q7OztzQ0FFZ0I7QUFDZixVQUFJYSxXQUFXLEVBQWY7QUFDQSxVQUFJZixZQUFZLEVBQWhCO0FBQ0EsVUFBRyxLQUFLRixLQUFMLENBQVdrQixjQUFYLElBQTZCLFFBQWhDLEVBQXlDO0FBQ3ZDLGFBQUtsQixLQUFMLENBQVdtQixjQUFYLENBQTBCQyxPQUExQixDQUFrQyxVQUFTQyxDQUFULEVBQVc7QUFDM0MsY0FBRyxLQUFLckIsS0FBTCxDQUFXc0IsZUFBWCxDQUEyQkMsSUFBM0IsQ0FBZ0MsVUFBU0MsQ0FBVCxFQUFXO0FBQUMsbUJBQU9BLEVBQUVDLElBQUYsSUFBUUosRUFBRUksSUFBakI7QUFBdUIsV0FBbkUsQ0FBSCxFQUF3RTtBQUN0RVIscUJBQVNJLEVBQUVLLE1BQVgsSUFBcUI7QUFDbkJDLHVCQUFTO0FBRFUsYUFBckI7QUFHRCxXQUpELE1BSUs7QUFDSFYscUJBQVNJLEVBQUVLLE1BQVgsSUFBcUI7QUFDbkJDLHVCQUFTO0FBRFUsYUFBckI7QUFHRDtBQUNGLFNBVkQsRUFVRyxJQVZIO0FBV0QsT0FaRCxNQVlLO0FBQ0gsYUFBSzFCLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQmtCLE9BQXJCLENBQTZCLFVBQVNDLENBQVQsRUFBVztBQUN0Q0osbUJBQVNJLENBQVQsSUFBYztBQUNaTSxxQkFBUztBQURHLFdBQWQ7QUFHRCxTQUpEO0FBS0Q7QUFDRCxhQUFPVixRQUFQO0FBQ0Q7OztxQ0FFZTtBQUNkLFVBQU1XLFNBQVMsQ0FBZjtBQUNBLFVBQUlDLFVBQVUsRUFBZDs7QUFFQSxVQUFJQyxVQUFRLEtBQUt6QixZQUFMLEVBQVo7O0FBRUFRLGNBQVFDLEdBQVIsQ0FBWWdCLE9BQVo7QUFDQUQsY0FBUUUsSUFBUixDQUNFO0FBQ0VOLGNBQU0sZUFEUjtBQUVFRyxnQkFBUSxDQUZWO0FBR0VJLGlCQUFTLEtBSFg7QUFJRXJCLGtCQUFVLFVBSlo7QUFLRUMsbUJBQVcsQ0FBQyxXQUxkO0FBTUVlLGlCQUFTO0FBTlgsT0FERjtBQVVBLFVBQUcsS0FBSzNCLEtBQUwsQ0FBV2tCLGNBQVgsSUFBNkIsUUFBaEMsRUFBeUM7QUFDdkMsYUFBS2xCLEtBQUwsQ0FBV21CLGNBQVgsQ0FBMEJDLE9BQTFCLENBQWtDLFVBQVNDLENBQVQsRUFBVztBQUMzQyxjQUFHLEtBQUtyQixLQUFMLENBQVdzQixlQUFYLENBQTJCQyxJQUEzQixDQUFnQyxVQUFTQyxDQUFULEVBQVc7QUFBQyxtQkFBT0EsRUFBRUMsSUFBRixJQUFRSixFQUFFSSxJQUFqQjtBQUF1QixXQUFuRSxDQUFILEVBQXdFO0FBQ3RFSSxvQkFBUUUsSUFBUixDQUNFO0FBQ0VOLG9CQUFNSixFQUFFSSxJQUFGLEdBQVMsSUFBVCxHQUFnQkosRUFBRVksV0FEMUI7QUFFRUwsNEJBRkY7QUFHRUksdUJBQVMsS0FIWDtBQUlFckIsd0JBQVVVLEVBQUVWLFFBSmQ7QUFLRUMseUJBQVdTLEVBQUVULFNBTGY7QUFNRWUsdUJBQVM7QUFOWCxhQURGO0FBVUQsV0FYRCxNQVdLO0FBQ0hFLG9CQUFRRSxJQUFSLENBQWE7QUFDWE4sb0JBQU1KLEVBQUVJLElBQUYsR0FBUyxJQUFULEdBQWdCSixFQUFFWSxXQURiO0FBRVhMLDRCQUZXO0FBR1hJLHVCQUFTLEtBSEU7QUFJWHJCLHdCQUFVVSxFQUFFVixRQUpEO0FBS1hDLHlCQUFXUyxFQUFFVCxTQUxGO0FBTVhlLHVCQUFTO0FBTkUsYUFBYjtBQVNEO0FBQ0YsU0F2QkQsRUF1QkcsSUF2Qkg7QUF3QkQ7QUFDRCxhQUFPRSxPQUFQO0FBQ0Q7OztpQ0FFVztBQUNWLFVBQUlaLFdBQVcsS0FBS2lCLGVBQUwsRUFBZjtBQUNBLFVBQUlDLFNBQVUseURBQVMsT0FBTSxLQUFmO0FBQ2Qsd0JBRGM7QUFFZCxnQkFBTztBQUNQO0FBSGMsVUFJZCxpQkFBaUI7QUFDZkMsNEJBQWtCLEtBREg7QUFFZkMsd0JBQWM7QUFDZDtBQUNBO0FBQ0E7QUFMZSxTQUpIO0FBV2QsZUFBTztBQUNMLGtCQUFRLFNBREg7QUFFTCx1QkFBYSxTQUZSO0FBR0wsMEJBQWdCLFNBSFg7QUFJTCx5QkFBZSxTQUpWLEVBWE87QUFnQlosY0FBTXBCLFFBaEJNO0FBaUJaLGlCQUFTLEtBQUtxQixjQUFMLEVBakJHO0FBa0JWLHVCQUFlO0FBQ2JDLHVCQUFhLENBREE7QUFFYkMsdUJBQWEsU0FGQTtBQUdiQyx1QkFBYTtBQUhBLFNBbEJMO0FBdUJaO0FBdkJZLFFBQWQ7QUF5QkEsYUFBT04sTUFBUDtBQUNEOzs7NkJBRVE7O0FBRVAsYUFDRTtBQUFBO0FBQUE7QUFDRyxhQUFLTyxVQUFMO0FBREgsT0FERjtBQUtEOzs7O0VBM0l5QixnQkFBTUMsUzs7QUE4SWxDQyxjQUFjQyxTQUFkLEdBQTBCO0FBQ3hCM0Isa0JBQWdCLGdCQUFNNEIsU0FBTixDQUFnQkMsTUFEUjtBQUV4QjVCLGtCQUFnQixnQkFBTTJCLFNBQU4sQ0FBZ0JFLEtBRlI7QUFHeEIxQixtQkFBaUIsZ0JBQU13QixTQUFOLENBQWdCRztBQUhULENBQTFCOztrQkFNZUwsYSIsImZpbGUiOiIwLjVkOTdiMTEyNGI3OTJmYTg5ZWE0LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IERhdGFtYXAgZnJvbSAncmVhY3QtZGF0YW1hcHMnO1xuXG5jbGFzcyBDb2xsZWN0aW9uTWFwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0aGVTdGF0ZXM6IFsnQUwnLCAnQUsnICwgJ0FTJyAsICdBWicgLCAnQVInICwgJ0NBJywgJ0NPJywgJ0NUJyAsICdERScgLCAnREMnICwgJ0ZNJyAsICdGTCcgLCAnR0EnICwgJ0dVJyAsICdISScgLCAnSUQnICwgJ0lMJyxcbiAgICAgICAgJ0lOJyAsICdJQScgLCAnS1MnICwgJ0tZJyAsICdMQScgLCAnTUUnICwgJ01IJyAsICdNRCcgLCAnTUEnICwgJ01JJyAsICdNTicgLCAnTVMnICwgJ01PJyAsICdNVCcgLCAnTkUnICwgJ05WJyAsICdOSCcgLFxuICAgICAgICAnTkonICwgJ05NJyAsICdOWScgLCAnTkMnICwgJ05EJyAsICdNUCcgLCAnT0gnICwgJ09LJyAsICdPUicgLCAnUFcnICwgJ1BBJyAsICdQUicgLCAnUkknICwgJ1NDJyAsICdTRCcgLCAnVE4nICwgJ1RYJyAsXG4gICAgICAgICdVVCcgLCAnVlQnICwgJ1ZJJyAsICdWQScgLCAnV0EnICwgJ1dWJyAsICdXSScgLCAnV1knIF1cbiAgICB9O1xuICB9XG5cbiAgdXNlckxvY2F0aW9uKCkge1xuICAgIGxldCBsYXQgPSBcIlwiO1xuICAgIGxldCBsb24gPSBcIlwiXG4gICAgbGV0IHVzZXJMb2NhdGlvbj17fTtcbiAgICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBsYXQgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgIGxldCBsb24gPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuICAgICAgICBjb25zb2xlLmxvZyhsYXQsIGxvbik7XG4gICAgICAgIHVzZXJMb2NhdGlvbiA9IHtsYXRpdHVkZTogbGF0LCBsb25naXR1ZGU6IGxvbn07XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXJMb2NhdGlvbik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQud3JpdGUoJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IEdlb0xvY2F0aW9uIDooJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHVzZXJMb2NhdGlvbik7XG4gICAgcmV0dXJuIChsYXQsIGxvbik7XG4gIH1cblxuICBwcmVwYXJlRmlsbEtleXMoKXtcbiAgICBsZXQgZmlsbEtleXMgPSB7fTtcbiAgICBsZXQgdGhlU3RhdGVzID0gW107XG4gICAgaWYodGhpcy5wcm9wcy5jb2xsZWN0aW9uTmFtZSA9PSBcInN0YXRlc1wiKXtcbiAgICAgIHRoaXMucHJvcHMuZnVsbENvbGxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy51c2Vyc0NvbGxlY3Rpb24uZmluZChmdW5jdGlvbih5KXtyZXR1cm4geS5uYW1lPT14Lm5hbWU7fSkpe1xuICAgICAgICAgIGZpbGxLZXlzW3guc3RhdGVzXSA9IHtcbiAgICAgICAgICAgIGZpbGxLZXk6ICdDb2xsZWN0ZWQnXG4gICAgICAgICAgfTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgZmlsbEtleXNbeC5zdGF0ZXNdID0ge1xuICAgICAgICAgICAgZmlsbEtleTogJ2RlZmF1bHRGaWxsJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5zdGF0ZS50aGVTdGF0ZXMuZm9yRWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgZmlsbEtleXNbeF0gPSB7XG4gICAgICAgICAgZmlsbEtleTogJ2RlZmF1bHRGaWxsJ1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmaWxsS2V5cztcbiAgfVxuXG4gIHByZXBhcmVCdWJibGVzKCl7XG4gICAgY29uc3QgcmFkaXVzID0gNTtcbiAgICBsZXQgYnViYmxlcyA9IFtdO1xuXG4gICAgbGV0IHVzZXJOb3c9dGhpcy51c2VyTG9jYXRpb24oKTtcblxuICAgIGNvbnNvbGUubG9nKHVzZXJOb3cpO1xuICAgIGJ1YmJsZXMucHVzaChcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJZb3VyIExvY2F0aW9uXCIsXG4gICAgICAgIHJhZGl1czogOCxcbiAgICAgICAgY291bnRyeTogJ1VTQScsXG4gICAgICAgIGxhdGl0dWRlOiA0NS42NjM5MDg1LFxuICAgICAgICBsb25naXR1ZGU6IC0xMTEuMDYyMTE0NCxcbiAgICAgICAgZmlsbEtleTogJ1VzZXInXG4gICAgICB9XG4gICAgKTtcbiAgICBpZih0aGlzLnByb3BzLmNvbGxlY3Rpb25OYW1lICE9IFwic3RhdGVzXCIpe1xuICAgICAgdGhpcy5wcm9wcy5mdWxsQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICBpZih0aGlzLnByb3BzLnVzZXJzQ29sbGVjdGlvbi5maW5kKGZ1bmN0aW9uKHkpe3JldHVybiB5Lm5hbWU9PXgubmFtZTt9KSl7XG4gICAgICAgICAgYnViYmxlcy5wdXNoKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiB4Lm5hbWUgKyBcIiwgXCIgKyB4LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgIGNvdW50cnk6ICdVU0EnLFxuICAgICAgICAgICAgICBsYXRpdHVkZTogeC5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB4LmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgZmlsbEtleTogJ0NvbGxlY3RlZCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBidWJibGVzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogeC5uYW1lICsgXCIsIFwiICsgeC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgIGNvdW50cnk6ICdVU0EnLFxuICAgICAgICAgICAgbGF0aXR1ZGU6IHgubGF0aXR1ZGUsXG4gICAgICAgICAgICBsb25naXR1ZGU6IHgubG9uZ2l0dWRlLFxuICAgICAgICAgICAgZmlsbEtleTogJ05vdENvbGxlY3RlZCdcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gYnViYmxlcztcbiAgfVxuXG4gIHByZXBhcmVNYXAoKXtcbiAgICBsZXQgZmlsbEtleXMgPSB0aGlzLnByZXBhcmVGaWxsS2V5cygpO1xuICAgIGxldCBvdXJNYXAgPSAoPERhdGFtYXAgc2NvcGU9XCJ1c2FcIlxuICAgIHJlc3BvbnNpdmVcbiAgICBoZWlnaHQ9XCI0NTBcIlxuICAgIC8vIHJlZj17dGhpcy5hZGRDbGlja0hhbmRsZXJzfVxuICAgIGdlb2dyYXBoeUNvbmZpZz17e1xuICAgICAgaGlnaGxpZ2h0T25Ib3ZlcjogZmFsc2UsXG4gICAgICBwb3B1cE9uSG92ZXI6IGZhbHNlXG4gICAgICAvLyBoaWdobGlnaHRGaWxsQ29sb3I6ICcjMERGRkE2JyxcbiAgICAgIC8vIGhpZ2hsaWdodEJvcmRlckNvbG9yOiAnIzFEMENFOCcsXG4gICAgICAvLyBoaWdobGlnaHRCb3JkZXJXaWR0aDogM1xuICAgIH19XG4gICAgZmlsbHM9e3tcbiAgICAgICdVc2VyJzogJyNGRjAwMDAnLFxuICAgICAgJ0NvbGxlY3RlZCc6ICcjMzVCNzI5JyxcbiAgICAgICdOb3RDb2xsZWN0ZWQnOiAnI0ZGN0Y1MCcsXG4gICAgICAnZGVmYXVsdEZpbGwnOiAnIzcwNzA3MCd9fVxuICAgICAgZGF0YT17ZmlsbEtleXN9XG4gICAgICBidWJibGVzPXt0aGlzLnByZXBhcmVCdWJibGVzKCl9XG4gICAgICAgIGJ1YmJsZU9wdGlvbnM9e3tcbiAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgICB9fVxuICAgICAgbGFiZWxzXG4gICAgICAvPik7XG4gICAgcmV0dXJuIG91ck1hcDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICB7dGhpcy5wcmVwYXJlTWFwKCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNvbGxlY3Rpb25NYXAucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgZnVsbENvbGxlY3Rpb246IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgdXNlcnNDb2xsZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsZWN0aW9uTWFwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvbk1hcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=