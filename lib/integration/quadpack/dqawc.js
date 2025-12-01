Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqawc = dqawc;

var _dqawce = require('./dqawce.js');

var _xerror = require('./xerror.js');

/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
function dqawc(f, a, b, c, epsabs, epsrel, result, abserr, neval, ier, limit, lenw, last, iwork, work) {
  var lvl = void 0,
      l1 = void 0,
      l2 = void 0,
      l3 = void 0;
  var goToLabel = 0;

  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //         check validity of limit and lenw.
        //
        ier = 6;
        neval = 0;
        last = 0;
        result = 0.0e+00;
        abserr = 0.0e+00;
        if (limit < 1 || lenw < limit * 4) {
          goToLabel = 10;break;
        }
        //
        //         prepare for() dqawce.
        //
        l1 = limit + 1;
        l2 = limit + l1;
        l3 = limit + l2;
        (0, _dqawce.dqawce)(f, a, b, c, epsabs, epsrel, limit, result, abserr, neval, ier, work[0], work[l1 - 1], work[l2 - 1], work[l3 - 1], iwork, last);
        //
        //         error() handler if necessary.
        //
        lvl = 0;
      case 10:
        if (ier === 6) lvl = 1;
        if (ier !== 0) (0, _xerror.xerror)('abnormal return from dqawc', 26, ier, lvl);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, limit, lenw, last, iwork, work];
}