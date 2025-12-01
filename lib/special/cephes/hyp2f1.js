Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyp2f1 = undefined;

var _constants = require('./hyp2f1/constants.js');

var constants = _interopRequireWildcard(_constants);

var _gamma = require('./gamma.js');

var _hyt2f = require('./hyp2f1/hyt2f1.js');

var _hys2f = require('./hyp2f1/hys2f1.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
/**
 * @file        hyp2f1.js        Gauss hypergeometric function   F
 *                                                              2 1
 *
 *
 * SYNOPSIS:
 *
 * double a, b, c, x, y, hyp2f1();
 *
 * y = hyp2f1( a, b, c, x );
 *
 *
 * DESCRIPTION:
 *
 *
 *  hyp2f1( a, b, c, x )  =   F ( a, b; c; x )
 *                           2 1
 *
 *           inf.
 *            -   a(a+1)...(a+k) b(b+1)...(b+k)   k+1
 *   =  1 +   >   -----------------------------  x   .
 *            -         c(c+1)...(c+k) (k+1)!
 *          k = 0
 *
 *  Cases addressed are
 *      Tests and escapes for negative integer a, b, or c
 *      Linear transformation if c - a or c - b negative integer
 *      Special case c = a or c = b
 *      Linear transformation for  x near +1
 *      Transformation for x < -0.5
 *      Psi function expansion if x > 0.5 and c - a - b integer
 *      Conditionally, a recurrence on c to make c-a-b > 0
 *
 *      x < -1  AMS 15.3.7 transformation applied (Travis Oliphant)
 *         valid for b,a,c,(b-a) !== integer and (c-a),(c-b) !== negative integer
 *
 * x >= 1 is rejected (unless special cases are present)
 *
 * The parameters a, b, c are considered to be integer
 * valued if they are within 1.0e-14 of the nearest integer
 * (1.0e-13 for IEEE arithmetic).
 *
 * ACCURACY:
 *
 *
 *               Relative error (-1 < x < 1):
 * arithmetic   domain     # trials      peak         rms
 *    IEEE      -1,7        230000      1.2e-11     5.2e-14
 *
 * Several special cases also tested with a, b, c in
 * the range -7 to 7.
 *
 * ERROR MESSAGES:
 *
 * A "partial loss of precision" message is printed if
 * the internally estimated relative error exceeds 1^-12.
 * A "singularity" message is printed on overflow or
 * in cases not addressed (such as x < -1).
 * Cephes Math Library Release 2.8:  June, 2000
 * Copyright 1984, 1987, 1992, 2000 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */
function hyp2f1(a, b, c, x) {
  var cInt = void 0;
  if (x === 0.0) {
    return 1.0;
  }

  if ((a === 0 || b === 0) && c !== 0) {
    return 1.0;
  }

  var negIntA = 0;
  var negIntB = 0;
  var negIntCaOrCb = 0;

  var errObj = { val: 0.0 };
  var xAbs = Math.abs(x);
  var s = 1.0 - x;
  var aInt = Math.round(a); /* nearest integer to a */
  var bInt = Math.round(b);

  var d = c - a - b;
  var dInt = Math.round(d);
  var p = void 0,
      q = void 0,
      y = void 0;

  // a is a negative integer
  if (a <= 0 && Math.abs(a - aInt) < constants.EPS) {
    negIntA = 1;
  }

  // b is a negative integer
  if (b <= 0 && Math.abs(b - bInt) < constants.EPS) {
    negIntB = 1;
  }

  if (d <= -1 && !(Math.abs(d - dInt) > constants.EPS && s < 0) && !(negIntA || negIntB)) {
    return Math.pow(s, d) * hyp2f1(c - a, c - b, c, x);
  }
  if (d <= 0 && x === 1 && !(negIntA || negIntB)) {
    return hypdiv();
  }

  /* 2F1(a,b;b;x) = (1-x)**(-a) */
  if (xAbs < 1.0 || x === -1.0) {
    // b = c
    if (Math.abs(b - c) < constants.EPS) {
      y = s ** -a;
      return hypdon(y, errObj);
    }

    // a = c
    if (Math.abs(a - c) < constants.EPS) {
      y = s ** -b;
      return hypdon(y, errObj);
    }
  }

  if (c <= 0.0) {
    cInt = Math.round(c);
    // c is a negative integer
    if (Math.abs(c - cInt) < constants.EPS) {
      // check if termination before explosion
      if (negIntA && aInt > cInt) {
        return hypok(a, b, c, x, errObj);
      }
      if (negIntB && bInt > cInt) {
        return hypok(a, b, c, x, errObj);
      }
      return hypdiv();
    }
  }

  // function is a polynomial
  if (negIntA || negIntB) {
    return hypok(a, b, c, x, errObj);
  }

  var t1 = Math.abs(b - a);

  if (x < -2.0 && Math.abs(t1 - Math.round(t1)) > constants.EPS) {
    // This transform has a pole for b-a integer, and
    // may produce large cancellation errors for |1/x| close to 1
    var _p = hyp2f1(a, 1 - c + a, 1 - b + a, 1.0 / x);
    var _q = hyp2f1(b, 1 - c + b, 1 - a + b, 1.0 / x);
    _p *= Math.pow(-x, -a);
    _q *= Math.pow(-x, -b);
    t1 = (0, _gamma.gamma)(c);
    s = t1 * (0, _gamma.gamma)(b - a) / ((0, _gamma.gamma)(b) * (0, _gamma.gamma)(c - a));
    y = t1 * (0, _gamma.gamma)(a - b) / ((0, _gamma.gamma)(a) * (0, _gamma.gamma)(c - b));
    return s * _p + y * _q;
  } else if (x < -1.0) {
    if (Math.abs(a) < Math.abs(b)) {
      return Math.pow(s, -a) * hyp2f1(a, c - b, c, x / (x - 1));
    } else {
      return Math.pow(s, -b) * hyp2f1(b, c - a, c, x / (x - 1));
    }
  }

  // series diverges
  if (xAbs > 1.0) {
    return hypdiv();
  }

  p = c - a;
  // nearest integer to c-a
  aInt = Math.round(p);

  // negative int c - a
  if (aInt <= 0.0 && Math.abs(p - aInt) < constants.EPS) {
    negIntCaOrCb = 1;
  }

  var r = c - b;
  // nearest integer to c-b
  bInt = Math.round(r);

  if (bInt <= 0.0 && Math.abs(r - bInt) < constants.EPS) {
    negIntCaOrCb = 1;
  }

  // nearest integer to d
  dInt = Math.round(d);
  q = Math.abs(d - dInt);

  // |x|===1.0
  if (Math.abs(xAbs - 1.0) < constants.EPS) {
    if (x > 0.0) {
      if (negIntCaOrCb) {
        return d >= 0.0 ? hypf(a, b, c, d, s, x, errObj) : hypdiv();
      }
      if (d <= 0.0) {
        hypdiv();
      }
      y = (0, _gamma.gamma)(c) * (0, _gamma.gamma)(d) / ((0, _gamma.gamma)(p) * (0, _gamma.gamma)(r));
      return hypdon(y, errObj);
    }

    if (d <= -1.0) {
      return hypdiv();
    }
  }

  // Conditionally make d > 0 by recurrence on c
  if (d < 0.0) {
    // Try the power series first
    y = (0, _hyt2f.hyt2f1)(a, b, c, x, errObj);

    if (errObj.val < constants.ETHRESH) {
      return hypdon(y, errObj);
    }

    /* Apply the recurrence if power series fails */
    errObj.val = 0.0;
    var aid = 2 - dInt;
    var e = c + aid;
    var d2 = hyp2f1(a, b, e, x);
    var d1 = hyp2f1(a, b, e + 1.0, x);
    q = a + b + 1.0;
    for (var i = 0; i < aid; i++) {
      r = e - 1.0;
      y = (e * (r - (2.0 * e - q) * x) * d2 + (e - a) * (e - b) * x * d1) / (e * r * s);
      e = r;
      d1 = d2;
      d2 = y;
    }

    return hypdon(y, errObj);
  }

  // negative integer c-a or c-b
  if (negIntCaOrCb) {
    return hypf(a, b, c, d, s, x, errObj);
  }

  return hypok(a, b, c, x, errObj);
};

function hypok(a, b, c, x, errObj) {
  var y = (0, _hyt2f.hyt2f1)(a, b, c, x, errObj);
  return hypdon(y, errObj);
};

function hypdon(y, errObj) {
  if (errObj.val > constants.ETHRESH) {
    // printf( "Estimated err = %.2e\n", err );
    // mtherr("hyp2f1", PLOSS);
  }
  return y;
};

// The transformation for c-a or c-b negative integer
function hypf(a, b, c, d, s, x, errObj) {
  var y = Math.pow(s, d) * (0, _hys2f.hys2f1)(c - a, c - b, c, x, errObj);
  return hypdon(y, errObj);
};

// The alarm exit
function hypdiv() {
  // mtherr("hyp2f1", OVERFLOW);
  return Infinity;
};

exports.hyp2f1 = hyp2f1;