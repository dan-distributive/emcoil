Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hyp2f = require('./cephes/hyp2f1.js');

var hyp2f1Cephes = _interopRequireWildcard(_hyp2f);

var _gamma = require('./cephes/gamma.js');

var gammaCephes = _interopRequireWildcard(_gamma);

var _j = require('./cephes/j0.js');

var j0Cephes = _interopRequireWildcard(_j);

var _j2 = require('./cephes/j1.js');

var j1Cephes = _interopRequireWildcard(_j2);

var _jv = require('./cephes/jv.js');

var jvCephes = _interopRequireWildcard(_jv);

var _yn = require('./cephes/yn.js');

var ynCephes = _interopRequireWildcard(_yn);

var _yv = require('./cephes/yv.js');

var yvCephes = _interopRequireWildcard(_yv);

var _i = require('./cephes/i0.js');

var i0Cephes = _interopRequireWildcard(_i);

var _i2 = require('./cephes/i1.js');

var i1Cephes = _interopRequireWildcard(_i2);

var _iv = require('./cephes/iv.js');

var ivCephes = _interopRequireWildcard(_iv);

var _k = require('./cephes/k0.js');

var k0Cephes = _interopRequireWildcard(_k);

var _k2 = require('./cephes/k1.js');

var k1Cephes = _interopRequireWildcard(_k2);

var _kn = require('./cephes/kn.js');

var knCephes = _interopRequireWildcard(_kn);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO discuss this pattern, we just want a little namespacing in the long run
// this is just a quick and dirty way to get some before we design the API
var Cephes = function () {
  function Cephes() {
    _classCallCheck(this, Cephes);
  }

  _createClass(Cephes, null, [{
    key: 'hyp2f1',
    value: function hyp2f1(a, b, c, x) {
      return hyp2f1Cephes.hyp2f1(a, b, c, x);
    }
  }, {
    key: 'gamma',
    value: function gamma(x) {
      return gammaCephes.gamma(x);
    }
  }, {
    key: 'j0',
    value: function j0(x) {
      return j0Cephes.j0(x);
    }
  }, {
    key: 'j1',
    value: function j1(x) {
      return j1Cephes.j1(x);
    }
  }, {
    key: 'jv',
    value: function jv(n, x) {
      return jvCephes.jv(n, x);
    }
  }, {
    key: 'y0',
    value: function y0(x) {
      return j0Cephes.y0(x);
    }
  }, {
    key: 'y1',
    value: function y1(x) {
      return j1Cephes.y1(x);
    }
  }, {
    key: 'yn',
    value: function yn(n, x) {
      return ynCephes.yn(n, x);
    }
  }, {
    key: 'yv',
    value: function yv(n, x) {
      return yvCephes.yv(n, x);
    }
  }, {
    key: 'i0',
    value: function i0(x) {
      return i0Cephes.i0(x);
    }
  }, {
    key: 'ie',
    value: function ie(x) {
      return i0Cephes.i0e(x);
    }
  }, {
    key: 'i1',
    value: function i1(x) {
      return i1Cephes.i1(x);
    }
  }, {
    key: 'i1e',
    value: function i1e(x) {
      return i1Cephes.i1e(x);
    }
  }, {
    key: 'iv',
    value: function iv(v, x) {
      return ivCephes.iv(v, x);
    }
  }, {
    key: 'k0',
    value: function k0(x) {
      return k0Cephes.k0(x);
    }
  }, {
    key: 'k0e',
    value: function k0e(x) {
      return k0Cephes.k0e(x);
    }
  }, {
    key: 'k1',
    value: function k1(x) {
      return k1Cephes.k1(x);
    }
  }, {
    key: 'k1e',
    value: function k1e(x) {
      return k1Cephes.k1e(x);
    }
  }, {
    key: 'kn',
    value: function kn(n, x) {
      return knCephes.kn(n, x);
    }
  }]);

  return Cephes;
}();

exports.default = Cephes;