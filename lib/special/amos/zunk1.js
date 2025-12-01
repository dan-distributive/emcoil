Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUNK1(ZR, ZI, FNU, KODE, MR, N, YR, YI, NZ, TOL, ELIM,
// * ALIM)
// ***BEGIN PROLOGUE  ZUNK1
// ***REFER TO  ZBESK
//
//      ZUNK1 COMPUTES K(FNU,Z) AND ITS ANALYTIC CONTINUATION FROM THE
//      RIGHT HALF PLANE TO THE LEFT HALF PLANE BY MEANS OF THE
//      UNIFORM ASYMPTOTIC EXPANSION.
//      MR INDICATES THE DIRECTION OF ROTATION FOR ANALYTIC CONTINUATION.
//      NZ=-1 MEANS AN OVERFLOW WILL OCCUR
//
// ***ROUTINES CALLED  ZKSCL,ZS1S2,ZUCHK,ZUNIK,D1MACH,AZABS
// ***END PROLOGUE  ZUNK1


exports.zunk1 = zunk1;

var _zs1s5 = require('./zs1s2.js');

var _zuchk = require('./zuchk.js');

var _zunik7 = require('./zunik.js');

var _zabs = require('./zabs.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _fortranHelpers = require('../../utils/fortranHelpers.js');

var ft = _interopRequireWildcard(_fortranHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function zunk1(zr, zi, fnu, kode, mr, n, yr, yi, tol, elim, alim) {
  var ang = void 0,
      aphi = void 0,
      asc = void 0,
      ascle = void 0,
      bry = void 0,
      cki = void 0,
      ckr = void 0,
      coner = void 0,
      crsc = void 0,
      cscl = void 0,
      csgni = void 0,
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
      fmr = void 0,
      fn = void 0,
      fnf = void 0,
      phidi = void 0,
      phidr = void 0,
      phii = void 0,
      phir = void 0,
      pi = void 0,
      rast = void 0,
      razr = void 0,
      rs1 = void 0,
      rzi = void 0,
      rzr = void 0,
      sgn = void 0,
      sti = void 0,
      str = void 0,
      sumdi = void 0,
      sumdr = void 0,
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
      zet1di = void 0,
      zet1dr = void 0,
      zet2di = void 0,
      zet2dr = void 0,
      zri = void 0,
      zrr = void 0,
      i = void 0,
      ib = void 0,
      iflag = void 0,
      ifn = void 0,
      il = void 0,
      init = void 0,
      inu = void 0,
      iuf = void 0,
      k = void 0,
      kdflg = void 0,
      kflag = void 0,
      kk = void 0,
      nw = void 0,
      nz = void 0,
      initd = void 0,
      ic = void 0,
      ipard = void 0,
      j = void 0,
      f = void 0,
      m = void 0,
      zbr = void 0,
      zbi = void 0,
      yy = void 0;

  bry = new Array(3);
  init = new Array(2);
  sumr = new Array(2);
  sumi = new Array(2);
  zeta1r = new Array(2);
  zeta1i = new Array(2);
  zeta2r = new Array(2);
  zeta2i = new Array(2);
  cyr = new Array(2);
  cyi = new Array(2);
  cssr = new Array(3);
  csrr = new Array(3);
  phir = new Array(2);
  phii = new Array(2);

  // Init 2D arrs for cwrk
  var cwrkr = [];
  var cwrki = [];
  var iMax = 16;
  var jMax = 3;
  for (i = 0; i < iMax; i++) {
    cwrkr[i] = [];
    cwrki[i] = [];
    for (j = 0; j < jMax; j++) {
      f[i][j] = null;
    }
  }

  zeror = 0.0;
  zeroi = 0.0;
  coner = 1.0;

  pi = 3.14159265358979324;

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
        j = 2;
        // do 70 i=1,n
        for (i = 1; i <= n; i++) {
          // c-----------------------------------------------------------------------
          // c     j flip flops between 1 and 2 in j = 3 - j
          // c-----------------------------------------------------------------------
          j = 3 - j;
          fn = fnu + i - 1;
          init[j - 1] = 0;

          var _zunik = (0, _zunik7.zunik)(zrr, zri, fn, 2, 0, tol, init[j - 1]);

          var _zunik2 = _slicedToArray(_zunik, 10);

          phir[j - 1] = _zunik2[0];
          phii[j - 1] = _zunik2[1];
          zeta1r[j - 1] = _zunik2[2];
          zeta1i[j - 1] = _zunik2[3];
          zeta2r[j - 1] = _zunik2[4];
          zeta2i[j - 1] = _zunik2[5];
          sumr[j - 1] = _zunik2[6];
          sumi[j - 1] = _zunik2[7];
          cwrkr[0][j - 1] = _zunik2[8];
          cwrki[0][j - 1] = _zunik2[9];

          if (kode === 1) {
            s1r = zeta1r[j - 1] - zeta2r[j - 1];
            s1i = zeta1i[j - 1] - zeta2i[j - 1];
          } else {
            str = zrr + zeta2r[j - 1];
            sti = zri + zeta2i[j - 1];
            rast = fn / (0, _zabs.azabs)(str, sti);
            str = str * rast * rast;
            sti = -sti * rast * rast;
            s1r = zeta1r[j - 1] - str;
            s1i = zeta1i[j - 1] - sti;
          }
          rs1 = s1r;
          // c-----------------------------------------------------------------------
          // c     test for underflow and overflow
          // c-----------------------------------------------------------------------
          if (Math.abs(rs1) > elim) goToLabel = 60;
          if (goToLabel !== 60) {
            if (kdflg === 1) kflag = 2;
            if (Math.abs(rs1) < alim) goToLabel = 40;
            if (goToLabel !== 40) {
              // c-----------------------------------------------------------------------
              // c     refine  test and scale
              // c-----------------------------------------------------------------------
              aphi = (0, _zabs.azabs)(phir[j - 1], phii[j - 1]);
              rs1 = rs1 + Math.log(aphi);
              if (Math.abs(rs1) > elim) goToLabel = 60;
              if (goToLabel !== 60) {
                if (kdflg === 1) kflag = 1;
                if (rs1 < 0.0) {
                  // go to 50
                } else {
                  if (kdflg === 1) kflag = 3;
                }
              }
            }
            // 40   continue
            if (goToLabel < 60) {
              // c-----------------------------------------------------------------------
              // c     scale s1 to keep intermediate arithmetic on scale near
              // c     exponent extremes
              // c-----------------------------------------------------------------------
              s2r = phir[j - 1] * sumr[j - 1] - phii[j - 1] * sumi[j - 1];
              s2i = phir[j - 1] * sumi[j - 1] + phii[j - 1] * sumr[j - 1];
              str = Math.exp(s1r) * cssr[kflag - 1];
              s1r = str * Math.cos(s1i);
              s1i = str * Math.sin(s1i);
              str = s2r * s1r - s2i * s1i;
              s2i = s1r * s2i + s2r * s1i;
              s2r = str;
              if (kflag !== 1) {
                // go to 50
              } else {
                nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
                if (nw !== 0) goToLabel = 60;
              }
              // 50   continue
              if (goToLabel < 60) {
                cyr[kdflg - 1] = s2r;
                cyi[kdflg - 1] = s2i;
                yr[i - 1] = s2r * csrr[kflag - 1];
                yi[i - 1] = s2i * csrr[kflag - 1];
                if (kdflg === 2) {
                  goToLabel = 75;break;
                }
                kdflg = 2;
                break;
              }
            }
          }
          // 60   continue
          if (rs1 > 0.0) {
            goToLabel = 300;break;
          }
          // c-----------------------------------------------------------------------
          // c     for zr < 0.0, the i function to be added will overflow
          // c-----------------------------------------------------------------------
          if (zr < 0.0) {
            goToLabel = 300;break;
          }
          kdflg = 1;
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
          nz = nz + 1;
          if (i === 1) break;
          if (yr[i - 2] === zeror && yi[i - 2] === zeroi) break;
          yr[i - 2] = zeror;
          yi[i - 2] = zeroi;
          nz = nz + 1;
        }
        // 70 continue
        if (goToLabel < 70) {
          i = n;
        } else {
          break;
        }
      case 75:
        razr = 1.0 / (0, _zabs.azabs)(zrr, zri);
        str = zrr * razr;
        sti = -zri * razr;
        rzr = (str + str) * razr;
        rzi = (sti + sti) * razr;
        ckr = fn * rzr;
        cki = fn * rzi;
        ib = i + 1;
        if (n < ib) {
          goToLabel = 160;break;
        }
        // c-----------------------------------------------------------------------
        // c     test last member for underflow and overflow. set sequence to zero
        // c     on underflow.
        // c-----------------------------------------------------------------------
        fn = fnu + (n - 1);
        ipard = 1;
        if (mr !== 0) ipard = 0;
        initd = 0;

        var _zunik3 = (0, _zunik7.zunik)(zrr, zri, fn, 2, ipard, tol, initd);

        var _zunik4 = _slicedToArray(_zunik3, 10);

        phidr = _zunik4[0];
        phidi = _zunik4[1];
        zet1dr = _zunik4[2];
        zet1di = _zunik4[3];
        zet2dr = _zunik4[4];
        zet2di = _zunik4[5];
        sumdr = _zunik4[6];
        sumdi = _zunik4[7];
        cwrkr[0][2] = _zunik4[8];
        cwrki[0][2] = _zunik4[9];

        if (kode === 1) {
          goToLabel = 80;break;
        }
        str = zrr + zet2dr;
        sti = zri + zet2di;
        rast = fn / (0, _zabs.azabs)(str, sti);
        str = str * rast * rast;
        sti = -sti * rast * rast;
        s1r = zet1dr - str;
        s1i = zet1di - sti;
        goToLabel = 90;break;
      case 80:
        s1r = zet1dr - zet2dr;
        s1i = zet1di - zet2di;
      case 90:
        rs1 = s1r;
        if (Math.abs(rs1) > elim) {
          goToLabel = 95;break;
        }
        if (Math.abs(rs1) < alim) {
          goToLabel = 100;break;
        }
        // c----------------------------------------------------------------------------
        // c     refine estimate and test
        // c-------------------------------------------------------------------------
        aphi = (0, _zabs.azabs)(phidr, phidi);
        rs1 = rs1 + Math.log(aphi);
        if (Math.abs(rs1) < elim) {
          goToLabel = 100;break;
        }
      case 95:
        if (Math.abs(rs1) > 0.0) {
          goToLabel = 300;break;
        }
        // c-----------------------------------------------------------------------
        // c     for zr < 0.0, the i function to be added will overflow
        // c-----------------------------------------------------------------------
        if (zr < 0.0) {
          goToLabel = 300;break;
        }
        nz = n;
        // do 96 i=1,n
        for (i = 1; i <= n; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
        // 96 continue
        break mainExecutionLoop;
      // c---------------------------------------------------------------------------
      // c     forward recur for remainder of the sequence
      // c----------------------------------------------------------------------------
      case 100:
        s1r = cyr[0];
        s1i = cyi[0];
        s2r = cyr[1];
        s2i = cyi[1];
        c1r = csrr[kflag - 1];
        ascle = bry[kflag - 1];
        // do 120 i=ib,n
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
      // 120 continue
      case 160:
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
        inu = Math.trunc(fnu);
        fnf = fnu - inu;
        ifn = inu + n - 1;
        ang = fnf * sgn;
        cspnr = Math.cos(ang);
        cspni = Math.sin(ang);
        if (ifn % 2 === 0) {
          goToLabel = 170;break;
        }
        cspnr = -cspnr;
        cspni = -cspni;
      case 170:
        asc = bry[0];
        iuf = 0;
        kk = n;
        kdflg = 1;
        ib = ib - 1;
        ic = ib - 1;
        // This loop 270 is such a hairy mess, I apologize if anyone has to come
        // back in here again. yeesh.
        // do 270 k=1,n
        loop270: for (k = 1; k <= n; k++) {
          fn = fnu + (kk - 1);
          // c-----------------------------------------------------------------------
          // c     logic to sort out cases whose parameters were set for the k
          // c     function above
          // c     technically the below is correct but it's gross - KC
          // c-----------------------------------------------------------------------
          m = 3;
          if (n > 2 && kk === n && ib < n) {
            // do nothing
          } else if (n > 2 && (kk === ib || kk === ic) || n <= 2) {
            // 172   continue
            initd = init[j - 1];
            phidr = phir[j - 1];
            phidi = phii[j - 1];
            zet1dr = zeta1r[j - 1];
            zet1di = zeta1i[j - 1];
            zet2dr = zeta2r[j - 1];
            zet2di = zeta2i[j - 1];
            sumdr = sumr[j - 1];
            sumdi = sumi[j - 1];
            m = j;
            j = 3 - j;
          } else if (n > 2) {
            initd = 0;
          }
          // 180 continue

          var _zunik5 = (0, _zunik7.zunik)(zrr, zri, fn, 1, 0, tol, initd);

          var _zunik6 = _slicedToArray(_zunik5, 10);

          phidr = _zunik6[0];
          phidi = _zunik6[1];
          zet1dr = _zunik6[2];
          zet1di = _zunik6[3];
          zet2dr = _zunik6[4];
          zet2di = _zunik6[5];
          sumdr = _zunik6[6];
          sumdi = _zunik6[7];
          cwrkr[0][m - 1] = _zunik6[8];
          cwrki[0][m - 1] = _zunik6[9];

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
            // go to 260
            if (rs1 > 0.0) {
              goToLabel = 300;break;
            }
            s2r = zeror;
            s2i = zeroi;
            // go to 230
          } else {
            if (kdflg === 1) iflag = 2;
            if (Math.abs(rs1) < alim) {
              // go to 220
            } else {
              // c-----------------------------------------------------------------------
              // c     refine  test and scale
              // c-----------------------------------------------------------------------
              aphi = (0, _zabs.azabs)(phidr, phidi);
              rs1 = rs1 + Math.log(aphi);
              if (Math.abs(rs1) > elim) {
                // go to 260
                if (rs1 > 0.0) {
                  goToLabel = 300;break;
                }
                s2r = zeror;
                s2i = zeroi;
                goToLabel = 230;
              } else {
                if (kdflg === 1) iflag = 1;
                if (rs1 < 0.0) {
                  // go to 220
                } else {
                  if (kdflg === 1) iflag = 3;
                }
              }
            }
            // 220   continue
            if (goToLabel < 230) {
              str = phidr * sumdr - phidi * sumdi;
              sti = phidr * sumdi + phidi * sumdr;
              s2r = -csgni * sti;
              s2i = csgni * str;
              str = Math.exp(s1r) * cssr[iflag - 1];
              s1r = str * Math.cos(s1i);
              s1i = str * Math.sin(s1i);
              str = s2r * s1r - s2i * s1i;
              s2i = s2r * s1i + s2i * s1r;
              s2r = str;
              if (iflag !== 1) {
                // go to 230
              } else {
                nw = (0, _zuchk.zuchk)(s2r, s2i, bry[0], tol);
                if (nw === 0) {
                  // go to 230
                } else {
                  s2r = zeror;
                  s2i = zeroi;
                }
              } // iflag !== 1
            } // if should run 220?
          } // if should skip straight to 230
          // 230   continue
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
            // go to 250
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
          // 250   continue
          yr[kk - 1] = s1r * cspnr - s1i * cspni + s2r;
          yi[kk - 1] = s1r * cspni + s1i * cspnr + s2i;
          kk = kk - 1;
          cspnr = -cspnr;
          cspni = -cspni;
          if (c2r !== 0.0 || c2i !== 0.0) {
            // go to 255
          } else {
            kdflg = 1;
            break;
          }
          // 255   continue
          if (kdflg === 2) {
            goToLabel = 295;break;
          }
          kdflg = 2;
          break;
        }
        // 270 continue
        k = n;
      case 275:
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
        // do 290 i=1,il
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
            // go to 280
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
          // 280   continue
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
        // 290 continue
        break mainExecutionLoop;
      case 300:
        nz = -1;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}