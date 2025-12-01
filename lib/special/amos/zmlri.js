Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZMLRI(ZR, ZI, FNU, KODE, N, YR, YI, NZ, TOL)
// ***BEGIN PROLOGUE  ZMLRI
// ***REFER TO  ZBESI,ZBESK
//
//      ZMLRI COMPUTES THE I BESSEL FUNCTION FOR RE(Z).GE.0.0 BY THE
//      MILLER ALGORITHM NORMALIZED BY A NEUMANN SERIES.
//
// ***ROUTINES CALLED  DGAMLN,D1MACH,AZABS,AZEXP,AZLOG,ZMLT
// ***END PROLOGUE  ZMLRI


exports.zmlri = zmlri;

var _dgamln = require('./dgamln.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _zexp = require('./zexp.js');

var _zlog = require('./zlog.js');

var _zmlt3 = require('./zmlt.js');

function zmlri(zr, zi, fnu, kode, n, yr, yi, tol) {
  var ack = void 0,
      ak = void 0,
      ap = void 0,
      at = void 0,
      az = void 0,
      bk = void 0,
      cki = void 0,
      ckr = void 0,
      cnormi = void 0,
      cnormr = void 0,
      conei = void 0,
      coner = void 0,
      fkap = void 0,
      fkk = void 0,
      flam = void 0,
      fnf = void 0,
      pti = void 0,
      ptr = void 0,
      p1i = void 0,
      p1r = void 0,
      p2i = void 0,
      p2r = void 0,
      raz = void 0,
      rho = void 0,
      rho2 = void 0,
      rzi = void 0,
      rzr = void 0,
      scle = void 0,
      sti = void 0,
      str = void 0,
      sumi = void 0,
      sumr = void 0,
      tfnf = void 0,
      tst = void 0,
      zeroi = void 0,
      zeror = void 0,
      i = void 0,
      iaz = void 0,
      ifnu = void 0,
      inu = void 0,
      itime = void 0,
      k = void 0,
      kk = void 0,
      km = void 0,
      m = void 0,
      nz = void 0;
  zeror = 0.0;
  zeroi = 0.0;
  coner = 1.0;
  conei = 0.0;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    mainSwitch: switch (goToLabel) {
      case 0:
        scle = (0, _d1mach.d1mach)(1) / tol;
        nz = 0;
        az = (0, _zabs.azabs)(zr, zi);
        iaz = Math.trunc(az);
        ifnu = Math.trunc(fnu);
        inu = ifnu + n - 1;
        at = iaz + 1.0;
        raz = 1.0 / az;
        str = zr * raz;
        sti = -zi * raz;
        ckr = str * at * raz;
        cki = sti * at * raz;
        rzr = (str + str) * raz;
        rzi = (sti + sti) * raz;
        p1r = zeror;
        p1i = zeroi;
        p2r = coner;
        p2i = conei;
        ack = (at + 1.0) * raz;
        rho = ack + Math.sqrt(ack * ack - 1.0);
        rho2 = rho * rho;
        tst = (rho2 + rho2) / ((rho2 - 1.0) * (rho - 1.0));
        tst = tst / tol;
        // c-----------------------------------------------------------------------
        // c     compute relative truncation error index for series
        // c-----------------------------------------------------------------------
        ak = at;
        // do 10 i=1,80
        for (i = 1; i <= 80; i++) {
          ptr = p2r;
          pti = p2i;
          p2r = p1r - (ckr * ptr - cki * pti);
          p2i = p1i - (cki * ptr + ckr * pti);
          p1r = ptr;
          p1i = pti;
          ckr = ckr + rzr;
          cki = cki + rzi;
          ap = (0, _zabs.azabs)(p2r, p2i);
          if (ap > tst * ak * ak) {
            goToLabel = 20;break mainSwitch;
          }
          ak = ak + 1.0;
        }
        goToLabel = 110;break;
      case 20:
        i = i + 1;
        k = 0;
        if (inu < iaz) {
          goToLabel = 40;break;
        }
        // c-----------------------------------------------------------------------
        // c     compute relative truncation error for ratios
        // c-----------------------------------------------------------------------
        p1r = zeror;
        p1i = zeroi;
        p2r = coner;
        p2i = conei;
        at = inu + 1.0;
        str = zr * raz;
        sti = -zi * raz;
        ckr = str * at * raz;
        cki = sti * at * raz;
        ack = at * raz;
        tst = Math.sqrt(ack / tol);
        itime = 1;
        // do 30 k=1,80
        for (k = 1; k <= 80; k++) {
          ptr = p2r;
          pti = p2i;
          p2r = p1r - (ckr * ptr - cki * pti);
          p2i = p1i - (ckr * pti + cki * ptr);
          p1r = ptr;
          p1i = pti;
          ckr = ckr + rzr;
          cki = cki + rzi;
          ap = (0, _zabs.azabs)(p2r, p2i);
          if (ap < tst) continue;
          if (itime === 2) {
            goToLabel = 40;break;
          }
          ack = (0, _zabs.azabs)(ckr, cki);
          flam = ack + Math.sqrt(ack * ack - 1.0);
          fkap = ap / (0, _zabs.azabs)(p1r, p1i);
          rho = Math.min(flam, fkap);
          tst = tst * Math.sqrt(rho / (rho * rho - 1.0));
          itime = 2;
        }
        if (goToLabel < 40) {
          goToLabel = 110;break;
        }
      case 40:
        // c-----------------------------------------------------------------------
        // c     backward recurrence and sum normalizing relation
        // c-----------------------------------------------------------------------
        k = k + 1;
        kk = Math.max(i + iaz, k + inu);
        fkk = kk;
        p1r = zeror;
        p1i = zeroi;
        // c-----------------------------------------------------------------------
        // c     scale p2 and sum by scle
        // c-----------------------------------------------------------------------
        p2r = scle;
        p2i = zeroi;
        fnf = fnu - ifnu;
        tfnf = fnf + fnf;
        bk = (0, _dgamln.dgamln)(fkk + tfnf + 1.0) - (0, _dgamln.dgamln)(fkk + 1.0) - (0, _dgamln.dgamln)(tfnf + 1.0);
        bk = Math.exp(bk);
        sumr = zeror;
        sumi = zeroi;
        km = kk - inu;
        // do 50 i=1,km
        for (i = 1; i <= km; i++) {
          ptr = p2r;
          pti = p2i;
          p2r = p1r + (fkk + fnf) * (rzr * ptr - rzi * pti);
          p2i = p1i + (fkk + fnf) * (rzi * ptr + rzr * pti);
          p1r = ptr;
          p1i = pti;
          ak = 1.0 - tfnf / (fkk + tfnf);
          ack = bk * ak;
          sumr = sumr + (ack + bk) * p1r;
          sumi = sumi + (ack + bk) * p1i;
          bk = ack;
          fkk = fkk - 1.0;
        }
        yr[n - 1] = p2r;
        yi[n - 1] = p2i;
        if (n === 1) {
          goToLabel = 70;break;
        }
        // do 60 i=2,n
        for (i = 2; i <= n; i++) {
          ptr = p2r;
          pti = p2i;
          p2r = p1r + (fkk + fnf) * (rzr * ptr - rzi * pti);
          p2i = p1i + (fkk + fnf) * (rzi * ptr + rzr * pti);
          p1r = ptr;
          p1i = pti;
          ak = 1.0 - tfnf / (fkk + tfnf);
          ack = bk * ak;
          sumr = sumr + (ack + bk) * p1r;
          sumi = sumi + (ack + bk) * p1i;
          bk = ack;
          fkk = fkk - 1.0;
          m = n - i + 1;
          yr[m - 1] = p2r;
          yi[m - 1] = p2i;
        }
      case 70:
        if (ifnu <= 0) {
          goToLabel = 90;break;
        }
        // do 80 i=1,ifnu
        for (i = 1; i <= fnu; i++) {
          ptr = p2r;
          pti = p2i;
          p2r = p1r + (fkk + fnf) * (rzr * ptr - rzi * pti);
          p2i = p1i + (fkk + fnf) * (rzr * pti + rzi * ptr);
          p1r = ptr;
          p1i = pti;
          ak = 1.0 - tfnf / (fkk + tfnf);
          ack = bk * ak;
          sumr = sumr + (ack + bk) * p1r;
          sumi = sumi + (ack + bk) * p1i;
          bk = ack;
          fkk = fkk - 1.0;
        }
      case 90:
        ptr = zr;
        pti = zi;
        if (kode === 2) ptr = zeror;

        var _azlog = (0, _zlog.azlog)(rzr, rzi);

        var _azlog2 = _slicedToArray(_azlog, 2);

        str = _azlog2[0];
        sti = _azlog2[1];

        p1r = -fnf * str + ptr;
        p1i = -fnf * sti + pti;
        ap = (0, _dgamln.dgamln)(1.0 + fnf);
        ptr = p1r - ap;
        pti = p1i;
        // c-----------------------------------------------------------------------
        // c     the division cexp(pt)/(sum+p2) is altered to avoid overflow
        // c     in the denominator by squaring large quantities
        // c-----------------------------------------------------------------------
        p2r = p2r + sumr;
        p2i = p2i + sumi;
        ap = (0, _zabs.azabs)(p2r, p2i);
        p1r = 1.0 / ap;

        var _azexp = (0, _zexp.azexp)(ptr, pti);

        var _azexp2 = _slicedToArray(_azexp, 2);

        str = _azexp2[0];
        sti = _azexp2[1];

        ckr = str * p1r;
        cki = sti * p1r;
        ptr = p2r * p1r;
        pti = -p2i * p1r;

        // do 100 i=1,n
        var _zmlt = (0, _zmlt3.zmlt)(ckr, cki, ptr, pti);

        var _zmlt2 = _slicedToArray(_zmlt, 2);

        cnormr = _zmlt2[0];
        cnormi = _zmlt2[1];
        for (i = 1; i <= n; i++) {
          str = yr[i - 1] * cnormr - yi[i - 1] * cnormi;
          yi[i - 1] = yr[i - 1] * cnormi + yi[i - 1] * cnormr;
          yr[i - 1] = str;
        }
        break mainExecutionLoop;
      case 110:
        nz = -2;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}