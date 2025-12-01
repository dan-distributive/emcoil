Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk15 = dqk15;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk15(f, a, b, result, abserr, resabs, resasc) {
  var absc = void 0,
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
  wg = new Float64Array(4);
  wgk = new Float64Array(8);
  xgk = new Float64Array(8);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        wg[0] = 0.129484966168869693270611432679082e0;
        wg[1] = 0.279705391489276667901467771423780e0;
        wg[2] = 0.381830050505118944950369775488975e0;
        wg[3] = 0.417959183673469387755102040816327e0;
        //
        xgk[0] = 0.991455371120812639206854697526329e0;
        xgk[1] = 0.949107912342758524526189684047851e0;
        xgk[2] = 0.864864423359769072789712788640926e0;
        xgk[3] = 0.741531185599394439863864773280788e0;
        xgk[4] = 0.586087235467691130294144838258730e0;
        xgk[5] = 0.405845151377397166906606412076961e0;
        xgk[6] = 0.207784955007898467600689403773245e0;
        xgk[7] = 0.000000000000000000000000000000000e0;
        //
        wgk[0] = 0.022935322010529224963732008058970e0;
        wgk[1] = 0.063092092629978553290700663189204e0;
        wgk[2] = 0.104790010322250183839876322541518e0;
        wgk[3] = 0.140653259715525918745189590510238e0;
        wgk[4] = 0.169004726639267902826583426598550e0;
        wgk[5] = 0.190350578064785409913256402421014e0;
        wgk[6] = 0.204432940075298892414161999234649e0;
        wgk[7] = 0.209482141084727828012999174891714e0;

        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 15-point kronrod approximation to
        //           the integral, and estimate the absolute error.
        //
        fc = f(centr);
        resg = fc * wg[3];
        resk = fc * wgk[7];
        resabs = Math.abs(resk);
        for (j = 1; j <= 3; j++) {
          jtw = j * 2;
          absc = hlgth * xgk[jtw - 1];
          fval1 = f(centr - absc);
          fval2 = f(centr + absc);
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
          fval1 = f(centr - absc);
          fval2 = f(centr + absc);
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