Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quad = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dqagse3 = require('./quadpack/dqagse.js');

var _dqagie3 = require('./quadpack/dqagie.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Compute a definite integral.
//    Integrate func from `a` to `b` (possibly infinite interval) using a
//    technique from the Fortran library QUADPACK.

function quad(func, a, b) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var flip = void 0,
      defaultOpts = void 0,
      o = void 0,
      retval = void 0,
      ier = void 0,
      msg = void 0,
      msgs = void 0,
      minPoint = void 0,
      maxPoint = void 0,
      condition = void 0,
      limit = void 0;

  defaultOpts = {
    fullOutput: 0,
    epsabs: 1.49e-8,
    epsrel: 1.49e-8,
    limit: 50,
    points: null,
    weight: null,
    wvar: null,
    wopts: null,
    maxp1: 50,
    limlst: 50
  };
  o = Object.assign(defaultOpts, opts);

  var _ref = [b < a, Math.min(a, b), Math.max(a, b)];
  flip = _ref[0];
  a = _ref[1];
  b = _ref[2];


  if (o.weight === null) {
    retval = _quad(func, a, b, o.fullOutput, o.epsabs, o.epsrel, o.limit, o.points);
  } else {
    // retval = _quad_weight(func, a, b, args, fullOutput, epsabs, epsrel, limlst, limit, maxp1, weight, wvar, wopts)
    throw new Error('SciPy functionality not supported yet: weighted quad');
  }

  if (flip) retval[0] = -retval[0];
  ier = retval.pop();
  if (ier === 0) return retval;

  // Non-zero exit code, throw descriptive error
  msgs = {
    '1': 'The maximum number of subdivisions (' + o.limit + ') has been achieved.\n  If increasing the limit yields no improvement it is advised to analyze\n  the integrand in order to determine the difficulties.  If the position of a\n  local difficulty can be determined (singularity, discontinuity) one will\n  probably gain from splitting up the interval and calling the integrator\n  on the subranges.  Perhaps a special-purpose integrator should be used.',
    '2': 'The occurrence of roundoff error is detected, which prevents\n  the requested tolerance from being achieved.  The error may be\n  underestimated.',
    '3': 'Extremely bad integrand behavior occurs at some points of the\n  integration interval.',
    '4': 'The algorithm does not converge.  Roundoff error is detected\n  in the extrapolation table.  It is assumed that the requested tolerance\n  cannot be achieved, and that the returned result (if full_output = 1) is\n  the best which can be obtained.',
    '5': 'The integral is probably divergent, or slowly convergent.',
    '6': 'The input is invalid.',
    '7': 'Abnormal termination of the routine.  The estimates for result\n  and error are less reliable.  It is assumed that the requested accuracy\n  has not been achieved.',
    'unknown': 'Unknown error.'

    // TODO: implement weighted stuff
    // if weight in ['cos','sin'] and (b===Inf or a===-Inf):
    //     msgs[1] = "The maximum number of cycles allowed has been achieved., e.e.\n  of subintervals (a+(k-1)c, a+kc) where c = (2*int(abs(omega)+1))\n  *pi/abs(omega), for k = 1, 2, ..., lst.  One can allow more cycles by increasing the value of limlst.  Look at info['ierlst'] with full_output=1."
    //     msgs[4] = "The extrapolation table constructed for convergence acceleration\n  of the series formed by the integral contributions over the cycles, \n  does not converge to within the requested accuracy.  Look at \n  info['ierlst'] with full_output=1."
    //     msgs[7] = "Bad integrand behavior occurs within one or more of the cycles.\n  Location and type of the difficulty involved can be determined from \n  the vector info['ierlist'] obtained with full_output=1."
    //     explain = {1: "The maximum number of subdivisions (= limit) has been \n  achieved on this cycle.",
    //                2: "The occurrence of roundoff error is detected and prevents\n  the tolerance imposed on this cycle from being achieved.",
    //                3: "Extremely bad integrand behavior occurs at some points of\n  this cycle.",
    //                4: "The integral over this cycle does not converge (to within the required accuracy) due to roundoff in the extrapolation procedure invoked on this cycle.  It is assumed that the result on this interval is the best which can be obtained.",
    //                5: "The integral over this cycle is probably divergent or slowly convergent."}

  };msg = msgs[ier];
  if (msg === undefined) msg = msgs['unknown'];
  if ([1, 2, 3, 4, 5, 7].includes(ier)) {
    if (o.fullOutput) {
      // if weight in ['cos', 'sin'] and (b===Inf or a===Inf):
      // return retval[:-1] + (msg, explain)
      // else:
      return retval.concat(msg);
    } else {
      console.warn('Integration Warning: ', msg);
      return retval;
    }
  } else if (ier === 6) {
    // # Forensic decision tree when QUADPACK throws ier=6
    if (o.epsabs <= 0) {
      // # Small error tolerance - applies to all methods
      if (o.epsrel < Math.max(50 * Number.EPSILON, 5e-29)) {
        msg = 'If \'errabs\'<=0, \'epsrel\' must be greater than both' + ('5e-29 and 50*(machine epsilon)[=' + 50 * Number.EPSILON + '].');
      }
      // elif weight in ['sin', 'cos'] and (abs(a) + abs(b)===Inf):
      // msg = ("Sine or cosine weighted intergals with infinite domain" " must have 'epsabs'>0.")
    } else if (o.weight === null) {
      if (o.points === null) {
        // QAGSE/QAGIE
        msg = 'Invalid \'limit\' argument. There must be at least one subinterval';
      } else {
        // QAGPE
        minPoint = Math.min.apply(Math, _toConsumableArray(o.points));
        maxPoint = Math.max.apply(Math, _toConsumableArray(o.points));
        condition = !(Math.min(a, b) <= minPoint && minPoint <= maxPoint && maxPoint <= Math.max(a, b));
        if (condition) {
          msg = 'All break points in \'points\' must lie within the integration limits.';
        } else if (o.points.length >= limit) {
          msg = 'Number of break points (' + o.points.length + ') must be less\n                than subinterval limit (' + o.limit + ')';
        }
      }
    } else {
      if (o.maxp1 < 1) {
        msg = 'Chebyshev moment limit maxp1 must be >=1.';
      } else if (['cos', 'sin'].includes(o.weight) && Math.abs(a + b) === Infinity) {
        // QAWFE
        msg = 'Cycle limit limlst must be >=3.';
      } else if (o.weight.startswith('alg')) {
        // QAWSE
        if (Math.min(o.wvar) < -1) {
          msg = 'wvar parameters (alpha, beta) must both be >= -1.';
        }
        if (b < a) {
          msg = 'Integration limits a, b must satistfy a<b.';
        }
      } else if (o.weight === 'cauchy' && [a, b].includes(o.wvar)) {
        msg = 'Parameter \'wvar\' must not equal integration limits \'a\' or \'b\'.';
      }
    }
  }
  throw new Error(msg);
}

