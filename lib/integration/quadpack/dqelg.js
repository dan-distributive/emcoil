Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqelg = dqelg;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqelg(n, epstab, result, abserr, res3la, nres) {
  var delta1 = void 0,
      delta2 = void 0,
      delta3 = void 0,
      epmach = void 0,
      epsinf = void 0,
      error = void 0,
      err1 = void 0,
      err2 = void 0,
      err3 = void 0,
      e0 = void 0,
      e1 = void 0,
      e1abs = void 0,
      e2 = void 0,
      e3 = void 0,
      oflow = void 0,
      res = void 0,
      ss = void 0,
      tol1 = void 0,
      tol2 = void 0,
      tol3 = void 0,
      i = void 0,
      ib = void 0,
      ib2 = void 0,
      ie = void 0,
      indx = void 0,
      k1 = void 0,
      k2 = void 0,
      k3 = void 0,
      limexp = void 0,
      newelm = void 0,
      num = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        epmach = (0, _d1mach.d1mach)(4);
        oflow = (0, _d1mach.d1mach)(2);
        nres = nres + 1;
        abserr = oflow;
        result = epstab[n - 1];
        if (n < 3) {
          goToLabel = 100;break;
        }
        limexp = 50;
        epstab[n + 1] = epstab[n - 1];
        newelm = (n - 1) / 2;
        epstab[n - 1] = oflow;
        num = n;
        k1 = n;
        for (i = 1; i <= newelm; i++) {
          k2 = k1 - 1;
          k3 = k1 - 2;
          res = epstab[k1 + 1];
          e0 = epstab[k3 - 1];
          e1 = epstab[k2 - 1];
          e2 = res;
          e1abs = Math.abs(e1);
          delta2 = e2 - e1;
          err2 = Math.abs(delta2);
          tol2 = Math.max(Math.abs(e2), e1abs) * epmach;
          delta3 = e1 - e0;
          err3 = Math.abs(delta3);
          tol3 = Math.max(e1abs, Math.abs(e0)) * epmach;
          if (err2 > tol2 || err3 > tol3) {
            // goToLabel = 10; break;
          } else {
            //
            //           if e0, e1 and e2 are equal to within machine
            //           accuracy, convergence is assumed.
            //           result = e2
            //           abserr = Math.abs(e1-e0)+Math.abs(e2-e1)
            //
            result = res;
            abserr = err2 + err3;
            // ***jump out of do-loop
            goToLabel = 100;break;
          }
          // case 10:
          e3 = epstab[k1 - 1];
          epstab[k1 - 1] = e1;
          delta1 = e1 - e3;
          err1 = Math.abs(delta1);
          tol1 = Math.max(e1abs, Math.abs(e3)) * epmach;
          //
          //           if two elements are very close to each other, omit
          //           a part of the table by adjusting the value of n
          //
          if (err1 <= tol1 || err2 <= tol2 || err3 <= tol3) {
            n = i + i - 1;
            // ***jump out of do-loop
            goToLabel = 50;break;
          }
          ss = 0.1e+01 / delta1 + 0.1e+01 / delta2 - 0.1e+01 / delta3;
          epsinf = Math.abs(ss * e1);
          //
          //           test to detect irregular behaviour in the table, and
          //           eventually omit a part of the table adjusting the value
          //           of n.
          //
          if (epsinf > 0.1e-03) {
            // goToLabel = 30; break;
          } else {
            n = i + i - 1;
            // ***jump out of do-loop
            goToLabel = 50;break;
          }
          //
          //           compute a new element and eventually adjust
          //           the value of result.
          //
          // case 30:
          res = e1 + 0.1e+01 / ss;
          epstab[k1 - 1] = res;
          k1 = k1 - 2;
          error = err2 + Math.abs(res - e2) + err3;
          if (error > abserr) continue;
          abserr = error;
          result = res;
        }
        if (goToLabel > 50) break;
      //
      //           shift the table.
      //
      case 50:
        if (n === limexp) n = 2 * Math.trunc(limexp / 2) - 1;
        ib = 1;
        if (Math.trunc(num / 2) * 2 === num) ib = 2;
        ie = newelm + 1;
        for (i = 1; i <= ie; i++) {
          ib2 = ib + 2;
          epstab[ib - 1] = epstab[ib2 - 1];
          ib = ib2;
        }
        if (num === n) {
          goToLabel = 80;break;
        }
        indx = num - n + 1;
        for (i = 1; i <= n; i++) {
          epstab[i - 1] = epstab[indx - 1];
          indx = indx + 1;
        }
      case 80:
        if (nres >= 4) {
          goToLabel = 90;break;
        }
        res3la[nres - 1] = result;
        abserr = oflow;
        goToLabel = 100;break;
      //
      //           compute error estimate
      //
      case 90:
        abserr = Math.abs(result - res3la[2]) + Math.abs(result - res3la[1]) + Math.abs(result - res3la[0]);
        res3la[0] = res3la[1];
        res3la[1] = res3la[2];
        res3la[2] = result;
      case 100:
        abserr = Math.max(abserr, 0.5e+01 * epmach * Math.abs(result));
      default:
        break mainExecutionLoop;
    }
  }
  return [n, result, abserr, nres];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */