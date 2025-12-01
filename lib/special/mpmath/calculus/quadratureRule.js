Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
// PLEASE NOTE: this WIP was abandoned to get some other stuff out the door, it's translated
// in the most basic way and hasn't been checked at all.
var QuadratureRule = function () {
  function QuadratureRule() {
    _classCallCheck(this, QuadratureRule);

    throw new NotImplementedError('WIP');
    this.standardCache = {};
    this.transformedCache = {};
    this.intervalCount = {};
  }

  // Delete cached node data.


  _createClass(QuadratureRule, [{
    key: 'clear',
    value: function clear() {
      this.standardCache = {};
      this.transformedCache = {};
      this.intervalCount = {};
    }
  }, {
    key: 'calcNodes',
    value: function calcNodes(degree, prec) {
      var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // Compute nodes for the standard interval `[-1, 1]`. Subclasses
      // should probably implement only this method, and use
      // :func:`~mpmath.getNode` method to retrieve the nodes.
      throw new NotImplementedError();
    }
  }, {
    key: 'getNodes',
    value: function getNodes(a, b, degree, prec) {
      var verbose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      // Return nodes for given interval, degree and precision. The
      // nodes are retrieved from a cache if already computed;
      // otherwise they are computed by calling :func:`~mpmath.calcNodes`
      // and are then cached.
      // Subclasses should probably not implement this method,
      // but just implement :func:`~mpmath.calcNodes` for the actual
      // node computation.
      key = [a, b, degree, prec].toString(); // HACK: replicating original python design, not great javascript
      if (key in this.transformedCache) {
        return this.transformedCache[key];
      }
      orig = this.ctx.prec;
      try {
        this.ctx.prec = prec + 20;

        // Get nodes on standard interval
        standardCacheKey = [degree, prec].toString();
        if (standardCacheKey in this.standardCache) {
          nodes = this.standardCache[standardCacheKey];
        } else {
          nodes = this.calcNodes(degree, prec, verbose);
          this.standardCache[standardCache] = nodes;
        }

        // Transform to general interval
        nodes = this.transformNodes(nodes, a, b, verbose);
        if (key in this.intervalCount) {
          this.transformedCache[key] = nodes;
        } else {
          this.intervalCount[key] = true;
        }
      } finally {
        this.ctx.prec = orig;
      }
      return nodes;
    }

    // TODO - convert following to complex

  }, {
    key: 'transformNodes',
    value: function transformNodes(nodes, a, b) {
      var verbose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      // Rescale standardized nodes (for `[-1, 1]`) to a general
      // interval `[a, b]`. For a finite interval, a simple linear
      // change of variables is used. Otherwise, the following
      // transformations are used:
      // .. math ::
      //     \lbrack a, \infty \rbrack : t = \frac{1}{x} + (a-1)
      //     \lbrack -\infty, b \rbrack : t = (b+1) - \frac{1}{x}
      //     \lbrack -\infty, \infty \rbrack : t = \frac{x}{\sqrt{1-x^2}}
      ctx = this.ctx;
      a = ctx.convert(a);
      b = ctx.convert(b);
      if ([a, b] === [-1, 1]) {
        return nodes;
      }

      newNodes = [];
      if (a === Infinity || b === Infinity) {
        if ([a, b] === [-Infinity, Infinity]) {
          nodes.forEach(function (node) {
            var _node = _slicedToArray(node, 2);

            x = _node[0];
            w = _node[1];

            x2 = x * x;
            px1 = 1 - x2;
            spx1 = px1 ** -0.5;
            x = x * spx1;
            w *= spx1 / px1;
            newNodes.append((x, w));
          });
        } else if (a === -Infinity) {
          b1 = b + 1;
          nodes.forEach(function (node) {
            var _node2 = _slicedToArray(node, 2);

            x = _node2[0];
            w = _node2[1];

            u = 2 / (x + 1);
            x = b1 - u;
            w *= 0.5 * u ** 2;
            newNodes.append((x, w));
          });
        } else if (b === Infinity) {
          a1 = a - 1;
          nodes.forEach(function (node) {
            var _node3 = _slicedToArray(node, 2);

            x = _node3[0];
            w = _node3[1];

            u = 2 / (x + 1);
            x = a1 + u;
            w *= 0.5 * u ** 2;
            newNodes.append((x, w));
          });
        } else if (a === Infinity || b === -Infinity) {
          nodes = this.transformNodes(nodes, b, a, verbose);
          nodes = nodes.map(function (node) {
            var _node4 = _slicedToArray(node, 2);

            x = _node4[0];
            w = _node4[1];

            [x, -w];
          });
          return nodes;
        } else {
          throw new NotImplementedError();
        }
      } else {
        // Simple linear change of variables
        C = (b - a) / 2;
        D = (b + a) / 2;
        nodes.forEach(function (node) {
          var _node5 = _slicedToArray(node, 2);

          x = _node5[0];
          w = _node5[1];

          newNodes.append((D + C * x, C * w));
        });
      }
      return newNodes;
    }

    // TODO - check this method, does it do what it claims? Does it allow complex input?

  }, {
    key: 'guessDegree',
    value: function guessDegree(prec) {
      // Given a desired precision `p` in bits, estimate the degree `m`
      // of the quadrature required to accomplish full accuracy for
      // typical integrals. By default, :func:`~mpmath.quad` will perform up
      // to `m` iterations. The value of `m` should be a slight
      // overestimate, so that "slightly bad" integrals can be dealt
      // with automatically using a few extra iterations. On the
      // other hand, it should not be too big, so :func:`~mpmath.quad` can
      // quit within a reasonable amount of time when it is given
      // an "unsolvable" integral.
      // The default formula used by :func:`~mpmath.guessDegree` is tuned
      // for both :class:`TanhSinh` and :class:`GaussLegendre`.
      // The output is roughly as follows:
      //     +---------+---------+
      //     | `p`     | `m`     |
      //     +=========+=========+
      //     | 50      | 6       |
      //     +---------+---------+
      //     | 100     | 7       |
      //     +---------+---------+
      //     | 500     | 10      |
      //     +---------+---------+
      //     | 3000    | 12      |
      //     +---------+---------+
      // This formula is based purely on a limited amount of
      // experimentation and will sometimes be wrong.

      // Expected degree
      // XXX: use mag
      g = int(4 + max(0, this.ctx.log(prec / 30.0, 2)));
      // Reasonable "worst case"
      g += 2;
      return g;
    }

    // TODO - check this func, only basic translation has taken place

  }, {
    key: 'estimateError',
    value: function estimateError(results, prec, epsilon) {
      // Given results from integrations `[I_1, I_2, \ldots, I_k]` done
      // with a quadrature of rule of degree `1, 2, \ldots, k`, estimate
      // the error of `I_k`.
      // For `k = 2`, we estimate  `|I_{\infty}-I_2|` as `|I_2-I_1|`.
      // For `k > 2`, we extrapolate `|I_{\infty}-I_k| \approx |I_{k+1}-I_k|`
      // from `|I_k-I_{k-1}|` and `|I_k-I_{k-2}|` under the assumption
      // that each degree increment roughly doubles the accuracy of
      // the quadrature rule (this is true for both :class:`TanhSinh`
      // and :class:`GaussLegendre`). The extrapolation formula is given
      // by Borwein, Bailey & Girgensohn. Although not very conservative,
      // this method seems to be very robust in practice.
      if (results.length === 2) {
        return abs(results[0] - results[1]);
      }
      try {
        if (results[-1] === results[-2] === results[-3]) return 0;
        D1 = this.ctx.log(abs(results[-1] - results[-2]), 10);
        D2 = this.ctx.log(abs(results[-1] - results[-3]), 10);
      } catch (e) {
        if (e.name === 'ValueError') {
          return epsilon;
        } else {
          // only catch ValueError errors
          throw e;
        }
      }

      D3 = -prec;
      D4 = min(0, max(D1 ** 2 / D2, 2 * D1, D3));
      return this.ctx.mpf(10) ** int(D4);
    }

    // TODO same as others

  }, {
    key: 'summation',
    value: function summation(f, points, prec, epsilon, maxDegree) {
      var verbose = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      // Main integration function. Computes the 1D integral over
      // the interval specified by *points*. For each subinterval,
      // performs quadrature of degree from 1 up to *maxDegree*
      // until :func:`~mpmath.estimateError` signals convergence.
      // :func:`~mpmath.summation` transforms each subintegration to
      // the standard interval and then calls :func:`~mpmath.sumNext`.

      ctx = this.ctx;
      capitalI = err = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = xrange(len(points) - 1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          i = _step.value;
          var _ref = [points[i], points[i + 1]];
          a = _ref[0];
          b = _ref[1];

          if (a === b) continue;
          // XXX: we could use a single variable transformation,
          // but this is not good in practice. We get better accuracy
          // by having 0 as an endpoint.
          if ([a, b] === [-Infinity, Infinity]) {
            _f = f;
            f = function f(x) {
              _f(-x) + _f(x);
            };
            a = 0;
            b = Infinity;
          }
          results = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = xrange(1, maxDegree + 1)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              degree = _step2.value;

              nodes = this.getNode(a, b, degree, prec, verbose);
              if (verbose) {
                console.log('Integrating from ' + ctx.nstr(a) + ' to ' + ctx.nstr(b) + '\n            (degree ' + degree + ' of ' + maxDegree + ')');
              }
              results.append(this.sumNext(f, nodes, degree, prec, results, verbose));
              if (degree > 1) {
                err = this.estimateError(results, prec, epsilon);
                if (err <= epsilon) break;
                if (verbose) {
                  print('Estimated error:', ctx.nstr(err));
                }
              }
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

          capitalI += results[-1];
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

      if (err > epsilon) {
        if (verbose) {
          print('Failed to reach full accuracy. Estimated error:', ctx.nstr(err));
        }
      }
      return [capitalI, err];
    }
  }, {
    key: 'sumNext',
    value: function sumNext(f, nodes, degree, prec, previous) {
      var verbose = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      // Evaluates the step sum `\sum w_k f(x_k)` where the *nodes* list
      // contains the `(w_k, x_k)` pairs.
      // :func:`~mpmath.summation` will supply the list *results* of
      // values computed by :func:`~mpmath.sumNext` at previous degrees, in
      // case the quadrature rule is able to reuse them.
      thing = nodes.map(function (node) {
        var _node6 = _slicedToArray(node, 2);

        x = _node6[0];
        w = _node6[1];

        return [w, f(x)];
      });
      return this.ctx.fdot(thing);
    }
  }]);

  return QuadratureRule;
}();

exports.default = QuadratureRule;


function NotImplementedError() {
  this.name = 'NotImplementedError';
}