// RETURN: fullOutput ? [result, abserr, infoObj, ier] : [result, abserr, ier]
function _quad(func, a, b, fullOutput, epsabs, epsrel, limit, points) {
  var infbounds = void 0,
      bound = void 0,
      thePoints = void 0;

  infbounds = 0;
  if (b !== Infinity && a !== -Infinity) {
    // pass   # standard integration
  } else if (b === Infinity && a !== -Infinity) {
    infbounds = 1;
    bound = a;
  } else if (b === Infinity && a === -Infinity) {
    infbounds = 2;
    bound = 0; // ignored
  } else if (b !== Infinity && a === -Infinity) {
    infbounds = -1;
    bound = b;
  } else {
    // this is the python message, pretty sure we'll never hit it but we should have
    // an error message in the else anyways
    throw new Error('Infinity comparisons don\'t work for you.');
  }

  if (points === null) {
    if (infbounds === 0) {
      return _qagse(func, a, b, fullOutput, epsabs, epsrel, limit);
    } else {
      return _qagie(func, bound, infbounds, fullOutput, epsabs, epsrel, limit);
    }
  } else {
    if (infbounds !== 0) {
      throw new Error('Infinity inputs cannot be used with break points.');
    } else {
      // Duplicates force function evaluation at singular points
      thePoints = sortUnique(points);
      thePoints = thePoints.filter(function (point) {
        return point > a;
      });
      thePoints = thePoints.filter(function (point) {
        return point < b;
      });
      thePoints = thePoints.concat([0, 0]);
      return _qagpe(func, a, b, thePoints, fullOutput, epsabs, epsrel, limit);
    }
  }
}

function _qagse(func, a, b, fullOutput, epsabs, epsrel, limit) {
  var iord = void 0,
      alist = void 0,
      blist = void 0,
      rlist = void 0,
      elist = void 0,
      infoObj = void 0;
  var neval = 0;
  var ier = 6;
  var last = 0;
  var result = 0.0;
  var abserr = 0.0;

  /* Need to check that limit is bigger than 1 */
  if (limit < 1) return [result, abserr, ier];

  /* Setup iwork and work arrays */
  iord = new Int32Array(limit);
  alist = new Float64Array(limit);
  blist = new Float64Array(limit);
  rlist = new Float64Array(limit);
  elist = new Float64Array(limit);

  var _dqagse = (0, _dqagse3.dqagse)(func, a, b, epsabs, epsrel, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last);

  var _dqagse2 = _slicedToArray(_dqagse, 6);

  result = _dqagse2[0];
  abserr = _dqagse2[1];
  neval = _dqagse2[2];
  ier = _dqagse2[3];
  iord = _dqagse2[4];
  last = _dqagse2[5];


  if (fullOutput) {
    infoObj = { 'neval': neval,
      'last': last,
      'iord': iord,
      'alist': alist,
      'blist': blist,
      'rlist': rlist,
      'elist': elist };
    return [result, abserr, infoObj, ier];
  } else {
    return [result, abserr, ier];
  }
}

