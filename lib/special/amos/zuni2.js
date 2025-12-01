Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUNI2(ZR, ZI, FNU, KODE, N, YR, YI, NZ, NLAST, FNUL,
// * TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZUNI2
// ***REFER TO  ZBESI,ZBESK
//
//      ZUNI2 COMPUTES I(FNU,Z) IN THE RIGHT HALF PLANE BY MEANS OF
//      UNIFORM ASYMPTOTIC EXPANSION FOR J(FNU,ZN) WHERE ZN IS Z*I
//      OR -Z*I AND ZN IS IN THE RIGHT HALF PLANE ALSO.
//
//      FNUL IS THE SMALLEST ORDER PERMITTED FOR THE ASYMPTOTIC
//      EXPANSION. NLAST=0 MEANS ALL OF THE Y VALUES WERE SET.
//      NLAST.NE.0 IS THE NUMBER LEFT TO BE COMPUTED BY ANOTHER
//      FORMULA FOR ORDERS FNU TO FNU+NLAST-1 BECAUSE FNU+NLAST-1.LT.FNUL.
//      Y(I)=CZERO FOR I=NLAST+1,N
//
// ***ROUTINES CALLED  ZAIRY,ZUCHK,ZUNHJ,ZUOIK,D1MACH,AZABS
// ***END PROLOGUE  ZUNI2


exports.zuni2 = zuni2;

var _zairy5 = require('./zairy.js');

var _zuchk = require('./zuchk.js');

var _zunhj5 = require('./zunhj.js');

var _zuoik = require('./zuoik.js');

var _zabs = require('./zabs.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function zuni2(zr, zi, fnu, kode, n, yr, yi, fnul, tol, elim, alim) {
  var aarg = void 0,
      aic = void 0,
      aii = void 0,
      air = void 0,
      ang = void 0,
      aphi = void 0,
      argi = void 0,
      argr = void 0,
      ascle = void 0,
      asumi = void 0,
      asumr = void 0,
      bry = void 0,
      bsumi = void 0,
      bsumr = void 0,
      cidi = void 0,
      cipi = void 0,
      cipr = void 0,
      coner = void 0,
      crsc = void 0,
      cscl = void 0,
      csrr = void 0,
      cssr = void 0,
      c1r = void 0,
      c2i = void 0,
      c2m = void 0,
      c2r = void 0,
      daii = void 0,
      dair = void 0,
      fn = void 0,
      hpi = void 0,
      phii = void 0,
      phir = void 0,
      rast = void 0,
      raz = void 0,
      rs1 = void 0,
      rzi = void 0,
      rzr = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      zbi = void 0,
      zbr = void 0,
      zeroi = void 0,
      zeror = void 0,
      zeta1i = void 0,
      zeta1r = void 0,
      zeta2i = void 0,
      zeta2r = void 0,
      zni = void 0,
      znr = void 0,
      cyr = void 0,
      cyi = void 0,
      car = void 0,
      sar = void 0,
      i = void 0,
      iflag = void 0,
      index = void 0,
      inu = void 0,
      j = void 0,
      k = void 0,
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

  zeror = 0.0;
  zeroi = 0.0;
  coner = 1.0;

  cipr = [1, 0, -1, 0];
  cipi = [0, 1, 0, -1];
  hpi = 1.57079632679489662;
  aic = 1.265512123484645396;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
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
        // c     zn is in the right half plane after rotation by ci or -ci
        // c-----------------------------------------------------------------------
        znr = zi;
        zni = -zr;
        zbr = zr;
        zbi = zi;
        cidi = -coner;
        inu = Math.trunc(fnu);
        ang = hpi * (fnu - inu);
        c2r = Math.cos(ang);
        c2i = Math.sin(ang);
        car = c2r;
        sar = c2i;
        index = inu + n - 1;
        index = index % 4 + 1;
        str = c2r * cipr(index) - c2i * cipi(index);
        c2i = c2r * cipi(index) + c2i * cipr(index);
        c2r = str;
        if (zi > 0.0) {
          goToLabel = 10;break;
        }
        znr = -znr;
        zbi = -zbi;
        cidi = -cidi;
        c2i = -c2i;
      case 10:
        // c-----------------------------------------------------------------------
        // c     check for underflow and overflow on first member
        // c-----------------------------------------------------------------------
        fn = Math.max(fnu, 1.0);

        var _zunhj = (0, _zunhj5.zunhj)(znr, zni, fn, 1, tol);

        var _zunhj2 = _slicedToArray(_zunhj, 12);

        phir = _zunhj2[0];
        phii = _zunhj2[1];
        argr = _zunhj2[2];
        argi = _zunhj2[3];
        zeta1r = _zunhj2[4];
        zeta1i = _zunhj2[5];
        zeta2r = _zunhj2[6];
        zeta2i = _zunhj2[7];
        asumr = _zunhj2[8];
        asumi = _zunhj2[9];
        bsumr = _zunhj2[10];
        bsumi = _zunhj2[11];

        if (kode === 1) {
          goToLabel = 20;break;
        }
        str = zbr + zeta2r;
        sti = zbi + zeta2i;
        rast = fn / (0, _zabs.azabs)(str, sti);
        str = str * rast * rast;
        sti = -sti * rast * rast;
        s1r = -zeta1r + str;
        s1i = -zeta1i + sti;
        goToLabel = 30;break;
      case 20:
        s1r = -zeta1r + zeta2r;
        s1i = -zeta1i + zeta2i;
      case 30:
        rs1 = s1r;
        if (Math.abs(rs1) > elim) {
          goToLabel = 150;break;
        }
      case 40:
        nn = Math.min(2, nd);
        // do 90 i=1,nn
        for (i = 1; i <= nn; i++) {
          fn = fnu + (nd - i);

          var _zunhj3 = (0, _zunhj5.zunhj)(znr, zni, fn, 0, tol);

          var _zunhj4 = _slicedToArray(_zunhj3, 12);

          phir = _zunhj4[0];
          phii = _zunhj4[1];
          argr = _zunhj4[2];
          argi = _zunhj4[3];
          zeta1r = _zunhj4[4];
          zeta1i = _zunhj4[5];
          zeta2r = _zunhj4[6];
          zeta2i = _zunhj4[7];
          asumr = _zunhj4[8];
          asumi = _zunhj4[9];
          bsumr = _zunhj4[10];
          bsumi = _zunhj4[11];

          if (kode === 1) {
            s1r = -zeta1r + zeta2r;
            s1i = -zeta1i + zeta2i;
          } else {
            str = zbr + zeta2r;
            sti = zbi + zeta2i;
            rast = fn / (0, _zabs.azabs)(str, sti);
            str = str * rast * rast;
            sti = -sti * rast * rast;
            s1r = -zeta1r + str;
            s1i = -zeta1i + sti + Math.abs(zi);
          }
          // c-----------------------------------------------------------------------
          // c     test for underflow and overflow
          // c-----------------------------------------------------------------------
          rs1 = s1r;
          if (Math.abs(rs1) > elim) {
            goToLabel = 120;break;
          }
          if (i === 1) iflag = 2;
          if (Math.abs(rs1) < alim) {//
            // go to 70
          } else {
            // c-----------------------------------------------------------------------
            // c     refine  test and scale
            // c-----------------------------------------------------------------------
            // c-----------------------------------------------------------------------
            aphi = (0, _zabs.azabs)(phir, phii);
            aarg = (0, _zabs.azabs)(argr, argi);
            rs1 = rs1 + Math.log(aphi) - 0.25 * Math.log(aarg) - aic;
            if (Math.abs(rs1) > elim) {
              goToLabel = 120;break;
            }
            if (i === 1) iflag = 1;
            if (rs1 < 0.0) {
              // go to 70
            } else {
              if (i === 1) iflag = 3;
            }
          }
          // 70   continue
          // c-----------------------------------------------------------------------
          // c     scale s1 to keep intermediate arithmetic on scale near
          // c     exponent extremes
          // c-----------------------------------------------------------------------

          var _zairy = (0, _zairy5.zairy)(argr, argi, 0, 2);

          var _zairy2 = _slicedToArray(_zairy, 2);

          air = _zairy2[0];
          aii = _zairy2[1];

          var _zairy3 = (0, _zairy5.zairy)(argr, argi, 1, 2);

          var _zairy4 = _slicedToArray(_zairy3, 2);

          dair = _zairy4[0];
          daii = _zairy4[1];

          str = dair * bsumr - daii * bsumi;
          sti = dair * bsumi + daii * bsumr;
          str = str + (air * asumr - aii * asumi);
          sti = sti + (air * asumi + aii * asumr);
          s2r = phir * str - phii * sti;
          s2i = phir * sti + phii * str;
          str = Math.exp(s1r) * cssr[iflag - 1];
          s1r = str * Math.cos(s1i);
          s1i = str * Math.sin(s1i);
          str = s2r * s1r - s2i * s1i;
          s2i = s2r * s1i + s2i * s1r;
          s2r = str;
          if (iflag !== 1) {
            // go to 80
          } else {
            nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
            if (nw !== 0) {
              goToLabel = 120;break;
            }
          }
          // 80   continue
          if (zi <= 0.0) s2i = -s2i;
          str = s2r * c2r - s2i * c2i;
          s2i = s2r * c2i + s2i * c2r;
          s2r = str;
          cyr[i - 1] = s2r;
          cyi[i - 1] = s2i;
          j = nd - i + 1;
          yr[j - 1] = s2r * csrr[iflag - 1];
          yi[j - 1] = s2i * csrr[iflag - 1];
          str = -c2i * cidi;
          c2i = c2r * cidi;
          c2r = str;
        }
        if (goToLabel === 120) {
          break;
        }
        // 90 continue
        if (nd <= 2) {
          goToLabel = 110;break;
        }
        raz = 1.0 / (0, _zabs.azabs)(zr, zi);
        str = zr * raz;
        sti = -zi * raz;
        rzr = (str + str) * raz;
        rzi = (sti + sti) * raz;
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
        // do 100 i=3,nd
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
          if (iflag >= 3) continue;
          str = Math.abs(c2r);
          sti = Math.abs(c2i);
          c2m = Math.max(str, sti);
          if (c2m <= ascle) continue;
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
      // 100 continue
      case 110:
        break mainExecutionLoop;
      case 120:
        if (rs1 > 0.0) {
          goToLabel = 140;break;
        }
        // c-----------------------------------------------------------------------
        // c     set underflow and update parameters
        // c-----------------------------------------------------------------------
        yr[nd - 1] = zeror;
        yi[nd - 1] = zeroi;
        nz = nz + 1;
        nd = nd - 1;
        if (nd === 0) {
          goToLabel = 110;break;
        }
        nuf = (0, _zuoik.zuoik)(zr, zi, fnu, kode, 1, nd, yr, yi, tol, elim, alim);
        if (nuf < 0) {
          goToLabel = 140;break;
        }
        nd = nd - nuf;
        nz = nz + nuf;
        if (nd === 0) {
          goToLabel = 110;break;
        }
        fn = fnu + (nd - 1);
        if (fn < fnul) {
          goToLabel = 130;break;
        }
        // c      fn = cidi
        // c      j = nuf + 1
        // c      k = mod(j,4) + 1
        // c      s1r = cipr(k)
        // c      s1i = cipi(k)
        // c      if (fn < 0.0) s1i = -s1i
        // c      str = c2r*s1r - c2i*s1i
        // c      c2i = c2r*s1i + c2i*s1r
        // c      c2r = str
        index = inu + nd - 1;
        index = index % 4 + 1;
        c2r = car * cipr[index - 1] - sar * cipi[index - 1];
        c2i = car * cipi[index - 1] + sar * cipr[index - 1];
        if (zi <= 0.0) c2i = -c2i;
        goToLabel = 40;break;
      case 130:
        nlast = nd;
        break mainExecutionLoop;
      case 140:
        nz = -1;
        break mainExecutionLoop;
      case 150:
        if (rs1 > 0.0) {
          goToLabel = 140;break;
        }
        nz = n;
        // do 160 i=1,n
        for (i = 1; i <= n; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
      // 160 continue
      default:
        break mainExecutionLoop;
    }
  }

  return [nz, nlast];
}