Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinpi = exports.rgamma = exports.gamma = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _complex = require('../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

var _pythonHelpers = require('../../utils/pythonHelpers.js');

var py = _interopRequireWildcard(_pythonHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXACT_GAMMA = [Infinity, 1.0, 1.0, 2.0, 6.0, 24.0, 120.0, 720.0, 5040.0, 40320.0, 362880.0, 3628800.0, 39916800.0, 479001600.0, 6227020800.0, 87178291200.0, 1307674368000.0, 20922789888000.0, 355687428096000.0, 6402373705728000.0, 121645100408832000.0, 2432902008176640000.0];

// Lanczos coefficients used by the GNU Scientific Library
var LANCZOS_G = 7;
var LANCZOS_P = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

function gammaReal(x) {
  var _intx = Math.round(x);
  if (_intx === x) {
    if (_intx <= 0) {
      // return (-1)**_intx * INF
      throw new ZeroDivisionError('gamma function pole');
    }
    if (EXACT_GAMMA[_intx]) {
      return EXACT_GAMMA[_intx];
    }
  }

  if (x < 0.5) {
    // TODO: sinpi
    return Math.PI / (sinpiReal(x) * gammaReal(1 - x));
  } else {
    x -= 1.0;
    var r = LANCZOS_P[0];
    for (var i = 1; i < LANCZOS_G + 2; i++) {
      r += LANCZOS_P[i] / (x + i);
    }
    var t = x + LANCZOS_G + 0.5;
    return 2.506628274631000502417 * t ** (x + 0.5) * Math.exp(-t) * r;
  }
}

function gammaComplex(x) {
  if (_complex2.default.re(x) < 0.5) {
    // TODO: sinpi
    var oneMinusX = _complex2.default.sub(1, x);
    var denom = _complex2.default.mul(sinpiComplex(x), gammaComplex(oneMinusX));
    return _complex2.default.div(Math.PI, denom);
  } else {
    x = _complex2.default.sub(x, 1.0);
    var r = LANCZOS_P[0];
    for (var i = 1; i < LANCZOS_G + 2; i++) {
      var xPlusI = _complex2.default.add(x, i);
      var term = _complex2.default.div(LANCZOS_P[i], xPlusI);
      r = _complex2.default.add(r, term);
    }
    var t = _complex2.default.add(x, LANCZOS_G + 0.5);
    // return 2.506628274631000502417 * t**(x+0.5) * Complex.exp(-t) * r
    var xPlusHalf = _complex2.default.add(x, 0.5);
    var tToTheXPlusHalf = _complex2.default.pow(t, xPlusHalf);
    var negT = _complex2.default.mul(-1, t);
    var rTimesEToTheMinusT = _complex2.default.mul(r, _complex2.default.exp(negT));
    var product = _complex2.default.mul(tToTheXPlusHalf, rTimesEToTheMinusT);
    return _complex2.default.mul(2.506628274631000502417, product);
  }
}

function gamma(x) {
  if (x.constructor === Array) {
    return gammaComplex(x);
  } else {
    return gammaReal(x);
  }
}

function rgamma(x) {
  try {
    return _complex2.default.inverse(gamma(x));
  } catch (e) {
    if (e.name === 'ZeroDivisionError') {
      return _complex2.default.mul(x, 0.0);
    } else {
      // only catch ZeroDivisionError
      throw e;
    }
  }
}

function sinpiReal(x) {
  if (x < 0) return -sinpiReal(-x);

  var _py$divmod = py.divmod(x, 0.5),
      _py$divmod2 = _slicedToArray(_py$divmod, 2),
      n = _py$divmod2[0],
      r = _py$divmod2[1];

  r *= Math.PI;
  n = py.mod(n, 4);
  if (n === 0) return Math.sin(r);
  if (n === 1) return Math.cos(r);
  if (n === 2) return -Math.sin(r);
  if (n === 3) return -Math.cos(r);
}

function sinpiComplex(z) {
  if (_complex2.default.re(z) < 0) {
    var negZ = _complex2.default.mul(-1, z);
    var res = sinpiComplex(negZ);
    return _complex2.default.mul(-1, res);
  };

  var _py$divmod3 = py.divmod(_complex2.default.re(z), 0.5),
      _py$divmod4 = _slicedToArray(_py$divmod3, 2),
      n = _py$divmod4[0],
      r = _py$divmod4[1];

  z = _complex2.default.mul(Math.PI, [r, _complex2.default.im(z)]);
  n = py.mod(n, 4);
  if (n === 0) return _complex2.default.sin(z);
  if (n === 1) return _complex2.default.cos(z);
  if (n === 2) return _complex2.default.mul(-1, _complex2.default.sin(z));
  if (n === 3) return _complex2.default.mul(-1, _complex2.default.cos(z));
}

function sinpi(x) {
  if (x.constructor === Array) {
    return sinpiComplex(x);
  } else {
    return sinpiReal(x);
  }
}

function ZeroDivisionError(message) {
  this.message = message;
  this.name = 'ZeroDivisionError';
}

exports.gamma = gamma;
exports.rgamma = rgamma;
exports.sinpi = sinpi;