Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk51 = dqk51;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk51(f, a, b, result, abserr, resabs, resasc) {
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

  fv1 = new Float64Array(25);
  fv2 = new Float64Array(25);
  xgk = new Float64Array(26);
  wgk = new Float64Array(26);
  wg = new Float64Array(13);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        wg[0] = 0.011393798501026287947902964113235e0;
        wg[1] = 0.026354986615032137261901815295299e0;
        wg[2] = 0.040939156701306312655623487711646e0;
        wg[3] = 0.054904695975835191925936891540473e0;
        wg[4] = 0.068038333812356917207187185656708e0;
        wg[5] = 0.080140700335001018013234959669111e0;
        wg[6] = 0.091028261982963649811497220702892e0;
        wg[7] = 0.100535949067050644202206890392686e0;
        wg[8] = 0.108519624474263653116093957050117e0;
        wg[9] = 0.114858259145711648339325545869556e0;
        wg[10] = 0.119455763535784772228178126512901e0;
        wg[11] = 0.122242442990310041688959518945852e0;
        wg[12] = 0.123176053726715451203902873079050e0;
        //
        xgk[0] = 0.999262104992609834193457486540341e0;
        xgk[1] = 0.995556969790498097908784946893902e0;
        xgk[2] = 0.988035794534077247637331014577406e0;
        xgk[3] = 0.976663921459517511498315386479594e0;
        xgk[4] = 0.961614986425842512418130033660167e0;
        xgk[5] = 0.942974571228974339414011169658471e0;
        xgk[6] = 0.920747115281701561746346084546331e0;
        xgk[7] = 0.894991997878275368851042006782805e0;
        xgk[8] = 0.865847065293275595448996969588340e0;
        xgk[9] = 0.833442628760834001421021108693570e0;
        xgk[10] = 0.797873797998500059410410904994307e0;
        xgk[11] = 0.759259263037357630577282865204361e0;
        xgk[12] = 0.717766406813084388186654079773298e0;
        xgk[13] = 0.673566368473468364485120633247622e0;
        xgk[14] = 0.626810099010317412788122681624518e0;
        xgk[15] = 0.577662930241222967723689841612654e0;
        xgk[16] = 0.526325284334719182599623778158010e0;
        xgk[17] = 0.473002731445714960522182115009192e0;
        xgk[18] = 0.417885382193037748851814394594572e0;
        xgk[19] = 0.361172305809387837735821730127641e0;
        xgk[20] = 0.303089538931107830167478909980339e0;
        xgk[21] = 0.243866883720988432045190362797452e0;
        xgk[22] = 0.183718939421048892015969888759528e0;
        xgk[23] = 0.122864692610710396387359818808037e0;
        xgk[24] = 0.061544483005685078886546392366797e0;
        xgk[25] = 0.000000000000000000000000000000000e0;
        //
        wgk[0] = 0.001987383892330315926507851882843e0;
        wgk[1] = 0.005561932135356713758040236901066e0;
        wgk[2] = 0.009473973386174151607207710523655e0;
        wgk[3] = 0.013236229195571674813656405846976e0;
        wgk[4] = 0.016847817709128298231516667536336e0;
        wgk[5] = 0.020435371145882835456568292235939e0;
        wgk[6] = 0.024009945606953216220092489164881e0;
        wgk[7] = 0.027475317587851737802948455517811e0;
        wgk[8] = 0.030792300167387488891109020215229e0;
        wgk[9] = 0.034002130274329337836748795229551e0;
        wgk[10] = 0.037116271483415543560330625367620e0;
        wgk[11] = 0.040083825504032382074839284467076e0;
        wgk[12] = 0.042872845020170049476895792439495e0;
        wgk[13] = 0.045502913049921788909870584752660e0;
        wgk[14] = 0.047982537138836713906392255756915e0;
        wgk[15] = 0.050277679080715671963325259433440e0;
        wgk[16] = 0.052362885806407475864366712137873e0;
        wgk[17] = 0.054251129888545490144543370459876e0;
        wgk[18] = 0.055950811220412317308240686382747e0;
        wgk[19] = 0.057437116361567832853582693939506e0;
        wgk[20] = 0.058689680022394207961974175856788e0;
        wgk[21] = 0.059720340324174059979099291932562e0;
        wgk[22] = 0.060539455376045862945360267517565e0;
        wgk[23] = 0.061128509717053048305859030416293e0;
        wgk[24] = 0.061471189871425316661544131965264e0;
        //       note: wgk (25) was calculated from the values of wgk(0..24)
        wgk[25] = 0.061580818067832935078759824240066e0;
        //
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 51-point kronrod approximation to
        //           the integral, and estimate the absolute error.
        //
        fc = f(centr);
        resg = wg[12] * fc;
        resk = wgk[25] * fc;
        resabs = Math.abs(resk);
        for (j = 1; j <= 12; j++) {
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
        for (j = 1; j <= 13; j++) {
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
        resasc = wgk[25] * Math.abs(fc - reskh);
        for (j = 1; j <= 25; j++) {
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