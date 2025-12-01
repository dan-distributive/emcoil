Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bessel = require('./mpmath/functions/bessel.js');

var mpBessel = _interopRequireWildcard(_bessel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: discuss this pattern.
var MpMath = function () {
  function MpMath() {
    _classCallCheck(this, MpMath);
  }

  _createClass(MpMath, null, [{
    key: 'besselI',
    value: function besselI(n, z) {
      var derivative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return mpBessel.besseli(n, z, derivative, opts);
    }
  }, {
    key: 'besselK',
    value: function besselK(n, z) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return mpBessel.besselk(n, z, opts);
    }
  }]);

  return MpMath;
}();

exports.default = MpMath;