Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// List of sources:
//
// ComplexJS: https://github.com/infusion/Complex.js

// Thoughts:
// Inline functions instead of calling class?
var Complex = function () {
  function Complex() {
    _classCallCheck(this, Complex);
  }

  _createClass(Complex, null, [{
    key: "equals",
    value: function equals(a, b) {
      var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-14;

      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      return Math.abs(a[0] - b[0]) <= precision && Math.abs(a[1] - b[1]) <= precision;
    }
  }, {
    key: "abs",
    value: function abs(a) {
      if (Complex.isReal(a)) {
        return Math.abs(Complex.re(a));
      }
      return Math.sqrt(a[0] ** 2 + a[1] ** 2);
    }

    // angle

  }, {
    key: "arg",
    value: function arg(a) {
      a = Complex.ensureComplex(a);
      return Math.atan2(a[1], a[0]);
    }
  }, {
    key: "add",
    value: function add(a, b) {
      if (Complex.isReal(a) && Complex.isReal(b)) {
        return Complex.re(a) + Complex.re(b);
      }
      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      return [a[0] + b[0], a[1] + b[1]];
    }
  }, {
    key: "sub",
    value: function sub(a, b) {
      if (Complex.isReal(a) && Complex.isReal(b)) {
        return Complex.re(a) - Complex.re(b);
      }
      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      return [a[0] - b[0], a[1] - b[1]];
    }
  }, {
    key: "mul",
    value: function mul(a, b) {
      if (Complex.isReal(a) && Complex.isReal(b)) {
        return Complex.re(a) * Complex.re(b);
      }
      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      var realPart = a[0] * b[0] - a[1] * b[1];
      var imagPart = a[0] * b[1] + a[1] * b[0];
      return [realPart, imagPart];
    }
  }, {
    key: "div",
    value: function div(a, b) {
      if (Complex.isReal(a) && Complex.isReal(b)) {
        return Complex.re(a) / Complex.re(b);
      }
      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      var denominator = b[0] ** 2 + b[1] ** 2;
      var realPart = (a[0] * b[0] + a[1] * b[1]) / denominator;
      var imagPart = (a[1] * b[0] - a[0] * b[1]) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "sqrt",
    value: function sqrt(a) {
      if (Complex.isReal(a) && a >= 0) {
        return Math.sqrt(Complex.re(a));
      }
      if (Complex.isReal(a) && a < 0) {
        return [0, Math.sqrt(-Complex.re(a))];
      }
      a = Complex.ensureComplex(a);
      var mod = Math.sqrt(a[0] ** 2 + a[1] ** 2);
      var realPart = Math.sqrt((mod + a[0]) / 2);
      var sign = Math.sign(a[1]);
      // If imaginary part is 0 then use positive
      if (sign === 0) {
        sign = 1;
      }
      var imagPart = sign * Math.sqrt((mod - a[0]) / 2);
      return [realPart, imagPart];
    }
  }, {
    key: "exp",
    value: function exp(a) {
      if (Complex.isReal(a)) {
        return Math.exp(Complex.re(a));
      }
      var expA = Math.exp(a[0]);
      var realPart = expA * Math.cos(a[1]);
      var imagPart = expA * Math.sin(a[1]);
      return [realPart, imagPart];
    }

    /* Notes from complex.js for Complex.pow
    *
    * a + bi ^ c + di   = (a + bi)^(c + di)
    *               = exp((c + di) * log(a + bi)
    *               = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
    * =>...
    * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
    * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
    *
    * =>...
    * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
    * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
    *
    * =>
    * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
    * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
    *
    */

  }, {
    key: "pow",
    value: function pow(a, b) {
      if (Complex.isReal(a) && Complex.isReal(b)) {
        var result = Math.pow(Complex.re(a), Complex.re(b));
        if (!isNaN(result)) {
          return result;
        }
      }
      a = Complex.ensureComplex(a);
      b = Complex.ensureComplex(b);
      var atan2 = Math.atan2(a[1], a[0]);
      var logsqr = Math.log(Math.sqrt(a[0] ** 2 + a[1] ** 2));

      var preR = Math.exp(b[0] * logsqr - b[1] * atan2);
      var preRi = b[1] * logsqr + b[0] * atan2;

      var realPart = preR * Math.cos(preRi);
      var imagPart = preR * Math.sin(preRi);

      return [realPart, imagPart];
    }
  }, {
    key: "log",
    value: function log(a) {
      if (Complex.isReal(a)) {
        return Math.log(Complex.re(a));
      }
      var realPart = Math.log(Math.sqrt(a[0] ** 2 + a[1] ** 2));
      var imagPart = Math.atan2(a[1], a[0]);
      return [realPart, imagPart];
    }
  }, {
    key: "sin",
    value: function sin(a) {
      if (Complex.isReal(a)) {
        return Math.sin(Complex.re(a));
      }
      var realPart = Math.sin(a[0]) * Math.cosh(a[1]);
      var imagPart = Math.cos(a[0]) * Math.sinh(a[1]);
      return [realPart, imagPart];
    }
  }, {
    key: "cos",
    value: function cos(a) {
      if (Complex.isReal(a)) {
        return Math.cos(Complex.re(a));
      }
      var realPart = Math.cos(a[0]) * Math.cosh(a[1]);
      var imagPart = -Math.sin(a[0]) * Math.sinh(a[1]);
      return [realPart, imagPart];
    }
  }, {
    key: "tan",
    value: function tan(a) {
      if (Complex.isReal(a)) {
        return Math.tan(Complex.re(a));
      }
      var denominator = Math.cos(a[0] * 2) + Math.cosh(a[1] * 2);
      var realPart = Math.sin(a[0] * 2) / denominator;
      var imagPart = Math.sinh(a[1] * 2) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "cot",
    value: function cot(a) {
      a = Complex.ensureComplex(a);
      var denominator = Math.cos(a[0] * 2) - Math.cosh(a[1] * 2);
      var realPart = -Math.sin(a[0] * 2) / denominator;
      var imagPart = Math.sinh(a[1] * 2) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "sec",
    value: function sec(a) {
      a = Complex.ensureComplex(a);
      var denominator = 0.5 * Math.cosh(a[1] * 2) + 0.5 * Math.cos(a[0] * 2);
      var realPart = Math.cos(a[0]) * Math.cosh(a[1]) / denominator;
      var imagPart = Math.sin(a[0]) * Math.sinh(a[1]) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "csc",
    value: function csc(a) {
      a = Complex.ensureComplex(a);
      var denominator = 0.5 * Math.cosh(a[1] * 2) - 0.5 * Math.cos(a[0] * 2);
      var realPart = Math.sin(a[0]) * Math.cosh(a[1]) / denominator;
      var imagPart = -Math.cos(a[0]) * Math.sinh(a[1]) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "asin",
    value: function asin(a) {
      if (Complex.isReal(a)) {
        return Math.asin(Complex.re(a));
      }
      var realPart = a[1] ** 2 - a[0] ** 2 + 1;
      var imagPart = -2 * a[0] * a[1];

      var _Complex$sqrt = Complex.sqrt([realPart, imagPart]);

      var _Complex$sqrt2 = _slicedToArray(_Complex$sqrt, 2);

      realPart = _Complex$sqrt2[0];
      imagPart = _Complex$sqrt2[1];


      realPart = realPart - a[1];
      imagPart = imagPart + a[0];

      var _Complex$log = Complex.log([realPart, imagPart]);

      var _Complex$log2 = _slicedToArray(_Complex$log, 2);

      realPart = _Complex$log2[0];
      imagPart = _Complex$log2[1];


      return [imagPart, -realPart];
    }
  }, {
    key: "acos",
    value: function acos(a) {
      if (Complex.isReal(a)) {
        return Math.acos(Complex.re(a));
      }
      var realPart = void 0,
          imagPart = void 0;

      var _Complex$asin = Complex.asin(a);

      var _Complex$asin2 = _slicedToArray(_Complex$asin, 2);

      realPart = _Complex$asin2[0];
      imagPart = _Complex$asin2[1];

      return [Math.PI / 2 - realPart, -imagPart];
    }
  }, {
    key: "atan",
    value: function atan(a) {
      if (Complex.isReal(a)) {
        return Math.atan(Complex.re(a));
      }
      var denominator = a[0] ** 2 + (a[1] - 1) ** 2;

      var realPart = (1 - a[1] ** 2 - a[0] ** 2) / denominator;
      var imagPart = -2 * a[0] / denominator;

      var _Complex$log3 = Complex.log([realPart, imagPart]);

      var _Complex$log4 = _slicedToArray(_Complex$log3, 2);

      realPart = _Complex$log4[0];
      imagPart = _Complex$log4[1];


      return [imagPart * -0.5, realPart * 0.5];
    }
  }, {
    key: "acot",
    value: function acot(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.atan([realPart, imagPart]);
    }
  }, {
    key: "asec",
    value: function asec(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.acos([realPart, imagPart]);
    }
  }, {
    key: "acsc",
    value: function acsc(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.asin([realPart, imagPart]);
    }
  }, {
    key: "sinh",
    value: function sinh(a) {
      if (Complex.isReal(a)) {
        return Math.sinh(Complex.re(a));
      }
      var realPart = Math.sinh(a[0]) * Math.cos(a[1]);
      var imagPart = Math.cosh(a[0]) * Math.sin(a[1]);
      return [realPart, imagPart];
    }
  }, {
    key: "cosh",
    value: function cosh(a) {
      if (Complex.isReal(a)) {
        return Math.cosh(Complex.re(a));
      }
      var realPart = Math.cosh(a[0]) * Math.cos(a[1]);
      var imagPart = Math.sinh(a[0]) * Math.sin(a[1]);
      return [realPart, imagPart];
    }
  }, {
    key: "tanh",
    value: function tanh(a) {
      if (Complex.isReal(a)) {
        return Math.tanh(Complex.re(a));
      }
      var denominator = Math.cosh(a[0] * 2) + Math.cos(a[1] * 2);
      var realPart = Math.sinh(a[0] * 2) / denominator;
      var imagPart = Math.sin(a[1] * 2) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "coth",
    value: function coth(a) {
      a = Complex.ensureComplex(a);
      var denominator = Math.cosh(a[0] * 2) - Math.cos(a[1] * 2);
      var realPart = Math.sinh(a[0] * 2) / denominator;
      var imagPart = -Math.sin(a[1] * 2) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "csch",
    value: function csch(a) {
      a = Complex.ensureComplex(a);
      var denominator = Math.cos(a[1] * 2) - Math.cosh(a[0] * 2);
      var realPart = -2 * Math.sinh(a[0]) * Math.cos(a[1]) / denominator;
      var imagPart = 2 * Math.cosh(a[0]) * Math.sin(a[1]) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "sech",
    value: function sech(a) {
      a = Complex.ensureComplex(a);
      var denominator = Math.cos(a[1] * 2) + Math.cosh(a[0] * 2);
      var realPart = 2 * Math.cosh(a[0]) * Math.cos(a[1]) / denominator;
      var imagPart = -2 * Math.sinh(a[0]) * Math.sin(a[1]) / denominator;
      return [realPart, imagPart];
    }
  }, {
    key: "asinh",
    value: function asinh(a) {
      if (Complex.isReal(a)) {
        return Math.asinh(Complex.re(a));
      }
      var realPart = void 0,
          imagPart = void 0;

      var _Complex$asin3 = Complex.asin([a[1], -a[0]]);

      var _Complex$asin4 = _slicedToArray(_Complex$asin3, 2);

      realPart = _Complex$asin4[0];
      imagPart = _Complex$asin4[1];

      return [-imagPart, realPart];
    }
  }, {
    key: "acosh",
    value: function acosh(a) {
      if (Complex.isReal(a)) {
        return Math.acosh(Complex.re(a));
      }

      var _Complex$acos = Complex.acos(a),
          _Complex$acos2 = _slicedToArray(_Complex$acos, 2),
          realPart = _Complex$acos2[0],
          imagPart = _Complex$acos2[1];

      if (imagPart <= 0) {
        return [-imagPart, realPart];
      } else {
        return [imagPart, -realPart];
      }
    }
  }, {
    key: "atanh",
    value: function atanh(a) {
      if (Complex.isReal(a)) {
        return Math.atanh(Complex.re(a));
      }
      var denominator = (1 - a[0]) ** 2 + a[1] ** 2;

      var realPart = ((1 + a[0]) * (1 - a[0]) - a[1] ** 2) / denominator;
      var imagPart = (a[1] * (1 - a[0]) + a[1] * (1 + a[0])) / denominator;

      var cache = Math.log(Math.sqrt(realPart ** 2 + imagPart ** 2)) / 2;
      imagPart = Math.atan2(imagPart, realPart) / 2;
      realPart = cache;

      return [realPart, imagPart];
    }
  }, {
    key: "acoth",
    value: function acoth(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.atanh([realPart, imagPart]);
    }
  }, {
    key: "acsch",
    value: function acsch(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.asinh([realPart, imagPart]);
    }
  }, {
    key: "asech",
    value: function asech(a) {
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] / denominator;
      var imagPart = -a[1] / denominator;

      return Complex.acosh([realPart, imagPart]);
    }
  }, {
    key: "inverse",
    value: function inverse(a) {
      if (Complex.isReal(a)) {
        return 1 / Complex.re(a);
      }
      a = Complex.ensureComplex(a);
      var denominator = a[0] ** 2 + a[1] ** 2;

      var realPart = a[0] === 0 ? 0 : a[0] / denominator;
      var imagPart = a[1] === 0 ? 0 : -a[1] / denominator;

      return [realPart, imagPart];
    }

    // default imaginary part to zero if non-array is passed

  }, {
    key: "ensureComplex",
    value: function ensureComplex(arg) {
      return arg.constructor === Array ? arg : [arg, 0];
    }

    // Return the real part of complex or just return if float

  }, {
    key: "re",
    value: function re(arg) {
      return arg.constructor === Array ? arg[0] : arg;
    }

    // Return the imaginary part or just 0 if float

  }, {
    key: "im",
    value: function im(arg) {
      return arg.constructor === Array ? arg[1] : 0;
    }
  }, {
    key: "isZero",
    value: function isZero(arg) {
      if (arg.constructor === Array && arg.length > 1) {
        return arg[0] === 0 && arg[1] === 0;
      } else if (arg.constructor === Array && arg.length > 0) {
        return arg[0] === 0;
      } else {
        return arg === 0;
      }
    }
  }, {
    key: "prod",
    value: function prod(numbers) {
      var total = Complex.mul(numbers[0], numbers[1]);
      for (var i = 2; i < numbers.length; i++) {
        total = Complex.mul(total, numbers[i]);
      }
      return total;
    }
  }, {
    key: "sum",
    value: function sum(numbers) {
      var total = [0, 0];
      for (var i = 0; i < numbers.length; i++) {
        if (numbers[i].constructor === Array) {
          total[0] += numbers[i][0];
          total[1] += numbers[i][1];
        } else {
          total[0] += numbers[i];
        }
      }
      return total;
    }

    // Check for size of imaginary component compared to real component.

  }, {
    key: "isReal",
    value: function isReal(x) {
      if (x.constructor === Array) {
        return x[0] + x[1] === x[0];
      } else {
        return true;
      }
    }
  }]);

  return Complex;
}();

module.exports = Complex;
