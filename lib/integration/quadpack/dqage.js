Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqage = dqage;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqk7 = require('./dqk15.js');

var _dqk8 = require('./dqk21.js');

var _dqk9 = require('./dqk31.js');

var _dqk10 = require('./dqk41.js');

var _dqk11 = require('./dqk51.js');

var _dqk12 = require('./dqk61.js');

var _dqpsrt3 = require('./dqpsrt.js');

function dqage(f, a, b, epsabs, epsrel, key, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last) {
  var area = void 0,
      area1 = void 0,
      area12 = void 0,
      area2 = void 0,
      a1 = void 0,
      a2 = void 0,
      b1 = void 0,
      b2 = void 0,
      defabs = void 0,
      defab1 = void 0,
      defab2 = void 0,
      epmach = void 0,
      errbnd = void 0,
      errmax = void 0,
      error1 = void 0,
      error2 = void 0,
      erro12 = void 0,
      errsum = void 0,
      resabs = void 0,
      uflow = void 0,
      iroff1 = void 0,
      iroff2 = void 0,
      k = void 0,
      keyf = void 0,
      maxerr = void 0,
      nrmax = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        //           test on validity of parameters
        //           ------------------------------
        //
        ier = 0;
        neval = 0;
        last = 0;
        result = 0.0e+00;
        abserr = 0.0e+00;
        alist[0] = a;
        blist[0] = b;
        rlist[0] = 0.0e+00;
        elist[0] = 0.0e+00;
        iord[0] = 0;
        if (epsabs <= 0.0e+00 && epsrel < Math.max(0.5e+02 * epmach, 0.5e-28)) ier = 6;
        if (ier === 6) {
          goToLabel = 999;break;
        }
        //
        //           first approximation to the integral
        //           -----------------------------------
        //
        keyf = key;
        if (key <= 0) keyf = 1;
        if (key >= 7) keyf = 6;
        neval = 0;
        if (keyf === 1) (0, _dqk7.dqk15)(f, a, b, result, abserr, defabs, resabs);
        if (keyf === 2) {
          ;

          var _dqk = (0, _dqk8.dqk21)(f, a, b, result, abserr, defabs, resabs);

          var _dqk2 = _slicedToArray(_dqk, 4);

          result = _dqk2[0];
          abserr = _dqk2[1];
          defabs = _dqk2[2];
          resabs = _dqk2[3];
        }if (keyf === 3) (0, _dqk9.dqk31)(f, a, b, result, abserr, defabs, resabs);
        if (keyf === 4) (0, _dqk10.dqk41)(f, a, b, result, abserr, defabs, resabs);
        if (keyf === 5) (0, _dqk11.dqk51)(f, a, b, result, abserr, defabs, resabs);
        if (keyf === 6) (0, _dqk12.dqk61)(f, a, b, result, abserr, defabs, resabs);
        last = 1;
        rlist[0] = result;
        elist[0] = abserr;
        iord[0] = 1;
        //
        //           test on accuracy.
        //
        errbnd = Math.max(epsabs, epsrel * Math.abs(result));
        if (abserr <= 0.5e+02 * epmach * defabs && abserr > errbnd) ier = 2;
        if (limit === 1) ier = 1;
        if (ier !== 0 || abserr <= errbnd && abserr !== resabs || abserr === 0.0e+00) {
          goToLabel = 60;break;
        }
        //
        //           initialization
        //           --------------
        //
        //
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
          //           bisect the subinterval with the largest error estimate.
          //
          a1 = alist[maxerr - 1];
          b1 = 0.5e+00 * (alist[maxerr - 1] + blist[maxerr - 1]);
          a2 = b1;
          b2 = blist[maxerr - 1];
          if (keyf === 1) (0, _dqk7.dqk15)(f, a1, b1, area1, error1, resabs, defab1);
          if (keyf === 2) {
            ;

            var _dqk3 = (0, _dqk8.dqk21)(f, a1, b1, area1, error1, resabs, defab1);

            var _dqk4 = _slicedToArray(_dqk3, 4);

            area1 = _dqk4[0];
            error1 = _dqk4[1];
            resabs = _dqk4[2];
            defab1 = _dqk4[3];
          }if (keyf === 3) (0, _dqk9.dqk31)(f, a1, b1, area1, error1, resabs, defab1);
          if (keyf === 4) (0, _dqk10.dqk41)(f, a1, b1, area1, error1, resabs, defab1);
          if (keyf === 5) (0, _dqk11.dqk51)(f, a1, b1, area1, error1, resabs, defab1);
          if (keyf === 6) (0, _dqk12.dqk61)(f, a1, b1, area1, error1, resabs, defab1);
          if (keyf === 1) (0, _dqk7.dqk15)(f, a2, b2, area2, error2, resabs, defab2);
          if (keyf === 2) {
            ;

            var _dqk5 = (0, _dqk8.dqk21)(f, a2, b2, area2, error2, resabs, defab2);

            var _dqk6 = _slicedToArray(_dqk5, 4);

            area2 = _dqk6[0];
            error2 = _dqk6[1];
            resabs = _dqk6[2];
            defab2 = _dqk6[3];
          }if (keyf === 3) (0, _dqk9.dqk31)(f, a2, b2, area2, error2, resabs, defab2);
          if (keyf === 4) (0, _dqk10.dqk41)(f, a2, b2, area2, error2, resabs, defab2);
          if (keyf === 5) (0, _dqk11.dqk51)(f, a2, b2, area2, error2, resabs, defab2);
          if (keyf === 6) (0, _dqk12.dqk61)(f, a2, b2, area2, error2, resabs, defab2);
          //
          //           improve previous approximations to integral
          //           and error and test for accuracy.
          //
          neval = neval + 1;
          area12 = area1 + area2;
          erro12 = error1 + error2;
          errsum = errsum + erro12 - errmax;
          area = area + area12 - rlist[maxerr - 1];
          if (defab1 === error1 || defab2 === error2) {
            // GO TO 5
          } else {
            if (Math.abs(rlist[maxerr - 1] - area12) <= 0.1e-04 * Math.abs(area12) && erro12 >= 0.99e+00 * errmax) iroff1 = iroff1 + 1;
            if (last > 10 && erro12 > errmax) iroff2 = iroff2 + 1;
          }
          // Label 5
          rlist[maxerr - 1] = area1;
          rlist[last - 1] = area2;
          errbnd = Math.max(epsabs, epsrel * Math.abs(area));
          if (errsum <= errbnd) {
            // GO TO 8
          } else {
            //
            //           test for roundoff error and eventually set error flag.
            //
            if (iroff1 >= 6 || iroff2 >= 20) ier = 2;
            //
            //           set error flag in the case that the number of subintervals
            //           equals limit.
            //
            if (last === limit) ier = 1;
            //
            //           set error flag in the case of bad integrand behaviour
            //           at a point of the integration range.
            //
            if (Math.max(Math.abs(a1), Math.abs(b2)) <= (0.1e+01 + 0.1e+03 * epmach) * (Math.abs(a2) + 0.1e+04 * uflow)) ier = 3;
            //
            //           append the newly-created intervals to the list.
            //
          }
          // LABEL 8
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
          // LABEL 20:
          //
          //           subroutine() dqpsrt to maintain the descending ordering
          //           in the list of error estimates and select the subinterval
          //           with the largest error estimate (to be bisected next).
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
      case 40:
        result = 0.0e+00;
        for (k = 1; k <= last; k++) {
          result = result + rlist[k - 1];
        }

        abserr = errsum;
      case 60:
        if (keyf !== 1) neval = (10 * keyf + 1) * (2 * neval + 1);
        if (keyf === 1) neval = 30 * neval + 15;
      case 999:

      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, alist, blist, rlist, elist, iord, last];
}