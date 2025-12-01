Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyp1f2 = exports.hyp2f0 = exports.hyper = exports.hypercomb = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _complex = require('../../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

var _ctx = require('../ctx.js');

var ctx = _interopRequireWildcard(_ctx);

var _pythonHelpers = require('../../../utils/pythonHelpers.js');

var py = _interopRequireWildcard(_pythonHelpers);

var _math = require('../../math2/math2.js');

var math2 = _interopRequireWildcard(_math);

var _factorials = require('./factorials.js');

var mpFactorials = _interopRequireWildcard(_factorials);

var _functions = require('./functions.js');

var mpFunctions = _interopRequireWildcard(_functions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// In original this is called hypercomb

// Thoughts:
//   I'd rather it was given / returned a keyed object.

function hypercomb(func) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var hmag = void 0,
      zeroOk = void 0,
      infOk = void 0;
  var orig = ctx.prec;
  var discardKnownZeros = py.get(opts, 'discardKnownZeros', true);
  var sumvalue = 0;
  var origParams = [].concat(_toConsumableArray(params));
  var verbose = py.get(opts, 'verbose', false);
  var maxprec = py.get(opts, 'maxprec', ctx._defaultHyperMaxprec(orig));
  opts.maxprec = maxprec; // For calls to hypsum
  var zeroprec = py.get(opts, 'zeroprec');
  var infprec = py.get(opts, 'infprec');
  var perturbedReferenceValue = null;
  var hextra = 0;
  try {
    while (1) {
      ctx.prec += 10;
      if (ctx.prec > maxprec) {
        // raise ValueError(_hypercomb_msg % (orig, ctx.prec));
        throw new Error('_hypercomb_msg: orig: ' + orig + ' | ctx.prec: ' + ctx.prec);
      }

      var orig2 = ctx.prec;
      params = [].concat(_toConsumableArray(origParams));
      var terms = func.apply(undefined, _toConsumableArray(params));
      if (verbose) {
        console.log();
        console.log('ENTERING hypercomb main loop');
        console.log('prec =', ctx.prec);
        console.log('hextra', hextra);
      }

      var _checkNeedPerturb2 = _checkNeedPerturb(terms, orig, discardKnownZeros),
          _checkNeedPerturb3 = _slicedToArray(_checkNeedPerturb2, 4),
          perturb = _checkNeedPerturb3[0],
          recompute = _checkNeedPerturb3[1],
          extraprec = _checkNeedPerturb3[2],
          discard = _checkNeedPerturb3[3];

      ctx.prec += extraprec;
      if (perturb) {
        if (opts.hasOwnProperty('hmag')) {
          hmag = opts.hmag;
        } else if (ctx._fixedPrecision) {
          hmag = Math.trunc(ctx.prec * 0.3);
        } else {
          hmag = orig + 10 + hextra;
        }
        opts.perturbParams = [];
        var h = py.ldexp(1, -hmag);
        ctx.prec = orig2 + 10 + hmag + 10;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = py.range(params.length)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            opts.perturbParams[k] = h;
            params[k] = _complex2.default.add(params[k], h);
            // Heuristically ensure that the perturbations
            // are "independent" so that two perturbations
            // don't accidentally cancel each other out
            // in a subtraction.
            h += h / (k + 1);
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
      }
      if (recompute) {
        terms = func.apply(undefined, _toConsumableArray(params).concat([opts]));
      }
      if (discardKnownZeros) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = discard[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var index = _step2.value;
            delete terms[index];
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

        terms = terms.filter(Boolean);
      }
      if (!terms.length) {
        return 0;
      }

      // Now actually perform the calculation!
      var evaluatedTerms = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        var _loop = function _loop() {
          var _step3$value = _slicedToArray(_step3.value, 2),
              termIndex = _step3$value[0],
              termData = _step3$value[1];

          var _termData = _slicedToArray(termData, 7),
              ws = _termData[0],
              cs = _termData[1],
              alphas = _termData[2],
              betas = _termData[3],
              aS = _termData[4],
              bS = _termData[5],
              z = _termData[6]; // tuple


          if (verbose) {
            console.log();
            console.log('Evaluating term %i/%i : %iF%i', termIndex + 1, terms.length, aS.length, bS.length);
            console.log('powers: ws: ' + ws + ' | cs: ' + cs);
            console.log('gamma: alphas: ' + alphas + ' | betas: ' + betas);
            console.log('hyper: as: ' + aS + ' | bs: ' + bS + ' ');
            console.log('z', ctx.nstr(z));
          }

          // ===========================
          var v = hyper(aS, bS, z, opts);
          alphas.map(function (a) {
            v = _complex2.default.mul(v, math2.gamma(a));
          });
          betas.map(function (b) {
            v = _complex2.default.mul(v, math2.rgamma(b));
          });
          py.zipmap(ws, cs, function (w, c) {
            v = _complex2.default.mul(v, _complex2.default.pow(w, c));
          });
          // ===========================

          if (verbose) {
            console.log('Value: ' + v);
          }
          evaluatedTerms.push(v);
        };

        for (var _iterator3 = terms.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          _loop();
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

      if (terms.length === 1 && !perturb) {
        sumvalue = evaluatedTerms[0];
        break;
      }

      if (ctx._fixedPrecision) {
        sumvalue = _complex2.default.sum(evaluatedTerms);
        break;
      }

      sumvalue = _complex2.default.sum(evaluatedTerms);
      var termMagnitudes = evaluatedTerms.map(function (x) {
        return ctx.mag(x);
      });
      var maxMagnitude = Math.max.apply(Math, _toConsumableArray(termMagnitudes));
      var sumMagnitude = ctx.mag(sumvalue);
      var cancellation = maxMagnitude - sumMagnitude;
      if (verbose) {
        console.log('Cancellation: ' + cancellation + ' bits');
        console.log('Increased precision: ' + (ctx.prec - orig) + ' bits');
      }

      var precisionOk = cancellation < ctx.prec - orig;

      if (opts.zeroprec) {
        zeroOk = false;
      } else {
        zeroOk = maxMagnitude - ctx.prec < -zeroprec;
      }
      if (opts.infprec) {
        infOk = false;
      } else {
        infOk = maxMagnitude > infprec;
      }

      if (precisionOk && (!perturb || isNaN(cancellation))) {
        break;
      } else if (precisionOk) {
        if (perturbedReferenceValue === null) {
          hextra += 20;
          perturbedReferenceValue = sumvalue;
          continue;
        } else if (ctx.mag(sumvalue - perturbedReferenceValue) <= ctx.mag(sumvalue) - orig) {
          break;
        } else if (zeroOk) {
          sumvalue = 0;
          break;
        } else if (infOk) {
          sumvalue = Infinity;
          break;
        } else if ('hmag' in opts) {
          break;
        } else {
          hextra *= 2;
          perturbedReferenceValue = sumvalue;
        }
      } else {
        // Increase precision
        var maxDiff = Math.max(cancellation, Math.floor(orig / 2));
        var increment = Math.min(maxDiff, Math.max(extraprec, orig));
        ctx.prec += increment;
        if (verbose) {
          console.log('Must start over with increased precision');
        }
        continue;
      }
    } // while
  } finally {
    // reset precision for other funcs
    ctx.prec = orig;
  }
  return sumvalue;
}

function _checkNeedPerturb(terms, prec, discardKnownZeros) {
  var recompute = false;
  var perturb = false;
  var extraprec = 0;
  var discard = [];
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = terms.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2),
          _termIndex = _step4$value[0],
          term = _step4$value[1];

      var _term = _slicedToArray(term, 7),
          _ws = _term[0],
          _cs = _term[1],
          _alphas = _term[2],
          _betas = _term[3],
          as = _term[4],
          bs = _term[5],
          _z2 = _term[6]; // eslint-disable-line no-unused-vars


      var haveSingularNongammaWeight = false;
      // Avoid division by zero in leading factors (TODO:
      // also check for near division by zero?)
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _ws.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2),
              k = _step5$value[0],
              w = _step5$value[1];

          if (_complex2.default.isZero(w)) {
            if (_complex2.default.re(_cs[k]) <= 0 && _cs[k]) {
              perturb = true;
              recompute = true;
              haveSingularNongammaWeight = true;
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var poleCount = [0, 0, 0];
      // Check for gamma and series poles and near-poles
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = [_alphas, _betas, bs].entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = _slicedToArray(_step6.value, 2),
              dataIndex = _step6$value[0],
              data = _step6$value[1];

          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = data.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _step7$value = _slicedToArray(_step7.value, 2),
                  index = _step7$value[0],
                  x = _step7$value[1];

              // eslint-disable-line no-unused-vars
              var _ctx$nintDistance = ctx.nintDistance(x),
                  _ctx$nintDistance2 = _slicedToArray(_ctx$nintDistance, 2),
                  n = _ctx$nintDistance2[0],
                  d = _ctx$nintDistance2[1];
              // Poles


              if (n > 0) {
                continue;
              }
              if (d === -Infinity) {
                // OK if we have a polynomial
                // ------------------------------
                var ok = false;
                if (dataIndex === 2) {
                  var _iteratorNormalCompletion8 = true;
                  var _didIteratorError8 = false;
                  var _iteratorError8 = undefined;

                  try {
                    for (var _iterator8 = as[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                      var u = _step8.value;

                      if (ctx.isnpint(u) && u >= n) {
                        ok = true;
                        break;
                      }
                    }
                  } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion8 && _iterator8.return) {
                        _iterator8.return();
                      }
                    } finally {
                      if (_didIteratorError8) {
                        throw _iteratorError8;
                      }
                    }
                  }
                }

                if (ok) {
                  continue;
                }
                poleCount[dataIndex] += 1;
                // ------------------------------
                // perturb = recompute = True
                // return perturb, recompute, extraprec}
              } else if (d < -4) {
                extraprec += -d;
                recompute = true;
              }
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      if (discardKnownZeros && poleCount[1] > poleCount[0] + poleCount[2] && !haveSingularNongammaWeight) {
        discard.append(_termIndex);
      } else if (py.sum(poleCount)) {
        perturb = true;
        recompute = true;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return [perturb, recompute, extraprec, discard];
}

function hyper(aS, bS, z, opts) {
  // """
  // Hypergeometric function, general case.
  // """
  z = _complex2.default.ensureComplex(z);
  var p = aS.length;
  var q = bS.length;
  aS = aS.map(function (a) {
    return ctx.convertParam(a);
  });
  bS = bS.map(function (b) {
    return ctx.convertParam(b);
  });

  // Reduce degree by eliminating common parameters
  if (py.get(opts, 'eliminate', true)) {
    var elimNonpositive = py.get(opts, 'eliminate_all', false);
    var i = 0;
    while (i < q && aS.length > 0) {
      var b = bS[i];
      // better way than index of to determine if b is in aS?
      var indexOfB = aS.indexOf(b);
      if (indexOfB > -1 && (elimNonpositive || !ctx.isnpint(b[0]))) {
        aS.splice(indexOfB);
        bS.splice(bS.indexOf(b));
        p -= 1;
        q -= 1;
      } else {
        i += 1;
      }
    }
  }

  // Handle special cases
  if (p === 0) {
    if (q === 1) return _hyp0f1(bS, z, opts);else if (q === 0) return _complex2.default.exp(z);
  } else if (p === 1) {
    if (q === 1) {
      var res = _hyp1f1(aS[0], bS[0], z, opts);
      return res;
    } else if (q === 2) return _hyp1f2(aS, bS, z, opts);else if (q === 0) return _hyp1f0(aS[0][0], z);
  } else if (p === 2) {
    if (q === 1) return _hyp2f1(aS, bS, z, opts);else if (q === 2) return _hyp2f2(aS, bS, z, opts);else if (q === 3) return _hyp2f3(aS, bS, z, opts);else if (q === 0) {
      var _res = _hyp2f0(aS, bS, z, opts);
      return _res;
    }
  } else if (p === q + 1) {
    return _hypq1fq(p, q, aS, bS, z, opts);
  } else if (p > q + 1 && !py.get(opts, 'force_series')) {
    return _hypBorel(p, q, aS, bS, z, opts);
  }

  var _py$unzip = py.unzip([].concat(_toConsumableArray(aS), _toConsumableArray(bS))),
      _py$unzip2 = _slicedToArray(_py$unzip, 2),
      coeffs = _py$unzip2[0],
      types = _py$unzip2[1];

  return ctx.hypsum(p, q, types, coeffs, z, opts);
}

// function hyp0f1(b, z, opts) {
//     return hyper([], [b], z, opts);
// }

// function hyp1f1(a, b, z, opts) {
//     return hyper([a], [b], z, opts);
// }

function hyp1f2(a1, b1, b2, z, opts) {
  return hyper([a1], [b1, b2], z, opts);
}

function hyp2f1(a, b, c, z, opts) {
  return hyper([a, b], [c], z, opts);
}

// function hyp2f2(a1, a2, b1, b2, z, opts) {
//     return hyper([a1, a2], [b1, b2], z, opts);
// }

// function hyp2f3(a1, a2, b1, b2, b3, z, opts) {
//     return hyper([a1, a2], [b1, b2, b3], z, opts);
// }

function hyp2f0(a, b, z, opts) {
  return hyper([a, b], [], z, opts);
}

// function hyp3f2(a1, a2, a3, b1, b2, z, opts) {
//     return hyper([a1, a2, a3], [b1, b2], z, opts);
// }

// TODO
function _hyp0f1(bS, z, opts) {
  var magz = void 0,
      v = void 0;

  var _bS$ = _slicedToArray(bS[0], 2),
      b = _bS$[0],
      btype = _bS$[1];

  if (z) {
    magz = ctx.mag(z);
  } else {
    magz = 0;
  }
  if (magz >= 8 && !opts.force_series) {
    try {
      // http://functions.wolfram.com/HypergeometricFunctions/
      // Hypergeometric0F1/06/02/03/0004/
      // TODO: handle the all-real case more efficiently!
      // TODO: figure out how much precision is needed (exponential growth)
      var orig = ctx.prec;
      try {
        ctx.prec += 12 + Math.floor(magz / 2);
        var w = _complex2.default.sqrt(_complex2.default.mul(-1, z));
        var jw = _complex2.default.mul([0, 1], w);
        var minusJw = _complex2.default.mul(-1, jw);
        var u = _complex2.default.inverse(_complex2.default.mul(4, jw));
        var minusU = _complex2.default.mul(-1, u);
        var c = _complex2.default.sub(0.5, b);
        var bMinusHalf = _complex2.default.sub(b, 0.5);
        var oneAndHalfMinusB = _complex2.default.sub(1.5, b);
        var capitalE = _complex2.default.exp(_complex2.default.mul(2, jw));
        var hyp2f0Res = hyp2f0(bMinusHalf, oneAndHalfMinusB, minusU, { 'force_series': true });
        var prefactor = _complex2.default.div(_complex2.default.pow(minusJw, c), capitalE);
        var capitalH1 = _complex2.default.mul(prefactor, hyp2f0Res);
        hyp2f0Res = hyp2f0(bMinusHalf, oneAndHalfMinusB, u, { 'force_series': true });
        prefactor = _complex2.default.mul(_complex2.default.pow(jw, c), capitalE);
        var capitalH2 = _complex2.default.mul(prefactor, hyp2f0Res);
        var hSum = _complex2.default.add(capitalH1, capitalH2);
        var quotient = _complex2.default.div(math2.gamma(b), 2 * Math.sqrt(Math.PI));
        v = _complex2.default.mul(quotient, hSum);
      } finally {
        ctx.prec = orig;
      }
      // if b and z are real
      if (ctx._isRealType(b) && ctx._isRealType(z)) {
        v = _complex2.default.re(v);
      }
      // below was return +v - in python this means carry context settings like rounding out with the decimal.
      return v;
    } catch (e) {
      if (e.name !== 'NoConvergence') {
        throw e;
      }
    }
  }
  return ctx.hypsum(0, 1, [btype], [b], z, opts);
};

function _hyp1f1(aS, bS, z, opts) {
  var _aS = _slicedToArray(aS, 2),
      a = _aS[0],
      atype = _aS[1];

  var _bS = _slicedToArray(bS, 2),
      b = _bS[0],
      btype = _bS[1];

  if (_complex2.default.isZero(z)) {
    return _complex2.default.add(1, z);
  }
  var magz = ctx.mag(z);
  var v = void 0;
  if (magz >= 7 && !(ctx.isint(a) && _complex2.default.re(a) <= 0)) {
    if (!isFinite(z)) {
      if (mpFunctions.sign(a) === mpFunctions.sign(b) === mpFunctions.sign(z) === 1) {
        return Infinity;
      }
      return _complex2.default.mul(NaN, z);
    }
    try {
      try {
        ctx.prec += magz;
        var sector = _complex2.default.im(z) < 0;
        var h = function h(a, b) {
          var negA = _complex2.default.mul(-1, a);
          var aMinusB = _complex2.default.sub(a, b);
          var bMinusA = _complex2.default.sub(b, a);
          var capitalE = void 0;
          if (sector) {
            capitalE = ctx.expjpi(negA);
          } else {
            capitalE = ctx.expjpi(a);
          }
          var rz = _complex2.default.inverse(z);
          var capitalT1 = [[capitalE, z], [1, negA], [b], [bMinusA], [a, _complex2.default.add(1, aMinusB)], [], _complex2.default.mul(-1, rz)];
          var capitalT2 = [[_complex2.default.exp(z), z], [1, aMinusB], [b], [a], [bMinusA, 1 - a], [], rz];
          return [capitalT1, capitalT2];
        };
        v = hypercomb(h, [a, b], { 'force_series': true });
        if (ctx._is_real_type(a) && ctx._is_real_type(b) && ctx._is_real_type(z)) {
          v = _complex2.default.re(v);
        }
        return v;
      } catch (e) {
        if (e.name !== 'NoConvergence') {
          throw e;
        }
      }
    } finally {
      ctx.prec -= magz;
    }
  }

  v = ctx.hypsum(1, 1, (atype, btype), [a, b], z, opts);
  return v;
};

function _hyp2f1Gosper(a, b, c, z) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var f1 = void 0;
  // Use Gosper's recurrence
  // See http://www.math.utexas.edu/pipermail/maxima/2006/000126.html
  var _a = a,
      _b = b,
      _c = c,
      _z = z;

  var orig = ctx.prec;
  var maxprec = py.get(opts, 'maxprec', 100 * orig);
  var extra = 10;
  while (1) {
    ctx.prec = orig + extra;
    a = ctx.convert(_a);
    b = ctx.convert(_b);
    c = ctx.convert(_c);
    z = ctx.convert(_z);
    var d = 0;
    var e = 1;
    var f = 0;
    var k = 0;
    // Common subexpression elimination, unfortunately making
    // things a bit unreadable. The formula is quite messy to begin
    // with, though...
    var abz = _complex2.default.mul(_complex2.default.mul(a, b), z);
    var ch = _complex2.default.mul(c, 0.5);
    var c1h = _complex2.default.mul(_complex2.default.add(c, 1), 0.5);
    var nz = _complex2.default.sub(1, z);
    var g = _complex2.default.div(z, nz);
    var abg = _complex2.default.mul(_complex2.default.mul(a, b), g);
    var cba = _complex2.default.sub(_complex2.default.sub(c, b), a);
    var z2 = _complex2.default.sub(z, 2);
    var tol = -ctx.prec - 10;
    var maxmag = -Infinity;
    while (1) {
      var kch = _complex2.default.add(k, ch);
      // kakbz = (k+a)*(k+b)*z / (4*(k+1)*kch*(k+c1h));
      var numerator = _complex2.default.prod([_complex2.default.add(k, a), _complex2.default.add(k, b), z]);
      var denominator = _complex2.default.prod([4, _complex2.default.add(k, 1), kch, _complex2.default.add(k, c1h)]);
      var kakbz = _complex2.default.div(numerator, denominator);
      // d1 = kakbz*(e-(k+cba)*d*g)
      var kcbadg = _complex2.default.prod([_complex2.default.add(k, cba), d, g]);
      var d1 = _complex2.default.mul(kakbz, _complex2.default.sub(e, kcbadg));
      // e1 = kakbz*(d*abg+(k+c)*e);
      var dabgkce = _complex2.default.add(_complex2.default.mul(d, abg), _complex2.default.mul(_complex2.default.add(k, c), e));
      var e1 = _complex2.default.mul(kakbz, dabgkce);
      // ft = d*(k*(cba*z+k*z2-c)-abz)/(2*kch*nz);
      var cbazkz2 = _complex2.default.add(_complex2.default.mul(cba, z), _complex2.default.mul(k, z2));
      var cbazkz2c = _complex2.default.sub(cbazkz2, c);
      var kcbazkz2cabz = _complex2.default.sub(_complex2.default.mul(k, cbazkz2c), abz);
      numerator = _complex2.default.mul(d, kcbazkz2cabz);
      denominator = _complex2.default.prod([2, kch, nz]);
      var ft = _complex2.default.div(numerator, denominator);
      f1 = _complex2.default.sub(_complex2.default.add(f, e), ft);
      maxmag = Math.max(maxmag, ctx.mag(f1));
      if (ctx.mag(_complex2.default.sub(f1, f)) < tol) {
        break;
      }
      d = d1;
      e = e1;
      f = f1;

      k = _complex2.default.add(k, 1);
    }
    var cancellation = maxmag - ctx.mag(f1);
    if (cancellation < extra) {
      break;
    } else {
      extra += cancellation;
      if (extra > maxprec) {
        throw new ctx.NoConvergence();
      }
    }
  }
  return f1;
}

