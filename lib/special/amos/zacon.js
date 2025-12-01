Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZACON(ZR, ZI, FNU, KODE, MR, N, YR, YI, NZ, RL, FNUL,
// * TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZACON
// ***REFER TO  ZBESK,ZBESH
//
//      ZACON APPLIES THE ANALYTIC CONTINUATION FORMULA
//
//          K(FNU,ZN*EXP(MP))=K(FNU,ZN)*EXP(-MP*FNU) - MP*I(FNU,ZN)
//                  MP=PI*MR*CMPLX(0.0,1.0)
//
//      TO CONTINUE THE K FUNCTION FROM THE RIGHT HALF TO THE LEFT
//      HALF Z PLANE
//
// ***ROUTINES CALLED  ZBINU,ZBKNU,ZS1S2,D1MACH,AZABS,ZMLT
// ***END PROLOGUE  ZACON
//      COMPLEX CK,CONE,CSCL,CSCR,CSGN,CSPN,CY,CZERO,C1,C2,RZ,SC1,SC2,ST,
//     *S1,S2,Y,Z,ZN


exports.zacon = zacon;

var _zbknu = require('./zbknu.js');

var _zbinu = require('./zbinu.js');

var _zs1s7 = require('./zs1s2.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zabs = require('./zabs.js');

var _zmlt11 = require('./zmlt.js');

var _fortranHelpers = require('../../utils/fortranHelpers.js');

var ft = _interopRequireWildcard(_fortranHelpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function zacon(zr, zi, fnu, kode, mr, n, yr, yi, rl, fnul, tol, elim, alim) {
  var arg = void 0,
      ascle = void 0,
      as2 = void 0,
      azn = void 0,
      bry = void 0,
      bscle = void 0,
      cki = void 0,
      ckr = void 0,
      coner = void 0,
      cpn = void 0,
      cscl = void 0,
      cscr = void 0,
      csgni = void 0,
      csgnr = void 0,
      cspni = void 0,
      cspnr = void 0,
      csr = void 0,
      csrr = void 0,
      cssr = void 0,
      cyi = void 0,
      cyr = void 0,
      c1i = void 0,
      c1m = void 0,
      c1r = void 0,
      c2i = void 0,
      c2r = void 0,
      fmr = void 0,
      fn = void 0,
      pi = void 0,
      pti = void 0,
      ptr = void 0,
      razn = void 0,
      rzi = void 0,
      rzr = void 0,
      sc1i = void 0,
      sc1r = void 0,
      sc2i = void 0,
      sc2r = void 0,
      sgn = void 0,
      spn = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      yy = void 0,
      zeror = void 0,
      zni = void 0,
      znr = void 0,
      i = void 0,
      inu = void 0,
      iuf = void 0,
      kflag = void 0,
      nn = void 0,
      nw = void 0,
      nz = void 0;

  cyr = new Float64Array(2);
  cyi = new Float64Array(2);
  cssr = new Float64Array(3);
  csrr = new Float64Array(3);
  bry = new Float64Array(3);
  pi = 3.14159265358979324;

  zeror = 0;
  coner = 1;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        nz = 0;
        znr = -zr;
        zni = -zi;
        nn = n;
        nw = (0, _zbinu.zbinu)(znr, zni, fnu, kode, nn, yr, yi, rl, fnul, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 90;break;
        }
        // c-----------------------------------------------------------------------
        // c     analytic continuation to the left half plane for the k function
        // c-----------------------------------------------------------------------
        nn = Math.min(2, n);
        nw = (0, _zbknu.zbknu)(znr, zni, fnu, kode, nn, cyr, cyi, tol, elim, alim);
        if (nw !== 0) {
          goToLabel = 90;break;
        }
        s1r = cyr[0];
        s1i = cyi[0];
        fmr = mr;
        sgn = -ft.sign(pi, fmr);
        csgnr = zeror;
        csgni = sgn;
        if (kode === 1) {
          goToLabel = 10;break;
        }
        yy = -zni;
        cpn = Math.cos(yy);
        spn = Math.sin(yy);

        var _zmlt = (0, _zmlt11.zmlt)(csgnr, csgni, cpn, spn);

        var _zmlt2 = _slicedToArray(_zmlt, 2);

        csgnr = _zmlt2[0];
        csgni = _zmlt2[1];

      case 10:
        // c-----------------------------------------------------------------------
        // c     calculate cspn=exp(fnu*pi*i) to minimize losses of significance
        // c     when fnu is large
        // c-----------------------------------------------------------------------
        inu = Math.trunc(fnu);
        arg = (fnu - inu) * sgn;
        cpn = Math.cos(arg);
        spn = Math.sin(arg);
        cspnr = cpn;
        cspni = spn;
        if (inu % 2 === 0) {
          goToLabel = 20;break;
        }
        cspnr = -cspnr;
        cspni = -cspni;
      case 20:
        iuf = 0;
        c1r = s1r;
        c1i = s1i;
        c2r = yr[0];
        c2i = yi[0];
        ascle = 1.0e+3 * (0, _d1mach.d1mach)(1) / tol;
        if (kode === 1) {
          goToLabel = 30;break;
        }

        var _zs1s = (0, _zs1s7.zs1s2)(znr, zni, c1r, c1i, c2r, c2i, ascle, alim, iuf);

        var _zs1s2 = _slicedToArray(_zs1s, 6);

        nw = _zs1s2[0];
        c1r = _zs1s2[1];
        c1i = _zs1s2[2];
        c2r = _zs1s2[3];
        c2i = _zs1s2[4];
        iuf = _zs1s2[5];

        nz = nz + nw;
        sc1r = c1r;
        sc1i = c1i;
      case 30:
        var _zmlt3 = (0, _zmlt11.zmlt)(cspnr, cspni, c1r, c1i);

        var _zmlt4 = _slicedToArray(_zmlt3, 2);

        str = _zmlt4[0];
        sti = _zmlt4[1];

        var _zmlt5 = (0, _zmlt11.zmlt)(csgnr, csgni, c2r, c2i);

        var _zmlt6 = _slicedToArray(_zmlt5, 2);

        ptr = _zmlt6[0];
        pti = _zmlt6[1];

        yr[0] = str + ptr;
        yi[0] = sti + pti;
        if (n === 1) break mainExecutionLoop;
        cspnr = -cspnr;
        cspni = -cspni;
        s2r = cyr[1];
        s2i = cyi[1];
        c1r = s2r;
        c1i = s2i;
        c2r = yr[1];
        c2i = yi[1];
        if (kode === 1) {
          goToLabel = 40;break;
        }

        var _zs1s3 = (0, _zs1s7.zs1s2)(znr, zni, c1r, c1i, c2r, c2i, ascle, alim, iuf);

        var _zs1s4 = _slicedToArray(_zs1s3, 6);

        nw = _zs1s4[0];
        c1r = _zs1s4[1];
        c1i = _zs1s4[2];
        c2r = _zs1s4[3];
        c2i = _zs1s4[4];
        iuf = _zs1s4[5];

        nz = nz + nw;
        sc2r = c1r;
        sc2i = c1i;
      case 40:
        var _zmlt7 = (0, _zmlt11.zmlt)(cspnr, cspni, c1r, c1i);

        var _zmlt8 = _slicedToArray(_zmlt7, 2);

        str = _zmlt8[0];
        sti = _zmlt8[1];

        var _zmlt9 = (0, _zmlt11.zmlt)(csgnr, csgni, c2r, c2i);

        var _zmlt10 = _slicedToArray(_zmlt9, 2);

        ptr = _zmlt10[0];
        pti = _zmlt10[1];

        yr[1] = str + ptr;
        yi[1] = sti + pti;
        if (n === 2) break mainExecutionLoop;
        cspnr = -cspnr;
        cspni = -cspni;
        azn = (0, _zabs.azabs)(znr, zni);
        razn = 1.0 / azn;
        str = znr * razn;
        sti = -zni * razn;
        rzr = (str + str) * razn;
        rzi = (sti + sti) * razn;
        fn = fnu + 1.0;
        ckr = fn * rzr;
        cki = fn * rzi;
        // c-----------------------------------------------------------------------
        // c     scale near exponent extremes during recurrence on k functions
        // c-----------------------------------------------------------------------
        cscl = 1.0 / tol;
        cscr = tol;
        cssr[0] = cscl;
        cssr[1] = coner;
        cssr[2] = cscr;
        csrr[0] = cscr;
        csrr[1] = coner;
        csrr[2] = cscl;
        bry[0] = ascle;
        bry[1] = 1.0 / ascle;
        bry[2] = (0, _d1mach.d1mach)(2);
        as2 = (0, _zabs.azabs)(s2r, s2i);
        kflag = 2;
        if (as2 > bry[0]) {
          goToLabel = 50;break;
        }
        kflag = 1;
        goToLabel = 60;break;
      case 50:
        if (as2 < bry[1]) {
          goToLabel = 60;break;
        }
        kflag = 3;
      case 60:
        bscle = bry[kflag - 1];
        s1r = s1r * cssr[kflag - 1];
        s1i = s1i * cssr[kflag - 1];
        s2r = s2r * cssr[kflag - 1];
        s2i = s2i * cssr[kflag - 1];
        csr = csrr[kflag - 1];
        // do 80 i=3,n
        for (i = 3; i <= n; i++) {
          str = s2r;
          sti = s2i;
          s2r = ckr * str - cki * sti + s1r;
          s2i = ckr * sti + cki * str + s1i;
          s1r = str;
          s1i = sti;
          c1r = s2r * csr;
          c1i = s2i * csr;
          str = c1r;
          sti = c1i;
          c2r = yr[i - 1];
          c2i = yi[i - 1];
          if (kode === 1) {
            // go to 70
          } else {
            if (iuf < 0) {
              // go to 70
            } else {
              var _zs1s5 = (0, _zs1s7.zs1s2)(znr, zni, c1r, c1i, c2r, c2i, ascle, alim, iuf);

              var _zs1s6 = _slicedToArray(_zs1s5, 6);

              nw = _zs1s6[0];
              c1r = _zs1s6[1];
              c1i = _zs1s6[2];
              c2r = _zs1s6[3];
              c2i = _zs1s6[4];
              iuf = _zs1s6[5];

              nz = nz + nw;
              sc1r = sc2r;
              sc1i = sc2i;
              sc2r = c1r;
              sc2i = c1i;
              if (iuf !== 3) {
                // go to 70
              } else {
                iuf = -4;
                s1r = sc1r * cssr[kflag - 1];
                s1i = sc1i * cssr[kflag - 1];
                s2r = sc2r * cssr[kflag - 1];
                s2i = sc2i * cssr[kflag - 1];
                str = sc2r;
                sti = sc2i;
              }
            }
          }
          // 70   continue
          ptr = cspnr * c1r - cspni * c1i;
          pti = cspnr * c1i + cspni * c1r;
          yr[i - 1] = ptr + csgnr * c2r - csgni * c2i;
          yi[i - 1] = pti + csgnr * c2i + csgni * c2r;
          ckr = ckr + rzr;
          cki = cki + rzi;
          cspnr = -cspnr;
          cspni = -cspni;
          if (kflag >= 3) continue;
          ptr = Math.abs(c1r);
          pti = Math.abs(c1i);
          c1m = Math.max(ptr, pti);
          if (c1m <= bscle) continue;
          kflag = kflag + 1;
          bscle = bry[kflag - 1];
          s1r = s1r * csr;
          s1i = s1i * csr;
          s2r = str;
          s2i = sti;
          s1r = s1r * cssr[kflag - 1];
          s1i = s1i * cssr[kflag - 1];
          s2r = s2r * cssr[kflag - 1];
          s2i = s2i * cssr[kflag - 1];
          csr = csrr[kflag - 1];
        } // 80 continue
        break mainExecutionLoop;
      case 90:
        nz = -1;
        if (nw === -2) nz = -2;
      default:
        break mainExecutionLoop;
    }
  }
  return nz;
}