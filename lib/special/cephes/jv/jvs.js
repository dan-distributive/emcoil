Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jvs = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

var _pythonHelpers = require('../../../utils/pythonHelpers.js');

var py = _interopRequireWildcard(_pythonHelpers);

var _gamma = require('../gamma.js');

var _lgam = require('../gamma/lgam.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Ascending power series for Jv(x).
* AMS55 #9.1.10.
*/
function jvs(n, x) {
  var t = void 0,
      u = void 0,
      y = void 0,
      z = void 0,
      k = void 0,
      ex = void 0,
      sgngam = void 0,
      res = void 0;

  z = -x * x / 4.0;
  u = 1.0;
  y = u;
  k = 1.0;
  t = 1.0;

  while (t > constants.MACHEP) {
    u *= z / (k * (n + k));
    y += u;
    k += 1.0;
    if (y !== 0) t = Math.abs(u / y);
  }

  var _py$frexp = py.frexp(0.5 * x);

  var _py$frexp2 = _slicedToArray(_py$frexp, 2);

  t = _py$frexp2[0];
  ex = _py$frexp2[1];

  ex = ex * n;
  if (ex > -1023 && ex < 1023 && n > 0.0 && n < constants.MAXGAM - 1.0) {
    t = Math.pow(0.5 * x, n) / (0, _gamma.gamma)(n + 1.0);
    y *= t;
  } else {
    var _lgamSgn = (0, _lgam.lgamSgn)(n + 1.0);

    var _lgamSgn2 = _slicedToArray(_lgamSgn, 2);

    res = _lgamSgn2[0];
    sgngam = _lgamSgn2[1];

    t = n * Math.log(0.5 * x) - res;
    if (y < 0) {
      sgngam = -sgngam;
      y = -y;
    }
    t += Math.log(y);
    if (t < -constants.MAXLOG) {
      return 0.0;
    }
    if (t > constants.MAXLOG) {
      // mtherr("Jv", OVERFLOW);
      return Infinity;
    }
    y = sgngam * Math.exp(t);
  }
  return y;
}

exports.jvs = jvs;