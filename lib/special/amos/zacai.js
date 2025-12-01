Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZACAI(ZR, ZI, FNU, KODE, MR, N, YR, YI, NZ, RL, TOL,
// * ELIM, ALIM)
// ***BEGIN PROLOGUE  ZACAI
// ***REFER TO  ZAIRY
//
//      ZACAI APPLIES THE ANALYTIC CONTINUATION FORMULA
//
//          K(FNU,ZN*EXP(MP))=K(FNU,ZN)*EXP(-MP*FNU) - MP*I(FNU,ZN)
//                  MP=PI*MR*CMPLX(0.0,1.0)
//
//      TO CONTINUE THE K FUNCTION FROM THE RIGHT HALF TO THE LEFT
//      HALF Z PLANE FOR USE WITH ZAIRY WHERE FNU=1/3 OR 2/3 AND N=1.
//      ZACAI IS THE SAME AS ZACON WITH THE PARTS FOR LARGER ORDERS AND
//      RECURRENCE REMOVED. A RECURSIVE CALL TO ZACON CAN RESULT IF ZACON
//      IS CALLED FROM ZAIRY.
//
// ***ROUTINES CALLED  ZASYI,ZBKNU,ZMLRI,ZSERI,ZS1S2,D1MACH,AZABS
// ***END PROLOGUE  ZACAI


exports.zacai = zacai;

var _zasyi = require('./zasyi.js');

var _zbknu = require('./zbknu.js');

var _zmlri = require('./zmlri.js');

var _zseri = require('./zseri.js');

var _zs1s3 = require('./zs1s2.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _fortranHelpers = require('../../utils/fortranHelpers.js');

var ft = _interopRequireWildcard(_fortranHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function zacai(zr, zi, fnu, kode, mr, n, yr, yi, rl, tol, elim, alim) {
  var arg = void 0,
      ascle = void 0,
      az = void 0,
      csgnr = void 0,
      csgni = void 0,
      cspnr = void 0,
      cspni = void 0,
      c1r = void 0,
      c1i = void 0,
      c2r = void 0,
      c2i = void 0,
      cyr = void 0,
      cyi = void 0,
      dfnu = void 0,
      fmr = void 0,
      pi = void 0,
      sgn = void 0,
      yy = void 0,
      znr = void 0,
      zni = void 0,
      inu = void 0,
      iuf = void 0,
      nn = void 0,
      nw = void 0,
      nz = void 0;
  cyr = new Array(2);
  cyi = new Array(2);
  pi = 3.14159265358979324;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        nz = 0;
        znr = -zr;
        zni = -zi;
        az = (0, _zabs.azabs)(zr, zi);
        nn = n;
        dfnu = fnu + (n - 1);
        if (az <= 2.0) {
          goToLabel = 10;break;
        }
        if (az * az * 0.25 > dfnu + 1.0) {
          goToLabel = 20;break;
        }
      case 10:
        // c-----------------------------------------------------------------------
        // c     power series for the i function
        // c-----------------------------------------------------------------------
        nw = (0, _zseri.zseri)(znr, zni, fnu, kode, nn, yr, yi, tol, elim, alim);
        goToLabel = 40;break;
      case 20:
        if (az < rl) {
          goToLabel = 30;break;
        }
        // c-----------------------------------------------------------------------
        // c     asymptotic expansion for large z for the i function
        // c-----------------------------------------------------------------------
        nw = (0, _zasyi.zasyi)(znr, zni, fnu, kode, nn, yr, yi, rl, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 80;break;
        }
        goToLabel = 40;break;
      case 30:
        // c-----------------------------------------------------------------------
        // c     miller algorithm normalized by the series for the i function
        // c-----------------------------------------------------------------------
        nw = (0, _zmlri.zmlri)(znr, zni, fnu, kode, nn, yr, yi, tol);
        if (nw < 0) {
          goToLabel = 80;break;
        }
      case 40:
        // c-----------------------------------------------------------------------
        // c     analytic continuation to the left half plane for the k function
        // c-----------------------------------------------------------------------
        nw = (0, _zbknu.zbknu)(znr, zni, fnu, kode, 1, cyr, cyi, tol, elim, alim);
        if (nw !== 0) {
          goToLabel = 80;break;
        }
        fmr = mr;
        sgn = -ft.sign(pi, fmr);
        csgnr = 0.0;
        csgni = sgn;
        if (kode === 1) {
          goToLabel = 50;break;
        }
        yy = -zni;
        csgnr = -csgni * Math.sin(yy);
        csgni = csgni * Math.cos(yy);
      case 50:
        // c-----------------------------------------------------------------------
        // c     calculate cspn=exp(fnu*pi*i) to minimize losses of significance
        // c     when fnu is large
        // c-----------------------------------------------------------------------
        inu = Math.trunc(fnu);
        arg = (fnu - inu) * sgn;
        cspnr = Math.cos(arg);
        cspni = Math.sin(arg);
        if (inu % 2 === 0) {
          goToLabel = 60;break;
        }
        cspnr = -cspnr;
        cspni = -cspni;
      case 60:
        c1r = cyr[0];
        c1i = cyi[0];
        c2r = yr[0];
        c2i = yi[0];
        if (kode === 1) {
          goToLabel = 70;break;
        }
        iuf = 0;
        ascle = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;

        var _zs1s = (0, _zs1s3.zs1s2)(znr, zni, c1r, c1i, c2r, c2i, ascle, alim, iuf);

        var _zs1s2 = _slicedToArray(_zs1s, 6);

        c1r = _zs1s2[0];
        c1i = _zs1s2[1];
        c2r = _zs1s2[2];
        c2i = _zs1s2[3];
        nw = _zs1s2[4];
        iuf = _zs1s2[5];

        nz = nz + nw;
      case 70:
        yr[0] = cspnr * c1r - cspni * c1i + csgnr * c2r - csgni * c2i;
        yi[0] = cspnr * c1i + cspni * c1r + csgnr * c2i + csgni * c2r;
        break mainExecutionLoop;
      case 80:
        nz = -1;
        if (nw === -2) nz = -2;
      default:
        break mainExecutionLoop;
    }
  }

  return nz;
}