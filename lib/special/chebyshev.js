Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chebyshev = function () {
  function Chebyshev() {
    _classCallCheck(this, Chebyshev);
  }

  _createClass(Chebyshev, null, [{
    key: 'tn',

    // SOURCE: https://en.wikipedia.org/wiki/Chebyshev_polynomials#Explicit_expressions
    // TODO: the following only accepts integer `n`s -
    //       Make continuous via the Gauss hypergeometric function
    // https://github.com/scipy/scipy/blob/master/scipy/special/cephes/hyp2f1.c
    value: function tn(n, viewX, x, viewR, r) {
      var arg = void 0;
      switch (true) {
        case Math.abs(viewX[x]) <= 1:
          arg = n * Math.acos(viewX[x]);
          viewR[r] = Math.cos(arg);
          break;
        case viewX[x] > 1:
          arg = n * Math.acosh(viewX[x]);
          viewR[r] = Math.cosh(arg);
          break;
        default:
          var sign = Math.pow(-1, n);
          arg = n * Math.acosh(-viewX[x]);
          viewR[r] = sign * Math.cosh(arg);
      }
    }

    // SOURCE: https://en.wikipedia.org/wiki/Chebyshev_polynomials#Explicit_expressions
    // TODO: same as tn

  }, {
    key: 'un',
    value: function un(n, viewX, x, viewR, r) {
      switch (true) {
        case Math.abs(viewX[x]) > 1:
          var rad = Math.sqrt(viewX[x] * viewX[x] - 1);
          var numerator = Math.pow(viewX[x] + rad, n + 1) - Math.pow(viewX[x] - rad, n + 1);
          var denominator = 2 * rad;
          viewR[r] = numerator / denominator;
          break;
        case Math.abs(viewX[x]) <= 1:
          // TODO, implement as hypergeometric to cover all ranges
          break;
        default:
      }
    }

    // Approximate the function `func` in the interval [a, b] with
    // an order-n Chebyshev polynomial (T).
    // f ≈ ∑c_k T_k(y) - c_0/2 where k = 0->(m-1) in integer steps.
    // Return the coeffecients c_n of that polynomial.
    // TODO - Numerical Recipes suggests that if `Math.cos` is bogging this down,
    // we should look at 12.3 and consider "fast cosine transform methods"

  }, {
    key: 'approx',
    value: function approx(func, a, b) {
      var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

      var y = void 0;
      var c = new Float64Array(n);
      var f = new Float64Array(n);

      var bma = 0.5 * (b - a);
      var bpa = 0.5 * (b + a);

      // Evaluate func at n points
      for (var k = 0; k < n; k++) {
        y = Math.cos(Math.PI * (k + 0.5) / n);
        f[k] = func(y * bma + bpa);
      }

      // Calculate the c_j
      var fac = 2.0 / n;
      var sum = 0.0;
      for (var j = 0; j < n; j++) {
        sum = 0.0;
        for (var _k = 0; _k < n; _k++) {
          sum += f[_k] * Math.cos(Math.PI * j * (_k + 0.5) / n);
        }

        c[j] = fac * sum;
      }

      return c;
    }

    // Chebyshev evaluation: The Chebyshev polynomial ∑c_k T_k(y) - c_0/2 where k=0->(m-1)
    // is evaluated at y = [x - (b+a)/2] / [(b-a)/2] using the coeffecients c. These coeffecients
    // can be calculated by AdvMathChebyshev::approx.

  }, {
    key: 'eval',
    value: function _eval(viewX, x, viewR, r, a, b, c) {
      var opts = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};

      var outOfRange = (viewX[x] - a) * (viewX[x] - b) > 0.0;
      if (outOfRange) {
        throw new Error('x not in range in Chebyshev::eval');
      }

      var sv = void 0,
          j = void 0;
      var d = 0.0;
      var dd = 0.0;

      // Change of variable
      var y = (2.0 * viewX[x] - a - b) / (b - a);
      var y2 = 2.0 * y;

      // Clenshaw’s recurrence
      var m = this.setm(c, opts);
      for (j = m - 1; j > 0; j--) {
        sv = d;
        d = y2 * d - dd + c[j];
        dd = sv;
      }

      viewR[r] = y * d - dd + 0.5 * c[0];
    }

    // Don't bother iterating over coeffecients less than opts.thresh

  }, {
    key: 'setm',
    value: function setm(c, opts) {
      var m = c.length;

      if (opts.thresh) {
        while (m > 1 && Math.abs(c[m - 1]) < opts.thresh) {
          m--;
        }
      } else if (opts.m) {
        m = opts.m;
      }
      return m;
    }
  }]);

  return Chebyshev;
}();

exports.default = Chebyshev;