function _hyp1f2(aS, bS, z, opts) {
  var _aS$ = _slicedToArray(aS[0], 2),
      a1 = _aS$[0],
      a1type = _aS$[1];

  var _bS2 = _slicedToArray(bS, 2),
      _bS2$ = _slicedToArray(_bS2[0], 2),
      b1 = _bS2$[0],
      b1type = _bS2$[1],
      _bS2$2 = _slicedToArray(_bS2[1], 2),
      b2 = _bS2$2[0],
      b2type = _bS2$2[1];

  var absz = _complex2.default.abs(z);
  var magz = ctx.mag(z);
  var orig = ctx.prec;

  // Asymptotic expansion is ~ exp(sqrt(z))
  var asympExtraprec = z && Math.floor(magz / 2);

  // # Asymptotic series is in terms of 3F0
  // set to true for the moment, normally false for some reason.
  var canUseAsymptotic = !py.get(opts, 'force_series') && ctx.mag(absz) > 19 && Math.sqrt(absz) > 1.5 * orig; // # and \
  // #   ctx._hyp_check_convergence([a1, a1-b1+1, a1-b2+1], [],
  // #                              1/absz, orig+40+asympExtraprec)

  // # TODO: much of the following could be shared with 2F3 instead of
  // # copypasted
  if (canUseAsymptotic) {
    // #print "using asymp"
    try {
      try {
        ctx.prec += asympExtraprec;
        // # http://functions.wolfram.com/HypergeometricFunctions/
        // # Hypergeometric1F2/06/02/03/
        var h = function h(a1, b1, b2) {
          var a1Sqrd = _complex2.default.pow(a1, 2);
          var b1Plusb2 = _complex2.default.add(b1, b2);
          var a1Minusb1Minusb2 = _complex2.default.sub(a1, b1Plusb2);
          var capitalX = _complex2.default.mul(0.5, _complex2.default.add(a1Minusb1Minusb2, 0.5));
          var c = [];
          c[0] = 1;
          // c1
          var b1Plusb2Minus2 = _complex2.default.sub(b1Plusb2, 2);
          var threeA1Plus = _complex2.default.add(_complex2.default.mul(3, a1), b1Plusb2Minus2);
          var b1b2 = _complex2.default.mul(b1, b2);
          var prod = _complex2.default.prod([0.25, threeA1Plus, a1Minusb1Minusb2]);
          var bigTerm = _complex2.default.sum(prod, b1b2, -3 / 16);
          c[1] = _complex2.default.mul(2, bigTerm);

          // c2
          var nEightA1Sqr = _complex2.default.mul(-8, a1Sqrd);
          var sum = _complex2.default.sum([nEightA1Sqr, _complex2.default.mul(11, a1), b1Plusb2Minus2]);
          var twoA1minus3 = _complex2.default.sub(_complex2.default.mul(2, a1), 3);
          var capitalA = _complex2.default.prod([-16, twoA1minus3, b1b2]);
          var capitalB = _complex2.default.prod([4, a1Minusb1Minusb2, sum]);
          var thing3 = _complex2.default.sum(capitalA, capitalB, -3);
          var twoBigTermSqrd = _complex2.default.mul(2, _complex2.default.pow(bigTerm, 2));
          c[2] = _complex2.default.add(twoBigTermSqrd, _complex2.default.mul(1 / 16, thing3));
          var s1 = 0;
          var s2 = 0;
          var k = 0;
          var tprev = 0;

          while (1) {
            if (c[k] === undefined) {
              var _sum = _complex2.default.sum([_complex2.default.mul(-6, a1), _complex2.default.mul(2, b1), _complex2.default.mul(2, b2), -4]);
              var kSum = _complex2.default.mul(k, _sum);
              var threeA1Sqrd = _complex2.default.mul(3, a1Sqrd);
              var threekSqrd = _complex2.default.mul(3, _complex2.default.pow(k, 2));
              var uu1 = _complex2.default.sum([threekSqrd, kSum, threeA1Sqrd, _complex2.default.mul(-1, _complex2.default.pow(b1Plusb2, 2)), _complex2.default.prod([-1, 2, a1, b1Plusb2Minus2]), 0.25]);
              var minusA1 = _complex2.default.mul(-1, a1);
              var minusB1 = _complex2.default.mul(-1, b1);
              var minusB2 = _complex2.default.mul(-1, b2);
              var uu2 = _complex2.default.prod([_complex2.default.sum([k, minusA1, b1, minusB2, -0.5]), _complex2.default.sum([k, minusA1, minusB1, b2, -0.5]), _complex2.default.sum([k, minusA1, b1, b2, -5 / 2])]);
              var oneOver2k = _complex2.default.inverse(_complex2.default.mul(2, k));
              var diff = _complex2.default.sub(_complex2.default.mul(uu1, c[k - 1]), _complex2.default.mul(uu2, c[k - 2]));
              c[k] = _complex2.default.mul(oneOver2k, diff);
            }
            var minusHalfK = _complex2.default.mul(-0.5, k);
            var twoToTheMinusK = _complex2.default.pow(2, _complex2.default.mul(-1, k));
            var minusZ = _complex2.default.mul(-1, z);
            var w = _complex2.default.mul(c[k], _complex2.default.pow(minusZ, minusHalfK));
            var t1 = _complex2.default.prod([_complex2.default.pow([0, -1], k), twoToTheMinusK, w]);
            var t2 = _complex2.default.prod([_complex2.default.pow(ctx.j, k), twoToTheMinusK, w]);
            if (_complex2.default.abs(t1) < 0.1 * ctx.eps) {
              // #print "Convergence :)"
              break;
            }
            // # Quit if the series doesn't converge quickly enough
            if (k > 5 && _complex2.default.abs(tprev) / _complex2.default.abs(t1) < 1.5) {
              // #print "No convergence :("
              throw new ctx.NoConvergence();
            }
            s1 = _complex2.default.add(s1, t1);
            s2 = _complex2.default.add(s2, t2);
            tprev = t1;
            k += 1;
          }
          var capitalS = ctx.expj(Math.PI * capitalX + 2 * _complex2.default.sqrt(-z)) * s1 + ctx.expj(-(Math.PI * capitalX + 2 * _complex2.default.sqrt(-z))) * s2;
          var capitalT1 = [[0.5 * capitalS, Math.PI, -z], [1, -0.5, capitalX], [b1, b2], [a1], [], [], 0];
          var capitalT2 = [[-z], [-a1], [b1, b2], [b1 - a1, b2 - a1], [a1, a1 - b1 + 1, a1 - b2 + 1], [], 1 / z];
          return [capitalT1, capitalT2];
        };

        var _v = hypercomb(h, [a1, b1, b2], { force_series: true, maxterms: 4 * ctx.prec });
        if ([a1, b1, b2, z].every(ctx._isRealType)) {
          _v = _complex2.default.re(_v);
        }
        return _v;
      } catch (e) {
        if (e.name === 'NoConvergence') {
          // pass // python statement for do nothing.
        } else {
          // only catch NoConvergence errors
          throw e;
        }
      }
    } finally {
      ctx.prec = orig;
    }
  }
  // #print "not using asymp"
  var res = ctx.hypsum(1, 2, (a1type, b1type, b2type), [a1, b1, b2], z, opts);
  return res;
};
function _hyp1f0() {
  throw new Error('Not Implemented');
};
function _hyp2f1(aS, bS, z) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var h = void 0,
      v = void 0,
      t = void 0,
      ca = void 0,
      cb = void 0,
      rz = void 0,
      capitalT1 = void 0,
      capitalT2 = void 0;

  var _aS2 = _slicedToArray(aS, 2),
      _aS2$ = _slicedToArray(_aS2[0], 2),
      a = _aS2$[0],
      atype = _aS2$[1],
      _aS2$2 = _slicedToArray(_aS2[1], 2),
      b = _aS2$2[0],
      btype = _aS2$2[1];

  var _bS3 = _slicedToArray(bS, 2),
      c = _bS3[0],
      ctype = _bS3[1];

  if (_complex2.default.equals(z, 1)) {
    // TODO: the following logic can be simplified
    var convergent = _complex2.default.re(_complex2.default.sub(c, _complex2.default.add(a, b))) > 0;
    var finite = ctx.isint(a) && a <= 0 || ctx.isint(b) && b <= 0;
    var condition2 = !(ctx.isint(a) && c <= a <= 0 || ctx.isint(b) && c <= b <= 0);
    var zerodiv = ctx.isint(c) && c <= 0 && condition2;
    // print "bz", a, b, c, z, convergent, finite, zerodiv
    // Gauss's theorem gives the value if convergent
    if ((convergent || finite) && !zerodiv) {
      var _ca = _complex2.default.sub(c, a);
      return mpFactorials.gammaprod([c, _complex2.default.minus(_ca, b)], [_ca, _complex2.default.sub(c, b)], true);
    }
    // Otherwise, there is a pole and we take the
    // sign to be that when approaching from below
    // XXX: this evaluation is not necessarily correct in all cases
    return _complex2.default.mul(hyp2f1(a, b, c, 1 - ctx.eps * 2), Infinity);
  }
  // Equal to 1 (first term), unless there is a subsequent
  // division by zero
  if (!_complex2.default.isZero(z)) {
    // Division by zero but power of z is higher than
    // first order so cancels
    if (!_complex2.default.isZero(c) || _complex2.default.isZero(a) || _complex2.default.isZero(b)) {
      return _complex2.default.add(1, z);
    }
    // Indeterminate
    return NaN;
  }

  // Hit zero denominator unless numerator goes to 0 first
  if (ctx.isint(c) && c <= 0) {
    if (ctx.isint(a) && c <= a <= 0 || ctx.isint(b) && c <= b <= 0) {
      // pass; // Python statement to move on.
    } else {
      // Pole in series
      return Infinity;
    }
  }
  var absz = _complex2.default.abs(z);

  // Fast case: standard series converges rapidly,
  // possibly in finitely many terms
  if (absz <= 0.8 || ctx.isint(a) && a <= 0 && a >= -1000 || ctx.isint(b) && b <= 0 && b >= -1000) {
    return ctx.hypsum(2, 1, [atype, btype, ctype], [a, b, c], z, opts);
  }
  var orig = ctx.prec;
  try {
    ctx.prec += 10;
    // Use 1/z transformation
    if (absz >= 1.3) {
      h = function h(a, b) {
        var t = _complex2.default.sub(1, c);
        var ab = _complex2.default.sub(a, b);
        var rz = _complex2.default.div(1, z);
        var capitalT1 = ([_complex2.default.mul(-1, z)], [_complex2.default.mul(-1, a)], [c, _complex2.default.mul(-1, ab)], [b, _complex2.default.sub(c, a)], [a, _complex2.default.add(t, a)], [_complex2.default.add(1, ab)], rz);
        var capitalT2 = ([_complex2.default.mul(-1, z)], [_complex2.default.mul(-1, b)], [c, ab], [a, _complex2.default.sub(c, b)], [b, _complex2.default.add(t, b)], [_complex2.default.sub(1, ab)], rz);
        return [capitalT1, capitalT2];
      };
      v = hypercomb(h, [a, b], opts);

      // Use 1-z transformation
    } else if (_complex2.default.abs(_complex2.default.sub(1, z)) <= 0.75) {
      h = function h(a, b) {
        t = _complex2.default.sub(c, _complex2.default.add(a, b));
        ca = _complex2.default.sub(c, a);
        cb = _complex2.default.sub(c, b);
        rz = _complex2.default.sub(1, z);
        capitalT1 = [[], [], [c, t], [ca, cb], [a, b], [_complex2.default.sub(1, t)], rz];
        capitalT2 = [[rz], [t], [c, _complex2.default.mul(-1, t)], [a, b], [ca, cb], [_complex2.default.add(1, t)], rz];
        return [capitalT1, capitalT2];
      };
      v = hypercomb(h, [a, b], opts);

      // Use z/(z-1) transformation
    } else if (_complex2.default.abs(_complex2.default.div(z, _complex2.default.sub(z, 1))) <= 0.75) {
      var h2f1 = hyp2f1(a, _complex2.default.sub(c, b), c, _complex2.default.div(z, _complex2.default.sub(z, 1)));
      v = _complex2.default.div(h2f1, _complex2.default.pow(_complex2.default.sub(1, z), a));
    } else {
      // Remaining part of unit circle
      v = _hyp2f1Gosper(a, b, c, z, opts);
    }
  } finally {
    ctx.prec = orig;
  }
  return v;
};

