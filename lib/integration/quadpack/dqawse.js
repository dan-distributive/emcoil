Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqawse = dqawse;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqmomo = require('./dqmomo.js');

var _dqc25s = require('./dqc25s.js');

var _dqpsrt3 = require('./dqpsrt.js');

function dqawse(f, a, b, alfa, beta, integr, epsabs, epsrel, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last) {
  var area = void 0,
      area1 = void 0,
      area12 = void 0,
      area2 = void 0,
      a1 = void 0,
      a2 = void 0,
      b1 = void 0,
      b2 = void 0,
      centre = void 0,
      epmach = void 0,
      errbnd = void 0,
      errmax = void 0,
      error1 = void 0,
      erro12 = void 0,
      error2 = void 0,
      errsum = void 0,
      resas1 = void 0,
      resas2 = void 0,
      rg = void 0,
      rh = void 0,
      ri = void 0,
      rj = void 0,
      uflow = void 0,
      iroff1 = void 0,
      iroff2 = void 0,
      k = void 0,
      maxerr = void 0,
      nev = void 0,
      nrmax = void 0;

  ri = new Float64Array(25);
  rj = new Float64Array(25);
  rh = new Float64Array(25);
  rg = new Float64Array(25);

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
        ier = 6;
        neval = 0;
        last = 0;
        rlist[0] = 0.0e+00;
        elist[0] = 0.0e+00;
        iord[0] = 0;
        result = 0.0e+00;
        abserr = 0.0e+00;
        if (b <= a || epsabs === 0.0e+00 && epsrel < Math.max(0.5e+02 * epmach, 0.5e-28) || alfa <= -0.1e+01 || beta <= -0.1e+01 || integr < 1 || integr > 4 || limit < 2) {
          goToLabel = 999;break;
        }
        ier = 0;
        //
        //           compute the modified chebyshev moments.
        //
        (0, _dqmomo.dqmomo)(alfa, beta, ri, rj, rg, rh, integr);
        //
        //           integrate over the intervals (a,(a+b)/2) and ((a+b)/2,b).
        //
        centre = 0.5e+00 * (b + a);
        (0, _dqc25s.dqc25s)(f, a, b, a, centre, alfa, beta, ri, rj, rg, rh, area1, error1, resas1, integr, nev);
        neval = nev;
        (0, _dqc25s.dqc25s)(f, a, b, centre, b, alfa, beta, ri, rj, rg, rh, area2, error2, resas2, integr, nev);
        last = 2;
        neval = neval + nev;
        result = area1 + area2;
        abserr = error1 + error2;
        //
        //           test on accuracy.
        //
        errbnd = Math.max(epsabs, epsrel * Math.abs(result));
        //
        //           initialization
        //           --------------
        //
        if (error2 > error1) {
          goToLabel = 10;break;
        }
        alist[0] = a;
        alist[1] = centre;
        blist[0] = centre;
        blist[1] = b;
        rlist[0] = area1;
        rlist[1] = area2;
        elist[0] = error1;
        elist[1] = error2;
        goToLabel = 20;break;
      case 10:
        alist[0] = centre;
        alist[1] = a;
        blist[0] = b;
        blist[1] = centre;
        rlist[0] = area2;
        rlist[1] = area1;
        elist[0] = error2;
        elist[1] = error1;
      case 20:
        iord[0] = 1;
        iord[1] = 2;
        if (limit === 2) ier = 1;
        if (abserr <= errbnd || ier === 1) {
          goToLabel = 999;break;
        }
        errmax = elist[0];
        maxerr = 1;
        nrmax = 1;
        area = result;
        errsum = abserr;
        iroff1 = 0;
        iroff2 = 0;
        //
        //            main do-loop
        //            ------------
        //
        for (last = 3; last <= limit; last++) {
          //
          //           bisect the subinterval with largest error estimate.
          //
          a1 = alist[maxerr - 1];
          b1 = 0.5e+00 * (alist[maxerr - 1] + blist[maxerr - 1]);
          a2 = b1;
          b2 = blist[maxerr - 1];
          //
          (0, _dqc25s.dqc25s)(f, a, b, a1, b1, alfa, beta, ri, rj, rg, rh, area1, error1, resas1, integr, nev);
          neval = neval + nev;
          (0, _dqc25s.dqc25s)(f, a, b, a2, b2, alfa, beta, ri, rj, rg, rh, area2, error2, resas2, integr, nev);
          neval = neval + nev;
          //
          //           improve previous approximations integral and error
          //           and test for accuracy.
          //
          area12 = area1 + area2;
          erro12 = error1 + error2;
          errsum = errsum + erro12 - errmax;
          area = area + area12 - rlist[maxerr - 1];
          if (a === a1 || b === b2 || resas1 === error1 || resas2 === error2) {
            // goToLabel = 30; break;
          } else {
            //
            //           test for roundoff error.
            //
            if (Math.abs(rlist[maxerr - 1] - area12) < 0.1e-04 * Math.abs(area12) && erro12 >= 0.99e+00 * errmax) iroff1 = iroff1 + 1;
            if (last > 10 && erro12 > errmax) iroff2 = iroff2 + 1;
          }
          // case 30:
          rlist[maxerr - 1] = area1;
          rlist[last - 1] = area2;
          //
          //           test on accuracy.
          //
          errbnd = Math.max(epsabs, epsrel * Math.abs(area));
          if (errsum <= errbnd) {
            // goToLabel = 35; break;
          } else {
            //
            //           set error flag in the case that the number of interval
            //           bisections exceeds limit.
            //
            if (last === limit) ier = 1;
            //
            //
            //           set error flag in the case of roundoff error.
            //
            if (iroff1 >= 6 || iroff2 >= 20) ier = 2;
            //
            //           set error flag in the case of bad integrand behaviour
            //           at interior points of integration range.
            //
            if (Math.max(Math.abs(a1), Math.abs(b2)) <= (0.1e+01 + 0.1e+03 * epmach) * (Math.abs(a2) + 0.1e+04 * uflow)) ier = 3;
          }
          //
          //           append the newly-created intervals to the list.
          //
          // case 35:
          if (error2 > error1) {
            alist[last - 1] = a2;
            blist[maxerr - 1] = b1;
            blist[last - 1] = b2;
            elist[maxerr - 1] = error1;
            elist[last - 1] = error2;
          } else {
            alist[maxerr - 1] = a2;
            alist[last - 1] = a1;
            blist[last - 1] = b1;
            rlist[maxerr - 1] = area2;
            rlist[last - 1] = area1;
            elist[maxerr - 1] = error2;
            elist[last - 1] = error1;
          }
          //
          //           subroutine() dqpsrt to maintain the descending ordering
          //           in the list of error estimates and select the subinterval
          //           with largest error estimate (to be bisected next).
          //

          // ***jump out of do-loop
          var _dqpsrt = (0, _dqpsrt3.dqpsrt)(limit, last, maxerr, errmax, elist, iord, nrmax);

          var _dqpsrt2 = _slicedToArray(_dqpsrt, 4);

          maxerr = _dqpsrt2[0];
          errmax = _dqpsrt2[1];
          iord = _dqpsrt2[2];
          nrmax = _dqpsrt2[3];
          if (ier !== 0 || errsum <= errbnd) {
            goToLabel = 70;break;
          }
        }
      //
      //           compute final result.
      //           ---------------------
      //
      case 70:
        result = 0.0e+00;
        for (k = 1; k <= last; k++) {
          result = result + rlist[k - 1];
        }
        abserr = errsum;
      case 999:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, alist, blist, rlist, elist, iord, last];
}