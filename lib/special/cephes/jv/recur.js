Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recur = undefined;

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Reduce the order by backward recurrence.
* AMS55 #9.1.27 and 9.1.73.
*/
function recur(n, x, newn, cancel) {
  var pkm2 = void 0,
      pkm1 = void 0,
      pk = void 0,
      qkm2 = void 0,
      qkm1 = void 0,
      k = void 0,
      ans = void 0,
      qk = void 0,
      xk = void 0,
      yk = void 0,
      r = void 0,
      t = void 0,
      kf = void 0,
      nflag = void 0,
      ctr = void 0,
      miniter = void 0,
      maxiter = void 0;

  /* Continued fraction for Jn(x)/Jn-1(x)
  * AMS 9.1.73
  *
  *    x       -x^2      -x^2
  * ------  ---------  ---------   ...
  * 2 n +   2(n+1) +   2(n+2) +
  *
  * Compute it with the simplest possible algorithm.
  *
  * This continued fraction starts to converge when (|n| + m) > |x|.
  * Hence, at least |x|-|n| iterations are necessary before convergence is
  * achieved. There is a hard limit set below, m <= 30000, which is chosen
  * so that no branch in `jv` requires more iterations to converge.
  * The exact maximum number is (500/3.6)^2 - 500 ~ 19000
  */
  var BIG = 1.44115188075855872E+17;
  maxiter = 22000;
  miniter = Math.abs(x) - Math.abs(n);
  if (miniter < 1) miniter = 1;
  if (n < 0.0) nflag = 1;else nflag = 0;

  var goToLabel = 'fstart';
  mainExecutionLoop: while (true) {
    innerSwitch: switch (goToLabel) {
      case 'fstart':
        pkm2 = 0.0;
        qkm2 = 1.0;
        pkm1 = x;
        qkm1 = 2 * n;
        xk = -x * x;
        yk = qkm1;
        ans = 0.0; /* ans=0.0 ensures that t=1.0 in the first iteration */
        ctr = 0;
        do {
          yk += 2.0;
          pk = pkm1 * yk + pkm2 * xk;
          qk = qkm1 * yk + qkm2 * xk;
          pkm2 = pkm1;
          pkm1 = pk;
          qkm2 = qkm1;
          qkm1 = qk;

          /* check convergence */
          if (qk !== 0 && ctr > miniter) r = pk / qk;else r = 0.0;

          if (r !== 0) {
            t = Math.abs((ans - r) / r);
            ans = r;
          } else {
            t = 1.0;
          }

          if (++ctr > maxiter) {
            // mtherr("jv", UNDERFLOW);
            goToLabel = 'done';break innerSwitch;
          }
          if (t < constants.MACHEP) {
            goToLabel = 'done';break innerSwitch;
          }

          /* renormalize coefficients */
          if (Math.abs(pk) > BIG) {
            pkm2 /= BIG;
            pkm1 /= BIG;
            qkm2 /= BIG;
            qkm1 /= BIG;
          }
        } while (t > constants.MACHEP);

      case 'done':
        if (ans === 0) ans = 1.0;

        /* Change n to n-1 if n < 0 and the continued fraction is small */
        if (nflag > 0) {
          if (Math.abs(ans) < 0.125) {
            nflag = -1;
            n--;
            goToLabel = 'fstart';break;
          }
        }

        kf = newn;

        /* backward recurrence
        *              2k
        *  J   (x)  =  --- J (x)  -  J   (x)
        *   k-1         x   k         k+1
        */

        pk = 1.0;
        pkm1 = 1.0 / ans;
        k = n - 1.0;
        r = 2 * k;
        do {
          pkm2 = (pkm1 * r - pk * x) / x;
          /*      pkp1 = pk; */
          pk = pkm1;
          pkm1 = pkm2;
          r -= 2.0;
          /*
          * t = Math.abs(pkp1) + Math.abs(pk);
          * if( (k > (kf + 2.5)) && (Math.abs(pkm1) < 0.25*t) )
          * {
          * k -= 1.0;
          * t = x*x;
          * pkm2 = ( (r*(r+2.0)-t)*pk - r*x*pkp1 )/t;
          * pkp1 = pk;
          * pk = pkm1;
          * pkm1 = pkm2;
          * r -= 2.0;
          * }
          */
          k -= 1.0;
        } while (k > kf + 0.5);

        /* Take the larger of the last two iterates
        * on the theory that it may have less cancellation error.
        */

        if (cancel) {
          if (kf >= 0.0 && Math.abs(pk) > Math.abs(pkm1)) {
            k += 1.0;
            pkm2 = pk;
          }
        }
        newn = k;
      default:
        break mainExecutionLoop;
    }
  }
  return [pkm2, n, newn];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
exports.recur = recur;