Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk21 = dqk21;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk21(f, a, b, result, abserr, resabs, resasc) {
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

  fv1 = new Float64Array(10);
  fv2 = new Float64Array(10);
  wg = new Float64Array(5);
  wgk = new Float64Array(11);
  xgk = new Float64Array(11);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        wg[0] = 0.066671344308688137593568809893332e0;
        wg[1] = 0.149451349150580593145776339657697e0;
        wg[2] = 0.219086362515982043995534934228163e0;
        wg[3] = 0.269266719309996355091226921569469e0;
        wg[4] = 0.295524224714752870173892994651338e0;
        //
        xgk[0] = 0.995657163025808080735527280689003e0;
        xgk[1] = 0.973906528517171720077964012084452e0;
        xgk[2] = 0.930157491355708226001207180059508e0;
        xgk[3] = 0.865063366688984510732096688423493e0;
        xgk[4] = 0.780817726586416897063717578345042e0;
        xgk[5] = 0.679409568299024406234327365114874e0;
        xgk[6] = 0.562757134668604683339000099272694e0;
        xgk[7] = 0.433395394129247190799265943165784e0;
        xgk[8] = 0.294392862701460198131126603103866e0;
        xgk[9] = 0.148874338981631210884826001129720e0;
        xgk[10] = 0.000000000000000000000000000000000e0;
        //
        wgk[0] = 0.011694638867371874278064396062192e0;
        wgk[1] = 0.032558162307964727478818972459390e0;
        wgk[2] = 0.054755896574351996031381300244580e0;
        wgk[3] = 0.075039674810919952767043140916190e0;
        wgk[4] = 0.093125454583697605535065465083366e0;
        wgk[5] = 0.109387158802297641899210590325805e0;
        wgk[6] = 0.123491976262065851077958109831074e0;
        wgk[7] = 0.134709217311473325928054001771707e0;
        wgk[8] = 0.142775938577060080797094273138717e0;
        wgk[9] = 0.147739104901338491374841515972068e0;
        wgk[10] = 0.149445554002916905664936468389821e0;
        //
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 21-point kronrod approximation to
        //           the integral, and estimate the absolute error.
        //
        resg = 0.0e+00;
        fc = f(centr);
        resk = wgk[10] * fc;
        resabs = Math.abs(resk);
        for (j = 1; j <= 5; j++) {
          jtw = 2 * j;
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
        for (j = 1; j <= 5; j++) {
          jtwm1 = 2 * j - 1;
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
        resasc = wgk[10] * Math.abs(fc - reskh);
        for (j = 1; j <= 10; j++) {
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