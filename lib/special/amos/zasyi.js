Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZASYI(ZR, ZI, FNU, KODE, N, YR, YI, NZ, RL, TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZASYI
// ***REFER TO  ZBESI,ZBESK
//
//      ZASYI COMPUTES THE I BESSEL FUNCTION FOR REAL(Z).GE.0.0 BY
//      MEANS OF THE ASYMPTOTIC EXPANSION FOR LARGE CABS(Z) IN THE
//      REGION CABS(Z).GT.MAX(RL,FNU*FNU/2). NZ=0 IS A NORMAL RETURN.
//      NZ.LT.0 INDICATES AN OVERFLOW ON KODE=1.
//
// ***ROUTINES CALLED  D1MACH,AZABS,ZDIV,AZEXP,ZMLT,AZSQRT
// ***END PROLOGUE  ZASYI


exports.zasyi = zasyi;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _zdiv3 = require('./zdiv.js');

var _zexp = require('./zexp.js');

var _zmlt7 = require('./zmlt.js');

var _zsqrt = require('./zsqrt.js');

function zasyi(zr, zi, fnu, kode, n, yr, yi, rl, tol, elim, alim) {
  var aa = void 0,
      aez = void 0,
      ak = void 0,
      ak1i = void 0,
      ak1r = void 0,
      arg = void 0,
      arm = void 0,
      atol = void 0,
      az = void 0,
      bb = void 0,
      bk = void 0,
      cki = void 0,
      ckr = void 0,
      conei = void 0,
      coner = void 0,
      cs1i = void 0,
      cs1r = void 0,
      cs2i = void 0,
      cs2r = void 0,
      czi = void 0,
      czr = void 0,
      dfnu = void 0,
      dki = void 0,
      dkr = void 0,
      dnu2 = void 0,
      ezi = void 0,
      ezr = void 0,
      fdn = void 0,
      pi = void 0,
      p1i = void 0,
      p1r = void 0,
      raz = void 0,
      rtpi = void 0,
      rtr1 = void 0,
      rzi = void 0,
      rzr = void 0,
      s = void 0,
      sgn = void 0,
      sqk = void 0,
      sti = void 0,
      str = void 0,
      s2i = void 0,
      s2r = void 0,
      tzi = void 0,
      tzr = void 0,
      zeroi = void 0,
      zeror = void 0,
      i = void 0,
      ib = void 0,
      il = void 0,
      inu = void 0,
      j = void 0,
      jl = void 0,
      k = void 0,
      koded = void 0,
      m = void 0,
      nn = void 0,
      nz = void 0;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    mainSwitch: switch (goToLabel) {
      case 0:
        pi = 3.14159265358979324;
        rtpi = 0.159154943091895336;
        zeror = 0.0;
        zeroi = 0.0;
        coner = 1.0;
        conei = 0.0;

        nz = 0;
        az = (0, _zabs.azabs)(zr, zi);
        arm = 1.0e+3 * (0, _d1mach.d1mach)(1);
        rtr1 = Math.sqrt(arm);
        il = Math.min(2, n);
        dfnu = fnu + (n - il);
        // c-----------------------------------------------------------------------
        // c     overflow test
        // c-----------------------------------------------------------------------
        raz = 1.0 / az;
        str = zr * raz;
        sti = -zi * raz;
        ak1r = rtpi * str * raz;
        ak1i = rtpi * sti * raz;

        var _azsqrt = (0, _zsqrt.azsqrt)(ak1r, ak1i);

        var _azsqrt2 = _slicedToArray(_azsqrt, 2);

        ak1r = _azsqrt2[0];
        ak1i = _azsqrt2[1];

        czr = zr;
        czi = zi;
        if (kode !== 2) {
          goToLabel = 10;break;
        }
        czr = zeror;
        czi = zi;
      case 10:
        if (Math.abs(czr) > elim) {
          goToLabel = 100;break;
        }
        dnu2 = dfnu + dfnu;
        koded = 1;
        if (Math.abs(czr) > alim && n > 2) {
          goToLabel = 20;break;
        }
        koded = 0;

        var _azexp = (0, _zexp.azexp)(czr, czi);

        var _azexp2 = _slicedToArray(_azexp, 2);

        str = _azexp2[0];
        sti = _azexp2[1];

        var _zmlt = (0, _zmlt7.zmlt)(ak1r, ak1i, str, sti);

        var _zmlt2 = _slicedToArray(_zmlt, 2);

        ak1r = _zmlt2[0];
        ak1i = _zmlt2[1];

      case 20:
        fdn = 0.0;
        if (dnu2 > rtr1) fdn = dnu2 * dnu2;
        ezr = zr * 8.0;
        ezi = zi * 8.0;
        // c-----------------------------------------------------------------------
        // c     when z is imaginary, the error test must be made relative to the
        // c     first reciprocal power since this is the leading term of the
        // c     expansion for the imaginary part.
        // c-----------------------------------------------------------------------
        aez = 8.0 * az;
        s = tol / aez;
        jl = Math.trunc(rl + rl) + 2;
        p1r = zeror;
        p1i = zeroi;
        if (zi === 0.0) {
          goToLabel = 30;break;
        }
        // c-----------------------------------------------------------------------
        // c     calculate exp(pi*(0.5+fnu+n-il)*i) to minimize losses of
        // c     significance when fnu or n is large
        // c-----------------------------------------------------------------------
        inu = Math.trunc(fnu);
        arg = (fnu - inu) * pi;
        inu = inu + n - il;
        ak = -Math.sin(arg);
        bk = Math.cos(arg);
        if (zi < 0.0) {
          bk = -bk;
        }
        p1r = ak;
        p1i = bk;
        if (inu % 2 === 0) {
          goToLabel = 30;break;
        }
        p1r = -p1r;
        p1i = -p1i;
      case 30:
        // for loop 70:
        for (k = 1; k <= il; k++) {
          sqk = fdn - 1.0;
          atol = s * Math.abs(sqk);
          sgn = 1.0;
          cs1r = coner;
          cs1i = conei;
          cs2r = coner;
          cs2i = conei;
          ckr = coner;
          cki = conei;
          ak = 0.0;
          aa = 1.0;
          bb = aez;
          dkr = ezr;
          dki = ezi;
          // for loop 40
          for (j = 1; j <= jl; j++) {
            var _zdiv = (0, _zdiv3.zdiv)(ckr, cki, dkr, dki);

            var _zdiv2 = _slicedToArray(_zdiv, 2);

            str = _zdiv2[0];
            sti = _zdiv2[1];

            ckr = str * sqk;
            cki = sti * sqk;
            cs2r = cs2r + ckr;
            cs2i = cs2i + cki;
            sgn = -sgn;
            cs1r = cs1r + ckr * sgn;
            cs1i = cs1i + cki * sgn;
            dkr = dkr + ezr;
            dki = dki + ezi;
            aa = aa * Math.abs(sqk) / bb;
            bb = bb + aez;
            ak = ak + 8.0;
            sqk = sqk - ak;
            if (aa <= atol) {
              goToLabel = 50;break;
            }
          }
          if (goToLabel === 50) {
            // go to 50 - loop converged under atol
          } else {
            // 40   continue - throw error
            goToLabel = 110;break mainSwitch;
          }
          // 50 continue
          s2r = cs1r;
          s2i = cs1i;
          if (zr + zr >= elim) {
            // goToLabel = 60;
          } else {
            tzr = zr + zr;
            tzi = zi + zi;

            var _azexp3 = (0, _zexp.azexp)(-tzr, -tzi);

            var _azexp4 = _slicedToArray(_azexp3, 2);

            str = _azexp4[0];
            sti = _azexp4[1];

            var _zmlt3 = (0, _zmlt7.zmlt)(str, sti, p1r, p1i);

            var _zmlt4 = _slicedToArray(_zmlt3, 2);

            str = _zmlt4[0];
            sti = _zmlt4[1];

            var _zmlt5 = (0, _zmlt7.zmlt)(str, sti, cs2r, cs2i);

            var _zmlt6 = _slicedToArray(_zmlt5, 2);

            str = _zmlt6[0];
            sti = _zmlt6[1];

            s2r = s2r + str;
            s2i = s2i + sti;
          }
          fdn = fdn + 8.0 * dfnu + 4.0;
          p1r = -p1r;
          p1i = -p1i;
          m = n - il + k;
          yr[m - 1] = s2r * ak1r - s2i * ak1i;
          yi[m - 1] = s2r * ak1i + s2i * ak1r;
        }
        if (n <= 2) {
          break mainExecutionLoop;
        }
        nn = n;
        k = nn - 2;
        ak = k;
        str = zr * raz;
        sti = -zi * raz;
        rzr = (str + str) * raz;
        rzi = (sti + sti) * raz;
        ib = 3;
        // do 80 i=ib,nn
        for (i = ib; i <= nn; i++) {
          yr[k - 1] = (ak + fnu) * (rzr * yr[k] - rzi * yi[k]) + yr[k + 1];
          yi[k - 1] = (ak + fnu) * (rzr * yi[k] + rzi * yr[k]) + yi[k + 1];
          ak = ak - 1.0;
          k = k - 1;
        }
        if (koded === 0) {
          break mainExecutionLoop;
        }

        // do 90 i=1,nn
        var _azexp5 = (0, _zexp.azexp)(czr, czi);

        var _azexp6 = _slicedToArray(_azexp5, 2);

        ckr = _azexp6[0];
        cki = _azexp6[1];
        for (i = 1; i <= nn; i++) {
          str = yr[i - 1] * ckr - yi[i - 1] * cki;
          yi[i - 1] = yr[i - 1] * cki + yi[i - 1] * ckr;
          yr[i - 1] = str;
        }
        break mainExecutionLoop;
      case 100:
        nz = -1;
        break mainExecutionLoop;
      case 110:
        nz = -2;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}