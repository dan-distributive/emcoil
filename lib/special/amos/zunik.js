Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // SUBROUTINE ZUNIK(ZRR, ZRI, FNU, IKFLG, IPMTR, TOL, INIT, PHIR,
//  * PHII, ZETA1R, ZETA1I, ZETA2R, ZETA2I, SUMR, SUMI, CWRKR, CWRKI)
// ***BEGIN PROLOGUE  ZUNIK
// ***REFER TO  ZBESI,ZBESK
//
//         ZUNIK COMPUTES PARAMETERS FOR THE UNIFORM ASYMPTOTIC
//         EXPANSIONS OF THE I AND K FUNCTIONS ON IKFLG= 1 OR 2
//         RESPECTIVELY BY
//
//         W(FNU,ZR) = PHI*EXP(ZETA)*SUM
//
//         WHERE       ZETA=-ZETA1 + ZETA2       OR
//                           ZETA1 - ZETA2
//
//         THE FIRST CALL MUST HAVE INIT=0. SUBSEQUENT CALLS WITH THE
//         SAME ZR AND FNU WILL RETURN THE I OR K FUNCTION ON IKFLG=
//         1 OR 2 WITH NO CHANGE IN INIT. CWRK IS A COMPLEX WORK
//         ARRAY. IPMTR=0 COMPUTES ALL PARAMETERS. IPMTR=1 COMPUTES PHI,
//         ZETA1,ZETA2.
//
// ***ROUTINES CALLED  ZDIV,AZLOG,AZSQRT,D1MACH
// ***END PROLOGUE  ZUNIK
//      COMPLEX CFN,CON,CONE,CRFN,CWRK,CZERO,PHI,S,SR,SUM,T,T2,ZETA1,
//     *ZETA2,ZN,ZR


exports.zunik = zunik;

var _zdiv7 = require('./zdiv.js');

var _zlog = require('./zlog.js');

