Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zbunk = zbunk;

var _zunk = require('./zunk1.js');

var _zunk2 = require('./zunk2.js');

// SUBROUTINE ZBUNK(ZR, ZI, FNU, KODE, MR, N, YR, YI, NZ, TOL, ELIM, ALIM)
// ***BEGIN PROLOGUE  ZBUNK
// ***REFER TO  ZBESK,ZBESH
//
//      ZBUNK COMPUTES THE K BESSEL FUNCTION FOR FNU.GT.FNUL.
//      ACCORDING TO THE UNIFORM ASYMPTOTIC EXPANSION FOR K(FNU,Z)
//      IN ZUNK1 AND THE EXPANSION FOR H(2,FNU,Z) IN ZUNK2
//
// ***ROUTINES CALLED  ZUNK1,ZUNK2
// ***END PROLOGUE  ZBUNK
function zbunk(zr, zi, fnu, kode, mr, n, yr, yi, tol, elim, alim) {
  var ax = void 0,
      ay = void 0;
  ax = Math.abs(zr) * 1.7321;
  ay = Math.abs(zi);
  if (ay > ax) {
    return (0, _zunk2.zunk2)(zr, zi, fnu, kode, mr, n, yr, yi, tol, elim, alim);
  } else {
    return (0, _zunk.zunk1)(zr, zi, fnu, kode, mr, n, yr, yi, tol, elim, alim);
  }
}