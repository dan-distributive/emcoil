Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zwrsk = zwrsk;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zbknu = require('./zbknu.js');

var _zrati = require('./zrati.js');

var _zabs = require('./zabs.js');

/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZWRSK(ZRR, ZRI, FNU, KODE, N, YR, YI, NZ, CWR, CWI,
// * TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZWRSK
// ***REFER TO  ZBESI,ZBESK
//
//      ZWRSK COMPUTES THE I BESSEL FUNCTION FOR RE(Z).GE.0.0 BY
//      NORMALIZING THE I FUNCTION RATIOS FROM ZRATI BY THE WRONSKIAN
//
// ***ROUTINES CALLED  D1MACH,ZBKNU,ZRATI,AZABS
// ***END PROLOGUE  ZWRSK
function zwrsk(zrr, zri, fnu, kode, n, yr, yi, cwr, cwi, tol, elim, alim) {
  var act = void 0,
      acw = void 0,
      ascle = void 0,
      cinui = void 0,
      cinur = void 0,
      csclr = void 0,
      cti = void 0,
      ctr = void 0,
      c1i = void 0,
      c1r = void 0,
      c2i = void 0,
      c2r = void 0,
      pti = void 0,
      ptr = void 0,
      ract = void 0,
      sti = void 0,
      str = void 0,
      i = void 0,
      nw = void 0,
      nz = void 0;
  cwr = new Array(2);
  cwi = new Array(2);
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        // c-----------------------------------------------------------------------
        // c     i(fnu+i-1,z) by backward recurrence for ratios
        // c     y(i)=i(fnu+i,z)/i(fnu+i-1,z) from crati normalized by the
        // c     wronskian with k(fnu,z) and k(fnu+1,z) from cbknu.
        // c-----------------------------------------------------------------------
        nz = 0;
        nw = (0, _zbknu.zbknu)(zrr, zri, fnu, kode, 2, cwr, cwi, tol, elim, alim);
        if (nw !== 0) {
          goToLabel = 50;break;
        }
        (0, _zrati.zrati)(zrr, zri, fnu, n, yr, yi, tol);
        // c-----------------------------------------------------------------------
        // c     recur forward on i(fnu+1,z) = r(fnu,z)*i(fnu,z),
        // c     r(fnu+j-1,z)=y(j),  j=1,...,n
        // c-----------------------------------------------------------------------
        cinur = 1.0;
        cinui = 0.0;
        if (kode === 1) {
          goToLabel = 10;break;
        }
        cinur = Math.cos(zri);
        cinui = Math.sin(zri);
      case 10:
        // c-----------------------------------------------------------------------
        // c     on low exponent machines the k functions can be close to both
        // c     the under and overflow limits and the normalization must be
        // c     scaled to prevent over or underflow. cuoik has determined that
        // c     the result is on scale.
        // c-----------------------------------------------------------------------
        acw = (0, _zabs.azabs)(cwr[1], cwi[1]);
        ascle = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;
        csclr = 1.0;
        if (acw > ascle) {
          goToLabel = 20;break;
        }
        csclr = 1.0 / tol;
        goToLabel = 30;break;
      case 20:
        ascle = 1.0 / ascle;
        if (acw < ascle) {
          goToLabel = 30;break;
        }
        csclr = tol;
      case 30:
        c1r = cwr[0] * csclr;
        c1i = cwi[0] * csclr;
        c2r = cwr[1] * csclr;
        c2i = cwi[1] * csclr;
        str = yr[0];
        sti = yi[0];
        // c-----------------------------------------------------------------------
        // c     cinu=cinu*(conjg(ct)/cabs(ct))*(1.0/cabs(ct) prevents
        // c     under- or overflow prematurely by squaring cabs(ct)
        // c-----------------------------------------------------------------------
        ptr = str * c1r - sti * c1i;
        pti = str * c1i + sti * c1r;
        ptr = ptr + c2r;
        pti = pti + c2i;
        ctr = zrr * ptr - zri * pti;
        cti = zrr * pti + zri * ptr;
        act = (0, _zabs.azabs)(ctr, cti);
        ract = 1.0 / act;
        ctr = ctr * ract;
        cti = -cti * ract;
        ptr = cinur * ract;
        pti = cinui * ract;
        cinur = ptr * ctr - pti * cti;
        cinui = ptr * cti + pti * ctr;
        yr[0] = cinur * csclr;
        yi[0] = cinui * csclr;
        if (n === 1) break mainExecutionLoop;
        // do 40 i=2,n
        for (i = 2; i <= n; i++) {
          ptr = str * cinur - sti * cinui;
          cinui = str * cinui + sti * cinur;
          cinur = ptr;
          str = yr[i - 1];
          sti = yi[i - 1];
          yr[i - 1] = cinur * csclr;
          yi[i - 1] = cinui * csclr;
        }
        // 40 continue
        break mainExecutionLoop;
      case 50:
        nz = -1;
        if (nw === -2) nz = -2;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}