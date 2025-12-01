Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hys2f1 = undefined;

var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

var _hyp2f1ra = require('./hyp2f1ra.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hys2f1(a, b, c, x, lossObj) {
  var intflag = 0;
  var f = void 0;
  // Ensure that |a| > |b| ...
  if (Math.abs(b) > Math.abs(a)) {
    f = b;
    b = a;
    a = f;
  }

  var intB = Math.round(b);

  if (Math.abs(b - intB) < constants.EPS && intB <= 0 && Math.abs(b) < Math.abs(a)) {
    // except when `b` is a smaller negative integer
    f = b;
    b = a;
    a = f;
    intflag = 1;
  }

  if ((Math.abs(a) > Math.abs(c) + 1 || intflag) && Math.abs(c - a) > 2 && Math.abs(a) > 2) {
    // |a| >> |c| implies that large cancellation error is to be expected.
    // We try to reduce it with the recurrence relations
    return (0, _hyp2f1ra.hyp2f1ra)(a, b, c, x, lossObj);
  }

  var i = 0;
  var umax = 0.0;
  f = a;
  var g = b;
  var h = c;
  var s = 1.0;
  var u = 1.0;
  var k = 0.0;
  do {
    if (Math.abs(h) < constants.EPS) {
      lossObj.val = 1.0;
      return Infinity;
    }
    var m = k + 1.0;
    u = u * ((f + k) * (g + k) * x / ((h + k) * m));
    s += u;
    k = Math.abs(u); // remember largest term summed
    if (k > umax) {
      umax = k;
    }
    k = m;
    // should never happen
    if (++i > constants.MAX_ITERATIONS) {
      lossObj.val = 1.0;
      return s;
    }
  } while (s === 0 || Math.abs(u / s) > constants.MACHEP);

  /* return estimated relative error */
  lossObj.val = constants.MACHEP * umax / Math.abs(s) + constants.MACHEP * i;

  return s;
};

exports.hys2f1 = hys2f1;