Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ikvTemme = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

var _gamma = require('../gamma.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Compute I(v, x) and K(v, x) simultaneously by Temme's method, see
* Temme, Journal of Computational Physics, vol 19, 324 (1975)
*/
var NEED_I = 0x1;
var NEED_K = 0x2;

function ikvTemme(v, x) {
  var ivP = 0;
  var kvP = null;
  var u = void 0,
      iV = void 0,
      kv = void 0,
      kv1 = void 0,
      ku = void 0,
      ku1 = void 0,
      fv = void 0,
      capitalW = void 0,
      current = void 0,
      prev = void 0,
      next = void 0,
      n = void 0,
      k = void 0,
      kind = void 0,
      z = void 0,
      lim = void 0;
  var reflect = 0;
  kind = 0;
  if (ivP !== null) {
    kind = kind | NEED_I;
  }
  if (kvP !== null) {
    kind = kind | NEED_K;
  }

  if (v < 0) {
    reflect = 1;
    v = -v; /* v is non-negative from here */
    kind = kind | NEED_K;
  }
  n = Math.round(v);
  u = v - n; /* -1/2 <= u < 1/2 */

  if (x < 0) {
    if (ivP !== null) {
      ivP = NaN;
    }
    if (kvP !== null) {
      kvP = NaN;
    }
    // mtherr("ikv_temme", DOMAIN);
    return [ivP, kvP];
  }
  if (x === 0) {
    iV = v === 0 ? 1 : 0;
    if (kind & NEED_K) {
      // mtherr("ikv_temme", OVERFLOW);
      kv = Infinity;
    } else {
      kv = NaN; /* any value will do */
    }

    if (reflect && kind & NEED_I) {
      z = u + n % 2;

      iV = Math.sin(Math.PI * z) === 0 ? iV : Infinity;
      if (iV === Infinity || iV === -Infinity) {
        // mtherr("ikv_temme", OVERFLOW);
      }
    }

    if (ivP !== null) {
      ivP = iV;
    }
    if (kvP !== null) {
      kvP = kv;
    }
    return [ivP, kvP];
  }

  /* x is positive until reflection */
  capitalW = 1 / x; /* Wronskian */
  if (x <= 2) {
    /* Temme series */
    var _temmeIkSeries = temmeIkSeries(u, x); /* x in (0, 2] */


    var _temmeIkSeries2 = _slicedToArray(_temmeIkSeries, 2);

    ku = _temmeIkSeries2[0];
    ku1 = _temmeIkSeries2[1];
  } else {
    /* continued fraction cF2Ik */
    var _cF2Ik = cF2Ik(u, x, ku, ku1); /* x in (2, \infty) */


    var _cF2Ik2 = _slicedToArray(_cF2Ik, 2);

    ku = _cF2Ik2[0];
    ku1 = _cF2Ik2[1];
  }
  prev = ku;
  current = ku1;
  for (k = 1; k <= n; k++) {
    /* forward recurrence for K */
    next = 2 * (u + k) * current / x + prev;
    prev = current;
    current = next;
  }
  kv = prev;
  kv1 = current;
  if (kind & NEED_I) {
    lim = (4 * v * v + 10) / (8 * x);
    lim *= lim;
    lim *= lim;
    lim /= 24;
    if (lim < constants.MACHEP * 10 && x > 100) {
      /*
      * x is huge compared to v, CF1 may be very slow
      * to converge so use asymptotic expansion for large
      * x case instead.  Note that the asymptotic expansion
      * isn't very accurate - so it's deliberately very hard
      * to get here - probably we're going to overflow:
      */
      iV = ivAsymptotic(v, x);
    } else {
      fv = cF1Ik(v, x); /* continued fraction cF1Ik */
      iV = capitalW / (kv * fv + kv1); /* Wronskian relation */
    }
  } else {
    iV = NaN; /* any value will do */
  }

  if (reflect) {
    z = u + n % 2;

    if (ivP !== null) {
      ivP = iV + 2 / Math.PI * Math.sin(Math.PI * z) * kv; /* reflection formula */
    }
    if (kvP !== null) {
      kvP = kv;
    }
  } else {
    if (ivP !== null) {
      ivP = iV;
    }
    if (kvP !== null) {
      kvP = kv;
    }
  }
  return [ivP, kvP];
}

/*
* Compute iV from (AMS5 9.7.1), asymptotic expansion for large |z|
* iV ~ exp(x)/Math.sqrt(2 pi x) ( 1 + (4*v*v-1)/8x + (4*v*v-1)(4*v*v-9)/8x/2! + ...)
*/
function ivAsymptotic(v, x) {
  var mu = void 0,
      sum = void 0,
      term = void 0,
      prefactor = void 0,
      factor = void 0,
      k = void 0;
  prefactor = Math.exp(x) / Math.sqrt(2 * Math.PI * x);

  if (prefactor === Infinity) {
    return prefactor;
  }

  mu = 4 * v * v;
  sum = 1.0;
  term = 1.0;
  k = 1;

  do {
    factor = (mu - (2 * k - 1) * (2 * k - 1)) / (8 * x) / k;
    if (k > 100) {
      /* didn't converge */
      // mtherr("iv(ivAsymptotic)", TLOSS);
      break;
    }
    term *= -factor;
    sum += term;
    ++k;
  } while (Math.abs(term) > constants.MACHEP * Math.abs(sum));
  return sum * prefactor;
}

/*
* Modified Bessel functions of the first and second kind of fractional order
*
* Calculate K(v, x) and K(v+1, x) by method analogous to
* Temme, Journal of Computational Physics, vol 21, 343 (1976)
*/
function temmeIkSeries(v, x) {
  var f = void 0,
      h = void 0,
      p = void 0,
      q = void 0,
      coef = void 0,
      sum = void 0,
      sum1 = void 0,
      tolerance = void 0,
      a = void 0,
      b = void 0,
      c = void 0,
      d = void 0,
      sigma = void 0,
      gamma1 = void 0,
      gamma2 = void 0,
      k = void 0,
      gp = void 0,
      gm = void 0,
      kres = void 0,
      kres1 = void 0;

  /*
  * |x| <= 2, Temme series converge rapidly
  * |x| > 2, the larger the |x|, the slower the convergence
  */
  boostAssert(Math.abs(x) <= 2, '|x| > 2, the larger the |x|, the slower the convergence');
  boostAssert(Math.abs(v) <= 0.5, '|v| > 0.5');

  gp = (0, _gamma.gamma)(v + 1) - 1;
  gm = (0, _gamma.gamma)(-v + 1) - 1;

  a = Math.log(x / 2);
  b = Math.exp(v * a);
  sigma = -a * v;
  c = Math.abs(v) < constants.MACHEP ? 1 : Math.sin(Math.PI * v) / (v * Math.PI);
  d = Math.abs(sigma) < constants.MACHEP ? 1 : Math.sinh(sigma) / sigma;
  gamma1 = Math.abs(v) < constants.MACHEP ? -constants.EULER : 0.5 / v * (gp - gm) * c;
  gamma2 = (2 + gp + gm) * c / 2;

  /* initial values */
  p = (gp + 1) / (2 * b);
  q = (1 + gm) * b / 2;
  f = (Math.cosh(sigma) * gamma1 + d * -a * gamma2) / c;
  h = p;
  coef = 1;
  sum = coef * f;
  sum1 = coef * h;

  /* series summation */
  tolerance = constants.MACHEP;
  for (k = 1; k < constants.MAXITER; k++) {
    f = (k * f + p + q) / (k * k - v * v);
    p /= k - v;
    q /= k + v;
    h = p - k * f;
    coef *= x * x / (4 * k);
    sum += coef * f;
    sum1 += coef * h;
    if (Math.abs(coef * f) < Math.abs(sum) * tolerance) {
      break;
    }
  }
  if (k === constants.MAXITER) {
    // mtherr("ikvTemme(temmeIkSeries)", TLOSS);
  }

  kres = sum;
  kres1 = 2 * sum1 / x;

  return [kres, kres1];
}

/* Evaluate continued fraction fv = I_(v+1) / I_v, derived from
* Abramowitz and Stegun, Handbook of Mathematical Functions, 1972, 9.1.73 */
function cF1Ik(v, x) {
  var capitalC = void 0,
      capitalD = void 0,
      f = void 0,
      a = void 0,
      b = void 0,
      delta = void 0,
      tiny = void 0,
      tolerance = void 0,
      fv = void 0,
      k = void 0;
  /*
  * |x| <= |v|, cF1Ik converges rapidly
  * |x| > |v|, cF1Ik needs O(|x|) iterations to converge
  */

  /*
  * modified Lentz's method, see
  * Lentz, Applied Optics, vol 15, 668 (1976)
  */
  tolerance = 2 * constants.MACHEP;
  tiny = 1 / Math.sqrt(constants.DBL_MAX);
  capitalC = f = tiny; /* b0 = 0, replace with tiny */
  capitalD = 0;
  for (k = 1; k < constants.MAXITER; k++) {
    a = 1;
    b = 2 * (v + k) / x;
    capitalC = b + a / capitalC;
    capitalD = b + a * capitalD;
    if (capitalC === 0) {
      capitalC = tiny;
    }
    if (capitalD === 0) {
      capitalD = tiny;
    }
    capitalD = 1 / capitalD;
    delta = capitalC * capitalD;
    f *= delta;
    if (Math.abs(delta - 1) <= tolerance) {
      break;
    }
  }
  if (k === constants.MAXITER) {
    // mtherr("ikvTemme(cF1Ik)", TLOSS);
  }

  fv = f;

  return fv;
}

/*
* Calculate K(v, x) and K(v+1, x) by evaluating continued fraction
* z1 / z0 = U(v+1.5, 2v+1, 2x) / U(v+0.5, 2v+1, 2x), see
* Thompson and Barnett, Computer Physics Communications, vol 47, 245 (1987)
*/
function cF2Ik(v, x) {
  var capitalS = void 0,
      capitalC = void 0,
      capitalQ = void 0,
      capitalD = void 0,
      f = void 0,
      a = void 0,
      b = void 0,
      q = void 0,
      delta = void 0,
      tolerance = void 0,
      current = void 0,
      prev = void 0,
      kvRes = void 0,
      kv1Res = void 0,
      k = void 0;

  /*
  * |x| >= |v|, cF2Ik converges rapidly
  * |x| -> 0, cF2Ik fails to converge
  */
  boostAssert(Math.abs(x) > 1, 'cF2Ik fails to converge since: |x| <= 1');

  /*
  * Steed's algorithm, see Thompson and Barnett,
  * Journal of Computational Physics, vol 64, 490 (1986)
  */
  tolerance = constants.MACHEP;
  a = v * v - 0.25;
  b = 2 * (x + 1); /* b1 */
  capitalD = 1 / b; /* D1 = 1 / b1 */
  f = delta = capitalD; /* f1 = delta1 = D1, coincidence */
  prev = 0; /* q0 */
  current = 1; /* q1 */
  capitalQ = capitalC = -a; /* Q1 = C1 because q1 = 1 */
  capitalS = 1 + capitalQ * delta; /* S1 */
  for (k = 2; k < constants.MAXITER; k++) {
    /* starting from 2 */
    /* continued fraction f = z1 / z0 */
    a -= 2 * (k - 1);
    b += 2;
    capitalD = 1 / (b + a * capitalD);
    delta *= b * capitalD - 1;
    f += delta;

    /* series summation capitalS = 1 + \sum_{n=1}^{\infty} C_n * z_n / z_0 */
    q = (prev - (b - 2) * current) / a;
    prev = current;
    current = q; /* forward recurrence for q */
    capitalC *= -a / k;
    capitalQ += capitalC * q;
    capitalS += capitalQ * delta;

    /* capitalS converges slower than f */
    if (Math.abs(capitalQ * delta) < Math.abs(capitalS) * tolerance) {
      break;
    }
  }
  if (k === constants.MAXITER) {
    // mtherr("ikvTemme(cF2Ik)", TLOSS);
  }

  kvRes = Math.sqrt(Math.PI / (2 * x)) * Math.exp(-x) / capitalS;
  kv1Res = kvRes * (0.5 + v + x + (v * v - 0.25) * f) / x;

  return [kvRes, kv1Res];
}

function boostAssert(expr, msg) {
  if (expr) {
    // do nothing
  } else {
    throw new Error(msg);
  }
}
exports.ikvTemme = ikvTemme;