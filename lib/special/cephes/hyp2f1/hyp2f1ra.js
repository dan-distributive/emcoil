Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hyp2f1ra = undefined;

var _constants = require('./constants.js');

var constants = _interopRequireWildcard(_constants);

var _hys2f = require('./hys2f1.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function hyp2f1ra(a, b, c, x, lossObj) {
  var da = void 0,
      f2 = void 0,
      f1 = void 0,
      f0 = void 0,
      err = void 0,
      n = void 0;

  // Don't cross c or zero
  if (c < 0 && a <= c || c >= 0 && a >= c) {
    da = Math.round(a - c);
  } else {
    da = Math.round(a);
  }
  var t = a - da;

  lossObj.val = 0;

  // assert(da !== 0);

  if (Math.abs(da) > constants.MAX_ITERATIONS) {
    /* Too expensive to compute this value, so give up */
    // mtherr("hyp2f1", TLOSS);
    lossObj.val = 1.0;
    return NaN;
  }

  if (da < 0) {
    // Recurse down
    f2 = 0;
    f1 = (0, _hys2f.hys2f1)(t, b, c, x, err);
    lossObj.val += err;
    f0 = (0, _hys2f.hys2f1)(t - 1, b, c, x, err);
    lossObj.val += err;
    t -= 1;
    for (n = 1; n < -da; ++n) {
      f2 = f1;
      f1 = f0;
      f0 = -(2 * t - c - t * x + b * x) / (c - t) * f1 - t * (x - 1) / (c - t) * f2;
      t -= 1;
    }
  } else {
    // Recurse up
    f2 = 0;
    f1 = (0, _hys2f.hys2f1)(t, b, c, x, err);
    lossObj.val += err;
    f0 = (0, _hys2f.hys2f1)(t + 1, b, c, x, err);
    lossObj.val += err;
    t += 1;
    for (n = 1; n < da; ++n) {
      f2 = f1;
      f1 = f0;
      f0 = -((2 * t - c - t * x + b * x) * f1 + (c - t) * f2) / (t * (x - 1));
      t += 1;
    }
  }

  return f0;
};

exports.hyp2f1ra = hyp2f1ra;