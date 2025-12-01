Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hankel = undefined;

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Hankel's asymptotic expansion
* for large x.
* AMS55 #9.2.5.
*/

function hankel(n, x) {
  var t = void 0,
      u = void 0,
      z = void 0,
      k = void 0,
      sign = void 0,
      conv = void 0,
      p = void 0,
      q = void 0,
      j = void 0,
      m = void 0,
      pp = void 0,
      qq = void 0,
      flag = void 0;
  m = 4.0 * n * n;
  j = 1.0;
  z = 8.0 * x;
  k = 1.0;
  p = 1.0;
  u = (m - 1.0) / z;
  q = u;
  sign = 1.0;
  conv = 1.0;
  flag = 0;
  t = 1.0;
  pp = 1.0e38;
  qq = 1.0e38;

  while (t > constants.MACHEP) {
    k += 2.0;
    j += 1.0;
    sign = -sign;
    u *= (m - k * k) / (j * z);
    p += sign * u;
    k += 2.0;
    j += 1.0;
    u *= (m - k * k) / (j * z);
    q += sign * u;
    t = Math.abs(u / p);
    if (t < conv) {
      conv = t;
      qq = q;
      pp = p;
      flag = 1;
    }
    /* stop if the terms start getting larger */
    if (flag !== 0 && t > conv) break;
  }

  u = x - (0.5 * n + 0.25) * Math.PI;
  t = Math.sqrt(2.0 / (Math.PI * x)) * (pp * Math.cos(u) - qq * Math.sin(u));
  return t;
}

exports.hankel = hankel;