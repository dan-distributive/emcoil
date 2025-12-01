Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yn = undefined;

var _j = require('./j0.js');

var _j2 = require('./j1.js');

/**
 * @file     yn.js    Bessel function of second kind of integer order
 *
 *
 *
 *
 * SYNOPSIS:
 *
 * double x, y, yn();
 * int n;
 *
 * y = yn( n, x );
 *
 *
 *
 * DESCRIPTION:
 *
 * Returns Bessel function of order n, where n is a
 * (possibly negative) integer.
 *
 * The function is evaluated by forward recurrence on
 * n, starting with values computed by the routines
 * y0() and y1().
 *
 * If n = 0 or 1 the routine for y0 or y1 is called
 * directly.
 *
 *
 *
 * ACCURACY:
 *
 *
 *                      Absolute error, except relative
 *                      when y > 1:
 * arithmetic   domain     # trials      peak         rms
 *    IEEE      0, 30       30000       3.4e-15     4.3e-16
 *
 *
 * ERROR MESSAGES:
 *
 *   message         condition      value returned
 * yn singularity   x = 0              NPY_INFINITY
 * yn overflow                         NPY_INFINITY
 *
 * Spot checked against tables for x, n between 0 and 100.
 *
 *
 * Cephes Math Library Release 2.8:  June, 2000
 * Copyright 1984, 1987, 2000 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */

function yn(n, x) {
  var an = void 0,
      anm1 = void 0,
      anm2 = void 0,
      r = void 0,
      k = void 0,
      sign = void 0;

  if (n < 0) {
    n = -n;
    /* -1**n */
    if ((n & 1) === 0) {
      sign = 1;
    } else {
      sign = -1;
    }
  } else {
    sign = 1;
  }

  if (n === 0) {
    return sign * (0, _j.y0)(x);
  }
  if (n === 1) {
    return sign * (0, _j2.y1)(x);
  }

  /* test for overflow */
  if (x === 0.0) {
    // mtherr('yn', SING);
    return -Infinity * sign;
  } else if (x < 0.0) {
    // mtherr('yn', DOMAIN);
    return NaN;
  }

  /* forward recurrence on n */
  anm2 = (0, _j.y0)(x);
  anm1 = (0, _j2.y1)(x);
  k = 1;
  r = 2 * k;
  do {
    an = r * anm1 / x - anm2;
    anm2 = anm1;
    anm1 = an;
    r += 2.0;
    ++k;
  } while (k < n);

  return sign * an;
}

exports.yn = yn;