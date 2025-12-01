Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */


exports.dqawfe = dqawfe;

var _dqagie3 = require('./dqagie.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqawoe = require('./dqawoe.js');

var _dqelg3 = require('./dqelg.js');

function dqawfe(f, a, omega, integr, epsabs, limlst, limit, maxp1, result, abserr, neval, ier, rslst, erlst, ierlst, lst, alist, blist, rlist, elist, iord, nnlog, chebmo) {
  // let dla; // not used?
  var abseps = void 0,
      correc = void 0,
      cycle = void 0,
      c1 = void 0,
      c2 = void 0,
      dl = void 0,
      drl = void 0,
      ep = void 0,
      eps = void 0,
      epsa = void 0,
      errsum = void 0,
      fact = void 0,
      p = void 0,
      pi = void 0,
      p1 = void 0,
      psum = void 0,
      reseps = void 0,
      res3la = void 0,
      uflow = void 0,
      ktmin = void 0,
      l = void 0,
      last = void 0,
      ll = void 0,
      momcom = void 0,
      nev = void 0,
      nres = void 0,
      numrl2 = void 0;

  psum = new Float64Array(52);
  res3la = new Float64Array(3);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        p = 0.9e+00;
        pi = 3.14159265358979323846264338327950e0;
        //
        //           test on validity of parameters
        //           ------------------------------
        //
        result = 0.0e+00;
        abserr = 0.0e+00;
        neval = 0;
        lst = 0;
        ier = 0;
        if (integr !== 1 && integr !== 2 || epsabs <= 0.0e+00 || limlst < 3) ier = 6;
        if (ier === 6) {
          goToLabel = 999;break;
        }
        if (omega !== 0.0e+00) {
          goToLabel = 10;break;
        }
        //
        //           integration by dqagie if omega is zero
        //           --------------------------------------
        //
        if (integr === 1) {
          var _dqagie = (0, _dqagie3.dqagie)(f, 0.0e+00, 1, epsabs, 0.0e+00, limit, result, abserr, neval, ier, alist, blist, rlist, elist, iord, last);

          var _dqagie2 = _slicedToArray(_dqagie, 10);

          result = _dqagie2[0];
          abserr = _dqagie2[1];
          neval = _dqagie2[2];
          ier = _dqagie2[3];
          alist = _dqagie2[4];
          blist = _dqagie2[5];
          rlist = _dqagie2[6];
          elist = _dqagie2[7];
          iord = _dqagie2[8];
          last = _dqagie2[9];
        }
        rslst[0] = result;
        erlst[0] = abserr;
        ierlst[0] = ier;
        lst = 1;
        goToLabel = 999;break;
      //
      //           initializations
      //           ---------------
      //
      case 10:
        l = Math.abs(omega);
        dl = 2 * l + 1;
        cycle = dl * pi / Math.abs(omega);
        ier = 0;
        ktmin = 0;
        neval = 0;
        numrl2 = 0;
        nres = 0;
        c1 = a;
        c2 = cycle + a;
        p1 = 0.1e+01 - p;
        uflow = (0, _d1mach.d1mach)(1);
        eps = epsabs;
        if (epsabs > uflow / p1) eps = epsabs * p1;
        ep = eps;
        fact = 0.1e+01;
        correc = 0.0e+00;
        abserr = 0.0e+00;
        errsum = 0.0e+00;
        //
        //           main do-loop
        //           ------------
        //
        for (lst = 1; lst <= limlst; lst++) {
          //
          //           integrate over current subinterval.
          //
          // dla = lst; // not used?
          epsa = eps * fact;
          (0, _dqawoe.dqawoe)(f, c1, c2, omega, integr, epsa, 0.0e+00, limit, lst, maxp1, rslst[lst - 1], erlst[lst - 1], nev, ierlst[lst - 1], last, alist, blist, rlist, elist, iord, nnlog, momcom, chebmo);
          neval = neval + nev;
          fact = fact * p;
          errsum = errsum + erlst[lst - 1];
          drl = 0.5e+02 * Math.abs(rslst[lst - 1]);
          //
          //           test on accuracy with partial sum
          //
          if (errsum + drl <= epsabs && lst >= 6) {
            goToLabel = 80;break;
          }
          correc = Math.max(correc, erlst[lst - 1]);
          if (ierlst[lst - 1] !== 0) eps = Math.max(ep, correc * p1);
          if (ierlst[lst - 1] !== 0) ier = 7;
          if (ier === 7 && errsum + drl <= correc * 0.1e+02 && lst > 5) {
            goToLabel = 80;break;
          }
          numrl2 = numrl2 + 1;
          if (lst > 1) {
            psum[numrl2 - 1] = psum[ll - 1] + rslst[lst - 1];
            if (lst === 2) {
              // goToLabel = 40; break;
            } else {
              //
              //           test on maximum number of subintervals
              //
              if (lst === limlst) ier = 1;
              //
              //           perform new extrapolation
              //

              //
              //           test whether extrapolated result is influenced by roundoff
              //
              var _dqelg = (0, _dqelg3.dqelg)(numrl2, psum, reseps, abseps, res3la, nres);

              var _dqelg2 = _slicedToArray(_dqelg, 4);

              numrl2 = _dqelg2[0];
              reseps = _dqelg2[1];
              abseps = _dqelg2[2];
              nres = _dqelg2[3];
              ktmin = ktmin + 1;
              if (ktmin >= 15 && abserr <= 0.1e-02 * (errsum + drl)) ier = 4;
              if (abseps > abserr && lst !== 3) {
                // goToLabel = 30; break;
              } else {
                abserr = abseps;
                result = reseps;
                ktmin = 0;
                //
                //           if ier is not 0, check whether direct result (partial sum)
                //           or extrapolated result yields the best integral
                //           approximation
                //
                if (abserr + 0.1e+02 * correc <= epsabs || abserr <= epsabs && 0.1e+02 * correc >= epsabs) {
                  goToLabel = 60;break;
                }
              }
              // case 30:
              if (ier !== 0 && ier !== 7) {
                goToLabel = 60;break;
              }
            }
          } else {
            psum[0] = rslst[0];
          }
          // case 40:
          ll = numrl2;
          c1 = c2;
          c2 = c2 + cycle;
        }
        if (goToLabel > 60) break;
      //
      //         set final result and error estimate
      //         -----------------------------------
      //
      case 60:
        abserr = abserr + 0.1e+02 * correc;
        if (ier === 0) {
          goToLabel = 999;break;
        }
        if (result !== 0.0e+00 && psum[numrl2 - 1] !== 0.0e+00) {
          goToLabel = 70;break;
        }
        if (abserr > errsum) {
          goToLabel = 80;break;
        }
        if (psum[numrl2 - 1] === 0.0e+00) {
          goToLabel = 999;break;
        }
      case 70:
        if (abserr / Math.abs(result) > (errsum + drl) / Math.abs(psum[numrl2 - 1])) {
          goToLabel = 80;break;
        }
        if (ier >= 1 && ier !== 7) abserr = abserr + drl;
        goToLabel = 999;break;
      case 80:
        result = psum[numrl2 - 1];
        abserr = errsum + drl;
      case 999:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, ier, rslst, erlst, ierlst, lst, alist, blist, rlist, elist, iord, nnlog, chebmo];
}