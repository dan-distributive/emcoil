Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk15w = dqk15w;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk15w(f, w, p1, p2, p3, p4, kp, a, b, result, abserr, resabs, resasc) {
  var absc = void 0,
      absc1 = void 0,
      absc2 = void 0,
      centr = void 0,
      dhlgth = void 0,
      epmach = void 0,
      fc = void 0,
      fsum = void 0,
      fval1 = void 0,
      fval2 = void 0,
      fv1 = void 0,
      fv2 = void 0,
      hlgth = void 0,
      resg = void 0,
      resk = void 0,
      reskh = void 0,
      uflow = void 0,
      wg = void 0,
      wgk = void 0,
      xgk = void 0,
      j = void 0,
      jtw = void 0,
      jtwm1 = void 0;

  fv1 = new Float64Array(7);
  fv2 = new Float64Array(7);
  xgk = new Float64Array(8);
  wgk = new Float64Array(8);
  wg = new Float64Array(4);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        xgk[0] = 0.9914553711208126e+00;
        xgk[1] = 0.9491079123427585e+00;
        xgk[2] = 0.8648644233597691e+00;
        xgk[3] = 0.7415311855993944e+00;
        xgk[4] = 0.5860872354676911e+00;
        xgk[5] = 0.4058451513773972e+00;
        xgk[6] = 0.2077849550078985e+00;
        xgk[7] = 0.0000000000000000e+00;
        //
        wgk[0] = 0.2293532201052922e-01;
        wgk[1] = 0.6309209262997855e-01;
        wgk[2] = 0.1047900103222502e+00;
        wgk[3] = 0.1406532597155259e+00;
        wgk[4] = 0.1690047266392679e+00;
        wgk[5] = 0.1903505780647854e+00;
        wgk[6] = 0.2044329400752989e+00;
        wgk[7] = 0.2094821410847278e+00;
        //
        wg[0] = 0.1294849661688697e+00;
        wg[1] = 0.2797053914892767e+00;
        wg[2] = 0.3818300505051889e+00;
        wg[3] = 0.4179591836734694e+00;
        //
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 15-point kronrod approximation to the
        //           integral, and estimate the error.
        //
        fc = f(centr) * w(centr, p1, p2, p3, p4, kp);
        resg = wg[3] * fc;
        resk = wgk[7] * fc;
        resabs = Math.abs(resk);
        for (j = 1; j <= 3; j++) {
          jtw = j * 2;
          absc = hlgth * xgk[jtw - 1];
          absc1 = centr - absc;
          absc2 = centr + absc;
          fval1 = f(absc1) * w(absc1, p1, p2, p3, p4, kp);
          fval2 = f(absc2) * w(absc2, p1, p2, p3, p4, kp);
          fv1[jtw - 1] = fval1;
          fv2[jtw - 1] = fval2;
          fsum = fval1 + fval2;
          resg = resg + wg[j - 1] * fsum;
          resk = resk + wgk[jtw - 1] * fsum;
          resabs = resabs + wgk[jtw - 1] * (Math.abs(fval1) + Math.abs(fval2));
        }
        for (j = 1; j <= 4; j++) {
          jtwm1 = j * 2 - 1;
          absc = hlgth * xgk[jtwm1 - 1];
          absc1 = centr - absc;
          absc2 = centr + absc;
          fval1 = f(absc1) * w(absc1, p1, p2, p3, p4, kp);
          fval2 = f(absc2) * w(absc2, p1, p2, p3, p4, kp);
          fv1[jtwm1 - 1] = fval1;
          fv2[jtwm1 - 1] = fval2;
          fsum = fval1 + fval2;
          resk = resk + wgk[jtwm1 - 1] * fsum;
          resabs = resabs + wgk[jtwm1 - 1] * (Math.abs(fval1) + Math.abs(fval2));
        }
        reskh = resk * 0.5e+00;
        resasc = wgk[7] * Math.abs(fc - reskh);
        for (j = 1; j <= 7; j++) {
          resasc = resasc + wgk[j - 1] * (Math.abs(fv1[j - 1] - reskh) + Math.abs(fv2[j - 1] - reskh));
        }
        result = resk * hlgth;
        resabs = resabs * dhlgth;
        resasc = resasc * dhlgth;
        abserr = Math.abs((resk - resg) * hlgth);
        if (resasc !== 0.0e+00 && abserr !== 0.0e+00) {
          abserr = resasc * Math.min(0.1e+01, (0.2e+03 * abserr / resasc) ** 1.5e+00);
        }
        if (resabs > uflow / (0.5e+02 * epmach)) abserr = Math.max(epmach * 0.5e+02 * resabs, abserr);
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, resabs, resasc];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */