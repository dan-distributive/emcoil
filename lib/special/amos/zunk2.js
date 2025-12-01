Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUNK2(ZR, ZI, FNU, KODE, MR, N, YR, YI, NZ, TOL, ELIM,
// * ALIM)
// ***BEGIN PROLOGUE  ZUNK2
// ***REFER TO  ZBESK
//
//      ZUNK2 COMPUTES K(FNU,Z) AND ITS ANALYTIC CONTINUATION FROM THE
//      RIGHT HALF PLANE TO THE LEFT HALF PLANE BY MEANS OF THE
//      UNIFORM ASYMPTOTIC EXPANSIONS FOR H(KIND,FNU,ZN) AND J(FNU,ZN)
//      WHERE ZN IS IN THE RIGHT HALF PLANE, KIND=(3-MR)/2, MR=+1 OR
//      -1. HERE ZN=ZR*I OR -ZR*I WHERE ZR=Z IF Z IS IN THE RIGHT
//      HALF PLANE OR ZR=-Z IF Z IS IN THE LEFT HALF PLANE. MR INDIC-
//      ATES THE DIRECTION OF ROTATION FOR ANALYTIC CONTINUATION.
//      NZ=-1 MEANS AN OVERFLOW WILL OCCUR
//
// ***ROUTINES CALLED  ZAIRY,ZKSCL,ZS1S2,ZUCHK,ZUNHJ,D1MACH,AZABS
// ***END PROLOGUE  ZUNK2


exports.zunk2 = zunk2;

var _zairy9 = require('./zairy.js');

var _zs1s5 = require('./zs1s2.js');

var _zuchk = require('./zuchk.js');

var _zunhj7 = require('./zunhj.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _fortranHelpers = require('../../utils/fortranHelpers.js');

var ft = _interopRequireWildcard(_fortranHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function zunk2(zr, zi, fnu, kode, mr, n, yr, yi, tol, elim, alim) {
  var aarg = void 0,
      aic = void 0,
      aii = void 0,
      air = void 0,
      ang = void 0,
      aphi = void 0,
      argdi = void 0,
      argdr = void 0,
      argi = void 0,
      argr = void 0,
      asc = void 0,
      ascle = void 0,
      asumdi = void 0,
      asumdr = void 0,
      asumi = void 0,
      asumr = void 0,
      bry = void 0,
      bsumdi = void 0,
      bsumdr = void 0,
      bsumi = void 0,
      bsumr = void 0,
      car = void 0,
      cipi = void 0,
      cipr = void 0,
      cki = void 0,
      ckr = void 0,
      coner = void 0,
      crsc = void 0,
      cr1i = void 0,
      cr1r = void 0,
      cr2i = void 0,
      cr2r = void 0,
      cscl = void 0,
      csgni = void 0,
      csi = void 0,
      cspni = void 0,
      cspnr = void 0,
      csr = void 0,
      csrr = void 0,
      cssr = void 0,
      cyi = void 0,
      cyr = void 0,
      c1i = void 0,
      c1r = void 0,
      c2i = void 0,
      c2m = void 0,
      c2r = void 0,
      daii = void 0,
      dair = void 0,
      fmr = void 0,
      fn = void 0,
      fnf = void 0,
      hpi = void 0,
      phidi = void 0,
      phidr = void 0,
      phii = void 0,
      phir = void 0,
      pi = void 0,
      pti = void 0,
      ptr = void 0,
      rast = void 0,
      razr = void 0,
      rs1 = void 0,
      rzi = void 0,
      rzr = void 0,
      sar = void 0,
      sgn = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      yy = void 0,
      zbi = void 0,
      zbr = void 0,
      zeroi = void 0,
      zeror = void 0,
      zeta1i = void 0,
      zeta1r = void 0,
      zeta2i = void 0,
      zeta2r = void 0,
      zet1di = void 0,
      zet1dr = void 0,
      zet2di = void 0,
      zet2dr = void 0,
      zni = void 0,
      znr = void 0,
      zri = void 0,
      zrr = void 0,
      i = void 0,
      ib = void 0,
      iflag = void 0,
      ifn = void 0,
      il = void 0,
      index = void 0,
      inu = void 0,
      iuf = void 0,
      k = void 0,
      kdflg = void 0,
      kflag = void 0,
      kk = void 0,
      nw = void 0,
      nz = void 0,
      j = void 0,
      ipard = void 0,
      ic = void 0;
  bry = new Array(3);
  asumr = new Array(2);
  asumi = new Array(2);
  bsumr = new Array(2);
  bsumi = new Array(2);
  phir = new Array(2);
  phii = new Array(2);
  argr = new Array(2);
  argi = new Array(2);
  zeta1r = new Array(2);
  zeta1i = new Array(2);
  zeta2r = new Array(2);
  zeta2i = new Array(2);
  cyr = new Array(2);
  cyi = new Array(2);
  cssr = new Array(3);
  csrr = new Array(3);

  zeror = 0.0;
  zeroi = 0.0;
  coner = 1.0;
  cr1r = 1.0;
  cr1i = 1.73205080756887729;
  cr2r = -0.5;
  cr2i = -8.66025403784438647e-01;
  hpi = 1.57079632679489662;
  pi = 3.14159265358979324;
  aic = 1.26551212348464539;

  cipr = [1, 0, -1, 0];
  cipi = [0, -1, 0, 1];

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        kdflg = 1;
        nz = 0;
        // c-----------------------------------------------------------------------
        // c     exp(-alim)=exp(-elim)/tol=approx. one precision greater than
        // c     the underflow limit
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
        bry[1] = 1.0 / bry[0];
        bry[2] = (0, _d1mach.d1mach)(2);
        zrr = zr;
        zri = zi;
        if (zr >= 0.0) {
          goToLabel = 10;break;
        }
        zrr = -zr;
        zri = -zi;
      case 10:
        yy = zri;
        znr = zri;
        zni = -zrr;
        zbr = zrr;
        zbi = zri;
        inu = Math.trunc(fnu);
        fnf = fnu - inu;
        ang = -hpi * fnf;
        car = Math.cos(ang);
        sar = Math.sin(ang);
        c2r = hpi * sar;
        c2i = -hpi * car;
        kk = inu % 4 + 1;
        str = c2r * cipr[kk - 1] - c2i * cipi[kk - 1];
        sti = c2r * cipi[kk - 1] + c2i * cipr[kk - 1];
        csr = cr1r * str - cr1i * sti;
        csi = cr1r * sti + cr1i * str;
        if (yy > 0.0) {
          goToLabel = 20;break;
        }
        znr = -znr;
        zbi = -zbi;
      case 20:
        // c-----------------------------------------------------------------------
        // c     k(fnu,z) is computed from h(2,fnu,-i*z) where z is in the first
        // c     quadrant. fourth quadrant values (yy <= 0.0) are computed by
        // c     conjugation since the k function is real on the positive real axis
        // c-----------------------------------------------------------------------
        j = 2;
        // do 80 i=1,n
        for (i = 1; i <= n; i++) {
          // c-----------------------------------------------------------------------
          // c     j flip flops between 1 and 2 in j = 3 - j
          // c-----------------------------------------------------------------------
          j = 3 - j;
          fn = fnu + i - 1;

          var _zunhj = (0, _zunhj7.zunhj)(znr, zni, fn, 0, tol);

          var _zunhj2 = _slicedToArray(_zunhj, 12);

          phir[j - 1] = _zunhj2[0];
          phii[j - 1] = _zunhj2[1];
          argr[j - 1] = _zunhj2[2];
          argi[j - 1] = _zunhj2[3];
          zeta1r[j - 1] = _zunhj2[4];
          zeta1i[j - 1] = _zunhj2[5];
          zeta2r[j - 1] = _zunhj2[6];
          zeta2i[j - 1] = _zunhj2[7];
          asumr[j - 1] = _zunhj2[8];
          asumi[j - 1] = _zunhj2[9];
          bsumr[j - 1] = _zunhj2[10];
          bsumi[j - 1] = _zunhj2[11];

          if (kode === 1) {
            s1r = zeta1r[j - 1] - zeta2r[j - 1];
            s1i = zeta1i[j - 1] - zeta2i[j - 1];
          } else {
            str = zbr + zeta2r[j - 1];
            sti = zbi + zeta2i[j - 1];
            rast = fn / (0, _zabs.azabs)(str, sti);
            str = str * rast * rast;
            sti = -sti * rast * rast;
            s1r = zeta1r[j - 1] - str;
            s1i = zeta1i[j - 1] - sti;
          }
          // c-----------------------------------------------------------------------
          // c     test for underflow and overflow
          // c-----------------------------------------------------------------------
          rs1 = s1r;
          if (Math.abs(rs1) > elim) goToLabel = 70;
          if (goToLabel !== 70) {
            if (kdflg === 1) kflag = 2;
            if (Math.abs(rs1) < alim) goToLabel = 50;
            if (goToLabel !== 50) {
              // c-----------------------------------------------------------------------
              // c     refine  test and scale
              // c-----------------------------------------------------------------------
              aphi = (0, _zabs.azabs)(phir[j - 1], phii[j - 1]);
              aarg = (0, _zabs.azabs)(argr[j - 1], argi[j - 1]);
              rs1 = rs1 + Math.log(aphi) - 0.25 * Math.log(aarg) - aic;
              if (Math.abs(rs1) > elim) goToLabel = 70;
              if (goToLabel !== 70) {
                if (kdflg === 1) kflag = 1;
                if (rs1 < 0.0) {
                  // go to 50
                } else {
                  if (kdflg === 1) kflag = 3;
                }
              }
            }
            // 50   continue
            if (goToLabel < 70) {
              // c-----------------------------------------------------------------------
              // c     scale s1 to keep intermediate arithmetic on scale near
              // c     exponent extremes
              // c-----------------------------------------------------------------------
              c2r = argr[j - 1] * cr2r - argi[j - 1] * cr2i;
              c2i = argr[j - 1] * cr2i + argi[j - 1] * cr2r;

              var _zairy = (0, _zairy9.zairy)(c2r, c2i, 0, 2);

              var _zairy2 = _slicedToArray(_zairy, 2);

              air = _zairy2[0];
              aii = _zairy2[1];

              var _zairy3 = (0, _zairy9.zairy)(c2r, c2i, 1, 2);

              var _zairy4 = _slicedToArray(_zairy3, 2);

              dair = _zairy4[0];
              daii = _zairy4[1];

              str = dair * bsumr[j - 1] - daii * bsumi[j - 1];
              sti = dair * bsumi[j - 1] + daii * bsumr[j - 1];
              ptr = str * cr2r - sti * cr2i;
              pti = str * cr2i + sti * cr2r;
              str = ptr + (air * asumr[j - 1] - aii * asumi[j - 1]);
              sti = pti + (air * asumi[j - 1] + aii * asumr[j - 1]);
              ptr = str * phir[j - 1] - sti * phii[j - 1];
              pti = str * phii[j - 1] + sti * phir[j - 1];
              s2r = ptr * csr - pti * csi;
              s2i = ptr * csi + pti * csr;
              str = Math.exp(s1r) * cssr[kflag - 1];
              s1r = str * Math.cos(s1i);
              s1i = str * Math.sin(s1i);
              str = s2r * s1r - s2i * s1i;
              s2i = s1r * s2i + s2r * s1i;
              s2r = str;
              if (kflag !== 1) {
                // go to 60
              } else {
                nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
                if (nw !== 0) goToLabel = 70;
              }
              // 60   continue
              if (goToLabel < 70) {
                if (yy <= 0.0) s2i = -s2i;
                cyr[kdflg - 1] = s2r;
                cyi[kdflg - 1] = s2i;
                yr[i - 1] = s2r * csrr[kflag - 1];
                yi[i - 1] = s2i * csrr[kflag - 1];
                str = csi;
                csi = -csr;
                csr = str;
                if (kdflg === 2) {
                  goToLabel = 85;break;
                }
                kdflg = 2;
                break;
              }
            }
          }
          // 70   continue
          if (rs1 > 0.0) {
            goToLabel = 320;break;
          }
          // c-----------------------------------------------------------------------
          // c     for zr < 0.0, the i function to be added will overflow
          // c-----------------------------------------------------------------------
          if (zr < 0.0) {
            goToLabel = 320;break;
          }
          kdflg = 1;
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
          nz = nz + 1;
          str = csi;
          csi = -csr;
          csr = str;
          if (i === 1) break;
          if (yr[i - 2] === zeror && yi[i - 2] === zeroi) break;
          yr[i - 2] = zeror;
          yi[i - 2] = zeroi;
          nz = nz + 1;
        }
        // 80 continue
        if (goToLabel < 80) {
          i = n;
        } else {
          break;
        }
      case 85:
        razr = 1.0 / (0, _zabs.azabs)(zrr, zri);
        str = zrr * razr;
        sti = -zri * razr;
        rzr = (str + str) * razr;
        rzi = (sti + sti) * razr;
        ckr = fn * rzr;
        cki = fn * rzi;
        ib = i + 1;
        if (n < ib) {
          goToLabel = 180;break;
        }
        // c-----------------------------------------------------------------------
        // c     test last member for underflow and overflow. set sequence to zero
        // c     on underflow.
        // c-----------------------------------------------------------------------
        fn = fnu + (n - 1);
        ipard = 1;
        if (mr !== 0) {
          ipard = 0;

          var _zunhj3 = (0, _zunhj7.zunhj)(znr, zni, fn, ipard, tol);

          var _zunhj4 = _slicedToArray(_zunhj3, 12);

          phidr = _zunhj4[0];
          phidi = _zunhj4[1];
          argdr = _zunhj4[2];
          argdi = _zunhj4[3];
          zet1dr = _zunhj4[4];
          zet1di = _zunhj4[5];
          zet2dr = _zunhj4[6];
          zet2di = _zunhj4[7];
          asumdr = _zunhj4[8];
          asumdi = _zunhj4[9];
          bsumdr = _zunhj4[10];
          bsumdi = _zunhj4[11];
        }
        if (kode === 1) {
          goToLabel = 90;break;
        }
        str = zbr + zet2dr;
        sti = zbi + zet2di;
        rast = fn / (0, _zabs.azabs)(str, sti);
        str = str * rast * rast;
        sti = -sti * rast * rast;
        s1r = zet1dr - str;
        s1i = zet1di - sti;
        goToLabel = 100;break;
      case 90:
        s1r = zet1dr - zet2dr;
        s1i = zet1di - zet2di;
      case 100:
        rs1 = s1r;
        if (Math.abs(rs1) > elim) {
          goToLabel = 105;break;
        }
        if (Math.abs(rs1) < alim) {
          goToLabel = 120;break;
        }
        // c----------------------------------------------------------------------------
        // c     refine estimate and test
        // c-------------------------------------------------------------------------
        aphi = (0, _zabs.azabs)(phidr, phidi);
        rs1 = rs1 + Math.log(aphi);
        if (Math.abs(rs1) < elim) {
          goToLabel = 120;break;
        }
      case 105:
        if (rs1 > 0.0) {
          goToLabel = 320;break;
        }
        // c-----------------------------------------------------------------------
        // c     for zr < 0.0, the i function to be added will overflow
        // c-----------------------------------------------------------------------
        if (zr < 0.0) {
          goToLabel = 320;break;
        }
        nz = n;
        // do 106 i=1,n
        for (i = 1; i <= n; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
        // 106 continue
        break mainExecutionLoop;
      case 120:
        s1r = cyr[0];
        s1i = cyi[0];
        s2r = cyr[1];
        s2i = cyi[1];
        c1r = csrr[kflag - 1];
        ascle = bry[kflag - 1];
        // do 130 i=ib,n
        for (i = ib; i <= n; i++) {
          c2r = s2r;
          c2i = s2i;
          s2r = ckr * c2r - cki * c2i + s1r;
          s2i = ckr * c2i + cki * c2r + s1i;
          s1r = c2r;
          s1i = c2i;
          ckr = ckr + rzr;
          cki = cki + rzi;
          c2r = s2r * c1r;
          c2i = s2i * c1r;
          yr[i - 1] = c2r;
          yi[i - 1] = c2i;
          if (kflag >= 3) break;
          str = Math.abs(c2r);
          sti = Math.abs(c2i);
          c2m = Math.max(str, sti);
          if (c2m <= ascle) break;
          kflag = kflag + 1;
          ascle = bry[kflag - 1];
          s1r = s1r * c1r;
          s1i = s1i * c1r;
          s2r = c2r;
          s2i = c2i;
          s1r = s1r * cssr[kflag - 1];
          s1i = s1i * cssr[kflag - 1];
          s2r = s2r * cssr[kflag - 1];
          s2i = s2i * cssr[kflag - 1];
          c1r = csrr[kflag - 1];
        }
      // 130 continue
      case 180:
        if (mr === 0) break mainExecutionLoop;
        // c-----------------------------------------------------------------------
        // c     analytic continuation for re(z) < 0.0
        // c-----------------------------------------------------------------------
        nz = 0;
        fmr = mr;
        sgn = -ft.sign(pi, fmr);
        // c-----------------------------------------------------------------------
        // c     cspn and csgn are coeff of k and i functions resp.
        // c-----------------------------------------------------------------------
        csgni = sgn;
        if (yy <= 0.0) csgni = -csgni;
        ifn = inu + n - 1;
        ang = fnf * sgn;
        cspnr = Math.cos(ang);
        cspni = Math.sin(ang);
        if (ifn % 2 === 0) {
          goToLabel = 190;break;
        }
        cspnr = -cspnr;
        cspni = -cspni;
      case 190:
        // c-----------------------------------------------------------------------
        // c     cs=coeff of the j function to get the i function. i(fnu,z) is
        // c     computed from exp(i*fnu*hpi)*j(fnu,-i*z) where z is in the first
        // c     quadrant. fourth quadrant values (yy <= 0.0e0) are computed by
        // c     conjugation since the i function is real on the positive real axis
        // c-----------------------------------------------------------------------
        csr = sar * csgni;
        csi = car * csgni;
        index = ifn % 4 + 1;
        c2r = cipr[index - 1];
        c2i = cipi[index - 1];
        str = csr * c2r + csi * c2i;
        csi = -csr * c2i + csi * c2r;
        csr = str;
        asc = bry[0];
        iuf = 0;
        kk = n;
        kdflg = 1;
        ib = ib - 1;
        ic = ib - 1;
        // This loop 290 is such a hairy mess, I apologize if anyone has to come
        // back in here again. yeesh.
        // do 290 k=1,n
        for (k = 1; k <= n; k++) {
          fn = fnu + (kk - 1);
          // c-----------------------------------------------------------------------
          // c     logic to sort out cases whose parameters were set for the k
          // c     function above
          // c     technically the below is correct but it's gross - KC
          // c-----------------------------------------------------------------------
          if (n > 2 && kk === n && ib < n) {
            // do nothing
          } else if (n > 2 && (kk === ib || kk === ic) || n <= 2) {
            // 172   continue
            phidr = phir[j - 1];
            phidi = phii[j - 1];
            argdr = argr[j - 1];
            argdi = argi[j - 1];
            zet1dr = zeta1r[j - 1];
            zet1di = zeta1i[j - 1];
            zet2dr = zeta2r[j - 1];
            zet2di = zeta2i[j - 1];
            asumdr = asumr[j - 1];
            asumdi = asumi[j - 1];
            bsumdr = bsumr[j - 1];
            bsumdi = bsumi[j - 1];
            j = 3 - j;
          } else if (n > 2) {
            var _zunhj5 = (0, _zunhj7.zunhj)(znr, zni, fn, 0, tol);

            var _zunhj6 = _slicedToArray(_zunhj5, 12);

            phidr = _zunhj6[0];
            phidi = _zunhj6[1];
            argdr = _zunhj6[2];
            argdi = _zunhj6[3];
            zet1dr = _zunhj6[4];
            zet1di = _zunhj6[5];
            zet2dr = _zunhj6[6];
            zet2di = _zunhj6[7];
            asumdr = _zunhj6[8];
            asumdi = _zunhj6[9];
            bsumdr = _zunhj6[10];
            bsumdi = _zunhj6[11];
          }
          // 210 continue
          if (kode === 1) {
            s1r = -zet1dr + zet2dr;
            s1i = -zet1di + zet2di;
          } else {
            str = zbr + zet2dr;
            sti = zbi + zet2di;
            rast = fn / (0, _zabs.azabs)(str, sti);
            str = str * rast * rast;
            sti = -sti * rast * rast;
            s1r = -zet1dr + str;
            s1i = -zet1di + sti;
          }
          // c-----------------------------------------------------------------------
          // c     test for underflow and overflow
          // c-----------------------------------------------------------------------
          rs1 = s1r;
          if (Math.abs(rs1) > elim) {
            // go to 280
            if (rs1 > 0.0) {
              goToLabel = 320;break;
            }
            s2r = zeror;
            s2i = zeroi;
            // go to 250
          } else {
            if (kdflg === 1) iflag = 2;
            if (Math.abs(rs1) < alim) {
              // go to 240
            } else {
              // c-----------------------------------------------------------------------
              // c     refine  test and scale
              // c-----------------------------------------------------------------------
              aphi = (0, _zabs.azabs)(phidr, phidi);
              aarg = (0, _zabs.azabs)(argdr, argdi);
              rs1 = rs1 + Math.log(aphi) - 0.25 * Math.log(aarg) - aic;
              if (Math.abs(rs1) > elim) {
                // go to 280
                if (rs1 > 0.0) {
                  goToLabel = 320;break;
                }
                s2r = zeror;
                s2i = zeroi;
                goToLabel = 250;
              } else {
                if (kdflg === 1) iflag = 1;
                if (rs1 < 0.0) {
                  // go to 240
                } else {
                  if (kdflg === 1) iflag = 3;
                }
              }
            }
            // 240   continue
            if (goToLabel < 250) {
              var _zairy5 = (0, _zairy9.zairy)(argdr, argdi, 0, 2);

              var _zairy6 = _slicedToArray(_zairy5, 2);

              air = _zairy6[0];
              aii = _zairy6[1];

              var _zairy7 = (0, _zairy9.zairy)(argdr, argdi, 1, 2);

              var _zairy8 = _slicedToArray(_zairy7, 2);

              dair = _zairy8[0];
              daii = _zairy8[1];

              str = dair * bsumdr - daii * bsumdi;
              sti = dair * bsumdi + daii * bsumdr;
              str = str + (air * asumdr - aii * asumdi);
              sti = sti + (air * asumdi + aii * asumdr);
              ptr = str * phidr - sti * phidi;
              pti = str * phidi + sti * phidr;
              s2r = ptr * csr - pti * csi;
              s2i = ptr * csi + pti * csr;
              str = Math.exp(s1r) * cssr[iflag - 1];
              s1r = str * Math.cos(s1i);
              s1i = str * Math.sin(s1i);
              str = s2r * s1r - s2i * s1i;
              s2i = s2r * s1i + s2i * s1r;
              s2r = str;
              if (iflag !== 1) {
                // go to 250
              } else {
                nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
                if (nw === 0) {
                  // go to 250
                } else {
                  s2r = zeror;
                  s2i = zeroi;
                }
              } // iflag !== 1
            } // if should run 240?
          } // if should skip straight to 250
          // 250   continue
          if (yy <= 0.0) s2i = -s2i;
          cyr[kdflg - 1] = s2r;
          cyi[kdflg - 1] = s2i;
          c2r = s2r;
          c2i = s2i;
          s2r = s2r * csrr[iflag - 1];
          s2i = s2i * csrr[iflag - 1];
          // c-----------------------------------------------------------------------
          // c     add i and k functions, k sequence in y(i), i=1,n
          // c-----------------------------------------------------------------------
          s1r = yr[kk - 1];
          s1i = yi[kk - 1];
          if (kode === 1) {
            // go to 270
          } else {
            var _zs1s = (0, _zs1s5.zs1s2)(zrr, zri, s1r, s1i, s2r, s2i, asc, alim, iuf);

            var _zs1s2 = _slicedToArray(_zs1s, 5);

            s1r = _zs1s2[0];
            s1i = _zs1s2[1];
            s2r = _zs1s2[2];
            s2i = _zs1s2[3];
            nw = _zs1s2[4];

            nz = nz + nw;
          }
          // 270   continue
          yr[kk - 1] = s1r * cspnr - s1i * cspni + s2r;
          yi[kk - 1] = s1r * cspni + s1i * cspnr + s2i;
          kk = kk - 1;
          cspnr = -cspnr;
          cspni = -cspni;
          str = csi;
          csi = -csr;
          csr = str;
          if (c2r !== 0.0 || c2i !== 0.0) {
            // go to 275
          } else {
            kdflg = 1;
            break;
          }
          // 275   continue
          if (kdflg === 2) {
            goToLabel = 295;break;
          }
          kdflg = 2;
          break;
        }
        // 290 continue
        k = n;
      case 295:
        il = n - k;
        if (il === 0) break mainExecutionLoop;
        // c-----------------------------------------------------------------------
        // c     recur backward for remainder of i sequence and add in the
        // c     k functions, scaling the i sequence during recurrence to keep
        // c     intermediate arithmetic on scale near exponent extremes.
        // c-----------------------------------------------------------------------
        s1r = cyr[0];
        s1i = cyi[0];
        s2r = cyr[1];
        s2i = cyi[1];
        csr = csrr[iflag - 1];
        ascle = bry[iflag - 1];
        fn = inu + il;
        // do 310 i=1,il
        for (i = 1; i <= il; i++) {
          c2r = s2r;
          c2i = s2i;
          s2r = s1r + (fn + fnf) * (rzr * c2r - rzi * c2i);
          s2i = s1i + (fn + fnf) * (rzr * c2i + rzi * c2r);
          s1r = c2r;
          s1i = c2i;
          fn = fn - 1.0;
          c2r = s2r * csr;
          c2i = s2i * csr;
          ckr = c2r;
          cki = c2i;
          c1r = yr[kk - 1];
          c1i = yi[kk - 1];
          if (kode === 1) {
            // go to 300
          } else {
            var _zs1s3 = (0, _zs1s5.zs1s2)(zrr, zri, c1r, c1i, c2r, c2i, asc, alim, iuf);

            var _zs1s4 = _slicedToArray(_zs1s3, 5);

            c1r = _zs1s4[0];
            c1i = _zs1s4[1];
            c2r = _zs1s4[2];
            c2i = _zs1s4[3];
            nw = _zs1s4[4];

            nz = nz + nw;
          }
          // 300   continue
          yr[kk - 1] = c1r * cspnr - c1i * cspni + c2r;
          yi[kk - 1] = c1r * cspni + c1i * cspnr + c2i;
          kk = kk - 1;
          cspnr = -cspnr;
          cspni = -cspni;
          if (iflag >= 3) break;
          c2r = Math.abs(ckr);
          c2i = Math.abs(cki);
          c2m = Math.max(c2r, c2i);
          if (c2m <= ascle) break;
          iflag = iflag + 1;
          ascle = bry[iflag - 1];
          s1r = s1r * csr;
          s1i = s1i * csr;
          s2r = ckr;
          s2i = cki;
          s1r = s1r * cssr[iflag - 1];
          s1i = s1i * cssr[iflag - 1];
          s2r = s2r * cssr[iflag - 1];
          s2i = s2i * cssr[iflag - 1];
          csr = csrr[iflag - 1];
        }
        // 310 continue
        break mainExecutionLoop;
      case 320:
        nz = -1;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}