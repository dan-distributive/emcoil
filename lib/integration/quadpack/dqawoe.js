Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqawoe = dqawoe;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqc25f = require('./dqc25f.js');

var _dqpsrt3 = require('./dqpsrt.js');

var _dqelg3 = require('./dqelg.js');

function dqawoe(f, a, b, omega, integr, epsabs, epsrel, limit, icall, maxp1, result, abserr, neval, ier, last, alist, blist, rlist, elist, iord, nnlog, momcom, chebmo) {
  var abseps = void 0,
      area = void 0,
      area1 = void 0,
      area12 = void 0,
      area2 = void 0,
      a1 = void 0,
      a2 = void 0,
      b1 = void 0,
      b2 = void 0,
      correc = void 0,
      defab1 = void 0,
      defab2 = void 0,
      defabs = void 0,
      domega = void 0,
      dres = void 0,
      epmach = void 0,
      erlarg = void 0,
      erlast = void 0,
      errbnd = void 0,
      errmax = void 0,
      error1 = void 0,
      erro12 = void 0,
      error2 = void 0,
      errsum = void 0,
      ertest = void 0,
      oflow = void 0,
      resabs = void 0,
      reseps = void 0,
      res3la = void 0,
      rlist2 = void 0,
      small = void 0,
      uflow = void 0,
      width = void 0,
      id = void 0,
      ierro = void 0,
      iroff1 = void 0,
      iroff2 = void 0,
      iroff3 = void 0,
      jupbnd = void 0,
      k = void 0,
      ksgn = void 0,
      ktmin = void 0,
      maxerr = void 0,
      nev = void 0,
      nres = void 0,
      nrmax = void 0,
      nrmom = void 0,
      numrl2 = void 0,
      extrap = void 0,
      noext = void 0,
      extall = void 0;

  rlist2 = new Float64Array(52);
  res3la = new Float64Array(3);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        epmach = (0, _d1mach.d1mach)(4);
        //
        //         test on validity of parameters
        //         ------------------------------
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
        nnlog[0] = 0;
        if (integr !== 1 && integr !== 2 || epsabs <= 0.0e+00 && epsrel < Math.max(0.5e+02 * epmach, 0.5e-28) || icall < 1 || maxp1 < 1) ier = 6;
        if (ier === 6) {
          goToLabel = 999;break;
        }
        //
        //           first approximation to the integral
        //           -----------------------------------
        //
        domega = Math.abs(omega);
        nrmom = 0;
        if (icall > 1) {
          goToLabel = 5;break;
        }
        momcom = 0;
      case 5:
        (0, _dqc25f.dqc25f)(f, a, b, domega, integr, nrmom, maxp1, 0, result, abserr, neval, defabs, resabs, momcom, chebmo);
        //
        //           test on accuracy.
        //
        dres = Math.abs(result);
        errbnd = Math.max(epsabs, epsrel * dres);
        rlist[0] = result;
        elist[0] = abserr;
        iord[0] = 1;
        if (abserr <= 0.1e+03 * epmach * defabs && abserr > errbnd) ier = 2;
        if (limit === 1) ier = 1;
        if (ier !== 0 || abserr <= errbnd) {
          goToLabel = 200;break;
        }
        //
        //           initializations
        //           ---------------
        //
        uflow = (0, _d1mach.d1mach)(1);
        oflow = (0, _d1mach.d1mach)(2);
        errmax = abserr;
        maxerr = 1;
        area = result;
        errsum = abserr;
        abserr = oflow;
        nrmax = 1;
        extrap = false;
        noext = false;
        ierro = 0;
        iroff1 = 0;
        iroff2 = 0;
        iroff3 = 0;
        ktmin = 0;
        small = Math.abs(b - a) * 0.75e+00;
        nres = 0;
        numrl2 = 0;
        extall = false;
        if (0.5e+00 * Math.abs(b - a) * domega > 0.2e+01) {
          goToLabel = 10;break;
        }
        numrl2 = 1;
        extall = true;
        rlist2[0] = result;
      case 10:
        if (0.25e+00 * Math.abs(b - a) * domega <= 0.2e+01) extall = true;
        ksgn = -1;
        if (dres >= (0.1e+01 - 0.5e+02 * epmach) * defabs) ksgn = 1;
        //
        //           main do-loop
        //           ------------
        //
        mainDoLoop: for (last = 2; last <= limit; last++) {
          //
          //           bisect the subinterval with the nrmax-th largest
          //           error estimate.
          //
          nrmom = nnlog[maxerr - 1] + 1;
          a1 = alist[maxerr - 1];
          b1 = 0.5e+00 * (alist[maxerr - 1] + blist[maxerr - 1]);
          a2 = b1;
          b2 = blist[maxerr - 1];
          erlast = errmax;
          (0, _dqc25f.dqc25f)(f, a1, b1, domega, integr, nrmom, maxp1, 0, area1, error1, nev, resabs, defab1, momcom, chebmo);
          neval = neval + nev;
          (0, _dqc25f.dqc25f)(f, a2, b2, domega, integr, nrmom, maxp1, 1, area2, error2, nev, resabs, defab2, momcom, chebmo);
          neval = neval + nev;
          //
          //           improve previous approximations to integral
          //           and error and test for accuracy.
          //
          area12 = area1 + area2;
          erro12 = error1 + error2;
          errsum = errsum + erro12 - errmax;
          area = area + area12 - rlist[maxerr - 1];
          if (defab1 === error1 || defab2 === error2) {
            // goToLabel = 25; break;
          } else {
            if (Math.abs(rlist[maxerr - 1] - area12) > 0.1e-04 * Math.abs(area12) || erro12 < 0.99e+00 * errmax) {
              // goToLabel = 20; break;
            } else {
              if (extrap) iroff2 = iroff2 + 1;
              if (!extrap) iroff1 = iroff1 + 1;
            }
            // case 20:
            if (last > 10 && erro12 > errmax) iroff3 = iroff3 + 1;
          }
          // case 25:
          rlist[maxerr - 1] = area1;
          rlist[last - 1] = area2;
          nnlog[maxerr - 1] = nrmom;
          nnlog[last - 1] = nrmom;
          errbnd = Math.max(epsabs, epsrel * Math.abs(area));
          //
          //           test for roundoff error and eventually set error flag.
          //
          if (iroff1 + iroff2 >= 10 || iroff3 >= 20) ier = 2;
          if (iroff2 >= 5) ierro = 3;
          //
          //           set error flag in the case that the number of
          //           subintervals equals limit.
          //
          if (last === limit) ier = 1;
          //
          //           set error flag in the case of bad integrand behaviour
          //           at a point of the integration range.
          //
          if (Math.max(Math.abs(a1), Math.abs(b2)) <= (0.1e+01 + 0.1e+03 * epmach) * (Math.abs(a2) + 0.1e+04 * uflow)) ier = 4;
          //
          //           append the newly-created intervals to the list.
          //
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
          //           with nrmax-th largest error estimate (to bisected next).
          //

          // ***jump out of do-loop
          var _dqpsrt = (0, _dqpsrt3.dqpsrt)(limit, last, maxerr, errmax, elist, iord, nrmax);

          var _dqpsrt2 = _slicedToArray(_dqpsrt, 4);

          maxerr = _dqpsrt2[0];
          errmax = _dqpsrt2[1];
          iord = _dqpsrt2[2];
          nrmax = _dqpsrt2[3];
          if (errsum <= errbnd) {
            goToLabel = 170;break;
          }
          if (ier !== 0) {
            goToLabel = 150;break;
          }
          if (last === 2 && extall) {
            // goToLabel = 120; break;
          } else {
            if (noext) continue;
            if (!extall) {
              // goToLabel = 50; break;
            } else {
              erlarg = erlarg - erlast;
              if (Math.abs(b1 - a1) > small) erlarg = erlarg + erro12;
              if (extrap) goToLabel = 70;
            }
            if (goToLabel > 50) {
              // Skip 50
            } else {
              // case 50:
              //
              //           test whether the interval to be bisected next is the
              //           smallest interval.
              //
              width = Math.abs(blist[maxerr - 1] - alist[maxerr - 1]);
              if (width > small) continue;
              if (extall) {
                // goToLabel = 60; break;
              } else {
                //
                //           test whether we can start with the extrapolation procedure
                //           (we do this if we integrate over the next interval with
                //           use of a gauss-kronrod rule - see subroutine dqc25f).
                //
                small = small * 0.5e+00;
                if (0.25e+00 * width * domega > 0.2e+01) continue;
                extall = true;
                // goToLabel = 130; break;
                ertest = errbnd;
                erlarg = errsum;
                break;
              }
              // case 60:
              extrap = true;
              nrmax = 2;
            }
            // case 70:
            if (ierro === 3 || erlarg <= ertest) {
              // goToLabel = 90; break;
            } else {
              //
              //           the smallest interval has the largest error.
              //           before bisecting decrease the sum of the errors over
              //           the larger intervals (erlarg) and perform extrapolation.
              //
              jupbnd = last;
              if (last > Math.trunc(limit / 2) + 2) jupbnd = limit + 3 - last;
              id = nrmax;
              for (k = id; k <= jupbnd; k++) {
                maxerr = iord[nrmax - 1];
                errmax = elist[maxerr - 1];
                if (Math.abs(blist[maxerr - 1] - alist[maxerr - 1]) > small) continue mainDoLoop;
                nrmax = nrmax + 1;
              }
            }
            //
            //           perform extrapolation.
            //
            // case 90:
            numrl2 = numrl2 + 1;
            rlist2[numrl2 - 1] = area;
            if (numrl2 < 3) {
              // goToLabel = 110; break;
            } else {
              var _dqelg = (0, _dqelg3.dqelg)(numrl2, rlist2, reseps, abseps, res3la, nres);

              var _dqelg2 = _slicedToArray(_dqelg, 4);

              numrl2 = _dqelg2[0];
              reseps = _dqelg2[1];
              abseps = _dqelg2[2];
              nres = _dqelg2[3];

              ktmin = ktmin + 1;
              if (ktmin > 5 && abserr < 0.1e-02 * errsum) ier = 5;
              if (abseps >= abserr) {
                // goToLabel = 100; break;
              } else {
                ktmin = 0;
                abserr = abseps;
                result = reseps;
                correc = erlarg;
                ertest = Math.max(epsabs, epsrel * Math.abs(reseps));
                // ***jump out of do-loop
                if (abserr <= ertest) {
                  goToLabel = 150;break;
                }
              }
              //
              //           prepare bisection of the smallest interval.
              //
              // case 100:
              if (numrl2 === 1) noext = true;
              if (ier === 5) {
                goToLabel = 150;break;
              }
            }
            // case 110:
            maxerr = iord[0];
            errmax = elist[maxerr - 1];
            nrmax = 1;
            extrap = false;
            small = small * 0.5e+00;
            erlarg = errsum;
            continue;
          }
          // case 120:
          small = small * 0.5e+00;
          numrl2 = numrl2 + 1;
          rlist2[numrl2 - 1] = area;
          // case 130:
          ertest = errbnd;
          erlarg = errsum;
        }
        if (goToLabel > 150) break;
      //
      //           set the final result.
      //           ---------------------
      //
      case 150:
        if (abserr === oflow || nres === 0) {
          goToLabel = 170;break;
        }
        if (ier + ierro === 0) {
          goToLabel = 165;break;
        }
        if (ierro === 3) abserr = abserr + correc;
        if (ier === 0) ier = 3;
        if (result !== 0.0e+00 && area !== 0.0e+00) {
          goToLabel = 160;break;
        }
        if (abserr > errsum) {
          goToLabel = 170;break;
        }
        if (area === 0.0e+00) {
          goToLabel = 190;break;
        }
        goToLabel = 165;break;
      case 160:
        if (abserr / Math.abs(result) > errsum / Math.abs(area)) {
          goToLabel = 170;break;
        }
      //
      //           test on divergence.
      //
      case 165:
        if (ksgn === -1 && Math.max(Math.abs(result), Math.abs(area)) <= defabs * 0.1e-01) {
          goToLabel = 190;break;
        }
        if (result / area < 0.1e-01 || result / area > 0.1e+03 || errsum >= Math.abs(area)) ier = 6;
        goToLabel = 190;break;
      //
      //           compute global integral sum.
      //
      case 170:
        result = 0.0e+00;
        for (k = 1; k <= last; k++) {
          result = result + rlist[k - 1];
        }
        abserr = errsum;
      case 190:
        if (ier > 2) ier = ier - 1;
      case 200:
        if (integr === 2 && omega < 0.0e+00) result = -result;
      case 999:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, last, alist, blist, rlist, elist, iord, nnlog, momcom, chebmo];
}