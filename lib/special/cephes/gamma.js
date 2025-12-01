Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gamma = undefined;

var _polevl = require('./polevl.js');

var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @file        gamma.js        Gamma function
 *
 *
 *
 * SYNOPSIS:
 *
 * double x, y, Gamma();
 *
 * y = Gamma( x );
 *
 *
 *
 * DESCRIPTION:
 *
 * Returns Gamma function of the argument.  The result is
 * correctly signed.
 *
 * Arguments |x| <= 34 are reduced by recurrence and the function
 * approximated by a rational function of degree 6/7 in the
 * interval (2,3).  Large arguments are handled by Stirling's
 * formula. Large negative arguments are made positive using
 * a reflection formula.
 *
 *
 * ACCURACY:
 *
 *                      Relative error:
 * arithmetic   domain     # trials      peak         rms
 *    IEEE    -170,-33      20000       2.3e-15     3.3e-16
 *    IEEE     -33,  33     20000       9.4e-16     2.2e-16
 *    IEEE      33, 171.6   20000       2.3e-15     3.2e-16
 *
 * Error for arguments outside the test range will be larger
 * owing to error amplification by the exponential function.
 *
 * Cephes Math Library Release 2.2:  July, 1992
 * Copyright 1984, 1987, 1989, 1992 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */
var P = new Float64Array([1.60119522476751861407E-4, 1.19135147006586384913E-3, 1.04213797561761569935E-2, 4.76367800457137231464E-2, 2.07448227648435975150E-1, 4.94214826801497100753E-1, 9.99999999999999996796E-1]);

var Q = new Float64Array([-2.31581873324120129819E-5, 5.39605580493303397842E-4, -4.45641913851797240494E-3, 1.18139785222060435552E-2, 3.58236398605498653373E-2, -2.34591795718243348568E-1, 7.14304917030273074085E-2, 1.00000000000000000320E0]);

function gamma(x) {
  var p = void 0,
      q = void 0,
      z = void 0,
      i = void 0;
  var sgngam = 1;

  if (!isFinite(x)) {
    return x;
  }
  q = Math.abs(x);
  if (q > 33.0) {
    if (x < 0.0) {
      p = Math.floor(q);
      if (p === q) {
        // mtherr("Gamma", OVERFLOW);
        return Infinity;
      }
      i = p;
      if ((i & 1) === 0) {
        sgngam = -1;
      }

      z = q - p;
      if (z > 0.5) {
        p += 1.0;
        z = q - p;
      }
      z = q * Math.sin(Math.PI * z);
      if (z === 0.0) {
        return sgngam * Infinity;
      }
      z = Math.abs(z);
      z = Math.PI / (z * stirf(q));
    } else {
      z = stirf(x);
    }
    return sgngam * z;
  }

  z = 1.0;
  while (x >= 3.0) {
    x -= 1.0;
    z *= x;
  }

  while (x < 0.0) {
    if (x > -1.E-9) return small(x, z);
    z /= x;
    x += 1.0;
  }

  while (x < 2.0) {
    if (x < 1.e-9) {
      return small(x, z);
    }
    z /= x;
    x += 1.0;
  }

  if (x === 2.0) return z;

  x -= 2.0;
  p = (0, _polevl.polevl)(x, P, 6);
  q = (0, _polevl.polevl)(x, Q, 7);
  return z * p / q;
};

function small(x, z) {
  if (x === 0.0) {
    // mtherr("Gamma", OVERFLOW);
    return Infinity;
  } else {
    return z / ((1.0 + 0.5772156649015329 * x) * x);
  }
}

// Stirling's formula for the Gamma function
var STIR = [8.33333333333482257126E-2, 3.47222221605458667310E-3, -2.68132617805781232825E-3, -2.29549961613378126380E-4, 7.87311395793093628397E-4];

function stirf(x) {
  var y = void 0,
      w = void 0,
      v = void 0;

  var MAXSTIR = 143.01608;

  if (x >= constants.MAXGAM) {
    return Infinity;
  }
  w = 1.0 / x;
  w = 1.0 + w * (0, _polevl.polevl)(w, STIR, 4);
  y = Math.exp(x);

  //  Avoid overflow in pow()
  if (x > MAXSTIR) {
    v = Math.pow(x, 0.5 * x - 0.25);
    y = v * (v / y);
  } else {
    y = Math.pow(x, x - 0.5) / y;
  }
  y = constants.SQTPI * y * w;
  return y;
}

exports.gamma = gamma;