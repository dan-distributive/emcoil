Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZBINU(ZR, ZI, FNU, KODE, N, CYR, CYI, NZ, RL, FNUL,
// * TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZBINU
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZAIRY,ZBIRY
//
//      ZBINU COMPUTES THE I FUNCTION IN THE RIGHT HALF Z PLANE
//
// ***ROUTINES CALLED  AZABS,ZASYI,ZBUNI,ZMLRI,ZSERI,ZUOIK,ZWRSK
// ***END PROLOGUE  ZBINU


exports.zbinu = zbinu;

var _zabs = require('./zabs.js');

var _zasyi = require('./zasyi.js');

var _zbuni3 = require('./zbuni.js');

var _zmlri = require('./zmlri.js');

var _zseri = require('./zseri.js');

var _zuoik = require('./zuoik.js');

var _zwrsk = require('./zwrsk.js');

function zbinu(zr, zi, fnu, kode, n, cyr, cyi, rl, fnul, tol, elim, alim) {
  var az = void 0,
      cwi = void 0,
      cwr = void 0,
      dfnu = void 0,
      zeroi = void 0,
      zeror = void 0,
      i = void 0,
      inw = void 0,
      nlast = void 0,
      nn = void 0,
      nui = void 0,
      nw = void 0,
      nz = void 0;
  cwr = new Array(2);
  cwi = new Array(2);
  zeror = 0;
  zeroi = 0;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        nz = 0;
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
        // c     power series
        // c-----------------------------------------------------------------------
        nw = (0, _zseri.zseri)(zr, zi, fnu, kode, nn, cyr, cyi, tol, elim, alim);
        inw = Math.abs(nw);
        nz = nz + inw;
        nn = nn - inw;
        if (nn === 0) break mainExecutionLoop;
        if (nw >= 0) {
          goToLabel = 120;break;
        }
        dfnu = fnu + (nn - 1);
      case 20:
        if (az < rl) {
          goToLabel = 40;break;
        }
        if (dfnu <= 1.0) {
          goToLabel = 30;break;
        }
        if (az + az < dfnu * dfnu) {
          goToLabel = 50;break;
        }
      // c-----------------------------------------------------------------------
      // c     asymptotic expansion for large z
      // c-----------------------------------------------------------------------
      case 30:
        nw = (0, _zasyi.zasyi)(zr, zi, fnu, kode, nn, cyr, cyi, rl, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 130;break;
        }
        goToLabel = 120;break;
      case 40:
        if (dfnu <= 1.0) {
          goToLabel = 70;break;
        }
      case 50:
        // c-----------------------------------------------------------------------
        // c     overflow and underflow test on i sequence for miller algorithm
        // c-----------------------------------------------------------------------
        nw = (0, _zuoik.zuoik)(zr, zi, fnu, kode, 1, nn, cyr, cyi, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 130;break;
        }
        nz = nz + nw;
        nn = nn - nw;
        if (nn === 0) break mainExecutionLoop;
        dfnu = fnu + (nn - 1);
        if (dfnu > fnul) {
          goToLabel = 110;break;
        }
        if (az > fnul) {
          goToLabel = 110;break;
        }
      case 60:
        if (az > rl) {
          goToLabel = 80;break;
        }
      case 70:
        // c-----------------------------------------------------------------------
        // c     miller algorithm normalized by the series
        // c-----------------------------------------------------------------------
        nw = (0, _zmlri.zmlri)(zr, zi, fnu, kode, nn, cyr, cyi, tol);
        if (nw < 0) {
          goToLabel = 130;break;
        }
        goToLabel = 120;break;
      case 80:
        // c-----------------------------------------------------------------------
        // c     miller algorithm normalized by the wronskian
        // c-----------------------------------------------------------------------
        // c-----------------------------------------------------------------------
        // c     overflow test on k functions used in wronskian
        // c-----------------------------------------------------------------------
        nw = (0, _zuoik.zuoik)(zr, zi, fnu, kode, 2, 2, cwr, cwi, tol, elim, alim);
        if (nw >= 0) {
          goToLabel = 100;break;
        }
        nz = nn;
        // do 90 i=1,nn
        for (i = 1; i <= nn; i++) {
          cyr[i - 1] = zeror;
          cyi[i - 1] = zeroi;
        }
        // 90 continue
        break mainExecutionLoop;
      case 100:
        if (nw > 0) {
          goToLabel = 130;break;
        }
        nw = (0, _zwrsk.zwrsk)(zr, zi, fnu, kode, nn, cyr, cyi, cwr, cwi, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 130;break;
        }
        goToLabel = 120;break;
      case 110:
        // c-----------------------------------------------------------------------
        // c     increment fnu+nn-1 up to fnul, compute and recur backward
        // c-----------------------------------------------------------------------
        nui = Math.trunc(fnul - dfnu) + 1;
        nui = Math.max(nui, 0);

        var _zbuni = (0, _zbuni3.zbuni)(zr, zi, fnu, kode, nn, cyr, cyi, nui, nlast, fnul, tol, elim, alim);

        var _zbuni2 = _slicedToArray(_zbuni, 2);

        nw = _zbuni2[0];
        nlast = _zbuni2[1];

        if (nw < 0) {
          goToLabel = 130;break;
        }
        nz = nz + nw;
        if (nlast === 0) {
          goToLabel = 120;break;
        }
        nn = nlast;
        goToLabel = 60;break;
      case 120:
        break mainExecutionLoop;
      case 130:
        nz = -1;
        if (nw === -2) nz = -2;
      default:
        break mainExecutionLoop;
    }
  }
  return nz;
}