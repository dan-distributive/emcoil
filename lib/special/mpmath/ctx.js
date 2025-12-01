Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.j = exports.expj = exports.expjpi = exports._defaultHyperMaxprec = exports.eps = exports._fixedPrecision = exports.dps = exports.prec = exports.isint = exports.NoConvergence = exports.isComplexType = exports._isRealType = exports.nstr = exports.convertParam = exports.hypsum = exports.fprod = exports.isnpint = exports.mag = exports.nintDistance = exports.convert = undefined;

var _pythonHelpers = require('../../utils/pythonHelpers.js');

var py = _interopRequireWildcard(_pythonHelpers);

var _complex = require('../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Make fixed precision
var prec = 53;
var dps = 15;
var _fixedPrecision = true;
var eps = Number.EPSILON;
var j = [0, 1];

function reset() {
  exports.prec = prec = 53;
}

// mpmath relies on a bunch of helper functions stored in `ctx`.
function nintDistance(z) {
  var n = void 0,
      distance = void 0;
  if (z.constructor === Array) {
    n = Math.round(z[0]);
  } else {
    n = Math.round(z);
  }

  if (n === z) {
    distance = -Infinity;
  } else {
    distance = mag(_complex2.default.sub(z, n));
  }

  return [n, distance];
}

// function magc(z) {
//   return Math.max(mag(Complex.re(z)), mag(Complex.im(z))) + 1;
// }

function mag(x) {
  if (x) {
    return py.frexp(_complex2.default.abs(x))[1];
  } else {
    return -Infinity;
  }
}

function isnpint(x) {
  if (x.constructor === Array) {
    if (x[1] !== 0) {
      return false;
    }
    x = x[0];
  }
  return x <= 0.0 && Math.round(x) === x;
}

function fprod(args) {
  var prod = 1;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arg = _step.value;

      prod = _complex2.default.mul(prod, arg);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return prod;
}

// function hypsumMp(p, q, flags, coeffs, z, opts={}){
//   if (!('accurate_small' in opts)) {
//     opts['accurate_small'] = true;
//   }
//
//   if (hasattr(z, "_mpf_")) {
//     key = p, q, flags, 'R';
//     v = z._mpf_;
//   } else if (hasattr(z, "_mpc_")) {
//     key = p, q, flags, 'C';
//     v = z._mpc_;
//   }
//   if (key not in ctx.hyp_summators) {
//     ctx.hyp_summators[key] = libmp.make_hyp_summator(key)[1];
//   };
//   summator = ctx.hyp_summators[key];
//   prec = ctx.prec;
//   maxprec = kwargs.get('maxprec', ctx._default_hyper_maxprec(prec));
//   extraprec = 50;
//   epsshift = 25;
//   // Jumps in magnitude occur when parameters are close to negative
//   // integers. We must ensure that these terms are included in
//   // the sum and added accurately
//   magnitude_check = {};
//   max_total_jump = 0;
//   for (i, c in enumerate(coeffs)) {
//     if (flags[i]==='Z') {
//       if (i >= p and c <= 0) {
//         ok = False;
//         for (ii, cc in enumerate(coeffs[:p])) {
//           // Note: c <= cc or c < cc, depending on convention
//           if (flags[ii]==='Z' and cc <= 0 and c <= cc) {
//             ok = True;
//           }
//         }
//         if (not ok) {
//           raise ZeroDivisionError("pole in hypergeometric series")
//         }
//       }
//       continue
//     }
//     [n, d] = ctx.nint_distance(c);
//     n = -int(n);
//     d = -d;
//     if (i >= p and n >= 0 and d > 4) {
//       if (n in magnitude_check) {
//         magnitude_check[n] += d;
//       } else {
//         magnitude_check[n] = d
//       }
//       extraprec = max(extraprec, d - prec + 60)
//     }
//     max_total_jump += abs(d);
//   }
//   while (1) {
//     if (extraprec > maxprec) {
//       raise ValueError(ctx._hypsum_msg % (prec, prec+extraprec))
//     }
//     wp = prec + extraprec;
//     if (magnitude_check) {
//       mag_dict = dict((n,None) for n in magnitude_check);
//     } else {
//       mag_dict = {}
//     }
//     [zv, have_complex, magnitude] = summator(coeffs, v, prec, wp, epsshift, mag_dict, **kwargs);
//     cancel = -magnitude;
//     jumps_resolved = true;
//     if (extraprec < max_total_jump) {
//       for (n in mag_dict.values()) {
//         if ((n is None) or (n < prec)) {
//           jumps_resolved = false;
//           break
//         }
//       }
//     }
//     accurate = (cancel < extraprec-25-5 or not accurate_small)
//     if (jumps_resolved) {
//       if (accurate) {
//         break
//       }
//       //zero?
//       zeroprec = kwargs.get('zeroprec');
//       if (zeroprec is not None) {
//         if (cancel > zeroprec) {
//           if (have_complex) {
//             return ctx.mpc(0);
//           } else {
//             return ctx.zerol
//           }
//         }
//       }
//     }
//     // Some near-singularities were not included, so increase
//     // precision and repeat until they are
//     extraprec *= 2;
//     // Possible workaround for bad roundoff in fixed-point arithmetic
//     epsshift += 5;
//     extraprec += 5;
//   }
//   if (type(zv) is tuple) {
//     if (have_complex) {
//       return ctx.make_mpc(zv);
//     } else {
//       return ctx.make_mpf(zv);
//     }
//   } else {
//     return zv;
//   }
// }

// Depending on the context, mpmath might call any one of a number of hypsum functions
// this one got translated by accident for our immediate usecase, but may be useful later
function hypsum(p, q, types, coeffs, z) {
  var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  if (!('maxterms' in opts)) {
    opts['maxterms'] = 6000;
  }

  var num = py.range(p);
  var den = py.range(p, p + q);
  var tol = eps;
  var s = 1.0;
  var t = 1.0;
  var k = 0;

  while (1) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = num[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        t = _complex2.default.mul(t, _complex2.default.add(coeffs[i], k));
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = den[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _i = _step3.value;
        t = _complex2.default.div(t, _complex2.default.add(coeffs[_i], k));
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    k += 1;
    t = _complex2.default.div(t, k);
    t = _complex2.default.mul(t, z);
    s = _complex2.default.add(s, t);
    if (_complex2.default.abs(t) < tol) {
      return s;
    }
    if (k > opts.maxterms) {
      throw new NoConvergence('hypsum failed to converge');
    }
  }
}

// original divided when given a tuple, since js doesn't have tuples or
// much in the way of numeric types, we'll leave that out and assume numbers
// passed are either ints, real, or complex.
function convertParam(z) {
  // if (tuple) {
  //   [p, q] = z;
  //   return [p / q, 'R'];
  // }
  var intz = void 0;
  if (z.constructor === Array) {
    intz = Math.floor(z[0]);
  } else {
    intz = Math.floor(z);
  }

  if (z === intz) {
    return [intz, 'Z'];
  }

  return [z, 'R'];
}

function convert(x) {
  return _complex2.default.ensureComplex(x);
}

function nstr(x) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // x = Complex.ensureComplex(x);

  // TODO - to string function - mpi
  // if (hasattr(x, "_mpi_")) {
  //   return libmp.mpi_to_str(x._mpi_, n, opts)
  // }
  // if (hasattr(x, "_mpci_")) {
  //   re = libmp.mpi_to_str(x._mpci_[0], n, opts)
  //   im = libmp.mpi_to_str(x._mpci_[1], n, opts)
  //   return "(%s + %s*j)" % (re, im)
  // }
  return String(x);
}

function isint(z) {
  if (z.constructor === Array) {
    if (_complex2.default.im(z)) {
      return false;
    }
    z = _complex2.default.re(z);
  }
  return Number.isInteger(z);
}

function expjpi(x) {
  return _complex2.default.exp(_complex2.default.mul([0, Math.PI], x));
}

function expj(x) {
  return _complex2.default.exp(_complex2.default.mul([0, 1], x));
}

function _isRealType(z) {
  return z.constructor !== Array;
}

function isComplexType(z) {
  return z.constructor === Array;
}

function NoConvergence(message) {
  this.message = message;
  this.name = 'NoConvergence';
}

function _defaultHyperMaxprec(p) {
  return Math.trunc(1000 * p ** 0.25 + 4 * p);
}

exports.convert = convert;
exports.nintDistance = nintDistance;
exports.mag = mag;
exports.isnpint = isnpint;
exports.fprod = fprod;
exports.hypsum = hypsum;
exports.convertParam = convertParam;
exports.nstr = nstr;
exports._isRealType = _isRealType;
exports.isComplexType = isComplexType;
exports.NoConvergence = NoConvergence;
exports.isint = isint;
exports.prec = prec;
exports.dps = dps;
exports._fixedPrecision = _fixedPrecision;
exports.eps = eps;
exports._defaultHyperMaxprec = _defaultHyperMaxprec;
exports.expjpi = expjpi;
exports.expj = expj;
exports.j = j;
exports.reset = reset;