function _hyp2f2() {
  throw new Error('Not Implemented');
};
function _hyp2f3() {
  throw new Error('Not Implemented');
};
function _hyp2f0(aS, bS, z) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var _aS3 = _slicedToArray(aS, 2),
      _aS3$ = _slicedToArray(_aS3[0], 2),
      a = _aS3$[0],
      atype = _aS3$[1],
      _aS3$2 = _slicedToArray(_aS3[1], 2),
      b = _aS3$2[0],
      btype = _aS3$2[1];
  // We want to try aggressively to use the asymptotic expansion,
  // and fall back only when absolutely necessary


  try {
    var optsb = JSON.parse(JSON.stringify(opts)); // TODO: do we really need a copy? copying is sorta rough in JS
    optsb['maxterms'] = py.get(optsb, 'maxterms', ctx.prec);
    return ctx.hypsum(2, 0, [atype, btype], [a, b], z, optsb);
  } catch (e) {
    if (e.name === 'NoConvergence') {
      if (py.get(opts, 'force_series')) {
        throw e;
      }
    } else {
      // only catch NoConvergence errors
      throw e;
    }
  }

  // THOUGHTS: you have the perturb of a so handle the subtraction better down below?
  var h = function h(a, b) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // HACK = manually handle perturbations
    // sin(pi*(b + h)) = sin(pi*b)cos(pi*h) + cos(pi * b)sin(pi*h)
    //
    // b = 0, 2, 4,
    // sin(pi*h)
    //
    // b = 1,3,5
    // -sin(pi*h)
    //
    // b = 1/2, 5/2, 9/2
    // cos(pi*h)
    //
    // b = 3/2, 7/2, 11/2
    // -cos(pi*h)
    var w = void 0;
    if (opts.perturbParams) {
      switch ((b * 2 + 1) % 4) {
        case 1:
          // 0, 2, 4
          w = Math.sin(Math.PI * opts.perturbParams[1]);
          break;
        case 2:
          // 1/2, 5/2, 9/2
          w = Math.cos(Math.PI * opts.perturbParams[1]);
          break;
        case 3:
          // 1,3,5
          w = -Math.sin(Math.PI * opts.perturbParams[1]);
          break;
        case 0:
          // 3/2, 7/2, 11/2
          w = -Math.cos(Math.PI * opts.perturbParams[1]);
          break;
        default:
          console.log('sinpi was perturbed but b was not half integer');
          w = math2.sinpi(b);
      }
    } else {
      w = math2.sinpi(b);
    }
    var rz = _complex2.default.mul(-1, _complex2.default.inverse(z));
    var aMinusB = _complex2.default.sub(a, b);
    var twoMinusB = _complex2.default.sub(2, b);
    // ws, cs, alphas, betas, as, bs, z
    var capitalT1 = [[Math.PI, w, rz], [1, -1, a], [], [_complex2.default.add(aMinusB, 1), b], [a], [b], rz];
    var capitalT2 = [[-Math.PI, w, rz], [1, -1, _complex2.default.add(1, aMinusB)], [], [a, twoMinusB], [_complex2.default.add(aMinusB, 1)], [twoMinusB], rz];
    return [capitalT1, capitalT2];
  };

  var aMinusB = _complex2.default.sub(a, b);
  return hypercomb(h, [a, _complex2.default.add(1, aMinusB)], opts);
};