function _qagie(func, bound, inf, fullOutput, epsabs, epsrel, limit) {
  var iord = void 0,
      alist = void 0,
      blist = void 0,
      rlist = void 0,
      elist = void 0,
      infoObj = void 0;
  var neval = 0;
  var ier = 6;
  var last = 0;
  var result = 0.0;
  var abserr = 0.0;

  /* Need to check that limit is bigger than 1 */
  if (limit < 1) return [result, abserr, ier];

  /* Setup iwork and work arrays */
  iord = new Int32Array(limit);
  alist = new Float64Array(limit);
  blist = new Float64Array(limit);
  rlist = new Float64Array(limit);
  elist = new Float64Array(limit);

  var _dqagie = (0, _dqagie3.dqagie)(func, bound, inf, epsabs, epsrel, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last);

  var _dqagie2 = _slicedToArray(_dqagie, 10);

  result = _dqagie2[0];
  abserr = _dqagie2[1];
  neval = _dqagie2[2];
  ier = _dqagie2[3];
  alist = _dqagie2[4];
  blist = _dqagie2[5];
  rlist = _dqagie2[6];
  elist = _dqagie2[7];
  iord = _dqagie2[8];
  last = _dqagie2[9];


  if (fullOutput) {
    infoObj = { 'neval': neval,
      'last': last,
      'iord': iord,
      'alist': alist,
      'blist': blist,
      'rlist': rlist,
      'elist': elist };
    return [result, abserr, infoObj, ier];
  } else {
    return [result, abserr, ier];
  }
}

function _qagpe(func, a, b, thePoints, fullOutput, epsabs, epsrel, limit) {
  var neval = void 0,
      ier = void 0,
      last = void 0,
      result = void 0,
      abserr = void 0,
      npts2 = void 0,
      iord = void 0,
      alist = void 0,
      blist = void 0,
      rlist = void 0,
      elist = void 0,
      pts = void 0,
      level = void 0,
      ndin = void 0,
      dqagpe = void 0;
  neval = 0;
  ier = 6;
  last = 0;
  result = 0.0;
  abserr = 0.0;

  /* Need to check that limit is bigger than 1 */
  if (limit < 1) return [result, abserr, ier];
  npts2 = thePoints.length;

  /* Setup iwork and work arrays */
  iord = new Int32Array(limit);
  alist = new Float64Array(limit);
  blist = new Float64Array(limit);
  rlist = new Float64Array(limit);
  elist = new Float64Array(limit);
  pts = new Float64Array(npts2);
  level = new Float64Array(limit);
  ndin = new Float64Array(npts2);

  var _dqagpe = dqagpe(func, a, b, npts2, thePoints, epsabs, epsrel, limit, result, abserr, neval, ier, alist, blist, rlist, elist, pts, iord, level, ndin, last);

  var _dqagpe2 = _slicedToArray(_dqagpe, 13);

  result = _dqagpe2[0];
  abserr = _dqagpe2[1];
  neval = _dqagpe2[2];
  ier = _dqagpe2[3];
  alist = _dqagpe2[4];
  blist = _dqagpe2[5];
  rlist = _dqagpe2[6];
  elist = _dqagpe2[7];
  pts = _dqagpe2[8];
  iord = _dqagpe2[9];
  level = _dqagpe2[10];
  ndin = _dqagpe2[11];
  last = _dqagpe2[12];


  if (fullOutput) {
    var infoObj = {
      'neval': neval,
      'last': last,
      'iord': iord,
      'alist': alist,
      'blist': blist,
      'rlist': rlist,
      'elist': elist,
      'pts': pts,
      'level': level,
      'ndin': ndin
    };
    return [result, abserr, infoObj, ier];
  } else {
    return [result, abserr, ier];
  }
}

// https:// stackoverflow.com/questions/4833651/javascript-array-sort-and-unique
function sortUnique(arr) {
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) {
    return a * 1 - b * 1;
  });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    // Start loop at 1: arr[0] can never be a duplicate
    if (arr[i - 1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}

exports.quad = quad;