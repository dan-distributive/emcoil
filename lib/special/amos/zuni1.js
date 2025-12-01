Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUNI1(ZR, ZI, FNU, KODE, N, YR, YI, NZ, NLAST, FNUL,
// * TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZUNI1
// ***REFER TO  ZBESI,ZBESK
//
//      ZUNI1 COMPUTES I(FNU,Z)  BY MEANS OF THE UNIFORM ASYMPTOTIC
//      EXPANSION FOR I(FNU,Z) IN -PI/3.LE.ARG Z.LE.PI/3.
//
//      FNUL IS THE SMALLEST ORDER PERMITTED FOR THE ASYMPTOTIC
//      EXPANSION. NLAST=0 MEANS ALL OF THE Y VALUES WERE SET.
//      NLAST.NE.0 IS THE NUMBER LEFT TO BE COMPUTED BY ANOTHER
//      FORMULA FOR ORDERS FNU TO FNU+NLAST-1 BECAUSE FNU+NLAST-1.LT.FNUL.
//      Y(I)=CZERO FOR I=NLAST+1,N
//
// ***ROUTINES CALLED  ZUCHK,ZUNIK,ZUOIK,D1MACH,AZABS
// ***END PROLOGUE  ZUNI1


exports.zuni1 = zuni1;

var _zuchk = require('./zuchk.js');

var _zunik5 = require('./zunik.js');

var _zuoik = require('./zuoik.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

function zuni1(zr, zi, fnu, kode, n, yr, yi, fnul, tol, elim, alim) {
  var aphi = void 0,
      ascle = void 0,
      bry = void 0,
      coner = void 0,
      crsc = void 0,
      cscl = void 0,
      csrr = void 0,
      cssr = void 0,
      c1r = void 0,
      c2i = void 0,
      c2m = void 0,
      c2r = void 0,
      fn = void 0,
      phii = void 0,
      phir = void 0,
      rast = void 0,
      rs1 = void 0,
      rzi = void 0,
      rzr = void 0,
      sti = void 0,
      str = void 0,
      sumi = void 0,
      sumr = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      zeroi = void 0,
      zeror = void 0,
      zeta1i = void 0,
      zeta1r = void 0,
      zeta2i = void 0,
      zeta2r = void 0,
      cyr = void 0,
      cyi = void 0,
      i = void 0,
      iflag = void 0,
      init = void 0,
      k = void 0,
      m = void 0,
      nd = void 0,
      nlast = void 0,
      nn = void 0,
      nuf = void 0,
      nw = void 0,
      nz = void 0;
  bry = new Array(3);
  cssr = new Array(3);
  csrr = new Array(3);
  cyr = new Array(2);
  cyi = new Array(2);
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        zeror = 0.0;
        zeroi = 0.0;
        coner = 1.0;

        nz = 0;
        nd = n;
        nlast = 0;
        // c-----------------------------------------------------------------------
        // c     computed values with exponents between alim and elim in mag-
        // c     nitude are scaled to keep intermediate arithmetic on scale,
        // c     exp(alim)=exp(elim)*tol
        // c-----------------------------------------------------------------------
        cscl = 1.0 / tol;
        crsc = tol;
        cssr[0] = cscl;
        cssr[1] = coner;
        cssr[2] = crsc;
        csrr[0] = crsc;
        csrr[1] = coner;
        csrr[2] = cscl;
        bry[0] = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;
        // c-----------------------------------------------------------------------
        // c     check for underflow and overflow on first member
        // c-----------------------------------------------------------------------
        fn = Math.max(fnu, 1.0);
        init = 0;

        var _zunik = (0, _zunik5.zunik)(zr, zi, fn, 1, 1, tol, init);

        var _zunik2 = _slicedToArray(_zunik, 8);

        phir = _zunik2[0];
        phii = _zunik2[1];
        zeta1r = _zunik2[2];
        zeta1i = _zunik2[3];
        zeta2r = _zunik2[4];
        zeta2i = _zunik2[5];
        sumr = _zunik2[6];
        sumi = _zunik2[7];

        if (kode === 1) {
          goToLabel = 10;break;
        }
        str = zr + zeta2r;
        sti = zi + zeta2i;
        rast = fn / (0, _zabs.azabs)(str, sti);
        str = str * rast * rast;
        sti = -sti * rast * rast;
        s1r = -zeta1r + str;
        s1i = -zeta1i + sti;
        goToLabel = 20;break;
      case 10:
        s1r = -zeta1r + zeta2r;
        s1i = -zeta1i + zeta2i;
      case 20:
        rs1 = s1r;
        if (Math.abs(rs1) > elim) {
          goToLabel = 130;break;
        }
      case 30:
        nn = Math.min(2, nd);
        // do 80 i=1,nn
        forLoop80: for (i = 1; i <= nn; i++) {
          fn = fnu + (nd - i);
          init = 0;

          var _zunik3 = (0, _zunik5.zunik)(zr, zi, fn, 1, 0, tol, init);

          var _zunik4 = _slicedToArray(_zunik3, 8);

          phir = _zunik4[0];
          phii = _zunik4[1];
          zeta1r = _zunik4[2];
          zeta1i = _zunik4[3];
          zeta2r = _zunik4[4];
          zeta2i = _zunik4[5];
          sumr = _zunik4[6];
          sumi = _zunik4[7];

          if (kode === 1) {
            s1r = -zeta1r + zeta2r;
            s1i = -zeta1i + zeta2i;
          } else {
            str = zr + zeta2r;
            sti = zi + zeta2i;
            rast = fn / (0, _zabs.azabs)(str, sti);
            str = str * rast * rast;
            sti = -sti * rast * rast;
            s1r = -zeta1r + str;
            s1i = -zeta1i + sti + zi;
          }
          // c-----------------------------------------------------------------------
          // c     test for underflow and overflow
          // c-----------------------------------------------------------------------
          rs1 = s1r;
          if (Math.abs(rs1) > elim) {
            goToLabel = 110;break forLoop80;
          }
          if (i === 1) iflag = 2;
          if (Math.abs(rs1) < alim) {
            // go to 60
          } else {
            // c-----------------------------------------------------------------------
            // c     refine  test and scale
            // c-----------------------------------------------------------------------
            aphi = (0, _zabs.azabs)(phir, phii);
            rs1 = rs1 + Math.log(aphi);
            if (Math.abs(rs1) > elim) {
              goToLabel = 110;break forLoop80;
            }
            if (i === 1) iflag = 1;
            if (rs1 < 0.0) {
              // go to 60
            } else {
              if (i === 1) iflag = 3;
            }
          }
          // 60   continue
          // c-----------------------------------------------------------------------
          // c     scale s1 if cabs(s1) < ascle
          // c-----------------------------------------------------------------------
          s2r = phir * sumr - phii * sumi;
          s2i = phir * sumi + phii * sumr;
          str = Math.exp(s1r) * cssr[iflag - 1];
          s1r = str * Math.cos(s1i);
          s1i = str * Math.sin(s1i);
          str = s2r * s1r - s2i * s1i;
          s2i = s2r * s1i + s2i * s1r;
          s2r = str;
          if (iflag !== 1) {
            // go to 70
          } else {
            nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
            if (nw !== 0) {
              goToLabel = 110;break forLoop80;
            }
          }
          // 70   continue
          cyr[i - 1] = s2r;
          cyi[i - 1] = s2i;
          m = nd - i + 1;
          yr[m - 1] = s2r * csrr[iflag - 1];
          yi[m - 1] = s2i * csrr[iflag - 1];
        }
        // 80 continue
        if (goToLabel > 80) {
          break;
        }
        if (nd <= 2) {
          goToLabel = 100;break;
        }
        rast = 1.0 / (0, _zabs.azabs)(zr, zi);
        str = zr * rast;
        sti = -zi * rast;
        rzr = (str + str) * rast;
        rzi = (sti + sti) * rast;
        bry[1] = 1.0 / bry[0];
        bry[2] = (0, _d1mach.d1mach)(2);
        s1r = cyr[0];
        s1i = cyi[0];
        s2r = cyr[1];
        s2i = cyi[1];
        c1r = csrr[iflag - 1];
        ascle = bry[iflag - 1];
        k = nd - 2;
        fn = k;

        // do 90 i=3,nd
        for (i = 3; i <= nd; i++) {
          c2r = s2r;
          c2i = s2i;
          s2r = s1r + (fnu + fn) * (rzr * c2r - rzi * c2i);
          s2i = s1i + (fnu + fn) * (rzr * c2i + rzi * c2r);
          s1r = c2r;
          s1i = c2i;
          c2r = s2r * c1r;
          c2i = s2i * c1r;
          yr[k - 1] = c2r;
          yi[k - 1] = c2i;
          k = k - 1;
          fn = fn - 1.0;
          if (iflag >= 3) break;
          str = Math.abs(c2r);
          sti = Math.abs(c2i);
          c2m = Math.max(str, sti);
          if (c2m <= ascle) break;
          iflag = iflag + 1;
          ascle = bry[iflag - 1];
          s1r = s1r * c1r;
          s1i = s1i * c1r;
          s2r = c2r;
          s2i = c2i;
          s1r = s1r * cssr[iflag - 1];
          s1i = s1i * cssr[iflag - 1];
          s2r = s2r * cssr[iflag - 1];
          s2i = s2i * cssr[iflag - 1];
          c1r = csrr[iflag - 1];
        }
      // 90 continue
      case 100:
        break mainExecutionLoop;
      case 110:
        // c-----------------------------------------------------------------------
        // c     set underflow and update parameters
        // c-----------------------------------------------------------------------
        if (rs1 > 0.0) {
          goToLabel = 120;break;
        }
        yr[nd - 1] = zeror;
        yi[nd - 1] = zeroi;
        nz = nz + 1;
        nd = nd - 1;
        if (nd === 0) {
          goToLabel = 100;break;
        }
        nuf = (0, _zuoik.zuoik)(zr, zi, fnu, kode, 1, nd, yr, yi, tol, elim, alim);
        if (nuf < 0) {
          goToLabel = 120;break;
        }
        nd = nd - nuf;
        nz = nz + nuf;
        if (nd === 0) {
          goToLabel = 100;break;
        }
        fn = fnu + (nd - 1);
        if (fn >= fnul) {
          goToLabel = 30;break;
        }
        nlast = nd;
        break mainExecutionLoop;
      case 120:
        nz = -1;
        break mainExecutionLoop;
      case 130:
        if (rs1 > 0.0) {
          goToLabel = 120;break;
        }
        nz = n;
        // do 140 i=1,n
        for (i = 1; i <= n; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
      // 140 continue
      default:
        break mainExecutionLoop;
    }
  }

  return [nz, nlast];
}