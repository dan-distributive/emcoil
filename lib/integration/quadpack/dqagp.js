Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqagp = dqagp;

var _dqagpe3 = require('./dqagpe.js');

var _xerror = require('./xerror.js');

function dqagp(f, a, b, npts2, points, epsabs, epsrel, result, abserr, neval, ier, leniw, lenw, last, iwork, work) {
  var limit = void 0,
      lvl = void 0,
      l1 = void 0,
      l2 = void 0,
      l3 = void 0,
      l4 = void 0;
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
        if (leniw < 3 * npts2 - 2 || lenw < leniw * 2 - npts2 || npts2 < 2) {
          goToLabel = 10;break;
        }
        //
        //         prepare for() dqagpe.
        //
        limit = (leniw - npts2) / 2;
        l1 = limit + 1;
        l2 = limit + l1;
        l3 = limit + l2;
        l4 = limit + l3;
        //

        var _dqagpe = (0, _dqagpe3.dqagpe)(f, a, b, npts2, points, epsabs, epsrel, limit, result, abserr, neval, ier, work[0], work[l1 - 1], work[l2 - 1], work[l3 - 1], work[l4 - 1], iwork[0], iwork[l1 - 1], iwork[l2 - 1], last);

        var _dqagpe2 = _slicedToArray(_dqagpe, 13);

        result = _dqagpe2[0];
        abserr = _dqagpe2[1];
        neval = _dqagpe2[2];
        ier = _dqagpe2[3];
        last = _dqagpe2[12];

        console.log('dqagp not fully translated, the work and iwork arrays don\'t have all of the data\n        they\'re supposed to have.');
        //
        //         error() handler if necessary.
        //
        lvl = 0;
      case 10:
        if (ier === 6) lvl = 1;
        if (ier !== 0) (0, _xerror.xerror)('abnormal return from dqagp', 26, ier, lvl);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, leniw, lenw, last, iwork, work];
}