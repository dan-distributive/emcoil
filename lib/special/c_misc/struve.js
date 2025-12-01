Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.struveL = exports.struveH = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Compute the Struve function.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Notes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * -----
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * We use three expansions for the Struve function discussed in [1]:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - power series
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - expansion in Bessel functions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - asymptotic large-z expansion
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Rounding errors are estimated based on the largest terms in the sums.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * ``struve_convergence.js`` *will* plot the convergence regions of the different
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * expansions (someday).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (i)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Looking at the error in the asymptotic expansion, one finds that
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * it's not worth trying if z ~> 0.7 * v + 12 for v > 0.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (ii)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The Bessel function expansion tends to fail for |z| >~ |v| and is not tried
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * there.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * For Struve H it covers the quadrant v > z where the power series may fail to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * produce reasonable results.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (iii)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The three expansions together cover for Struve H the region z > 0, v real.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * They also cover Struve L, except that some loss of precision may occur around
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * the transition region z ~ 0.7 |v|, v < 0, |v| >> 1 where the function changes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * rapidly.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * (iv)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The power series is evaluated in double-double precision. This fixes accuracy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * issues in Struve H for |v| << |z| before the asymptotic expansion kicks in.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Moreover, it improves the Struve L behavior for negative v.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * References
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * ----------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * [1] NIST Digital Library of Mathematical Functions
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *     https://dlmf.nist.gov/11
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/*
 * Copyright (C) 2013  Pauli Virtanen
 * Ported to ECMAScript 2018 by KC Erb
 * Copyright (C) 2018, Kings Distributed Systems
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * a. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * b. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * c. Neither the name of Enthought nor the names of the SciPy Developers
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */


var _gammasgn = require('./gammasgn.js');

var _gamma = require('../cephes/gamma.js');

var _lgam = require('../cephes/gamma/lgam.js');

var _cephes = require('../cephes.js');

var _cephes2 = _interopRequireDefault(_cephes);

var _dd = require('../cephes/dd.js');

