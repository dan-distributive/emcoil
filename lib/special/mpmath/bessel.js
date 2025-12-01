Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.besselk = exports.besseli = undefined;

var _complex = require('../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// besselI of complex order and arg
function besseli(n, z) {
  var derivative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var v = void 0;
  n = _complex2.default.ensureComplex(n);
  z = _complex2.default.ensureComplex(z);
  z[1] = z[1] || 0;
  // if z is zero
  if (z[0] === 0 && z[1] === 0) {
    if (derivative !== 0) {
      // raise ValueError
      throw new Error('besseli derivative not defined for z[0] = z[1] = 0');
    }

    if (n === 0) {
      // I(0,0) = 1
      return 1;
    }

    // Integer orders are zero when z is zero
    if (n[1] == 0 && Number.isInteger(n[0])) {
      return 0;
    }

    // Non-integer orders (the real part) are either NaN, 0, or Infinity
    if (n[0] == 0) {
      return NaN;
    } else if (n[0] > 0) {
      return 0;
    } else {
      return Infinity;
    }
  }

  if (derivative) {
    var h = function h(n, d) {
      var zSquared = _complex2.default.mul(z, z);
      var r = _complex2.default.mul(zSquared, 0.25);
      var nOver2 = _complex2.default.div(n, 2);
      var nPlus1 = _complex2.default.add(n, 1);
      var b = [_complex2.default.add(nOver2, 0.5 - d / 2), _complex2.default.add(nOver2, 1 - d / 2), nPlus1];
      var t = [[2, Math.PI, z],
      // [d-2*n,0.5,n-d]
      [_complex2.default.sub(d, _complex2.default.mul(2, n)), 0.5, _complex2.default.sub(n, d)], [nPlus1], b,
      // [(n+1)*0.5,(n+2)*0.5]
      [_complex2.default.mul(nPlus1, 0.5), _complex2.default.mul(_complex2.default.add(n, 2), 0.5)], b, r];
      return [t];
    };
    v = ctx.hypercomb(h, [n, derivative], opts);
  } else {
    var _h = function _h(n) {
      var nPlus1 = _complex2.default.add(n, 1);
      w = _complex2.default.mul(z, 0.5);
      r = _complex2.default.mul(w, w);
      t = [[w], [n], [], [nPlus1], [], [nPlus1], r];
      return [t];
    };
    v = ctx.hypercomb(_h, [n], opts);
  }
  return v;
}

// complex arg - besselK
function besselk(n, z) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  n = _complex2.default.ensureComplex(n);
  z = _complex2.default.ensureComplex(z);
  if (z[0] === 0 && z[1] === 0) {
    return Infinity;
  }

  var h = void 0;
  var magnitude = _complex2.default.abs(z);
  if (magnitude < 1) {
    // Represent as limit definition
    h = function h(n) {
      var nPlus1 = _complex2.default.add(n, 1);
      var zOver2 = _complex2.default.div(z, 2);
      var negN = _complex2.default.mul(n, -1);
      r = _complex2.default.pow(zOver2, 2);
      t1 = [[z, 2], [negN, _complex2.default.sub(n, 1)], [n], [], [], [_complex2.default.sub(1, n)], r];
      t2 = [[z, 2], [n, _complex2.default.mul(nPlus1, -1)], [negN], [], [], [nPlus1], r];
      return [t1, t2];
    };
    // We could use the limit definition always, but it leads
    // to very bad cancellation (of exponentially large terms)
    // for large real z
    // Instead represent in terms of 2F0
  } else {
    h = function h(n) {
      var negZ = _complex2.default.mul(z, -1);
      return [[Math.PI / 2, z, _complex2.default.exp(negZ)], [0.5, -0.5, 1], [], [], [_complex2.default.add(n, 0.5), _complex2.default.sub(0.5, n)], [], -0.5 * _complex2.default.inverse(z)];
    };
  }

  return hypercomb(h, [n], opts);
}

exports.besseli = besseli;
exports.besselk = besselk;