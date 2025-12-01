Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZBKNU(ZR, ZI, FNU, KODE, N, YR, YI, NZ, TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZBKNU
// ***REFER TO  ZBESI,ZBESK,ZAIRY,ZBESH
//
//      ZBKNU COMPUTES THE K BESSEL FUNCTION IN THE RIGHT HALF Z PLANE.
//
// ***ROUTINES CALLED  DGAMLN,I1MACH,D1MACH,ZKSCL,ZSHCH,ZUCHK,AZABS,ZDIV,
//                     AZEXP,AZLOG,ZMLT,AZSQRT
// ***END PROLOGUE  ZBKNU
//


exports.zbknu = zbknu;

var _dgamln = require('./dgamln.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zkscl = require('./zkscl.js');

var _zshch3 = require('./zshch.js');

var _zuchk = require('./zuchk.js');

var _zabs = require('./zabs.js');

var _zdiv7 = require('./zdiv.js');

var _zexp = require('./zexp.js');

var _zlog = require('./zlog.js');

var _zmlt23 = require('./zmlt.js');

var _zsqrt = require('./zsqrt.js');

function zbknu(zr, zi, fnu, kode, n, yr, yi, tol, elim, alim) {
  var aa = void 0,
      ak = void 0,
      ascle = void 0,
      a1 = void 0,
      a2 = void 0,
      bb = void 0,
      bk = void 0,
      bry = void 0,
      caz = void 0,
      cbi = void 0,
      cbr = void 0,
      cc = void 0,
      cchi = void 0,
      cchr = void 0,
      cki = void 0,
      ckr = void 0,
      coefi = void 0,
      coefr = void 0,
      conei = void 0,
      coner = void 0,
      crscr = void 0,
      csclr = void 0,
      cshi = void 0,
      cshr = void 0,
      csi = void 0,
      csr = void 0,
      csrr = void 0,
      cssr = void 0,
      ctwor = void 0,
      czeroi = void 0,
      czeror = void 0,
      czi = void 0,
      czr = void 0,
      dnu = void 0,
      dnu2 = void 0,
      dpi = void 0,
      etest = void 0,
      fc = void 0,
      fhs = void 0,
      fi = void 0,
      fk = void 0,
      fks = void 0,
      fmui = void 0,
      fmur = void 0,
      fpi = void 0,
      fr = void 0,
      g1 = void 0,
      g2 = void 0,
      hpi = void 0,
      pi = void 0,
      pr = void 0,
      pti = void 0,
      ptr = void 0,
      p1i = void 0,
      p1r = void 0,
      p2i = void 0,
      p2m = void 0,
      p2r = void 0,
      qi = void 0,
      qr = void 0,
      rak = void 0,
      rcaz = void 0,
      rthpi = void 0,
      rzi = void 0,
      rzr = void 0,
      r1 = void 0,
      s = void 0,
      smui = void 0,
      smur = void 0,
      spi = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      tm = void 0,
      tth = void 0,
      t1 = void 0,
      t2 = void 0,
      elm = void 0,
      celmr = void 0,
      zdr = void 0,
      zdi = void 0,
      as = void 0,
      alas = void 0,
      helim = void 0,
      cyr = void 0,
      cyi = void 0,
      i = void 0,
      iflag = void 0,
      inu = void 0,
      k = void 0,
      kflag = void 0,
      kk = void 0,
      kmax = void 0,
      koded = void 0,
      nz = void 0,
      idum = void 0,
      j = void 0,
      ic = void 0,
      inub = void 0,
      nw = void 0;

  cssr = new Array(3);
  csrr = new Array(3);
  bry = new Array(3);
  cyr = new Array(2);
  cyi = new Array(2);

  kmax = 30;

  czeror = 0.0;
  czeroi = 0.0;
  coner = 1.0;
  conei = 0.0;
  ctwor = 2.0;
  r1 = 2.0;
  dpi = 3.14159265358979324;
  rthpi = 1.25331413731550025;
  spi = 1.90985931710274403;
  hpi = 1.57079632679489662;
  fpi = 1.89769999331517738;
  tth = 6.66666666666666666e-01;


  cc = [5.77215664901532861e-01, -4.20026350340952355e-02, -4.21977345555443367e-02, 7.21894324666309954e-03, -2.15241674114950973e-04, -2.01348547807882387e-05, 1.13302723198169588e-06, 6.11609510448141582e-09];

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        caz = (0, _zabs.azabs)(zr, zi);
        csclr = 1.0 / tol;
        crscr = tol;
        cssr[0] = csclr;
        cssr[1] = 1.0;
        cssr[2] = crscr;
        csrr[0] = crscr;
        csrr[1] = 1.0;
        csrr[2] = csclr;
        bry[0] = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;
        bry[1] = 1.0 / bry[0];
        bry[2] = (0, _d1mach.d1mach)(2);
        nz = 0;
        iflag = 0;
        koded = kode;
        rcaz = 1.0 / caz;
        str = zr * rcaz;
        sti = -zi * rcaz;
        rzr = (str + str) * rcaz;
        rzi = (sti + sti) * rcaz;
        inu = Math.trunc(fnu + 0.5);
        dnu = fnu - inu;
        if (Math.abs(dnu) === 0.5) {
          goToLabel = 110;break;
        }
        dnu2 = 0.0;
        if (Math.abs(dnu) > tol) dnu2 = dnu * dnu;
        if (caz > r1) {
          goToLabel = 110;break;
        }
        // c-----------------------------------------------------------------------
        // c     series for cabs(z) <= r1
        // c-----------------------------------------------------------------------
        fc = 1.0;

        var _azlog = (0, _zlog.azlog)(rzr, rzi);

        var _azlog2 = _slicedToArray(_azlog, 3);

        smur = _azlog2[0];
        smui = _azlog2[1];
        idum = _azlog2[2];

        fmur = smur * dnu;
        fmui = smui * dnu;

        var _zshch = (0, _zshch3.zshch)(fmur, fmui);

        var _zshch2 = _slicedToArray(_zshch, 4);

        cshr = _zshch2[0];
        cshi = _zshch2[1];
        cchr = _zshch2[2];
        cchi = _zshch2[3];

        if (dnu === 0.0) {
          goToLabel = 10;break;
        }
        fc = dnu * dpi;
        fc = fc / Math.sin(fc);
        smur = cshr / dnu;
        smui = cshi / dnu;
      case 10:
        a2 = 1.0 + dnu;
        // c-----------------------------------------------------------------------
        // c     gam(1-z)*gam(1+z)=pi*z/sin(pi*z), t1=1/gam(1-dnu), t2=1/gam(1+dnu)
        // c-----------------------------------------------------------------------
        t2 = Math.exp(-(0, _dgamln.dgamln)(a2, idum));
        t1 = 1.0 / (t2 * fc);
        if (Math.abs(dnu) > 0.1) {
          goToLabel = 40;break;
        }
        // c-----------------------------------------------------------------------
        // c     series for f0 to resolve indeterminacy for small abs(dnu)
        // c-----------------------------------------------------------------------
        ak = 1.0;
        s = cc[0];
        // do 20 k=2,8
        for (k = 2; k <= 8; k++) {
          ak = ak * dnu2;
          tm = cc[k - 1] * ak;
          s = s + tm;
          if (Math.abs(tm) < tol) break;
        }
        // 20 continue
        g1 = -s;
        goToLabel = 50;break;
      case 40:
        g1 = (t1 - t2) / (dnu + dnu);
      case 50:
        g2 = (t1 + t2) * 0.5;
        fr = fc * (cchr * g1 + smur * g2);
        fi = fc * (cchi * g1 + smui * g2);

        var _azexp = (0, _zexp.azexp)(fmur, fmui);

        var _azexp2 = _slicedToArray(_azexp, 2);

        str = _azexp2[0];
        sti = _azexp2[1];

        pr = 0.5 * str / t2;
        pi = 0.5 * sti / t2;

        var _zdiv = (0, _zdiv7.zdiv)(0.5, 0.0, str, sti);

        var _zdiv2 = _slicedToArray(_zdiv, 2);

        ptr = _zdiv2[0];
        pti = _zdiv2[1];

        qr = ptr / t1;
        qi = pti / t1;
        s1r = fr;
        s1i = fi;
        s2r = pr;
        s2i = pi;
        ak = 1.0;
        a1 = 1.0;
        ckr = coner;
        cki = conei;
        bk = 1.0 - dnu2;
        if (inu > 0 || n > 1) {
          goToLabel = 80;break;
        }
        // c-----------------------------------------------------------------------
        // c     generate k(fnu,z), 0.0  <=  fnu  <  0.5 and n=1
        // c-----------------------------------------------------------------------
        if (caz < tol) {
          goToLabel = 70;break;
        }

        var _zmlt = (0, _zmlt23.zmlt)(zr, zi, zr, zi);

        var _zmlt2 = _slicedToArray(_zmlt, 2);

        czr = _zmlt2[0];
        czi = _zmlt2[1];

        czr = 0.25 * czr;
        czi = 0.25 * czi;
        t1 = 0.25 * caz * caz;
      case 60:
        fr = (fr * ak + pr + qr) / bk;
        fi = (fi * ak + pi + qi) / bk;
        str = 1.0 / (ak - dnu);
        pr = pr * str;
        pi = pi * str;
        str = 1.0 / (ak + dnu);
        qr = qr * str;
        qi = qi * str;
        str = ckr * czr - cki * czi;
        rak = 1.0 / ak;
        cki = (ckr * czi + cki * czr) * rak;
        ckr = str * rak;
        s1r = ckr * fr - cki * fi + s1r;
        s1i = ckr * fi + cki * fr + s1i;
        a1 = a1 * t1 * rak;
        bk = bk + ak + ak + 1.0;
        ak = ak + 1.0;
        if (a1 > tol) {
          goToLabel = 60;break;
        }
      case 70:
        yr[0] = s1r;
        yi[0] = s1i;
        if (koded === 1) break mainExecutionLoop;

        var _azexp3 = (0, _zexp.azexp)(zr, zi);

        var _azexp4 = _slicedToArray(_azexp3, 2);

        str = _azexp4[0];
        sti = _azexp4[1];

        var _zmlt3 = (0, _zmlt23.zmlt)(s1r, s1i, str, sti);

        var _zmlt4 = _slicedToArray(_zmlt3, 2);

        yr[0] = _zmlt4[0];
        yi[0] = _zmlt4[1];

        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     generate k(dnu,z) and k(dnu+1,z) for forward recurrence
      // c-----------------------------------------------------------------------
      case 80:
        if (caz < tol) {
          goToLabel = 100;break;
        }

        var _zmlt5 = (0, _zmlt23.zmlt)(zr, zi, zr, zi);

        var _zmlt6 = _slicedToArray(_zmlt5, 2);

        czr = _zmlt6[0];
        czi = _zmlt6[1];

        czr = 0.25 * czr;
        czi = 0.25 * czi;
        t1 = 0.25 * caz * caz;
      case 90:
        fr = (fr * ak + pr + qr) / bk;
        fi = (fi * ak + pi + qi) / bk;
        str = 1.0 / (ak - dnu);
        pr = pr * str;
        pi = pi * str;
        str = 1.0 / (ak + dnu);
        qr = qr * str;
        qi = qi * str;
        str = ckr * czr - cki * czi;
        rak = 1.0 / ak;
        cki = (ckr * czi + cki * czr) * rak;
        ckr = str * rak;
        s1r = ckr * fr - cki * fi + s1r;
        s1i = ckr * fi + cki * fr + s1i;
        str = pr - fr * ak;
        sti = pi - fi * ak;
        s2r = ckr * str - cki * sti + s2r;
        s2i = ckr * sti + cki * str + s2i;
        a1 = a1 * t1 * rak;
        bk = bk + ak + ak + 1.0;
        ak = ak + 1.0;
        if (a1 > tol) {
          goToLabel = 90;break;
        }
      case 100:
        kflag = 2;
        a1 = fnu + 1.0;
        ak = a1 * Math.abs(smur);
        if (ak > alim) kflag = 3;
        str = cssr[kflag - 1];
        p2r = s2r * str;
        p2i = s2i * str;

        var _zmlt7 = (0, _zmlt23.zmlt)(p2r, p2i, rzr, rzi);

        var _zmlt8 = _slicedToArray(_zmlt7, 2);

        s2r = _zmlt8[0];
        s2i = _zmlt8[1];

        s1r = s1r * str;
        s1i = s1i * str;
        if (koded === 1) {
          goToLabel = 210;break;
        }

        var _azexp5 = (0, _zexp.azexp)(zr, zi);

        var _azexp6 = _slicedToArray(_azexp5, 2);

        fr = _azexp6[0];
        fi = _azexp6[1];

        var _zmlt9 = (0, _zmlt23.zmlt)(s1r, s1i, fr, fi);

        var _zmlt10 = _slicedToArray(_zmlt9, 2);

        s1r = _zmlt10[0];
        s1i = _zmlt10[1];

        var _zmlt11 = (0, _zmlt23.zmlt)(s2r, s2i, fr, fi);

        var _zmlt12 = _slicedToArray(_zmlt11, 2);

        s2r = _zmlt12[0];
        s2i = _zmlt12[1];

        goToLabel = 210;break;
      // c-----------------------------------------------------------------------
      // c     iflag=0 means no underflow occurred
      // c     iflag=1 means an underflow occurred- computation proceeds with
      // c     koded=2 and a test for on scale values is made during forward
      // c     recursion
      // c-----------------------------------------------------------------------
      case 110:
        var _azsqrt = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt2 = _slicedToArray(_azsqrt, 2);

        str = _azsqrt2[0];
        sti = _azsqrt2[1];

        var _zdiv3 = (0, _zdiv7.zdiv)(rthpi, czeroi, str, sti);

        var _zdiv4 = _slicedToArray(_zdiv3, 2);

        coefr = _zdiv4[0];
        coefi = _zdiv4[1];

        kflag = 2;
        if (koded === 2) {
          goToLabel = 120;break;
        }
        if (zr > alim) {
          goToLabel = 290;break;
        }
        // c     blank line
        str = Math.exp(-zr) * cssr[kflag - 1];
        sti = -str * Math.sin(zi);
        str = str * Math.cos(zi);

        var _zmlt13 = (0, _zmlt23.zmlt)(coefr, coefi, str, sti);

        var _zmlt14 = _slicedToArray(_zmlt13, 2);

        coefr = _zmlt14[0];
        coefi = _zmlt14[1];

      case 120:
        if (Math.abs(dnu) === 0.5) {
          goToLabel = 300;break;
        }
        // c-----------------------------------------------------------------------
        // c     miller algorithm for cabs(z) > r1
        // c-----------------------------------------------------------------------
        ak = Math.cos(dpi * dnu);
        ak = Math.abs(ak);
        if (ak === czeror) {
          goToLabel = 300;break;
        }
        fhs = Math.abs(0.25 - dnu2);
        if (fhs === czeror) {
          goToLabel = 300;break;
        }
        // c-----------------------------------------------------------------------
        // c     compute r2=f(e). if cabs(z) >= r2, use forward recurrence to
        // c     determine the backward index k. r2=f(e) is a straight line on
        // c     12 <= e <= 60. e is computed from 2**(-e)=b**(1-i1mach(14))=
        // c     tol where b is the base of the arithmetic.
        // c-----------------------------------------------------------------------
        t1 = (0, _i1mach.i1mach)(14) - 1;
        t1 = t1 * (0, _d1mach.d1mach)(5) * 3.321928094;
        t1 = Math.max(t1, 12.0);
        t1 = Math.min(t1, 60.0);
        t2 = tth * t1 - 6.0;
        if (zr !== 0.0) {
          goToLabel = 130;break;
        }
        t1 = hpi;
        goToLabel = 140;break;
      case 130:
        t1 = Math.atan(zi / zr);
        t1 = Math.abs(t1);
      case 140:
        if (t2 > caz) {
          goToLabel = 170;break;
        }
        // c-----------------------------------------------------------------------
        // c     forward recurrence loop when cabs(z) >= r2
        // c-----------------------------------------------------------------------
        etest = ak / (dpi * caz * tol);
        fk = coner;
        if (etest < coner) {
          goToLabel = 180;break;
        }
        fks = ctwor;
        ckr = caz + caz + ctwor;
        p1r = czeror;
        p2r = coner;
        // do 150 i=1,kmax
        for (i = 1; i <= kmax; i++) {
          ak = fhs / fks;
          cbr = ckr / (fk + coner);
          ptr = p2r;
          p2r = cbr * p2r - p1r * ak;
          p1r = ptr;
          ckr = ckr + ctwor;
          fks = fks + fk + fk + ctwor;
          fhs = fhs + fk + fk;
          fk = fk + coner;
          str = Math.abs(p2r) * fk;
          if (etest < str) {
            goToLabel = 160;break;
          }
        }
        // 150 continue
        if (goToLabel === 160) break;
        goToLabel = 310;break;
      case 160:
        fk = fk + spi * t1 * Math.sqrt(t2 / caz);
        fhs = Math.abs(0.25 - dnu2);
        goToLabel = 180;break;
      case 170:
        // c-----------------------------------------------------------------------
        // c     compute backward index k for cabs(z) < r2
        // c-----------------------------------------------------------------------
        a2 = Math.sqrt(caz);
        ak = fpi * ak / (tol * Math.sqrt(a2));
        aa = 3.0 * t1 / (1.0 + caz);
        bb = 14.7 * t1 / (28.0 + caz);
        ak = (Math.log(ak) + caz * Math.cos(aa) / (1.0 + 0.008 * caz)) / Math.cos(bb);
        fk = 0.12125 * ak * ak / caz + 1.5;
      case 180:
        // c-----------------------------------------------------------------------
        // c     backward recurrence loop for miller algorithm
        // c-----------------------------------------------------------------------
        k = Math.trunc(fk);
        fk = k;
        fks = fk * fk;
        p1r = czeror;
        p1i = czeroi;
        p2r = tol;
        p2i = czeroi;
        csr = p2r;
        csi = p2i;
        // do 190 i=1,k
        for (i = 1; i <= k; i++) {
          a1 = fks - fk;
          ak = (fks + fk) / (a1 + fhs);
          rak = 2.0 / (fk + coner);
          cbr = (fk + zr) * rak;
          cbi = zi * rak;
          ptr = p2r;
          pti = p2i;
          p2r = (ptr * cbr - pti * cbi - p1r) * ak;
          p2i = (pti * cbr + ptr * cbi - p1i) * ak;
          p1r = ptr;
          p1i = pti;
          csr = csr + p2r;
          csi = csi + p2i;
          fks = a1 - fk + coner;
          fk = fk - coner;
        }
        // 190 continue
        // c-----------------------------------------------------------------------
        // c     compute (p2/cs)=(p2/cabs(cs))*(conjg(cs)/cabs(cs)) for better
        // c     scaling
        // c-----------------------------------------------------------------------
        tm = (0, _zabs.azabs)(csr, csi);
        ptr = 1.0 / tm;
        s1r = p2r * ptr;
        s1i = p2i * ptr;
        csr = csr * ptr;
        csi = -csi * ptr;

        var _zmlt15 = (0, _zmlt23.zmlt)(coefr, coefi, s1r, s1i);

        var _zmlt16 = _slicedToArray(_zmlt15, 2);

        str = _zmlt16[0];
        sti = _zmlt16[1];

        var _zmlt17 = (0, _zmlt23.zmlt)(str, sti, csr, csi);

        var _zmlt18 = _slicedToArray(_zmlt17, 2);

        s1r = _zmlt18[0];
        s1i = _zmlt18[1];

        if (inu > 0 || n > 1) {
          goToLabel = 200;break;
        }
        zdr = zr;
        zdi = zi;
        if (iflag === 1) {
          goToLabel = 270;break;
        }
        goToLabel = 240;break;
      case 200:
        // c-----------------------------------------------------------------------
        // c     compute p1/p2=(p1/cabs(p2)*conjg(p2)/cabs(p2) for scaling
        // c-----------------------------------------------------------------------
        tm = (0, _zabs.azabs)(p2r, p2i);
        ptr = 1.0 / tm;
        p1r = p1r * ptr;
        p1i = p1i * ptr;
        p2r = p2r * ptr;
        p2i = -p2i * ptr;

        var _zmlt19 = (0, _zmlt23.zmlt)(p1r, p1i, p2r, p2i);

        var _zmlt20 = _slicedToArray(_zmlt19, 2);

        ptr = _zmlt20[0];
        pti = _zmlt20[1];

        str = dnu + 0.5 - ptr;
        sti = -pti;

        var _zdiv5 = (0, _zdiv7.zdiv)(str, sti, zr, zi);

        var _zdiv6 = _slicedToArray(_zdiv5, 2);

        str = _zdiv6[0];
        sti = _zdiv6[1];

        str = str + 1.0;

        var _zmlt21 = (0, _zmlt23.zmlt)(str, sti, s1r, s1i);

        var _zmlt22 = _slicedToArray(_zmlt21, 2);

        s2r = _zmlt22[0];
        s2i = _zmlt22[1];

      // c-----------------------------------------------------------------------
      // c     forward recursion on the three term recursion with relation with
      // c     scaling near exponent extremes on kflag=1 or kflag=3
      // c-----------------------------------------------------------------------
      case 210:
        str = dnu + 1.0;
        ckr = str * rzr;
        cki = str * rzi;
        if (n === 1) inu = inu - 1;
        if (inu > 0) {
          goToLabel = 220;break;
        }
        if (n > 1) {
          goToLabel = 215;break;
        }
        s1r = s2r;
        s1i = s2i;
      case 215:
        zdr = zr;
        zdi = zi;
        if (iflag === 1) {
          goToLabel = 270;break;
        }
        goToLabel = 240;break;
      case 220:
        inub = 1;
        if (iflag === 1) {
          goToLabel = 261;break;
        }
      case 225:
        p1r = csrr[kflag - 1];
        ascle = bry[kflag - 1];
        // do 230 i=inub,inu
        for (i = inub; i <= inu; i++) {
          str = s2r;
          sti = s2i;
          s2r = ckr * str - cki * sti + s1r;
          s2i = ckr * sti + cki * str + s1i;
          s1r = str;
          s1i = sti;
          ckr = ckr + rzr;
          cki = cki + rzi;
          if (kflag >= 3) continue;
          p2r = s2r * p1r;
          p2i = s2i * p1r;
          str = Math.abs(p2r);
          sti = Math.abs(p2i);
          p2m = Math.max(str, sti);
          if (p2m <= ascle) continue;
          kflag = kflag + 1;
          ascle = bry[kflag - 1];
          s1r = s1r * p1r;
          s1i = s1i * p1r;
          s2r = p2r;
          s2i = p2i;
          str = cssr[kflag - 1];
          s1r = s1r * str;
          s1i = s1i * str;
          s2r = s2r * str;
          s2i = s2i * str;
          p1r = csrr[kflag - 1];
        }
        // 230 continue
        if (n !== 1) {
          goToLabel = 240;break;
        }
        s1r = s2r;
        s1i = s2i;
      case 240:
        str = csrr[kflag - 1];
        yr[0] = s1r * str;
        yi[0] = s1i * str;
        if (n === 1) break mainExecutionLoop;
        yr[1] = s2r * str;
        yi[1] = s2i * str;
        if (n === 2) break mainExecutionLoop;
        kk = 2;
      case 250:
        kk = kk + 1;
        if (kk > n) break mainExecutionLoop;
        p1r = csrr[kflag - 1];
        ascle = bry[kflag - 1];
        // do 260 i=kk,n
        for (i = kk; i <= n; i++) {
          p2r = s2r;
          p2i = s2i;
          s2r = ckr * p2r - cki * p2i + s1r;
          s2i = cki * p2r + ckr * p2i + s1i;
          s1r = p2r;
          s1i = p2i;
          ckr = ckr + rzr;
          cki = cki + rzi;
          p2r = s2r * p1r;
          p2i = s2i * p1r;
          yr[i - 1] = p2r;
          yi[i - 1] = p2i;
          if (kflag >= 3) continue;
          str = Math.abs(p2r);
          sti = Math.abs(p2i);
          p2m = Math.max(str, sti);
          if (p2m <= ascle) continue;
          kflag = kflag + 1;
          ascle = bry[kflag - 1];
          s1r = s1r * p1r;
          s1i = s1i * p1r;
          s2r = p2r;
          s2i = p2i;
          str = cssr[kflag - 1];
          s1r = s1r * str;
          s1i = s1i * str;
          s2r = s2r * str;
          s2i = s2i * str;
          p1r = csrr[kflag - 1];
        }
        // 260 continue
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     iflag=1 cases, forward recurrence on scaled values on underflow
      // c-----------------------------------------------------------------------
      case 261:
        helim = 0.5 * elim;
        elm = Math.exp(-elim);
        celmr = elm;
        ascle = bry[0];
        zdr = zr;
        zdi = zi;
        ic = -1;
        j = 2;
        // do 262 i=1,inu
        for (i = 1; i <= inu; i++) {
          str = s2r;
          sti = s2i;
          s2r = str * ckr - sti * cki + s1r;
          s2i = sti * ckr + str * cki + s1i;
          s1r = str;
          s1i = sti;
          ckr = ckr + rzr;
          cki = cki + rzi;
          as = (0, _zabs.azabs)(s2r, s2i);
          alas = Math.log(as);
          p2r = -zdr + alas;
          if (p2r < -elim) {
            // go to 263
          } else {
            var _azlog3 = (0, _zlog.azlog)(s2r, s2i);

            var _azlog4 = _slicedToArray(_azlog3, 3);

            str = _azlog4[0];
            sti = _azlog4[1];
            idum = _azlog4[2];

            p2r = -zdr + str;
            p2i = -zdi + sti;
            p2m = Math.exp(p2r) / tol;
            p1r = p2m * Math.cos(p2i);
            p1i = p2m * Math.sin(p2i);
            nw = (0, _zuchk.zuchk)(p1r, p1i, ascle, tol);
            if (nw !== 0) {
              // go to 263
            } else {
              j = 3 - j;
              cyr[j - 1] = p1r;
              cyi[j - 1] = p1i;
              if (ic === i - 1) {
                goToLabel = 264;break;
              }
              ic = i;
              continue;
            }
          }
          // 263   continue
          if (alas < helim) continue;
          zdr = zdr - elim;
          s1r = s1r * celmr;
          s1i = s1i * celmr;
          s2r = s2r * celmr;
          s2i = s2i * celmr;
        }
        // 262 continue
        if (goToLabel === 264) break;
        if (n !== 1) {
          goToLabel = 270;break;
        }
        s1r = s2r;
        s1i = s2i;
        goToLabel = 270;break;
      case 264:
        kflag = 1;
        inub = i + 1;
        s2r = cyr[j - 1];
        s2i = cyi[j - 1];
        j = 3 - j;
        s1r = cyr[j - 1];
        s1i = cyi[j - 1];
        if (inub <= inu) {
          goToLabel = 225;break;
        }
        if (n !== 1) {
          goToLabel = 240;break;
        }
        s1r = s2r;
        s1i = s2i;
        goToLabel = 240;break;
      case 270:
        yr[0] = s1r;
        yi[0] = s1i;
        if (n === 1) {
          goToLabel = 280;break;
        }
        yr[1] = s2r;
        yi[1] = s2i;
      case 280:
        ascle = bry[0];
        nz = (0, _zkscl.zkscl)(zdr, zdi, fnu, n, yr, yi, rzr, rzi, ascle, tol, elim);
        inu = n - nz;
        if (inu <= 0) break mainExecutionLoop;
        kk = nz + 1;
        s1r = yr[kk - 1];
        s1i = yi[kk - 1];
        yr[kk - 1] = s1r * csrr[0];
        yi[kk - 1] = s1i * csrr[0];
        if (inu === 1) break mainExecutionLoop;
        kk = nz + 2;
        s2r = yr[kk - 1];
        s2i = yi[kk - 1];
        yr[kk - 1] = s2r * csrr[0];
        yi[kk - 1] = s2i * csrr[0];
        if (inu === 2) break mainExecutionLoop;
        t2 = fnu + (kk - 1);
        ckr = t2 * rzr;
        cki = t2 * rzi;
        kflag = 1;
        goToLabel = 250;break;
      case 290:
        // c-----------------------------------------------------------------------
        // c     scale by Math.exp(z), iflag = 1 cases
        // c-----------------------------------------------------------------------
        koded = 2;
        iflag = 1;
        kflag = 2;
        goToLabel = 120;break;
      // c-----------------------------------------------------------------------
      // c     fnu=half odd integer case, dnu=-0.5
      // c-----------------------------------------------------------------------
      case 300:
        s1r = coefr;
        s1i = coefi;
        s2r = coefr;
        s2i = coefi;
        goToLabel = 210;break;
      // c
      // c
      case 310:
        nz = -2;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}