function _hypq1fq() {
  throw new Error('Not Implemented');
};

// TODO - this was abandoned near completion because we realized we don't need it for
// the use case we're starting with. It's only lacking the quad function.
function _hypBorel(p, q, aS, bS, z, opts) {
  throw new Error('Not Fully Implemented / Tested');
  // if (aS) {
  //   [aS, aTypes] = pyp.unzip(aS)
  // } else {
  //   aS = []
  //   aTypes = []
  // }
  // if (bS) {
  //   [bS, bTypes] = py.unzip(bS)
  // } else {
  //   bS = []
  //   bTypes = []
  // }
  //
  // opts['maxterms'] = py.get(opts, 'maxterms', ctx.prec)
  // try {
  //   return ctx.hypsum(p, q, aTypes + bTypes, aS + bS, z, opts)
  // } catch (e) {
  //   if (e.name === 'NoConvergence') {
  //     // pass // python statement for do nothing.
  //   } else {
  //     // only catch NoConvergence errors
  //     throw e
  //   }
  // }
  // prec = ctx.prec
  // try {
  //   tol = opts.asymp_tol || (ctx.eps / 4)
  //   ctx.prec += 10
  //   function term (k, cache = { 0: 1 }) {
  //     if (k in cache) {
  //       return cache[k]
  //     }
  //     t = term(k - 1)
  //     aS.map((a) => t *= a + (k - 1))
  //     bS.map((b) => t /= b + (k - 1))
  //     t *= z
  //     t /= k
  //     cache[k] = t
  //     return t
  //   }
  //   s = 1
  //   for (k of py.range(1, ctx.prec)) {
  //     t = term(k)
  //     s += t
  //     if (Math.abs(t) <= tol) {
  //       return s
  //     }
  //   }
  // } finally {
  //   ctx.prec = prec
  // }
  // if (p <= q + 3) {
  //   if (!opts.contour) {
  //     if (Complex.arg(z) < 0.25) {
  //       u = Complex.div(z, max(1, Complex.abs(z)))
  //       if (Complex.arg(z) >= 0) {
  //         contour = [0, [0, 2], Complex.div([2, 2], u), Complex.div(2, u), Infinity]
  //       } else {
  //         contour = [0, [0, -2], Complex.div([2, -2], u), Complex.div(2, u), Infinity]
  //       }
  //       // contour = [0, 2j/z, 2/z, ctx.inf]
  //       // contour = [0, 2j, 2/z, ctx.inf]
  //       // contour = [0, 2j, ctx.inf]}
  //     } else {
  //       contour = [0, Infinity]
  //     }
  //   }
  //   quadOpts = opts.quadOpts || {}
  //   function g (t) {
  //     eToTheMinusT = Complex.exp(-t)
  //     hyperVal = hyper(aS, [...bS, 1], Complex.mul(t, z))
  //     return Complex.mul(eToTheMinusT, hyperVal)
  //   }
  //   quadOpts['error'] = true;
  //   [capitalI, err] = mpmath.quad(g, contour, quadOpts) // todo-missingfunc quad
  //   if (err <= abs(capitalI) * ctx.eps * 8) {
  //     return capitalI
  //   }
  // }
  // throw new ctx.UserException('_hyp_borel failed to converge')
};

exports.hypercomb = hypercomb;
exports.hyper = hyper;
exports.hyp2f0 = hyp2f0;
exports.hyp1f2 = hyp1f2;