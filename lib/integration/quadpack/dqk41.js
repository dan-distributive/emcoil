Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqk41 = dqk41;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function dqk41(f, a, b, result, abserr, resabs, resasc) {
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

  fv1 = new Float64Array(20);
  fv2 = new Float64Array(20);
  xgk = new Float64Array(21);
  wgk = new Float64Array(21);
  wg = new Float64Array(10);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        wg[0] = 0.017614007139152118311861962351853e0;
        wg[1] = 0.040601429800386941331039952274932e0;
        wg[2] = 0.062672048334109063569506535187042e0;
        wg[3] = 0.083276741576704748724758143222046e0;
        wg[4] = 0.101930119817240435036750135480350e0;
        wg[5] = 0.118194531961518417312377377711382e0;
        wg[6] = 0.131688638449176626898494499748163e0;
        wg[7] = 0.142096109318382051329298325067165e0;
        wg[8] = 0.149172986472603746787828737001969e0;
        wg[9] = 0.152753387130725850698084331955098e0;
        //
        xgk[0] = 0.998859031588277663838315576545863e0;
        xgk[1] = 0.993128599185094924786122388471320e0;
        xgk[2] = 0.981507877450250259193342994720217e0;
        xgk[3] = 0.963971927277913791267666131197277e0;
        xgk[4] = 0.940822633831754753519982722212443e0;
        xgk[5] = 0.912234428251325905867752441203298e0;
        xgk[6] = 0.878276811252281976077442995113078e0;
        xgk[7] = 0.839116971822218823394529061701521e0;
        xgk[8] = 0.795041428837551198350638833272788e0;
        xgk[9] = 0.746331906460150792614305070355642e0;
        xgk[10] = 0.693237656334751384805490711845932e0;
        xgk[11] = 0.636053680726515025452836696226286e0;
        xgk[12] = 0.575140446819710315342946036586425e0;
        xgk[13] = 0.510867001950827098004364050955251e0;
        xgk[14] = 0.443593175238725103199992213492640e0;
        xgk[15] = 0.373706088715419560672548177024927e0;
        xgk[16] = 0.301627868114913004320555356858592e0;
        xgk[17] = 0.227785851141645078080496195368575e0;
        xgk[18] = 0.152605465240922675505220241022678e0;
        xgk[19] = 0.076526521133497333754640409398838e0;
        xgk[20] = 0.000000000000000000000000000000000e0;
        //
        wgk[0] = 0.003073583718520531501218293246031e0;
        wgk[1] = 0.008600269855642942198661787950102e0;
        wgk[2] = 0.014626169256971252983787960308868e0;
        wgk[3] = 0.020388373461266523598010231432755e0;
        wgk[4] = 0.025882133604951158834505067096153e0;
        wgk[5] = 0.031287306777032798958543119323801e0;
        wgk[6] = 0.036600169758200798030557240707211e0;
        wgk[7] = 0.041668873327973686263788305936895e0;
        wgk[8] = 0.046434821867497674720231880926108e0;
        wgk[9] = 0.050944573923728691932707670050345e0;
        wgk[10] = 0.055195105348285994744832372419777e0;
        wgk[11] = 0.059111400880639572374967220648594e0;
        wgk[12] = 0.062653237554781168025870122174255e0;
        wgk[13] = 0.065834597133618422111563556969398e0;
        wgk[14] = 0.068648672928521619345623411885368e0;
        wgk[15] = 0.071054423553444068305790361723210e0;
        wgk[16] = 0.073030690332786667495189417658913e0;
        wgk[17] = 0.074582875400499188986581418362488e0;
        wgk[18] = 0.075704497684556674659542775376617e0;
        wgk[19] = 0.076377867672080736705502835038061e0;
        wgk[20] = 0.076600711917999656445049901530102e0;
        //
        epmach = (0, _d1mach.d1mach)(4);
        uflow = (0, _d1mach.d1mach)(1);
        //
        centr = 0.5e+00 * (a + b);
        hlgth = 0.5e+00 * (b - a);
        dhlgth = Math.abs(hlgth);
        //
        //           compute the 41-point gauss-kronrod approximation to
        //           the integral, and estimate the absolute error.
        //
        resg = 0.0e+00;
        fc = f(centr);
        resk = wgk[20] * fc;
        resabs = Math.abs(resk);
        for (j = 1; j <= 10; j++) {
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
        for (j = 1; j <= 10; j++) {
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
        resasc = wgk[20] * Math.abs(fc - reskh);
        for (j = 1; j <= 20; j++) {
          resasc = resasc + wgk[j - 1] * (Math.abs(fv1[j - 1] - reskh) + Math.abs(fv2[j - 1] - reskh));
        }
        result = resk * hlgth;
        resabs = resabs * dhlgth;
        resasc = resasc * dhlgth;
        abserr = Math.abs((resk - resg) * hlgth);
        if (resasc !== 0.0e+00 && abserr !== 0.e+00) {
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