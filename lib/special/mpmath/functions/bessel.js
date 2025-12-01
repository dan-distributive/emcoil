Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.struvel = exports.besselk = exports.besseli = undefined;

var _complex = require('../../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

var _hypergeometric = require('./hypergeometric.js');

var mpHypergeometric = _interopRequireWildcard(_hypergeometric);

var _ctx = require('../ctx.js');

var ctx = _interopRequireWildcard(_ctx);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// besselI of complex order and arg of selected derivative
function besseli(n, z) {
  var derivative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  ctx.reset();
  var v = void 0,
      r = void 0,
      t = void 0;
  n = ctx.convert(n);
  z = ctx.convert(z);

  if (_complex2.default.isZero(z)) {
    if (derivative !== 0) {
      // raise ValueError
      throw new Error('besseli derivative not defined for z[0] = z[1] = 0');
    }

    if (_complex2.default.isZero(n)) {
      // I(0,0) = 1
      return 1;
    }

    // Integer orders are zero when z is zero
    if (n[1] === 0 && Number.isInteger(n[0])) {
      return 0;
    }

    // Non-integer orders (the real part) are either NaN, 0, or Infinity
    if (n[0] === 0) {
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
      r = _complex2.default.mul(zSquared, 0.25);
      var nOver2 = _complex2.default.div(n, 2);
      var nPlus1 = _complex2.default.add(n, 1);
      var b = [_complex2.default.add(nOver2, 0.5 - d / 2), _complex2.default.add(nOver2, 1 - d / 2), nPlus1];
      // mpmath returns a tuple wrapped in a list
      // [([2,ctx.pi,z],[d-2*n,0.5,n-d],[n+1],B,[(n+1)*0.5,(n+2)*0.5],B,r)]
      t = [[2, Math.PI, z], // ws
      // [d-2*n,0.5,n-d]
      [_complex2.default.sub(d, _complex2.default.mul(2, n)), 0.5, _complex2.default.sub(n, d)], // cs
      [nPlus1], // alphas
      b, // betas
      // [(n+1)*0.5,(n+2)*0.5]
      [_complex2.default.mul(nPlus1, 0.5), _complex2.default.mul(_complex2.default.add(n, 2), 0.5)], // as = 2
      b, // bs = 1
      r // z
      ];
      return [t];
    };
    v = mpHypergeometric.hypercomb(h, [n, derivative], opts);
  } else {
    var _h = function _h(n) {
      var nPlus1 = _complex2.default.add(n, 1);
      var w = _complex2.default.mul(z, 0.5);
      r = _complex2.default.mul(w, w);
      // as = 0 bs = 1
      t = [[w], [n], [], [nPlus1], [], [nPlus1], r];
      return [t];
    };
    v = mpHypergeometric.hypercomb(_h, [n], opts);
  }
  return v;
}

// complex arg - besselK
function besselk(n, z) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  ctx.reset();
  n = _complex2.default.ensureComplex(n);
  z = _complex2.default.ensureComplex(z);
  if (_complex2.default.isZero(z)) {
    return Infinity;
  }

  var h = void 0;
  var capitalM = ctx.mag(z);
  if (capitalM < 1) {
    // Represent as limit definition
    h = function h(n) {
      var nPlus1 = _complex2.default.add(n, 1);
      var zOver2 = _complex2.default.div(z, 2);
      var negN = _complex2.default.mul(n, -1);
      var r = _complex2.default.pow(zOver2, 2);
      //    ws       cs                       alphas betas as=0 bs=1
      var t1 = [[z, 2], [negN, _complex2.default.sub(n, 1)], [n], [], [], [_complex2.default.sub(1, n)], r];
      var t2 = [[z, 2], [n, _complex2.default.mul(nPlus1, -1)], [negN], [], [], [nPlus1], r];
      return [t1, t2];
    };
    // We could use the limit definition always, but it leads
    // to very bad cancellation (of exponentially large terms)
    // for large real z
    // Instead represent in terms of 2F0
  } else {
    ctx.prec += capitalM;
    h = function h(n) {
      var negZ = _complex2.default.mul(z, -1);
      var t = [[Math.PI / 2, z, _complex2.default.exp(negZ)], [0.5, -0.5, 1], [], [], [_complex2.default.add(n, 0.5), _complex2.default.sub(0.5, n)], // a=2
      [], // b=0
      _complex2.default.mul(-0.5, _complex2.default.inverse(z))];
      return [t];
    };
  }

  return mpHypergeometric.hypercomb(h, [n], opts);
}

function struvel(n, z, opts) {
  ctx.reset();
  n = ctx.convert(n);
  z = ctx.convert(z);
  // http://functions.wolfram.com/Bessel-TypeFunctions/StruveL/26/01/02/
  var h = function h(n) {
    var capitalT = [[_complex2.default.div(z, 2), 0.5 * Math.sqrt(Math.PI)], [_complex2.default.add(n, 1), -1], [], [_complex2.default.add(n, 1.5)], [1], [1.5, _complex2.default.add(n, 1.5)], _complex2.default.pow(_complex2.default.div(z, 2), 2)];
    return [capitalT];
  };
  return mpHypergeometric.hypercomb(h, [n], opts);
}

exports.besselI = besseli;
exports.besselK = besselk;