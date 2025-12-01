Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyp2f1 = hyp2f1;

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

var _gamma = require('../gamma.js');

var _gamma2 = _interopRequireDefault(_gamma);

var _hyt2f = require('./hyt2f1.js');

var _hyt2f2 = _interopRequireDefault(_hyt2f);

var _hys2f = require('./hys2f1.js');

var _hys2f2 = _interopRequireDefault(_hys2f);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hyp2f1(a, b, c, x) {
  if (x == 0.0) {
    return 1.0;
  }

  if ((a == 0 || b == 0) && c != 0) {
    return 1.0;
  }

  var negIntA = 0;
  var negIntB = 0;
  var negIntCaOrCb = 0;

  var err = 0.0;
  var xAbs = Math.abs(x);
  var s = 1.0 - x;
  var aInt = Math.round(a); /* nearest integer to a */
  var bInt = Math.round(b);

  var d = c - a - b;
  var dInt = Math.round(d);

  // a is a negative integer
  if (a <= 0 && Math.abs(a - aInt) < constants.EPS) {
    negIntA = 1;
  }

  // b is a negative integer
  if (b <= 0 && Math.abs(b - bInt) < constants.EPS) {
    negIntB = 1;
  }

  if (d <= -1 && !(Math.abs(d - dInt) > constants.EPS && s < 0) && !(negIntA || negIntB)) {
    return Math.pow(s, d) * hyp2f1(c - a, c - b, c, x);
  }
  if (d <= 0 && x == 1 && !(negIntA || negIntB)) {
    return hypdiv();
  }

  /* 2F1(a,b;b;x) = (1-x)**(-a) */
  if (xAbs < 1.0 || x == -1.0) {
    // b = c
    if (Math.abs(b - c) < constants.EPS) {
      y = s ** -a;
      return hypdon(y, err);
    }

    // a = c
    if (Math.abs(a - c) < constants.EPS) {
      y = s ** -b;
      return hypdon(y, err);
    }
  }

  if (c <= 0.0) {
    cInt = Math.round(c);
    // c is a negative integer
    if (Math.abs(c - cInt) < constants.EPS) {
      // check if termination before explosion
      if (negIntA && aInt > cInt) {
        return hypok(a, b, c, x, err);
      }
      if (negIntB && bInt > cInt) {
        return hypok(a, b, c, x, err);
      }
      return hypdiv();
    }
  }

  // function is a polynomaIntl
  if (negIntA || negIntB) {
    return hypok(a, b, c, x, err);
  }

  var t1 = Math.abs(b - a);

  if (x < -2.0 && Math.abs(t1 - Math.round(t1)) > constants.EPS) {
    // This transform has a pole for b-a integer, and
    // may produce large cancellation errors for |1/x| close to 1
    var _p = hyp2f1(a, 1 - c + a, 1 - b + a, 1.0 / x);
    var _q = hyp2f1(b, 1 - c + b, 1 - a + b, 1.0 / x);
    _p *= Math.pow(-x, -a);
    _q *= Math.pow(-x, -b);
    t1 = (0, _gamma2.default)(c);
    s = t1 * (0, _gamma2.default)(b - a) / ((0, _gamma2.default)(b) * (0, _gamma2.default)(c - a));
    y = t1 * (0, _gamma2.default)(a - b) / ((0, _gamma2.default)(a) * (0, _gamma2.default)(c - b));
    return s * _p + y * _q;
  } else if (x < -1.0) {
    if (Math.abs(a) < Math.abs(b)) {
      return Math.pow(s, -a) * hyp2f1(a, c - b, c, x / (x - 1));
    } else {
      return Math.pow(s, -b) * hyp2f1(b, c - a, c, x / (x - 1));
    }
  }

  // series diverges
  if (xAbs > 1.0) {
    return hypdiv();
  }

  p = c - a;
  // nearest integer to c-a
  aInt = Math.round(p);

  // negative int c - a
  if (aInt <= 0.0 && Math.abs(p - aInt) < constants.EPS) {
    negIntCaOrCb = 1;
  }

  var r = c - b;
  // nearest integer to c-b
  bInt = Math.round(r);

  if (bInt <= 0.0 && Math.abs(r - bInt) < constants.EPS) {
    negIntCaOrCb = 1;
  }

  // nearest integer to d
  dInt = Math.round(d);
  q = Math.abs(d - dInt);

  // |x| == 1.0
  if (Math.abs(xAbs - 1.0) < constants.EPS) {
    if (x > 0.0) {
      if (negIntCaOrCb) {
        return d >= 0.0 ? hypf(a, b, c, d, s, x, err) : hypdiv();
      }
      if (d <= 0.0) {
        hypdiv();
      }
      y = (0, _gamma2.default)(c) * (0, _gamma2.default)(d) / ((0, _gamma2.default)(p) * (0, _gamma2.default)(r));
      return hypdon(y, err);
    }

    if (d <= -1.0) {
      return hypdiv();
    }

    // Conditionally make d > 0 by recurrence on c
    if (d < 0.0) {
      // Try the power series first
      y = (0, _hyt2f2.default)(a, b, c, x, err);

      if (err < constants.ETHRESH) {
        return hypdon(y, err);
      }

      /* Apply the recurrence if power series fails */
      err = 0.0;
      aid = 2 - dInt;
      e = c + aid;
      d2 = hyp2f1(a, b, e, x);
      d1 = hyp2f1(a, b, e + 1.0, x);
      q = a + b + 1.0;
      for (i = 0; i < aid; i++) {
        r = e - 1.0;
        y = (e * (r - (2.0 * e - q) * x) * d2 + (e - a) * (e - b) * x * d1) / (e * r * s);
        e = r;
        d1 = d2;
        d2 = y;
      }

      return hypdon(y, err);
    }

    // negative integer c-a or c-b
    if (negIntCaOrCb) {
      return hypf(a, b, c, d, s, x, err);
    }
  }
}

function hypok(a, b, c, x, err) {
  y = (0, _hyt2f2.default)(a, b, c, x, err);
  return hypdon(y, err);
}

function hypdon(y, err) {
  if (err > constants.ETHRESH) {
    // printf( "Estimated err = %.2e\n", err );
    // mtherr("hyp2f1", PLOSS);
  }
  return y;
}

// The transformation for c-a or c-b negative integer
function hypf(a, b, c, d, s, x, err) {
  y = pow(s, d) * (0, _hys2f2.default)(c - a, c - b, c, x, err);
  return hypdon(y, err);
}

// The alarm exit
function hypdiv() {
  // mtherr("hyp2f1", OVERFLOW);
  return Infinity;
}