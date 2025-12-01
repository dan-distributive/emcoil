Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqpsrt = dqpsrt;
/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
function dqpsrt(limit, last, maxerr, ermax, elist, iord, nrmax) {
  var errmax = void 0,
      errmin = void 0,
      i = void 0,
      ibeg = void 0,
      ido = void 0,
      isucc = void 0,
      j = void 0,
      jbnd = void 0,
      jupbn = void 0,
      k = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //           check whether the list contains more than
        //           two error estimates.
        //
        if (last > 2) {
          goToLabel = 10;break;
        }
        iord[0] = 1;
        iord[1] = 2;
        goToLabel = 90;break;
      //
      //           this part of the routine is only executed if, due to a
      //           difficult integrand, subdivision increased the error
      //           estimate. in the normal case the insert procedure should
      //           start after the nrmax-th largest error estimate.
      //
      case 10:
        errmax = elist[maxerr - 1];
        if (nrmax === 1) {
          goToLabel = 30;break;
        }
        ido = nrmax - 1;
        for (i = 1; i <= ido; i++) {
          isucc = iord[nrmax - 2];
          // ***jump out of do-loop
          if (errmax <= elist[isucc - 1]) {
            goToLabel = 30;break;
          }
          iord[nrmax - 1] = isucc;
          nrmax = nrmax - 1;
        }

      //
      //           compute the number of elements in the list to be maintained
      //           in descending order. this number depends on the number of
      //           subdivisions still allowed.
      //
      case 30:
        jupbn = last;
        if (last > Math.trunc(limit / 2) + 2) jupbn = limit + 3 - last;
        errmin = elist[last - 1];
        //
        //           insert errmax by traversing the list top-down,
        //           starting comparison from the element elist(iord(nrmax+1)).
        //
        jbnd = jupbn - 1;
        ibeg = nrmax + 1;
        if (ibeg > jbnd) {
          goToLabel = 50;break;
        }
        for (i = ibeg; i <= jbnd; i++) {
          isucc = iord[i - 1];
          // ***jump out of do-loop
          if (errmax >= elist[isucc - 1]) {
            goToLabel = 60;break;
          }
          iord[i - 2] = isucc;
        }
        if (goToLabel === 60) break;
      case 50:
        iord[jbnd - 1] = maxerr;
        iord[jupbn - 1] = last;
        goToLabel = 90;break;
      //
      //           insert errmin by traversing the list bottom-up.
      //
      case 60:
        iord[i - 2] = maxerr;
        k = jbnd;
        for (j = i; j <= jbnd; j++) {
          isucc = iord[k - 1];
          // ***jump out of do-loop
          if (errmin < elist[isucc - 1]) {
            goToLabel = 80;break;
          }
          iord[k] = isucc;
          k = k - 1;
        }
        if (goToLabel === 80) break;
        iord[i - 1] = last;
        goToLabel = 90;break;
      case 80:
        iord[k] = last;
      //
      //           set maxerr and ermax.
      //
      case 90:
        maxerr = iord[nrmax - 1];
        ermax = elist[maxerr - 1];
      default:
        break mainExecutionLoop;
    }
  }
  return [maxerr, ermax, iord, nrmax];
}