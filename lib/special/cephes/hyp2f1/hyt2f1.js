Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyt2f1 = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

var _gamma = require('../gamma.js');

var _lgam = require('../gamma/lgam.js');

var _psi = require('../psi.js');

var _hys2f = require('./hys2f1.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hyt2f1(a, b, c, x, lossObj) {
  var negIntA = 0;
  var negIntB = 0;
  var e = void 0,
      d1 = void 0,
      d2 = void 0,
      aid = void 0,
      y = void 0,
      t = void 0,
      r = void 0,
      q = void 0,
      sgngam = void 0,
      res = void 0,
      y1 = void 0;

  var aInt = Math.round(a);
  var bInt = Math.round(b);

  if (a <= 0 && Math.abs(a - aInt) < constants.EPS) {
    // a is a negative integer
    negIntA = 1;
  }

  if (b <= 0 && Math.abs(b - bInt) < constants.EPS) {
    // b is a negative integer
    negIntB = 1;
  }

  var errObj = { val: 0.0 };
  var err1Obj = { val: null // note: in original cephes lib err1 is initialized with no value.
  };var s = 1.0 - x;
  if (x < -0.5 && !(negIntA || negIntB)) {
    if (b > a) {
      y = Math.pow(s, -a) * (0, _hys2f.hys2f1)(a, c - b, c, -x / s, errObj);
    } else {
      y = Math.pow(s, -b) * (0, _hys2f.hys2f1)(c - a, b, c, -x / s, errObj);
    }
    return y;
  }

  var d = c - a - b;
  var dInt = Math.round(d);

  if (x > 0.9 && !(negIntA || negIntB)) {
    if (Math.abs(d - dInt) > constants.EPS) {
      // test for integer c-a-b
      // Try the power series first
      y = (0, _hys2f.hys2f1)(a, b, c, x, errObj);
      if (errObj.val < constants.ETHRESH) {
        return y;
      }

      // If power series fails, then apply AMS55 #15.3.6
      q = (0, _hys2f.hys2f1)(a, b, 1.0 - d, s, errObj);
      var sign = 1;
      var w = void 0;
      // lgamSgn(d, &sgngam);

      var _lgamSgn = (0, _lgam.lgamSgn)(d);

      var _lgamSgn2 = _slicedToArray(_lgamSgn, 2);

      w = _lgamSgn2[0];
      sgngam = _lgamSgn2[1];

      sign *= sgngam;

      var _lgamSgn3 = (0, _lgam.lgamSgn)(c - a);

      var _lgamSgn4 = _slicedToArray(_lgamSgn3, 2);

      res = _lgamSgn4[0];
      sgngam = _lgamSgn4[1];

      w -= res;
      sign *= sgngam;

      var _lgamSgn5 = (0, _lgam.lgamSgn)(c - b);

      var _lgamSgn6 = _slicedToArray(_lgamSgn5, 2);

      res = _lgamSgn6[0];
      sgngam = _lgamSgn6[1];

      w -= res;
      sign *= sgngam;
      q *= sign * Math.exp(w);
      r = Math.pow(s, d) * (0, _hys2f.hys2f1)(c - a, c - b, d + 1.0, s, err1Obj);
      sign = 1;

      var _lgamSgn7 = (0, _lgam.lgamSgn)(-d);

      var _lgamSgn8 = _slicedToArray(_lgamSgn7, 2);

      w = _lgamSgn8[0];
      sgngam = _lgamSgn8[1];

      sign *= sgngam;

      var _lgamSgn9 = (0, _lgam.lgamSgn)(a);

      var _lgamSgn10 = _slicedToArray(_lgamSgn9, 2);

      res = _lgamSgn10[0];
      sgngam = _lgamSgn10[1];

      w -= res;
      sign *= sgngam;

      var _lgamSgn11 = (0, _lgam.lgamSgn)(b);

      var _lgamSgn12 = _slicedToArray(_lgamSgn11, 2);

      res = _lgamSgn12[0];
      sgngam = _lgamSgn12[1];

      w -= res;
      sign *= sgngam;
      r *= sign * Math.exp(w);
      y = q + r;

      // estimate cancellation error
      q = Math.abs(q);
      r = Math.abs(r);
      if (q > r) {
        r = q;
      }
      errObj.val += err1Obj.val + constants.MACHEP * r / y;

      y *= (0, _gamma.gamma)(c);
      return y;
    } else {
      /* Psi function expansion, AMS55 #15.3.10, #15.3.11, #15.3.12
      *
      * Although AMS55 does not explicitly state it, this expansion fails
      * for negative integer a or b, since the psi and Gamma functions
      * involved have poles.
      */

      if (dInt >= 0.0) {
        e = d;
        d1 = d;
        d2 = 0.0;
        aid = dInt;
      } else {
        e = -d;
        d1 = 0.0;
        d2 = d;
        aid = -dInt;
      }

      var ax = Math.log(s);

      // sum for t = 0
      y = (0, _psi.psi)(1.0) + (0, _psi.psi)(1.0 + e) - (0, _psi.psi)(a + d1) - (0, _psi.psi)(b + d1) - ax;
      y /= (0, _gamma.gamma)(e + 1.0);

      // Poch for t=1
      var p = (a + d1) * (b + d1) * s / (0, _gamma.gamma)(e + 2.0);
      t = 1.0;
      do {
        r = (0, _psi.psi)(1.0 + t) + (0, _psi.psi)(1.0 + t + e) - (0, _psi.psi)(a + t + d1) - (0, _psi.psi)(b + t + d1) - ax;
        q = p * r;
        y += q;
        p *= s * (a + t + d1) / (t + 1.0);
        p *= (b + t + d1) / (t + 1.0 + e);
        t += 1.0;
        // should never happen
        if (t > constants.MAX_ITERATIONS) {
          // mtherr("hyp2f1", TOOMANY);
          lossObj.val = 1.0;
          return NaN;
        }
      } while (y === 0 || Math.abs(q / y) > constants.EPS);

      if (dInt === 0.0) {
        y *= (0, _gamma.gamma)(c) / ((0, _gamma.gamma)(a) * (0, _gamma.gamma)(b));
        return y;
      }

      y1 = 1.0;

      if (aid === 1) {
        return nosum(a, aid, b, c, d1, d2, dInt, e, q, s, y, y1);
      }

      t = 0.0;
      p = 1.0;
      for (var i = 1; i < aid; i++) {
        r = 1.0 - e + t;
        p *= s * (a + t + d2) * (b + t + d2) / r;
        t += 1.0;
        p /= t;
        y1 += p;
      }
      return nosum(a, aid, b, c, d1, d2, dInt, e, q, s, y, y1);
    }
  }

  // Use defining power series if no special cases
  y = (0, _hys2f.hys2f1)(a, b, c, x, errObj);
  return y;
};

function nosum(a, aid, b, c, d1, d2, dInt, e, q, s, y, y1) {
  var p = (0, _gamma.gamma)(c);
  y1 *= (0, _gamma.gamma)(e) * p / ((0, _gamma.gamma)(a + d1) * (0, _gamma.gamma)(b + d1));

  y *= p / ((0, _gamma.gamma)(a + d2) * (0, _gamma.gamma)(b + d2));
  if ((aid & 1) !== 0) {
    y = -y;
  }
  q = Math.pow(s, dInt);
  if (dInt > 0.0) {
    y *= q;
  } else {
    y1 *= q;
  }

  y += y1;
  return y;
};

exports.hyt2f1 = hyt2f1;