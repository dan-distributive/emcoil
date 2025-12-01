Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqawo = dqawo;

var _dqawoe = require('./dqawoe.js');

var _xerror = require('./xerror.js');

/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
function dqawo(f, a, b, omega, integr, epsabs, epsrel, result, abserr, neval, ier, leniw, maxp1, lenw, last, iwork, work) {
  var limit = void 0,
      lvl = void 0,
      l1 = void 0,
      l2 = void 0,
      l3 = void 0,
      l4 = void 0,
      momcom = void 0;
  var goToLabel = 0;

  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //         check validity of leniw, maxp1 and lenw.
        //
        ier = 6;
        neval = 0;
        last = 0;
        result = 0.0e+00;
        abserr = 0.0e+00;
        if (leniw < 2 || maxp1 < 1 || lenw < leniw * 2 + maxp1 * 25) {
          goToLabel = 10;break;
        }
        //
        //         prepare for() dqawoe
        //
        limit = Math.trunc(leniw / 2);
        l1 = limit + 1;
        l2 = limit + l1;
        l3 = limit + l2;
        l4 = limit + l3;
        (0, _dqawoe.dqawoe)(f, a, b, omega, integr, epsabs, epsrel, limit, 1, maxp1, result, abserr, neval, ier, last, work[0], work[l1 - 1], work[l2 - 1], work[l3 - 1], iwork[0], iwork[l1 - 1], momcom, work[l4 - 1]);
        //
        //         error() handler if necessary
        //
        lvl = 0;
      case 10:
        if (ier === 6) lvl = 0;
        if (ier !== 0) (0, _xerror.xerror)('abnormal return from dqawo', 26, ier, lvl);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, leniw, maxp1, lenw, last, iwork, work];
}