var _zsqrt = require('./zsqrt.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function zunik(zrr, zri, fnu, ikflg, ipmtr, tol, init) {
  var ac = void 0,
      c = void 0,
      con = void 0,
      conei = void 0,
      coner = void 0,
      crfni = void 0,
      crfnr = void 0,
      cwrki = void 0,
      cwrkr = void 0,
      phii = void 0,
      phir = void 0,
      rfn = void 0,
      si = void 0,
      sr = void 0,
      sri = void 0,
      srr = void 0,
      sti = void 0,
      str = void 0,
      sumi = void 0,
      sumr = void 0,
      test = void 0,
      ti = void 0,
      tr = void 0,
      t2i = void 0,
      t2r = void 0,
      zeroi = void 0,
      zeror = void 0,
      zeta1i = void 0,
      zeta1r = void 0,
      zeta2i = void 0,
      zeta2r = void 0,
      zni = void 0,
      znr = void 0,
      i = void 0,
      j = void 0,
      k = void 0,
      l = void 0;
  cwrkr = new Array(16);
  cwrki = new Array(16);
  zeror = 0;
  zeroi = 0;
  coner = 1;
  conei = 0;
  con = [3.98942280401432678e-01, 1.25331413731550025e+00];
  c = [1.00000000000000000e+00, -2.08333333333333333e-01, 1.25000000000000000e-01, 3.34201388888888889e-01, -4.01041666666666667e-01, 7.03125000000000000e-02, -1.02581259645061728e+00, 1.84646267361111111e+00, -8.91210937500000000e-01, 7.32421875000000000e-02, 4.66958442342624743e+00, -1.12070026162229938e+01, 8.78912353515625000e+00, -2.36408691406250000e+00, 1.12152099609375000e-01, -2.82120725582002449e+01, 8.46362176746007346e+01, -9.18182415432400174e+01, 4.25349987453884549e+01, -7.36879435947963170e+00, 2.27108001708984375e-01, 2.12570130039217123e+02, -7.65252468141181642e+02, 1.05999045252799988e+03, -6.99579627376132541e+02, 2.18190511744211590e+02, -2.64914304869515555e+01, 5.72501420974731445e-01, -1.91945766231840700e+03, 8.06172218173730938e+03, -1.35865500064341374e+04, 1.16553933368645332e+04, -5.30564697861340311e+03, 1.20090291321635246e+03, -1.08090919788394656e+02, 1.72772750258445740e+00, 2.02042913309661486e+04, -9.69805983886375135e+04, 1.92547001232531532e+05, -2.03400177280415534e+05, 1.22200464983017460e+05, -4.11926549688975513e+04, 7.10951430248936372e+03, -4.93915304773088012e+02, 6.07404200127348304e+00, -2.42919187900551333e+05, 1.31176361466297720e+06, -2.99801591853810675e+06, 3.76327129765640400e+06, -2.81356322658653411e+06, 1.26836527332162478e+06, -3.31645172484563578e+05, 4.52187689813627263e+04, -2.49983048181120962e+03, 2.43805296995560639e+01, 3.28446985307203782e+06, -1.97068191184322269e+07, 5.09526024926646422e+07, -7.41051482115326577e+07, 6.63445122747290267e+07, -3.75671766607633513e+07, 1.32887671664218183e+07, -2.78561812808645469e+06, 3.08186404612662398e+05, -1.38860897537170405e+04, 1.10017140269246738e+02, -4.93292536645099620e+07, 3.25573074185765749e+08, -9.39462359681578403e+08, 1.55359689957058006e+09, -1.62108055210833708e+09, 1.10684281682301447e+09, -4.95889784275030309e+08, 1.42062907797533095e+08, -2.44740627257387285e+07, 2.24376817792244943e+06, -8.40054336030240853e+04, 5.51335896122020586e+02, 8.14789096118312115e+08, -5.86648149205184723e+09, 1.86882075092958249e+10, -3.46320433881587779e+10, 4.12801855797539740e+10, -3.30265997498007231e+10, 1.79542137311556001e+10, -6.56329379261928433e+09, 1.55927986487925751e+09, -2.25105661889415278e+08, 1.73951075539781645e+07, -5.49842327572288687e+05, 3.03809051092238427e+03, -1.46792612476956167e+10, 1.14498237732025810e+11, -3.99096175224466498e+11, 8.19218669548577329e+11, -1.09837515608122331e+12, 1.00815810686538209e+12, -6.45364869245376503e+11, 2.87900649906150589e+11, -8.78670721780232657e+10, 1.76347306068349694e+10, -2.16716498322379509e+09, 1.43157876718888981e+08, -3.87183344257261262e+06, 1.82577554742931747e+04, 2.86464035717679043e+11, -2.40629790002850396e+12, 9.10934118523989896e+12, -2.05168994109344374e+13, 3.05651255199353206e+13, -3.16670885847851584e+13, 2.33483640445818409e+13, -1.23204913055982872e+13, 4.61272578084913197e+12, -1.19655288019618160e+12, 2.05914503232410016e+11, -2.18229277575292237e+10, 1.24700929351271032e+09, -2.91883881222208134e+07, 1.18838426256783253e+05];
  if (init !== 0) {
    // go to 40
  } else {
    // c-----------------------------------------------------------------------
    // c     initialize all variables
    // c-----------------------------------------------------------------------
    rfn = 1.0 / fnu;
    // c-----------------------------------------------------------------------
    // c     overflow test (zr/fnu too small)
    // c-----------------------------------------------------------------------
    test = (0, _d1mach.d1mach)(1) * 1.0e3;
    ac = fnu * test;
    if (Math.abs(zrr) > ac || Math.abs(zri) > ac) {
      // go to 15
    } else {
      zeta1r = 2.0 * Math.abs(Math.log(test)) + fnu;
      zeta1i = 0.0;
      zeta2r = fnu;
      zeta2i = 0.0;
      phir = 1.0;
      phii = 0.0;
      sumr = sumi = null;
      return [phir, phii, zeta1r, zeta1i, zeta2r, zeta2i, sumr, sumi, cwrkr, cwrki];
    }
    // 15 continue
    tr = zrr * rfn;
    ti = zri * rfn;
    sr = coner + (tr * tr - ti * ti);
    si = conei + (tr * ti + ti * tr);

    var _azsqrt = (0, _zsqrt.azsqrt)(sr, si);

    var _azsqrt2 = _slicedToArray(_azsqrt, 2);

    srr = _azsqrt2[0];
    sri = _azsqrt2[1];

    str = coner + srr;
    sti = conei + sri;

    var _zdiv = (0, _zdiv7.zdiv)(str, sti, tr, ti);

    var _zdiv2 = _slicedToArray(_zdiv, 2);

    znr = _zdiv2[0];
    zni = _zdiv2[1];

    var _azlog = (0, _zlog.azlog)(znr, zni);

    var _azlog2 = _slicedToArray(_azlog, 2);

    str = _azlog2[0];
    sti = _azlog2[1];

    zeta1r = fnu * str;
    zeta1i = fnu * sti;
    zeta2r = fnu * srr;
    zeta2i = fnu * sri;

    var _zdiv3 = (0, _zdiv7.zdiv)(coner, conei, srr, sri);

    var _zdiv4 = _slicedToArray(_zdiv3, 2);

    tr = _zdiv4[0];
    ti = _zdiv4[1];

    srr = tr * rfn;
    sri = ti * rfn;

    var _azsqrt3 = (0, _zsqrt.azsqrt)(srr, sri);

    var _azsqrt4 = _slicedToArray(_azsqrt3, 2);

    cwrkr[15] = _azsqrt4[0];
    cwrki[15] = _azsqrt4[1];

    phir = cwrkr[15] * con[ikflg - 1];
    phii = cwrki[15] * con[ikflg - 1];
    if (ipmtr !== 0) {
      return [phir, phii, zeta1r, zeta1i, zeta2r, zeta2i, sumr, sumi, cwrkr, cwrki];
    }

    var _zdiv5 = (0, _zdiv7.zdiv)(coner, conei, sr, si);

    var _zdiv6 = _slicedToArray(_zdiv5, 2);

    t2r = _zdiv6[0];
    t2i = _zdiv6[1];

    cwrkr[0] = coner;
    cwrki[0] = conei;
    crfnr = coner;
    crfni = conei;
    ac = 1.0;
    l = 1;
    // do 20 k=2,15
    for (k = 2; k <= 15; k++) {
      sr = zeror;
      si = zeroi;
      // do 10 j=1,k
      for (j = 1; j <= k; j++) {
        l = l + 1;
        str = sr * t2r - si * t2i + c[l - 1];
        si = sr * t2i + si * t2r;
        sr = str;
      }
      // 10   continue
      str = crfnr * srr - crfni * sri;
      crfni = crfnr * sri + crfni * srr;
      crfnr = str;
      cwrkr[k - 1] = crfnr * sr - crfni * si;
      cwrki[k - 1] = crfnr * si + crfni * sr;
      ac = ac * rfn;
      test = Math.abs(cwrkr[k - 1]) + Math.abs(cwrki[k - 1]);
      if (ac < tol && test < tol) {
        break;
      }
    }
    // 20 continue
    if (k === 16) k = 15; // if loop maxed out, set to 15, last index of loop; }
    // 30 continue
    init = k;
  }
  // 40 continue
  if (ikflg === 2) {
    // go to 60
  } else {
    // c-----------------------------------------------------------------------
    // c     compute sum for the i function
    // c-----------------------------------------------------------------------
    sr = zeror;
    si = zeroi;
    // do 50 i=1,init
    for (i = 1; i <= init; i++) {
      sr = sr + cwrkr[i - 1];
      si = si + cwrki[i - 1];
    }
    // 50 continue
    sumr = sr;
    sumi = si;
    phir = cwrkr[15] * con[0];
    phii = cwrki[15] * con[0];
    return [phir, phii, zeta1r, zeta1i, zeta2r, zeta2i, sumr, sumi, cwrkr, cwrki];
  }
  // 60 continue
  // c-----------------------------------------------------------------------
  // c     compute sum for the k function
  // c-----------------------------------------------------------------------
  sr = zeror;
  si = zeroi;
  tr = coner;
  // do 70 i=1,init
  for (i = 1; i <= init; i++) {
    sr = sr + tr * cwrkr(i - 1);
    si = si + tr * cwrki(i - 1);
    tr = -tr;
  }
  // 70 continue
  sumr = sr;
  sumi = si;
  phir = cwrkr[15] * con[1];
  phii = cwrki[15] * con[1];
  return [phir, phii, zeta1r, zeta1i, zeta2r, zeta2i, sumr, sumi, cwrkr, cwrki];
}