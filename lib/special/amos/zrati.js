Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZRATI(ZR, ZI, FNU, N, CYR, CYI, TOL)
// ***BEGIN PROLOGUE  ZRATI
// ***REFER TO  ZBESI,ZBESK,ZBESH
//
//      ZRATI COMPUTES RATIOS OF I BESSEL FUNCTIONS BY BACKWARD
//      RECURRENCE.  THE STARTING INDEX IS DETERMINED BY FORWARD
//      RECURRENCE AS DESCRIBED IN J. RES. OF NAT. BUR. OF STANDARDS-B,
//      MATHEMATICAL SCIENCES, VOL 77B, P111-114, SEPTEMBER, 1973,
//      BESSEL FUNCTIONS I AND J OF COMPLEX ARGUMENT AND INTEGER ORDER,
//      BY D. J. SOOKNE.
//
// ***ROUTINES CALLED  AZABS,ZDIV
// ***END PROLOGUE  ZRATI


exports.zrati = zrati;

var _zabs = require('./zabs.js');

var _zdiv3 = require('./zdiv.js');

function zrati(zr, zi, fnu, n, cyr, cyi, tol) {
  var ak = void 0,
      amagz = void 0,
      ap1 = void 0,
      ap2 = void 0,
      arg = void 0,
      az = void 0,
      cdfnui = void 0,
      cdfnur = void 0,
      conei = void 0,
      coner = void 0,
      czeroi = void 0,
      czeror = void 0,
      dfnu = void 0,
      fdnu = void 0,
      flam = void 0,
      fnup = void 0,
      pti = void 0,
      ptr = void 0,
      p1i = void 0,
      p1r = void 0,
      p2i = void 0,
      p2r = void 0,
      rak = void 0,
      rap1 = void 0,
      rho = void 0,
      rt2 = void 0,
      rzi = void 0,
      rzr = void 0,
      test = void 0,
      test1 = void 0,
      tti = void 0,
      ttr = void 0,
      t1i = void 0,
      t1r = void 0,
      i = void 0,
      id = void 0,
      idnu = void 0,
      inu = void 0,
      itime = void 0,
      k = void 0,
      kk = void 0,
      magz = void 0;

  czeror = 0.0;
  czeroi = 0.0;
  coner = 1.0;
  conei = 0.0;
  rt2 = 1.41421356237309505;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        az = (0, _zabs.azabs)(zr, zi);
        inu = Math.trunc(fnu);
        idnu = inu + n - 1;
        magz = Math.trunc(az);
        amagz = magz + 1;
        fdnu = idnu;
        fnup = Math.max(amagz, fdnu);
        id = idnu - magz - 1;
        itime = 1;
        k = 1;
        ptr = 1.0 / az;
        rzr = ptr * (zr + zr) * ptr;
        rzi = -ptr * (zi + zi) * ptr;
        t1r = rzr * fnup;
        t1i = rzi * fnup;
        p2r = -t1r;
        p2i = -t1i;
        p1r = coner;
        p1i = conei;
        t1r = t1r + rzr;
        t1i = t1i + rzi;
        if (id > 0) id = 0;
        ap2 = (0, _zabs.azabs)(p2r, p2i);
        ap1 = (0, _zabs.azabs)(p1r, p1i);
        // c-----------------------------------------------------------------------
        // c     the overflow test on k(fnu+i-1,z) before the call to cbknu
        // c     guarantees that p2 is on scale. scale test1 and all subsequent
        // c     p2 values by ap1 to ensure that an overflow does not occur
        // c     prematurely.
        // c-----------------------------------------------------------------------
        arg = (ap2 + ap2) / (ap1 * tol);
        test1 = Math.sqrt(arg);
        test = test1;
        rap1 = 1.0 / ap1;
        p1r = p1r * rap1;
        p1i = p1i * rap1;
        p2r = p2r * rap1;
        p2i = p2i * rap1;
        ap2 = ap2 * rap1;
      case 10:
        k = k + 1;
        ap1 = ap2;
        ptr = p2r;
        pti = p2i;
        p2r = p1r - (t1r * ptr - t1i * pti);
        p2i = p1i - (t1r * pti + t1i * ptr);
        p1r = ptr;
        p1i = pti;
        t1r = t1r + rzr;
        t1i = t1i + rzi;
        ap2 = (0, _zabs.azabs)(p2r, p2i);
        if (ap1 <= test) {
          goToLabel = 10;break;
        }
        if (itime === 2) {
          goToLabel = 20;break;
        }
        ak = (0, _zabs.azabs)(t1r, t1i) * 0.5;
        flam = ak + Math.sqrt(ak * ak - 1.0);
        rho = Math.min(ap2 / ap1, flam);
        test = test1 * Math.sqrt(rho / (rho * rho - 1.0));
        itime = 2;
        goToLabel = 10;break;
      case 20:
        kk = k + 1 - id;
        ak = kk;
        t1r = ak;
        t1i = czeroi;
        dfnu = fnu + (n - 1);
        p1r = 1.0 / ap2;
        p1i = czeroi;
        p2r = czeror;
        p2i = czeroi;
        // do 30 i=1,kk
        for (i = 1; i <= kk; i++) {
          ptr = p1r;
          pti = p1i;
          rap1 = dfnu + t1r;
          ttr = rzr * rap1;
          tti = rzi * rap1;
          p1r = ptr * ttr - pti * tti + p2r;
          p1i = ptr * tti + pti * ttr + p2i;
          p2r = ptr;
          p2i = pti;
          t1r = t1r - coner;
        }
        // 30 continue
        if (p1r !== czeror || p1i !== czeroi) {
          goToLabel = 40;break;
        }
        p1r = tol;
        p1i = tol;
      case 40:
        var _zdiv = (0, _zdiv3.zdiv)(p2r, p2i, p1r, p1i);

        var _zdiv2 = _slicedToArray(_zdiv, 2);

        cyr[n - 1] = _zdiv2[0];
        cyi[n - 1] = _zdiv2[1];

        if (n === 1) break mainExecutionLoop;
        k = n - 1;
        ak = k;
        t1r = ak;
        t1i = czeroi;
        cdfnur = fnu * rzr;
        cdfnui = fnu * rzi;
        // do 60 i=2,n
        for (i = 2; i <= n; i++) {
          ptr = cdfnur + (t1r * rzr - t1i * rzi) + cyr[k];
          pti = cdfnui + (t1r * rzi + t1i * rzr) + cyi[k];
          ak = (0, _zabs.azabs)(ptr, pti);
          if (ak !== czeror) {
            // go to 50
          } else {
            ptr = tol;
            pti = tol;
            ak = tol * rt2;
          }
          // 50   continue
          rak = coner / ak;
          cyr[k - 1] = rak * ptr * rak;
          cyi[k - 1] = -rak * pti * rak;
          t1r = t1r - coner;
          k = k - 1;
        }
      // 60 continue
      default:
        break mainExecutionLoop;
    }
  }
}