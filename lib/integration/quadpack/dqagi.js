Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqagi = dqagi;

var _dqagie3 = require('./dqagie.js');

var _xerror = require('./xerror.js');

function dqagi(f, bound, inf, epsabs, epsrel, result, abserr, neval, ier, limit, lenw, last, iwork, work) {
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
        //         prepare for() dqagie.
        //
        l1 = limit + 1;
        l2 = limit + l1;
        l3 = limit + l2;
        //

        var _dqagie = (0, _dqagie3.dqagie)(f, bound, inf, epsabs, epsrel, limit, result, abserr, neval, ier, work[0], work[l1 - 1], work[l2 - 1], work[l3 - 1], iwork, last);

        var _dqagie2 = _slicedToArray(_dqagie, 10);

        result = _dqagie2[0];
        abserr = _dqagie2[1];
        neval = _dqagie2[2];
        ier = _dqagie2[3];
        last = _dqagie2[9];

        console.log('dqagi not fully translated, the work array doesn\'t have all data in it.');
        //
        //         error() handler if necessary.
        //
        lvl = 0;
      case 10:
        if (ier === 6) lvl = 1;
        if (ier !== 0) (0, _xerror.xerror)('abnormal return from dqagi', 26, ier, lvl);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, limit, lenw, last, iwork, work];
}