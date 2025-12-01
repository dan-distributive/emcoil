Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqawf = dqawf;

var _dqawfe = require('./dqawfe.js');

var _xerror = require('./xerror.js');

/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
function dqawf(f, a, omega, integr, epsabs, result, abserr, neval, ier, limlst, lst, leniw, maxp1, lenw, iwork, work) {
  // let last // never used?
  var limit = void 0,
      ll2 = void 0,
      lvl = void 0,
      l1 = void 0,
      l2 = void 0,
      l3 = void 0,
      l4 = void 0,
      l5 = void 0,
      l6 = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //         check validity of limlst, leniw, maxp1 and lenw.
        //
        ier = 6;
        neval = 0;
        // last = 0; // never used?
        result = 0.0e+00;
        abserr = 0.0e+00;
        if (limlst < 3 || leniw < limlst + 2 || maxp1 < 1 || lenw < leniw * 2 + maxp1 * 25) {
          goToLabel = 10;break;
        }
        //
        //         prepare for() dqawfe
        //
        limit = (leniw - limlst) / 2;
        l1 = limlst + 1;
        l2 = limlst + l1;
        l3 = limit + l2;
        l4 = limit + l3;
        l5 = limit + l4;
        l6 = limit + l5;
        ll2 = limit + l1;
        (0, _dqawfe.dqawfe)(f, a, omega, integr, epsabs, limlst, limit, maxp1, result, abserr, neval, ier, work[0], work[l1 - 1], iwork[0], lst, work[l2 - 1], work[l3 - 1], work[l4 - 1], work[l5 - 1], iwork[l1 - 1], iwork[ll2 - 1], work[l6 - 1]);
        //
        //         error() handler if necessary
        //
        lvl = 0;
      case 10:
        if (ier === 6) lvl = 1;
        if (ier !== 0) (0, _xerror.xerror)('abnormal return from dqawf', 26, ier, lvl);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, limlst, lst, leniw, maxp1, lenw, iwork, work];
}