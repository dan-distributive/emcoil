Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZBUNI(ZR, ZI, FNU, KODE, N, YR, YI, NZ, NUI, NLAST,
// * FNUL, TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZBUNI
// ***REFER TO  ZBESI,ZBESK
//
//      ZBUNI COMPUTES THE I BESSEL FUNCTION FOR LARGE CABS(Z).GT.
//      FNUL AND FNU+N-1.LT.FNUL. THE ORDER IS INCREASED FROM
//      FNU+N-1 GREATER THAN FNUL BY ADDING NUI AND COMPUTING
//      ACCORDING TO THE UNIFORM ASYMPTOTIC EXPANSION FOR I(FNU,Z)
//      ON IFORM=1 AND THE EXPANSION FOR J(FNU,Z) ON IFORM=2
//
// ***ROUTINES CALLED  ZUNI1,ZUNI2,AZABS,D1MACH
// ***END PROLOGUE  ZBUNI


exports.zbuni = zbuni;

var _zuni9 = require('./zuni1.js');

var _zuni10 = require('./zuni2.js');

var _zabs = require('./zabs.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function zbuni(zr, zi, fnu, kode, n, yr, yi, nui, nlast, fnul, tol, elim, alim) {
  var ax = void 0,
      ay = void 0,
      csclr = void 0,
      cscrr = void 0,
      cyi = void 0,
      cyr = void 0,
      dfnu = void 0,
      fnui = void 0,
      gnu = void 0,
      raz = void 0,
      rzi = void 0,
      rzr = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      ascle = void 0,
      bry = void 0,
      c1r = void 0,
      c1i = void 0,
      c1m = void 0,
      i = void 0,
      iflag = void 0,
      iform = void 0,
      k = void 0,
      nl = void 0,
      nw = void 0,
      nz = void 0;

  cyr = new Array(2);
  cyi = new Array(2);
  bry = new Array(3);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        nz = 0;
        ax = Math.abs(zr) * 1.7321;
        ay = Math.abs(zi);
        iform = 1;
        if (ay > ax) iform = 2;
        if (nui === 0) {
          goToLabel = 60;break;
        }
        fnui = nui;
        dfnu = fnu + (n - 1);
        gnu = dfnu + fnui;
        if (iform === 2) {
          goToLabel = 10;break;
        }
        // c-----------------------------------------------------------------------
        // c     asymptotic expansion for i(fnu,z) for large fnu applied in
        // c     -pi/3 <= arg(z) <= pi/3
        // c-----------------------------------------------------------------------

        var _zuni = (0, _zuni9.zuni1)(zr, zi, gnu, kode, 2, cyr, cyi, fnul, tol, elim, alim);

        var _zuni2 = _slicedToArray(_zuni, 2);

        nw = _zuni2[0];
        nlast = _zuni2[1];

        goToLabel = 20;break;
      case 10:
        var _zuni3 = (0, _zuni10.zuni2)(zr, zi, gnu, kode, 2, cyr, cyi, fnul, tol, elim, alim);
        // c-----------------------------------------------------------------------
        // c     asymptotic expansion for j(fnu,z*exp(m*hpi)) for large fnu
        // c     applied in pi/3 < abs(arg(z)) <= pi/2 where m=+i or -i
        // c     and hpi=pi/2
        // c-----------------------------------------------------------------------


        var _zuni4 = _slicedToArray(_zuni3, 2);

        nw = _zuni4[0];
        nlast = _zuni4[1];

      case 20:
        if (nw < 0) {
          goToLabel = 50;break;
        }
        if (nw !== 0) {
          goToLabel = 90;break;
        }
        str = (0, _zabs.azabs)(cyr[0], cyi[0]);
        // c----------------------------------------------------------------------
        // c     scale backward recurrence, bry(3) is defined but never used
        // c----------------------------------------------------------------------
        bry[0] = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;
        bry[1] = 1.0 / bry[0];
        bry[2] = bry[1];
        iflag = 2;
        ascle = bry[1];
        csclr = 1.0;
        if (str > bry[0]) {
          goToLabel = 21;break;
        }
        iflag = 1;
        ascle = bry[0];
        csclr = 1.0 / tol;
        goToLabel = 25;break;
      case 21:
        if (str < bry[1]) {
          goToLabel = 25;break;
        }
        iflag = 3;
        ascle = bry[2];
        csclr = tol;
      case 25:
        cscrr = 1.0 / csclr;
        s1r = cyr[1] * csclr;
        s1i = cyi[1] * csclr;
        s2r = cyr[0] * csclr;
        s2i = cyi[0] * csclr;
        raz = 1.0 / (0, _zabs.azabs)(zr, zi);
        str = zr * raz;
        sti = -zi * raz;
        rzr = (str + str) * raz;
        rzi = (sti + sti) * raz;
        // do 30 i=1,nui
        for (i = 1; i <= nui; i++) {
          str = s2r;
          sti = s2i;
          s2r = (dfnu + fnui) * (rzr * str - rzi * sti) + s1r;
          s2i = (dfnu + fnui) * (rzr * sti + rzi * str) + s1i;
          s1r = str;
          s1i = sti;
          fnui = fnui - 1.0;
          if (iflag >= 3) continue;
          str = s2r * cscrr;
          sti = s2i * cscrr;
          c1r = Math.abs(str);
          c1i = Math.abs(sti);
          c1m = Math.max(c1r, c1i);
          if (c1m <= ascle) continue;
          iflag = iflag + 1;
          ascle = bry[iflag - 1];
          s1r = s1r * cscrr;
          s1i = s1i * cscrr;
          s2r = str;
          s2i = sti;
          csclr = csclr * tol;
          cscrr = 1.0 / csclr;
          s1r = s1r * csclr;
          s1i = s1i * csclr;
          s2r = s2r * csclr;
          s2i = s2i * csclr;
        }
        // 30 continue
        yr[n - 1] = s2r * cscrr;
        yi[n - 1] = s2i * cscrr;
        if (n === 1) break mainExecutionLoop;
        nl = n - 1;
        fnui = nl;
        k = nl;
        // do 40 i=1,nl
        for (i = 1; i <= nl; i++) {
          str = s2r;
          sti = s2i;
          s2r = (fnu + fnui) * (rzr * str - rzi * sti) + s1r;
          s2i = (fnu + fnui) * (rzr * sti + rzi * str) + s1i;
          s1r = str;
          s1i = sti;
          str = s2r * cscrr;
          sti = s2i * cscrr;
          yr[k - 1] = str;
          yi[k - 1] = sti;
          fnui = fnui - 1.0;
          k = k - 1;
          if (iflag >= 3) continue;
          c1r = Math.abs(str);
          c1i = Math.abs(sti);
          c1m = Math.max(c1r, c1i);
          if (c1m <= ascle) continue;
          iflag = iflag + 1;
          ascle = bry[iflag - 1];
          s1r = s1r * cscrr;
          s1i = s1i * cscrr;
          s2r = str;
          s2i = sti;
          csclr = csclr * tol;
          cscrr = 1.0 / csclr;
          s1r = s1r * csclr;
          s1i = s1i * csclr;
          s2r = s2r * csclr;
          s2i = s2i * csclr;
        }
        // 40 continue
        break mainExecutionLoop;
      case 50:
        nz = -1;
        if (nw === -2) nz = -2;
        break mainExecutionLoop;
      case 60:
        if (iform === 2) {
          goToLabel = 70;break;
        }
        // c-----------------------------------------------------------------------
        // c     asymptotic expansion for i(fnu,z) for large fnu applied in
        // c     -pi/3 <= arg(z) <= pi/3
        // c-----------------------------------------------------------------------

        var _zuni5 = (0, _zuni9.zuni1)(zr, zi, fnu, kode, n, yr, yi, fnul, tol, elim, alim);

        var _zuni6 = _slicedToArray(_zuni5, 2);

        nw = _zuni6[0];
        nlast = _zuni6[1];

        goToLabel = 80;break;
      case 70:
        var _zuni7 = (0, _zuni10.zuni2)(zr, zi, fnu, kode, n, yr, yi, fnul, tol, elim, alim);
        // c-----------------------------------------------------------------------
        // c     asymptotic expansion for j(fnu,z*exp(m*hpi)) for large fnu
        // c     applied in pi/3 < abs(arg(z)) <= pi/2 where m=+i or -i
        // c     and hpi=pi/2
        // c-----------------------------------------------------------------------


        var _zuni8 = _slicedToArray(_zuni7, 2);

        nw = _zuni8[0];
        nlast = _zuni8[1];

      case 80:
        if (nw < 0) {
          goToLabel = 50;break;
        }
        nz = nw;
        break mainExecutionLoop;
      case 90:
        nlast = n;
      default:
        break mainExecutionLoop;
    }
  }

  return [nz, nlast];
}