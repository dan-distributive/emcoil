Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk31 = dqk31;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk31(f, a, b, result, abserr, resabs, resasc) {
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

  fv1 = new Float64Array(15);
  fv2 = new Float64Array(15);
  xgk = new Float64Array(16);
  wgk = new Float64Array(16);
  wg = new Float64Array(8);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        wg[0] = 0.030753241996117268354628393577204e0;
        wg[1] = 0.070366047488108124709267416450667e0;
        wg[2] = 0.107159220467171935011869546685869e0;
        wg[3] = 0.139570677926154314447804794511028e0;
        wg[4] = 0.166269205816993933553200860481209e0;
        wg[5] = 0.186161000015562211026800561866423e0;
        wg[6] = 0.198431485327111576456118326443839e0;
        wg[7] = 0.202578241925561272880620199967519e0;
        //
        xgk[0] = 0.998002298693397060285172840152271e0;
        xgk[1] = 0.987992518020485428489565718586613e0;
        xgk[2] = 0.967739075679139134257347978784337e0;
        xgk[3] = 0.937273392400705904307758947710209e0;
        xgk[4] = 0.897264532344081900882509656454496e0;
        xgk[5] = 0.848206583410427216200648320774217e0;
        xgk[6] = 0.790418501442465932967649294817947e0;
        xgk[7] = 0.724417731360170047416186054613938e0;
        xgk[8] = 0.650996741297416970533735895313275e0;
        xgk[9] = 0.570972172608538847537226737253911e0;
        xgk[10] = 0.485081863640239680693655740232351e0;
        xgk[11] = 0.394151347077563369897207370981045e0;
        xgk[12] = 0.299180007153168812166780024266389e0;
        xgk[13] = 0.201194093997434522300628303394596e0;
        xgk[14] = 0.101142066918717499027074231447392e0;
        xgk[15] = 0.000000000000000000000000000000000e0;
        //
        wgk[0] = 0.005377479872923348987792051430128e0;
        wgk[1] = 0.015007947329316122538374763075807e0;
        wgk[2] = 0.025460847326715320186874001019653e0;
        wgk[3] = 0.035346360791375846222037948478360e0;
        wgk[4] = 0.044589751324764876608227299373280e0;
        wgk[5] = 0.053481524690928087265343147239430e0;
        wgk[6] = 0.062009567800670640285139230960803e0;
        wgk[7] = 0.069854121318728258709520077099147e0;
        wgk[8] = 0.076849680757720378894432777482659e0;
        wgk[9] = 0.083080502823133021038289247286104e0;
        wgk[10] = 0.088564443056211770647275443693774e0;
        wgk[11] = 0.093126598170825321225486872747346e0;
        wgk[12] = 0.096642726983623678505179907627589e0;
        wgk[13] = 0.099173598721791959332393173484603e0;
        wgk[14] = 0.100769845523875595044946662617570e0;
        wgk[15] = 0.101330007014791549017374792767493e0;

        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 31-point kronrod approximation to
        //           the integral, and estimate the absolute error.
        //
        fc = f(centr);
        resg = wg[7] * fc;
        resk = wgk[15] * fc;
        resabs = Math.abs(resk);
        for (j = 1; j <= 7; j++) {
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
        for (j = 1; j <= 8; j++) {
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
        resasc = wgk[15] * Math.abs(fc - reskh);
        for (j = 1; j <= 15; j++) {
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