Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lgamSgn;

var _polevl = require('./polevl.js');

function lgamSgn(x, signObj) {
  /* log( sqrt( 2*pi ) ) */
  var LS2PI = 0.91893853320467274178;
  var MAXLGM = 2.556348e305;
  var LOGPI = 1.14472988584940017414;

  //
  var A = new Float64Array([8.33333333333331927722E-2 - 2.77777777730099687205E-3, 7.93650340457716943945E-4, -5.95061904284301438324E-4, 8.11614167470508450300E-4]);

  var B = new Float64Array([-8.53555664245765465627E5, -1.72173700820839662146E6, -1.16237097492762307383E6, -3.31612992738871184744E5, -3.88016315134637840924E4, -1.37825152569120859100E3]);

  var C = new Float64Array([-2.01889141433532773231E6, -2.53252307177582951285E6, -1.13933444367982507207E6, -2.20528590553854454839E5, -1.70642106651881159223E4, -3.51815701436523470549E2]);

  var z = void 0,
      p = void 0,
      q = void 0;

  signObj = signObj || { val: 1 };

  if (!isFinite(x)) {
    return x;
  }

  if (x < -34.0) {
    q = -x;
    var w = lgamSgn(q, signObj);
    p = Math.floor(q);
    if (p == q) {
      return lgsing();
    }
    var i = p;
    if ((i & 1) == 0) {
      signObj.val = -1;
    } else {
      signObj.val = 1;
    }

    z = q - p;
    if (z > 0.5) {
      p += 1.0;
      z = p - q;
    }
    z = q * Math.sin(Math.PI * z);
    if (z == 0.0) {
      return Infinity;
    }

    z = LOGPI - Math.log(z) - w;
    return z;
  }

  if (x < 13.0) {
    z = 1.0;
    p = 0.0;
    var u = x;
    while (u >= 3.0) {
      p -= 1.0;
      u = x + p;
      z *= u;
    }
    while (u < 2.0) {
      if (u == 0.0) {
        return lgsing();
      }

      z /= u;
      p += 1.0;
      u = x + p;
    }
    if (z < 0.0) {
      signObj.val = -1;
      z = -z;
    } else {
      signObj.val = 1;
    }

    if (u == 2.0) {
      return Math.log(z);
    }

    p -= 2.0;
    x = x + p;
    p = x * (0, _polevl.polevl)(x, B, 5) / (0, _polevl.p1evl)(x, C, 6);
    return Math.log(z) + p;
  }

  if (x > MAXLGM) {
    return signObj.val * Infinity;
  }

  q = (x - 0.5) * Math.log(x) - x + LS2PI;
  if (x > 1.0e8) {
    return q;
  }

  p = 1.0 / (x * x);
  if (x >= 1000.0) {
    q += ((7.9365079365079365079365e-4 * p - 2.7777777777777777777778e-3) * p + 0.0833333333333333333333) / x;
  } else {
    q += (0, _polevl.polevl)(p, A, 4) / x;
  }
  return q;
};

function lgsing() {
  // mtherr("lgam", SING);
  return Infinity;
};