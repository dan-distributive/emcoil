Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUOIK(ZR, ZI, FNU, KODE, IKFLG, N, YR, YI, NUF, TOL,
// * ELIM, ALIM)
// ***BEGIN PROLOGUE  ZUOIK
// ***REFER TO  ZBESI,ZBESK,ZBESH
//
//      ZUOIK COMPUTES THE LEADING TERMS OF THE UNIFORM ASYMPTOTIC
//      EXPANSIONS FOR THE I AND K FUNCTIONS AND COMPARES THEM
//      (IN LOGARITHMIC FORM) TO ALIM AND ELIM FOR OVER AND UNDERFLOW
//      WHERE ALIM.LT.ELIM. IF THE MAGNITUDE, BASED ON THE LEADING
//      EXPONENTIAL, IS LESS THAN ALIM OR GREATER THAN -ALIM, THEN
//      THE RESULT IS ON SCALE. IF NOT, THEN A REFINED TEST USING OTHER
//      MULTIPLIERS (IN LOGARITHMIC FORM) IS MADE BASED ON ELIM. HERE
//      EXP(-ELIM)=SMALLEST MACHINE NUMBER*1.0E+3 AND EXP(-ALIM)=
//      EXP(-ELIM)/TOL
//
//      IKFLG=1 MEANS THE I SEQUENCE IS TESTED
//           =2 MEANS THE K SEQUENCE IS TESTED
//      NUF = 0 MEANS THE LAST MEMBER OF THE SEQUENCE IS ON SCALE
//          =-1 MEANS AN OVERFLOW WOULD OCCUR
//      IKFLG=1 AND NUF.GT.0 MEANS THE LAST NUF Y VALUES WERE SET TO ZERO
//              THE FIRST N-NUF VALUES MUST BE SET BY ANOTHER ROUTINE
//      IKFLG=2 AND NUF.EQ.N MEANS ALL Y VALUES WERE SET TO ZERO
//      IKFLG=2 AND 0.LT.NUF.LT.N NOT CONSIDERED. Y MUST BE SET BY
//              ANOTHER ROUTINE
//
// ***ROUTINES CALLED  ZUCHK,ZUNHJ,ZUNIK,D1MACH,AZABS,AZLOG
// ***END PROLOGUE  ZUOIK
//      COMPLEX ARG,ASUM,BSUM,CWRK,CZ,CZERO,PHI,SUM,Y,Z,ZB,ZETA1,ZETA2,ZN,
//     *ZR


exports.zuoik = zuoik;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _zlog = require('./zlog.js');

var _zuchk = require('./zuchk.js');

var _zunhj5 = require('./zunhj.js');

var _zunik5 = require('./zunik.js');

function zuoik(zr, zi, fnu, kode, ikflg, n, yr, yi, tol, elim, alim) {
  var aarg = void 0,
      aic = void 0,
      aphi = void 0,
      argi = void 0,
      argr = void 0,
      ascle = void 0,
      ax = void 0,
      ay = void 0,
      czi = void 0,
      czr = void 0,
      fnn = void 0,
      gnn = void 0,
      gnu = void 0,
      phii = void 0,
      phir = void 0,
      rcz = void 0,
      str = void 0,
      sti = void 0,
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
      zri = void 0,
      zrr = void 0,
      i = void 0,
      iform = void 0,
      init = void 0,
      nn = void 0,
      nuf = void 0,
      nw = void 0;

  zeror = 0;
  zeroi = 0;

  aic = 1.265512123484645396;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        nuf = 0;
        nn = n;
        zrr = zr;
        zri = zi;
        if (zr >= 0.0) {
          goToLabel = 10;break;
        }
        zrr = -zr;
        zri = -zi;
      case 10:
        zbr = zrr;
        zbi = zri;
        ax = Math.abs(zr) * 1.7321;
        ay = Math.abs(zi);
        iform = 1;
        if (ay > ax) iform = 2;
        gnu = Math.max(fnu, 1.0);
        if (ikflg === 1) {
          goToLabel = 20;break;
        }
        fnn = nn;
        gnn = fnu + fnn - 1.0;
        gnu = Math.max(gnn, fnn);
      case 20:
        // c-----------------------------------------------------------------------
        // c     only the magnitude of arg and phi are needed along with the
        // c     real parts of zeta1, zeta2 and zb. no attempt is made to get
        // c     the sign of the imaginary part correct.
        // c-----------------------------------------------------------------------
        if (iform === 2) {
          goToLabel = 30;break;
        }
        init = 0;

        var _zunik = (0, _zunik5.zunik)(zrr, zri, gnu, ikflg, 1, tol, init);

        var _zunik2 = _slicedToArray(_zunik, 6);

        phir = _zunik2[0];
        phii = _zunik2[1];
        zeta1r = _zunik2[2];
        zeta1i = _zunik2[3];
        zeta2r = _zunik2[4];
        zeta2i = _zunik2[5];

        czr = -zeta1r + zeta2r;
        czi = -zeta1i + zeta2i;
        goToLabel = 50;break;
      case 30:
        znr = zri;
        zni = -zrr;
        if (zi > 0.0) {
          goToLabel = 40;break;
        }
        znr = -znr;
      case 40:
        var _zunhj = (0, _zunhj5.zunhj)(znr, zni, gnu, 1, tol);

        var _zunhj2 = _slicedToArray(_zunhj, 8);

        phir = _zunhj2[0];
        phii = _zunhj2[1];
        argr = _zunhj2[2];
        argi = _zunhj2[3];
        zeta1r = _zunhj2[4];
        zeta1i = _zunhj2[5];
        zeta2r = _zunhj2[6];
        zeta2i = _zunhj2[7];

        czr = -zeta1r + zeta2r;
        czi = -zeta1i + zeta2i;
        aarg = (0, _zabs.azabs)(argr, argi);
      case 50:
        if (kode === 1) {
          goToLabel = 60;break;
        }
        czr = czr - zbr;
        czi = czi - zbi;
      case 60:
        if (ikflg === 1) {
          goToLabel = 70;break;
        }
        czr = -czr;
        czi = -czi;
      case 70:
        aphi = (0, _zabs.azabs)(phir, phii);
        rcz = czr;
        // c-----------------------------------------------------------------------
        // c     overflow test
        // c-----------------------------------------------------------------------
        if (rcz > elim) {
          goToLabel = 210;break;
        }
        if (rcz < alim) {
          goToLabel = 80;break;
        }
        rcz = rcz + Math.log(aphi);
        if (iform === 2) rcz = rcz - 0.25 * Math.log(aarg) - aic;
        if (rcz > elim) {
          goToLabel = 210;break;
        }
        goToLabel = 130;break;
      case 80:
        // c-----------------------------------------------------------------------
        // c     underflow test
        // c-----------------------------------------------------------------------
        if (rcz < -elim) {
          goToLabel = 90;break;
        }
        if (rcz > -alim) {
          goToLabel = 130;break;
        }
        rcz = rcz + Math.log(aphi);
        if (iform === 2) rcz = rcz - 0.25 * Math.log(aarg) - aic;
        if (rcz > -elim) {
          goToLabel = 110;break;
        }
      case 90:
        // do 100 i=1,nn
        for (i = 1; i <= nn; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
        // 100 dcontinue
        nuf = nn;
        break mainExecutionLoop;
      case 110:
        ascle = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;

        var _azlog = (0, _zlog.azlog)(phir, phii);

        var _azlog2 = _slicedToArray(_azlog, 2);

        str = _azlog2[0];
        sti = _azlog2[1];

        czr = czr + str;
        czi = czi + sti;
        if (iform === 1) {
          goToLabel = 120;break;
        }

        var _azlog3 = (0, _zlog.azlog)(argr, argi);

        var _azlog4 = _slicedToArray(_azlog3, 2);

        str = _azlog4[0];
        sti = _azlog4[1];

        czr = czr - 0.25 * str - aic;
        czi = czi - 0.25 * sti;
      case 120:
        ax = Math.exp(rcz) / tol;
        ay = czi;
        czr = ax * Math.cos(ay);
        czi = ax * Math.sin(ay);
        nw = (0, _zuchk.zuchk)(czr, czi, ascle, tol);
        if (nw !== 0) {
          goToLabel = 90;break;
        }
      case 130:
        if (ikflg === 2) break mainExecutionLoop;
        if (n === 1) break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     set underflows on i sequence
      // c-----------------------------------------------------------------------
      case 140:
        gnu = fnu + (nn - 1);
        if (iform === 2) {
          goToLabel = 150;break;
        }
        init = 0;

        var _zunik3 = (0, _zunik5.zunik)(zrr, zri, gnu, ikflg, 1, tol, init);

        var _zunik4 = _slicedToArray(_zunik3, 6);

        phir = _zunik4[0];
        phii = _zunik4[1];
        zeta1r = _zunik4[2];
        zeta1i = _zunik4[3];
        zeta2r = _zunik4[4];
        zeta2i = _zunik4[5];

        czr = -zeta1r + zeta2r;
        czi = -zeta1i + zeta2i;
        goToLabel = 160;break;
      case 150:
        var _zunhj3 = (0, _zunhj5.zunhj)(znr, zni, gnu, 1, tol);

        var _zunhj4 = _slicedToArray(_zunhj3, 8);

        phir = _zunhj4[0];
        phii = _zunhj4[1];
        argr = _zunhj4[2];
        argi = _zunhj4[3];
        zeta1r = _zunhj4[4];
        zeta1i = _zunhj4[5];
        zeta2r = _zunhj4[6];
        zeta2i = _zunhj4[7];

        czr = -zeta1r + zeta2r;
        czi = -zeta1i + zeta2i;
        aarg = (0, _zabs.azabs)(argr, argi);
      case 160:
        if (kode === 1) {
          goToLabel = 170;break;
        }
        czr = czr - zbr;
        czi = czi - zbi;
      case 170:
        aphi = (0, _zabs.azabs)(phir, phii);
        rcz = czr;
        if (rcz < -elim) {
          goToLabel = 180;break;
        }
        if (rcz > -alim) break mainExecutionLoop;
        rcz = rcz + Math.log(aphi);
        if (iform === 2) rcz = rcz - 0.25 * Math.log(aarg) - aic;
        if (rcz > -elim) {
          goToLabel = 190;break;
        }
      case 180:
        yr[nn - 1] = zeror;
        yi[nn - 1] = zeroi;
        nn = nn - 1;
        nuf = nuf + 1;
        if (nn === 0) break mainExecutionLoop;
        goToLabel = 140;break;
      case 190:
        ascle = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;

        var _azlog5 = (0, _zlog.azlog)(phir, phii);

        var _azlog6 = _slicedToArray(_azlog5, 2);

        str = _azlog6[0];
        sti = _azlog6[1];

        czr = czr + str;
        czi = czi + sti;
        if (iform === 1) {
          goToLabel = 200;break;
        }

        var _azlog7 = (0, _zlog.azlog)(argr, argi);

        var _azlog8 = _slicedToArray(_azlog7, 2);

        str = _azlog8[0];
        sti = _azlog8[1];

        czr = czr - 0.25 * str - aic;
        czi = czi - 0.25 * sti;
      case 200:
        ax = Math.exp(rcz) / tol;
        ay = czi;
        czr = ax * Math.cos(ay);
        czi = ax * Math.sin(ay);
        nw = (0, _zuchk.zuchk)(czr, czi, ascle, tol);
        if (nw !== 0) {
          goToLabel = 180;break;
        }
        break mainExecutionLoop;
      case 210:
        nuf = -1;
      default:
        break mainExecutionLoop;
    }
  }

  return nuf;
}