Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
//* **BEGIN PROLOGUE  ZKSCL
//* **REFER TO  ZBESK
//
//     SET K FUNCTIONS TO ZERO ON UNDERFLOW,  RECURRENCE
//     ON SCALED FUNCTIONS UNTIL TWO MEMBERS COME ON SCALE, {
//     RETURN WITH MIN(NZ+2,N) VALUES SCALED BY 1/TOL.
//
//* **ROUTINES ED()  ZUCHK,AZABS,AZLOG
//* **END PROLOGUE  ZKSCL
//     COMPLEX CK,CS,CY,CZERO,RZ,S1,S2,Y,ZR,ZD,CELM


exports.zkscl = zkscl;

var _zabs = require('./zabs.js');

var _zlog = require('./zlog.js');

var _zuchk = require('./zuchk.js');

function zkscl(zrr, zri, fnu, n, yr, yi, nz, rzr, rzi, ascle, tol, elim) {
  var acs = void 0,
      as = void 0,
      cki = void 0,
      ckr = void 0,
      csi = void 0,
      csr = void 0,
      cyi = void 0,
      cyr = void 0,
      fn = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      zeroi = void 0,
      zeror = void 0,
      zdr = void 0,
      zdi = void 0,
      celmr = void 0,
      elm = void 0,
      helim = void 0,
      alas = void 0,
      i = void 0,
      ic = void 0,
      kk = void 0,
      nn = void 0,
      nw = void 0;

  cyr = new Float64Array(2);
  cyi = new Float64Array(2);

  var goToLabel = 0;
  console.log('zkscl');
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        zeror = 0.0e0;
        // double precision acs, as, ascle, cki, ckr, csi, csr, cyi, cyr, elim, fn, fnu, rzi, rzr, str, s1i, s1r, s2i, s2r, tol, yi, yr, zeroi, zeror, zri, zrr, azabs, zdr, zdi, celmr, elm, helim, alas
        // integer i, ic, kk, n, nn, nw, nz
        // dimension yr(n), yi(n), cyr(2), cyi(2)

        zeroi = 0.0e0;
        nz = 0;
        ic = 0;
        nn = Math.min(2, n);
        for (i = 1; i <= nn; i++) {
          s1r = yr[i - 1];
          s1i = yi[i - 1];
          cyr[i - 1] = s1r;
          cyi[i - 1] = s1i;
          as = (0, _zabs.azabs)(s1r, s1i);
          acs = -zrr + Math.log(as);
          nz = nz + 1;
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
          if (acs < -elim) continue;

          var _azlog = (0, _zlog.azlog)(s1r, s1i);

          var _azlog2 = _slicedToArray(_azlog, 2);

          csr = _azlog2[0];
          csi = _azlog2[1];

          csr = csr - zrr;
          csi = csi - zri;
          str = Math.exp(csr) / tol;
          csr = str * Math.cos(csi);
          csi = str * Math.sin(csi);
          (0, _zuchk.zuchk)(csr, csi, nw, ascle, tol);
          if (nw !== 0) continue;
          yr[i - 1] = csr;
          yi[i - 1] = csi;
          ic = i;
          nz = nz - 1;
        }
        if (n === 1) break mainExecutionLoop;
        if (ic > 1) {
          goToLabel = 20;break;
        }
        yr[0] = zeror;
        yi[0] = zeroi;
        nz = 2;
      case 20:
        if (n === 2) break mainExecutionLoop;
        if (nz === 0) break mainExecutionLoop;
        fn = fnu + 1.0e0;
        ckr = fn * rzr;
        cki = fn * rzi;
        s1r = cyr[0];
        s1i = cyi[0];
        s2r = cyr[1];
        s2i = cyi[1];
        helim = 0.5e0 * elim;
        elm = Math.exp(-elim);
        celmr = elm;
        zdr = zrr;
        zdi = zri;
        //
        //     find two consecutive y values on scale. scale recurrence if
        //     s2 gets larger than Math.exp(elim/2)
        //
        for (i = 3; i <= n; i++) {
          kk = i;
          csr = s2r;
          csi = s2i;
          s2r = ckr * csr - cki * csi + s1r;
          s2i = cki * csr + ckr * csi + s1i;
          s1r = csr;
          s1i = csi;
          ckr = ckr + rzr;
          cki = cki + rzi;
          as = (0, _zabs.azabs)(s2r, s2i);
          alas = Math.log(as);
          acs = -zdr + alas;
          nz = nz + 1;
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
          if (acs < -elim) {
            // goToLabel = 25; break;
          } else {
            var _azlog3 = (0, _zlog.azlog)(s2r, s2i);

            var _azlog4 = _slicedToArray(_azlog3, 2);

            csr = _azlog4[0];
            csi = _azlog4[1];

            csr = csr - zdr;
            csi = csi - zdi;
            str = Math.exp(csr) / tol;
            csr = str * Math.cos(csi);
            csi = str * Math.sin(csi);
            (0, _zuchk.zuchk)(csr, csi, nw, ascle, tol);
            if (nw !== 0) {
              // goToLabel = 25; break;
            } else {
              yr[i - 1] = csr;
              yi[i - 1] = csi;
              nz = nz - 1;
              if (ic === kk - 1) {
                goToLabel = 40;break;
              }
              ic = kk;
              continue;
            }
          }
          // case 25:
          if (alas < helim) continue;
          zdr = zdr - elim;
          s1r = s1r * celmr;
          s1i = s1i * celmr;
          s2r = s2r * celmr;
          s2i = s2i * celmr;
        }
        if (goToLabel > 30) break;
        nz = n;
        if (ic === n) nz = n - 1;
        goToLabel = 45;break;
      case 40:
        nz = kk - 2;
      case 45:
        for (i = 1; i <= nz; i++) {
          yr[i - 1] = zeror;
          yi[i - 1] = zeroi;
        }
      default:
        break mainExecutionLoop;
    }
  }
  return nz;
}