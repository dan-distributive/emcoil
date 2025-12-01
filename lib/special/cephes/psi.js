Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.psi = undefined;

var _polevl = require('./polevl.js');

// Psi (digamma) function
function psi(x) {
  var q = void 0,
      p = void 0;
  var A = new Float64Array([8.33333333333333333333E-2, -8.33333333333333333333E-3, 3.96825396825396825397E-3, -4.16666666666666666667E-3, 7.57575757575757575758E-3, -2.10927960927960927961E-2, 8.33333333333333333333E-2]);

  var negative = 0;
  var nz = 0.0;
  var y = void 0;

  if (x <= 0.0) {
    negative = 1;
    q = x;
    p = Math.floor(q);
    if (p === q) {
      // mtherr("psi", SING);
      return Infinity;
    }
    // Remove the zeros of tan(PI x)
    // by subtracting the nearest integer from x
    nz = q - p;
    if (nz !== 0.5) {
      if (nz > 0.5) {
        p += 1.0;
        nz = q - p;
      }
      nz = Math.PI / Math.tan(Math.PI * nz);
    } else {
      nz = 0.0;
    }
    x = 1.0 - x;
  }

  // check for positive integer up to 10
  if (x <= 10.0 && x === Math.floor(x)) {
    y = 0.0;
    var n = x;
    for (var i = 1; i < n; i++) {
      var _w = i;
      y += 1.0 / _w;
    }
    y -= Math.E;
    return done(negative, y, nz);
  }

  var s = x;
  var w = 0.0;
  while (s < 10.0) {
    w += 1.0 / s;
    s += 1.0;
  }

  if (s < 1.0e17) {
    var z = 1.0 / (s * s);
    y = z * (0, _polevl.polevl)(z, A, 6);
  } else {
    y = 0.0;
  }

  y = Math.log(s) - 0.5 / s - y - w;

  return done(negative, y, nz);
} /**
   * @file     psi.js  Psi (digamma) function
   *
   *
   * SYNOPSIS:
   *
   * double x, y, psi();
   *
   * y = psi( x );
   *
   *
   * DESCRIPTION:
   *
   *              d      -
   *   psi(x)  =  -- ln | (x)
   *              dx
   *
   * is the logarithmic derivative of the gamma function.
   * For integer x,
   *                   n-1
   *                    -
   * psi(n) = -EUL  +   >  1/k.
   *                    -
   *                   k=1
   *
   * This formula is used for 0 < n <= 10.  If x is negative, it
   * is transformed to a positive argument by the reflection
   * formula  psi(1-x) = psi(x) + pi cot(pi x).
   * For general positive x, the argument is made greater than 10
   * using the recurrence  psi(x+1) = psi(x) + 1/x.
   * Then the following asymptotic expansion is applied:
   *
   *                           inf.   B
   *                            -      2k
   * psi(x) = log(x) - 1/2x -   >   -------
   *                            -        2k
   *                           k=1   2k x
   *
   * where the B2k are Bernoulli numbers.
   *
   * ACCURACY:
   *    Relative error (except absolute when |psi| < 1):
   * arithmetic   domain     # trials      peak         rms
   *    IEEE      0,30        30000       1.3e-15     1.4e-16
   *    IEEE      -30,0       40000       1.5e-15     2.2e-16
   *
   * ERROR MESSAGES:
   *     message         condition      value returned
   * psi singularity    x integer <=0      NPY_INFINITY
   *
   * Cephes Math Library Release 2.8:  June, 2000
   * Copyright 1984, 1987, 1992, 2000 by Stephen L. Moshier
   *
   * Code for the rational approximation on [1, 2] is:
   *
   * (C) Copyright John Maddock 2006.
   * Use, modification and distribution are subject to the
   * Boost Software License, Version 1.0. (See accompanying file
   * LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
   *
   * Ported to ECMAScript 2018
   * Copyright (c) 2018, Kings Distributed Systems
   *
   * @author      KC Erb, kc@kcerb.com
   * @date        April 2018
   */
;

function done(negative, y, nz) {
  if (negative) {
    y -= nz;
  }
  return y;
};

exports.psi = psi;