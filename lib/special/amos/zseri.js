Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZSERI(ZR, ZI, FNU, KODE, N, YR, YI, NZ, TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZSERI
// ***REFER TO  ZBESI,ZBESK
//
//      ZSERI COMPUTES THE I BESSEL FUNCTION FOR REAL(Z).GE.0.0 BY
//      MEANS OF THE POWER SERIES FOR LARGE CABS(Z) IN THE
//      REGION CABS(Z).LE.2*SQRT(FNU+1). NZ=0 IS A NORMAL RETURN.
//      NZ.GT.0 MEANS THAT THE LAST NZ COMPONENTS WERE SET TO ZERO
//      DUE TO UNDERFLOW. NZ.LT.0 MEANS UNDERFLOW OCCURRED, BUT THE
//      CONDITION CABS(Z).LE.2*SQRT(FNU+1) WAS VIOLATED AND THE
//      COMPUTATION MUST BE COMPLETED IN ANOTHER ROUTINE WITH N=N-ABS(NZ).
//
// ***ROUTINES CALLED  DGAMLN,D1MACH,ZUCHK,AZABS,ZDIV,AZLOG,ZMLT
// ***END PROLOGUE  ZSERI


exports.zseri = zseri;

var _dgamln = require('./dgamln.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zuchk = require('./zuchk.js');

var _zabs = require('./zabs.js');

var _zdiv3 = require('./zdiv.js');

var _zlog = require('./zlog.js');

var _zmlt3 = require('./zmlt.js');

function zseri(zr, zi, fnu, kode, n, yr, yi, tol, elim, alim) {
  var aa = void 0,
      acz = void 0,
      ak = void 0,
      ak1i = void 0,
      ak1r = void 0,
      arm = void 0,
      ascle = void 0,
      atol = void 0,
      az = void 0,
      cki = void 0,
      ckr = void 0,
      coefi = void 0,
      coefr = void 0,
      conei = void 0,
      coner = void 0,
      crscr = void 0,
      czi = void 0,
      czr = void 0,
      dfnu = void 0,
      fnup = void 0,
      hzi = void 0,
      hzr = void 0,
      raz = void 0,
      rs = void 0,
      rtr1 = void 0,
      rzi = void 0,
      rzr = void 0,
      s = void 0,
      ss = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      wi = void 0,
      wr = void 0,
      zeroi = void 0,
      zeror = void 0,
      i = void 0,
      ib = void 0,
      iflag = void 0,
      il = void 0,
      k = void 0,
      l = void 0,
      m = void 0,
      nn = void 0,
      nz = void 0,
      nw = void 0;

  wr = new Array(2);
  wi = new Array(2);

  zeror = 0.0;
  zeroi = 0.0;
  coner = 1.0;
  conei = 0.0;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:

        nz = 0;
        az = (0, _zabs.azabs)(zr, zi);
        if (az === 0.0) {
          goToLabel = 160;break;
        }
        arm = 1.0e+3 * (0, _d1mach.d1mach)(1);
        rtr1 = Math.sqrt(arm);
        crscr = 1.0;
        iflag = 0;
        if (az < arm) {
          goToLabel = 150;break;
        }
        hzr = 0.5 * zr;
        hzi = 0.5 * zi;
        czr = zeror;
        czi = zeroi;
        if (az <= rtr1) {
          goToLabel = 10;break;
        }

        var _zmlt = (0, _zmlt3.zmlt)(hzr, hzi, hzr, hzi);

        var _zmlt2 = _slicedToArray(_zmlt, 2);

        czr = _zmlt2[0];
        czi = _zmlt2[1];

      case 10:
        acz = (0, _zabs.azabs)(czr, czi);
        nn = n;

        var _azlog = (0, _zlog.azlog)(hzr, hzi);

        var _azlog2 = _slicedToArray(_azlog, 2);

        ckr = _azlog2[0];
        cki = _azlog2[1];

      case 20:
        dfnu = fnu + (nn - 1);
        fnup = dfnu + 1.0;
        // c-----------------------------------------------------------------------
        // c     underflow test
        // c-----------------------------------------------------------------------
        ak1r = ckr * dfnu;
        ak1i = cki * dfnu;
        ak = (0, _dgamln.dgamln)(fnup);
        ak1r = ak1r - ak;
        if (kode === 2) ak1r = ak1r - zr;
        if (ak1r > -elim) {
          goToLabel = 40;break;
        }
      case 30:
        nz = nz + 1;
        yr[nn - 1] = zeror;
        yi[nn - 1] = zeroi;
        if (acz > dfnu) {
          goToLabel = 190;break;
        }
        nn = nn - 1;
        if (nn === 0) break mainExecutionLoop;
        goToLabel = 20;break;
      case 40:
        if (ak1r > -alim) {
          goToLabel = 50;break;
        }
        iflag = 1;
        ss = 1.0 / tol;
        crscr = tol;
        ascle = arm * ss;
      case 50:
        aa = Math.exp(ak1r);
        if (iflag === 1) aa = aa * ss;
        coefr = aa * Math.cos(ak1i);
        coefi = aa * Math.sin(ak1i);
        atol = tol * acz / fnup;
        il = Math.min(2, nn);
        // do 90 i=1,il
        for (i = 1; i <= il; i++) {
          dfnu = fnu + (nn - i);
          fnup = dfnu + 1.0;
          s1r = coner;
          s1i = conei;
          if (acz < tol * fnup) {
            // go to 70
          } else {
            ak1r = coner;
            ak1i = conei;
            ak = fnup + 2.0;
            s = fnup;
            aa = 2.0;
            // 60   continue
            while (aa > atol) {
              rs = 1.0 / s;
              str = ak1r * czr - ak1i * czi;
              sti = ak1r * czi + ak1i * czr;
              ak1r = str * rs;
              ak1i = sti * rs;
              s1r = s1r + ak1r;
              s1i = s1i + ak1i;
              s = s + ak;
              ak = ak + 2.0;
              aa = aa * acz * rs;
            }
            // if (aa > atol) go to 60
          }
          // 70   continue
          s2r = s1r * coefr - s1i * coefi;
          s2i = s1r * coefi + s1i * coefr;
          wr[i - 1] = s2r;
          wi[i - 1] = s2i;
          if (iflag === 0) {
            // go to 80
          } else {
            nw = (0, _zuchk.zuchk)(s2r, s2i, ascle, tol);
            if (nw !== 0) {
              goToLabel = 30;break;
            }
          }
          // 80   continue
          m = nn - i + 1;
          yr[m - 1] = s2r * crscr;
          yi[m - 1] = s2i * crscr;
          if (i === il) continue;

          var _zdiv = (0, _zdiv3.zdiv)(coefr, coefi, hzr, hzi);

          var _zdiv2 = _slicedToArray(_zdiv, 2);

          str = _zdiv2[0];
          sti = _zdiv2[1];

          coefr = str * dfnu;
          coefi = sti * dfnu;
        }
        if (goToLabel === 30) break;
      case 90:
        if (nn <= 2) break mainExecutionLoop;
        k = nn - 2;
        ak = k;
        raz = 1.0 / az;
        str = zr * raz;
        sti = -zi * raz;
        rzr = (str + str) * raz;
        rzi = (sti + sti) * raz;
        if (iflag === 1) {
          goToLabel = 120;break;
        }
        ib = 3;
      case 100:
        // do 110 i=ib,nn
        for (i = ib; i <= nn; i++) {
          yr[k - 1] = (ak + fnu) * (rzr * yr[k] - rzi * yi[k]) + yr[k + 1];
          yi[k - 1] = (ak + fnu) * (rzr * yi[k] + rzi * yr[k]) + yi[k + 1];
          ak = ak - 1.0;
          k = k - 1;
        }
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     recur backward with scaled values
      // c-----------------------------------------------------------------------
      case 120:
        // c-----------------------------------------------------------------------
        // c     exp(-alim)=exp(-elim)/tol=approx. one precision above the
        // c     underflow limit = ascle = d1mach(1)*ss*1.0e+3
        // c-----------------------------------------------------------------------
        s1r = wr[0];
        s1i = wi[0];
        s2r = wr[1];
        s2i = wi[1];
        // do 130 l=3,nn
        for (l = 3; l <= nn; l++) {
          ckr = s2r;
          cki = s2i;
          s2r = s1r + (ak + fnu) * (rzr * ckr - rzi * cki);
          s2i = s1i + (ak + fnu) * (rzr * cki + rzi * ckr);
          s1r = ckr;
          s1i = cki;
          ckr = s2r * crscr;
          cki = s2i * crscr;
          yr[k - 1] = ckr;
          yi[k - 1] = cki;
          ak = ak - 1.0;
          k = k - 1;
          if ((0, _zabs.azabs)(ckr, cki) > ascle) {
            goToLabel = 140;break;
          }
        }
        // 130 continue
        if (goToLabel !== 140) break mainExecutionLoop;
        ib = l + 1;
        if (ib > nn) break mainExecutionLoop;
        goToLabel = 100;break;
      case 150:
        nz = n;
        if (fnu === 0.0) nz = nz - 1;
      case 160:
        yr[0] = zeror;
        yi[0] = zeroi;
        if (fnu !== 0.0) {
          goToLabel = 170;break;
        }
        yr[0] = coner;
        yi[0] = conei;
      case 170:
        if (n === 1) break mainExecutionLoop;
        // do 180 i=2,n
        for (i = 2; i <= n; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
        // 180 continue
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     return with nz < 0 if cabs(z*z/4) > fnu+n-nz-1 complete
      // c     the calculation in cbinu with n=n-iabs(nz)
      // c-----------------------------------------------------------------------
      case 190:
        nz = -nz;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}