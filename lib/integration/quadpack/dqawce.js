Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqawce = dqawce;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqc25c = require('./dqc25c.js');

var _dqpsrt3 = require('./dqpsrt.js');

function dqawce(f, a, b, c, epsabs, epsrel, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last) {
  var aa = void 0,
      area = void 0,
      area1 = void 0,
      area12 = void 0,
      area2 = void 0,
      a1 = void 0,
      a2 = void 0,
      bb = void 0,
      b1 = void 0,
      b2 = void 0,
      epmach = void 0,
      errbnd = void 0,
      errmax = void 0,
      error1 = void 0,
      erro12 = void 0,
      error2 = void 0,
      errsum = void 0,
      uflow = void 0,
      iroff1 = void 0,
      iroff2 = void 0,
      k = void 0,
      krule = void 0,
      maxerr = void 0,
      nev = void 0,
      nrmax = void 0,
      condition = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        //
        //           test on validity of parameters
        //           ------------------------------
        //
        ier = 6;
        neval = 0;
        last = 0;
        alist[0] = a;
        blist[0] = b;
        rlist[0] = 0.0e+00;
        elist[0] = 0.0e+00;
        iord[0] = 0;
        result = 0.0e+00;
        abserr = 0.0e+00;
        if (c === a || c === b || epsabs <= 0.0e+00 && epsrel < Math.max(0.5e+02 * epmach, 0.5e-28)) {
          goToLabel = 999;break;
        }
        //
        //           first approximation to the integral
        //           -----------------------------------
        //
        aa = a;
        bb = b;
        if (a <= b) {
          goToLabel = 10;break;
        }
        aa = b;
        bb = a;
      case 10:
        ier = 0;
        krule = 1;
        (0, _dqc25c.dqc25c)(f, aa, bb, c, result, abserr, krule, neval);
        last = 1;
        rlist[0] = result;
        elist[0] = abserr;
        iord[0] = 1;
        alist[0] = a;
        blist[0] = b;
        //
        //           test on accuracy
        //
        errbnd = Math.max(epsabs, epsrel * Math.abs(result));
        if (limit === 1) ier = 1;
        if (abserr < Math.min(0.1e-01 * Math.abs(result), errbnd) || ier === 1) {
          goToLabel = 70;break;
        }
        //
        //           initialization
        //           --------------
        //
        alist[0] = aa;
        blist[0] = bb;
        rlist[0] = result;
        errmax = abserr;
        maxerr = 1;
        area = result;
        errsum = abserr;
        nrmax = 1;
        iroff1 = 0;
        iroff2 = 0;
        //
        //           main do-loop
        //           ------------
        //
        for (last = 2; last <= limit; last++) {
          //
          //           bisect the subinterval with nrmax-th largest
          //           error estimate.
          //
          a1 = alist[maxerr - 1];
          b1 = 0.5e+00 * (alist[maxerr - 1] + blist[maxerr - 1]);
          b2 = blist[maxerr - 1];
          if (c <= b1 && c > a1) b1 = 0.5e+00 * (c + b2);
          if (c > b1 && c < b2) b1 = 0.5e+00 * (a1 + c);
          a2 = b1;
          krule = 2;
          (0, _dqc25c.dqc25c)(f, a1, b1, c, area1, error1, krule, nev);
          neval = neval + nev;
          (0, _dqc25c.dqc25c)(f, a2, b2, c, area2, error2, krule, nev);
          neval = neval + nev;
          //
          //           improve previous approximations to integral
          //           and error and test for accuracy.
          //
          area12 = area1 + area2;
          erro12 = error1 + error2;
          errsum = errsum + erro12 - errmax;
          area = area + area12 - rlist[maxerr - 1];
          condition = Math.abs(rlist[maxerr - 1] - area12) < 0.1e-04 * Math.abs(area12) && erro12 >= 0.99e+00 * errmax && krule === 0;
          if (condition) iroff1 = iroff1 + 1;
          if (last > 10 && erro12 > errmax && krule === 0) iroff2 = iroff2 + 1;
          rlist[maxerr - 1] = area1;
          rlist[last - 1] = area2;
          errbnd = Math.max(epsabs, epsrel * Math.abs(area));
          if (errsum <= errbnd) {
            // goToLabel = 15; break;
          } else {
            //
            //           test for roundoff error and eventually set error flag.
            //
            if (iroff1 >= 6 && iroff2 > 20) ier = 2;
            //
            //           set error flag in the case that number of interval
            //           bisections exceeds limit.
            //
            if (last === limit) ier = 1;
            //
            //           set error flag in the case of bad integrand behaviour
            //           at a point of the integration range.
            //
            if (Math.max(Math.abs(a1), Math.abs(b2)) <= (0.1e+01 + 0.1e+03 * epmach) * (Math.abs(a2) + 0.1e+04 * uflow)) ier = 3;
          }
          //
          //           append the newly-created intervals to the list.
          //
          // case 15:
          if (error2 > error1) {
            alist[maxerr - 1] = a2;
            alist[last - 1] = a1;
            blist[last - 1] = b1;
            rlist[maxerr - 1] = area2;
            rlist[last - 1] = area1;
            elist[maxerr - 1] = error2;
            elist[last - 1] = error1;
          } else {
            alist[last - 1] = a2;
            blist[maxerr - 1] = b1;
            blist[last - 1] = b2;
            elist[maxerr - 1] = error1;
            elist[last - 1] = error2;
          }
          //
          //           subroutine() dqpsrt to maintain the descending ordering
          //           in the list of error estimates and select the subinterval
          //           with nrmax-th largest error estimate (to be bisected next).
          //

          // ***jump out of do-loop
          var _dqpsrt = (0, _dqpsrt3.dqpsrt)(limit, last, maxerr, errmax, elist, iord, nrmax);

          var _dqpsrt2 = _slicedToArray(_dqpsrt, 4);

          maxerr = _dqpsrt2[0];
          errmax = _dqpsrt2[1];
          iord = _dqpsrt2[2];
          nrmax = _dqpsrt2[3];
          if (ier !== 0 || errsum <= errbnd) break;
        }
        //
        //           compute final result.
        //           ---------------------
        //
        result = 0.0e+00;
        for (k = 1; k <= last; k++) {
          result = result + rlist[k - 1];
        }
        abserr = errsum;
      case 70:
        if (aa === b) result = -result;
      case 999:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, alist, blist, rlist, elist, iord, last];
}