var _dd2 = _interopRequireDefault(_dd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAXITER = 10000;
var SUM_EPS = 1e-16; /* be sure we are in the tail of the sum */
var SUM_TINY = 1e-100;
var GOOD_EPS = 1e-12;
var ACCEPTABLE_EPS = 1e-7;
var ACCEPTABLE_ATOL = 1e-300;

function struveH(v, z) {
  return struveHL(v, z, 1);
}

function struveL(v, z) {
  return struveHL(v, z, 0);
}

function struveHL(v, z, isH) {
  var value = void 0,
      err = void 0,
      tmp = void 0,
      n = void 0;
  value = new Float64Array(4);
  err = new Float64Array(4);

  if (z < 0) {
    n = Math.trunc(v);
    if (v === n) {
      tmp = n % 2 === 0 ? -1 : 1;
      return tmp * struveHL(v, -z, isH);
    } else {
      return NaN;
    }
  } else if (z === 0) {
    if (v < -1) {
      return (0, _gammasgn.gammasgn)(v + 1.5) * Infinity;
    } else if (v === -1) {
      return 2 / Math.sqrt(Math.PI) / (0, _gamma.gamma)(0.5);
    } else {
      return 0;
    }
  }

  n = -v - 0.5;
  if (n === -v - 0.5 && n > 0) {
    if (isH) {
      return (n % 2 === 0 ? 1 : -1) * _cephes2.default.jv(n + 0.5, z);
    } else {
      return _cephes2.default.iv(n + 0.5, z);
    }
  }

  /* Try the asymptotic expansion */
  if (z >= 0.7 * v + 12) {
    var _struveAsympLargeZ = struveAsympLargeZ(v, z, isH);

    var _struveAsympLargeZ2 = _slicedToArray(_struveAsympLargeZ, 2);

    value[0] = _struveAsympLargeZ2[0];
    err[0] = _struveAsympLargeZ2[1];

    if (err[0] < GOOD_EPS * Math.abs(value[0])) {
      return value[0];
    }
  } else {
    err[0] = Infinity;
  }

  /* Try power series */

  var _struvePowerSeries = struvePowerSeries(v, z, isH);

  var _struvePowerSeries2 = _slicedToArray(_struvePowerSeries, 2);

  value[1] = _struvePowerSeries2[0];
  err[1] = _struvePowerSeries2[1];

  if (err[1] < GOOD_EPS * Math.abs(value[1])) {
    return value[1];
  }

  /* Try bessel series */
  if (Math.abs(z) < Math.abs(v) + 20) {
    var _struveBesselSeries = struveBesselSeries(v, z, isH);

    var _struveBesselSeries2 = _slicedToArray(_struveBesselSeries, 2);

    value[2] = _struveBesselSeries2[0];
    err[2] = _struveBesselSeries2[1];

    if (err[2] < GOOD_EPS * Math.abs(value[2])) {
      return value[2];
    }
  } else {
    err[2] = Infinity;
  }

  /* Return the best of the three, if it is acceptable */
  n = 0;
  if (err[1] < err[n]) n = 1;
  if (err[2] < err[n]) n = 2;
  if (err[n] < ACCEPTABLE_EPS * Math.abs(value[n]) || err[n] < ACCEPTABLE_ATOL) {
    return value[n];
  }

  /* Maybe it really is an overflow? */
  tmp = -(0, _lgam.lgam)(v + 1.5) + (v + 1) * Math.log(z / 2);
  if (!isH) {
    tmp = Math.abs(tmp);
  }
  if (tmp > 700) {
    // sf_error("struve", SF_ERROR_OVERFLOW, "overflow in series");
    return Infinity * (0, _gammasgn.gammasgn)(v + 1.5);
  }

  /* Failure */
  // sf_error("struve", SF_ERROR_NO_RESULT, "total loss of precision");
  return NaN;
}

/*
* Power series for Struve H and L
* http://dlmf.nist.gov/11.2.1
*
* Starts to converge roughly at |n| > |z|
*/
function struvePowerSeries(v, z, isH) {
  var n = void 0,
      sgn = void 0,
      term = void 0,
      sum = void 0,
      maxterm = void 0,
      scaleexp = void 0,
      tmp = void 0,
      cterm = void 0,
      csum = void 0,
      cdiv = void 0,
      z2 = void 0,
      c2v = void 0,
      ctmp = void 0,
      err = void 0;

  if (isH) {
    sgn = -1;
  } else {
    sgn = 1;
  }

  tmp = -(0, _lgam.lgam)(v + 1.5) + (v + 1) * Math.log(z / 2);
  if (tmp < -600 || tmp > 600) {
    /* Scale exponent to postpone underflow/overflow */
    scaleexp = tmp / 2;
    tmp -= scaleexp;
  } else {
    scaleexp = 0;
  }

  term = 2 / Math.sqrt(Math.PI) * Math.exp(tmp) * (0, _gammasgn.gammasgn)(v + 1.5);
  sum = term;
  maxterm = 0;

  cterm = _dd2.default.create(term);
  csum = _dd2.default.create(sum);
  z2 = _dd2.default.create(sgn * z * z);
  c2v = _dd2.default.create(2 * v);

  for (n = 0; n < MAXITER; ++n) {
    /* cdiv = (3 + 2*n) * (3 + 2*n + 2*v)) */
    cdiv = _dd2.default.create(3 + 2 * n);
    ctmp = _dd2.default.create(3 + 2 * n);
    ctmp = _dd2.default.add(ctmp, c2v);
    cdiv = _dd2.default.mul(cdiv, ctmp);

    /* cterm *= z2 / cdiv */
    cterm = _dd2.default.mul(cterm, z2);
    cterm = _dd2.default.div(cterm, cdiv);

    csum = _dd2.default.add(csum, cterm);

    term = _dd2.default.toDouble(cterm);
    sum = _dd2.default.toDouble(csum);

    if (Math.abs(term) > maxterm) {
      maxterm = Math.abs(term);
    }
    if (Math.abs(term) < SUM_TINY * Math.abs(sum) || term === 0 || !isFinite(sum)) {
      break;
    }
  }

  err = Math.abs(term) + Math.abs(maxterm) * 1e-22;

  if (scaleexp !== 0) {
    sum *= Math.exp(scaleexp);
    err *= Math.exp(scaleexp);
  }

  if (sum === 0 && term === 0 && v < 0 && !isH) {
    /* Spurious underflow */
    err = Infinity;
    return [NaN, err];
  }

  return [sum, err];
}

/*
* Bessel series
* http://dlmf.nist.gov/11.4.19
*/
function struveBesselSeries(v, z, isH) {
  var n = void 0,
      term = void 0,
      cterm = void 0,
      sum = void 0,
      maxterm = void 0,
      err = void 0;

  if (isH && v < 0) {
    /* Works less reliably in this region */
    err = Infinity;
    return [NaN, err];
  }

  sum = 0;
  maxterm = 0;

  cterm = Math.sqrt(z / (2 * Math.PI));

  for (n = 0; n < MAXITER; ++n) {
    if (isH) {
      term = cterm * _cephes2.default.jv(n + v + 0.5, z) / (n + 0.5);
      cterm *= z / 2 / (n + 1);
    } else {
      term = cterm * _cephes2.default.iv(n + v + 0.5, z) / (n + 0.5);
      cterm *= -z / 2 / (n + 1);
    }
    sum += term;
    if (Math.abs(term) > maxterm) {
      maxterm = Math.abs(term);
    }
    if (Math.abs(term) < SUM_EPS * Math.abs(sum) || term === 0 || !isFinite(sum)) {
      break;
    }
  }

  err = Math.abs(term) + Math.abs(maxterm) * 1e-16;

  /* Account for potential underflow of the Bessel functions */
  err += 1e-300 * Math.abs(cterm);

  return [sum, err];
}

/*
* Large-z expansion for Struve H and L
* http://dlmf.nist.gov/11.6.1
*/
function struveAsympLargeZ(v, z, isH) {
  var n = void 0,
      sgn = void 0,
      maxiter = void 0,
      term = void 0,
      sum = void 0,
      maxterm = void 0,
      m = void 0,
      err = void 0;

  if (isH) {
    sgn = -1;
  } else {
    sgn = 1;
  }

  /* Asymptotic expansion divergenge point */
  m = z / 2;
  if (m <= 0) {
    maxiter = 0;
  } else if (m > MAXITER) {
    maxiter = MAXITER;
  } else {
    maxiter = Math.trunc(m);
  }
  if (maxiter === 0) {
    err = Infinity;
    return [NaN, err];
  }

  if (z < v) {
    /* Exclude regions where our error estimation fails */
    err = Infinity;
    return [NaN, err];
  }

  /* Evaluate sum */
  term = -sgn / Math.sqrt(Math.PI) * Math.exp(-(0, _lgam.lgam)(v + 0.5) + (v - 1) * Math.log(z / 2)) * (0, _gammasgn.gammasgn)(v + 0.5);
  sum = term;
  maxterm = 0;

  for (n = 0; n < maxiter; ++n) {
    term *= sgn * (1 + 2 * n) * (1 + 2 * n - 2 * v) / (z * z);
    sum += term;
    if (Math.abs(term) > maxterm) {
      maxterm = Math.abs(term);
    }
    if (Math.abs(term) < SUM_EPS * Math.abs(sum) || term === 0 || !isFinite(sum)) {
      break;
    }
  }

  if (isH) {
    sum += _cephes2.default.yv(v, z);
  } else {
    sum += _cephes2.default.iv(v, z);
  }

  /*
  * This error estimate is strictly speaking valid only for
  * n > v - 0.5, but numerical results indicate that it works
  * reasonably.
  */
  err = Math.abs(term) + Math.abs(maxterm) * 1e-16;

  return [sum, err];
}

exports.struveH = struveH;
exports.struveL = struveL;