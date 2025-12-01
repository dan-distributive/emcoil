Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jv = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @file        jv.js         Bessel function of noninteger order
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * SYNOPSIS:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * double v, x, y, jv();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * y = jv( v, x );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * DESCRIPTION:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Returns Bessel function of order v of the argument,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * where v is real.  Negative x is allowed if v is an integer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Several expansions are included: the ascending power
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * series, the Hankel expansion, and two transitional
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * expansions for large v.  If v is not too large, it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * is reduced by recurrence to a region of best accuracy.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The transitional expansions give 12D accuracy for v > 500.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * ACCURACY:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Results for integer v are indicated by *, where x and v
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * both vary from -125 to +125.  Otherwise,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * x ranges from 0 to 125, v ranges as indicated by "domain."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Error criterion is absolute, except relative when |jv()| > 1.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * arithmetic  v domain  x domain    # trials      peak       rms
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *    IEEE      0,125     0,125      100000      4.6e-15    2.2e-16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *    IEEE   -125,0       0,125       40000      5.4e-11    3.7e-13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *    IEEE      0,500     0,500       20000      4.4e-15    4.0e-16
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Integer v:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *    IEEE   -125,125   -125,125      50000      3.5e-15*   1.9e-16*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Cephes Math Library Release 2.8:  June, 2000
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Ported to ECMAScript 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2018, Kings Distributed Systems
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author      KC Erb, kc@kcerb.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date        April 2018
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

var _j = require('./j0.js');

var _j2 = require('./j1.js');

var _gamma = require('./gamma.js');

var _jvs = require('./jv/jvs.js');

var _hankel = require('./jv/hankel.js');

var _recur9 = require('./jv/recur.js');

var _jnx = require('./jv/jnx.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function jv(n, x) {
  var k = void 0,
      q = void 0,
      t = void 0,
      y = void 0,
      an = void 0,
      i = void 0,
      sign = void 0,
      nint = void 0,
      condition = void 0;

  nint = 0; /* Flag for integer n */
  sign = 1; /* Flag for sign inversion */
  an = Math.abs(n);
  y = Math.floor(an);
  if (y === an) {
    nint = 1;
    i = an - 16384.0 * Math.floor(an / 16384.0);
    if (n < 0.0) {
      if (i & 1) {
        sign = -sign;
      }
      n = an;
    }
    if (x < 0.0) {
      if (i & 1) {
        sign = -sign;
      }
      x = -x;
    }
    if (n === 0.0) {
      return (0, _j.j0)(x);
    }
    if (n === 1.0) {
      return sign * (0, _j2.j1)(x);
    }
  }

  if (x < 0.0 && y !== an) {
    // mtherr("Jv", DOMAIN);
    y = NaN;
    return sign * y;
  }

  if (x === 0 && n < 0 && !nint) {
    // mtherr("Jv", OVERFLOW);
    return Infinity / (0, _gamma.gamma)(n + 1);
  }

  y = Math.abs(x);

  if (y * y < Math.abs(n + 1) * constants.MACHEP) {
    return Math.pow(0.5 * x, n) / (0, _gamma.gamma)(n + 1);
  }

  k = 3.6 * Math.sqrt(y);
  t = 3.6 * Math.sqrt(an);

  if (y < t && an > 21.0) return sign * (0, _jvs.jvs)(n, x);
  if (an < k && y > 21.0) return sign * (0, _hankel.hankel)(n, x);

  if (an < 500.0) {
    /* Note: if x is too large, the continued fraction will fail; but then the
    * Hankel expansion can be used. */
    if (nint !== 0) {
      k = 0.0;

      var _recur = (0, _recur9.recur)(n, x, k, 1);

      var _recur2 = _slicedToArray(_recur, 3);

      q = _recur2[0];
      n = _recur2[1];
      k = _recur2[2];

      if (k === 0.0) {
        y = (0, _j.j0)(x) / q;
        return sign * y;
      }
      if (k === 1.0) {
        y = (0, _j2.j1)(x) / q;
        return sign * y;
      }
    }

    condition = an > 2.0 * y || n >= 0.0 && n < 20.0 && y > 6.0 && y < 20.0;

    if (condition) {
      /* Recur backwards from a larger value of n */
      k = n;

      y = y + an + 1.0;
      if (y < 30.0) y = 30.0;
      y = n + Math.floor(y - n);

      var _recur3 = (0, _recur9.recur)(y, x, k, 0);

      var _recur4 = _slicedToArray(_recur3, 3);

      q = _recur4[0];
      y = _recur4[1];
      k = _recur4[2];

      y = (0, _jvs.jvs)(y, x) * q;
      return sign * y;
    }

    if (k <= 30.0) {
      k = 2.0;
    } else if (k < 90.0) {
      k = 3 * k / 4;
    }
    if (an > k + 3.0) {
      if (n < 0.0) k = -k;
      q = n - Math.floor(n);
      k = Math.floor(k) + q;
      if (n > 0.0) {
        var _recur5 = (0, _recur9.recur)(n, x, k, 1);

        var _recur6 = _slicedToArray(_recur5, 3);

        q = _recur6[0];
        n = _recur6[1];
        k = _recur6[2];
      } else {
        t = k;
        k = n;

        var _recur7 = (0, _recur9.recur)(t, x, k, 1);

        var _recur8 = _slicedToArray(_recur7, 3);

        q = _recur8[0];
        t = _recur8[1];
        k = _recur8[2];

        k = t;
      }
      if (q === 0.0) {
        y = 0.0;
        return sign * y;
      }
    } else {
      k = n;
      q = 1.0;
    }

    /* boundary between convergence of
    * power series and Hankel expansion
    */
    y = Math.abs(k);
    if (y < 26.0) {
      t = (0.0083 * y + 0.09) * y + 12.9;
    } else {
      t = 0.9 * y;
    }

    if (x > t) {
      y = (0, _hankel.hankel)(k, x);
    } else {
      y = (0, _jvs.jvs)(k, x);
    }
    if (n > 0.0) {
      y /= q;
    } else {
      y *= q;
    }
  } else {
    /* For large n, use the uniform expansion or the transitional expansion.
    * But if x is of the order of n**2, these may blow up, whereas the
    * Hankel expansion will then work.
    */
    if (n < 0.0) {
      // mtherr("Jv", TLOSS);
      y = NaN;
      return sign * y;
    }
    t = x / n;
    t /= n;
    if (t > 0.3) {
      y = (0, _hankel.hankel)(n, x);
    } else {
      y = (0, _jnx.jnx)(n, x);
    }
  }
  return sign * y;
}

exports.jv = jv;