Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zuchk = zuchk;
/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZUCHK(YR, YI, NZ, ASCLE, TOL)
// ***BEGIN PROLOGUE  ZUCHK
// ***REFER TO ZSERI,ZUOIK,ZUNK1,ZUNK2,ZUNI1,ZUNI2,ZKSCL
//
//       Y ENTERS AS A SCALED QUANTITY WHOSE MAGNITUDE IS GREATER THAN
//       EXP(-ALIM)=ASCLE=1.0E+3*D1MACH(1)/TOL. THE TEST IS MADE TO SEE
//       IF THE MAGNITUDE OF THE REAL OR IMAGINARY PART WOULD UNDERFLOW
//       WHEN Y IS SCALED (BY TOL) TO ITS PROPER VALUE. Y IS ACCEPTED
//       IF THE UNDERFLOW IS AT LEAST ONE PRECISION BELOW THE MAGNITUDE
//       OF THE LARGEST COMPONENT; OTHERWISE THE PHASE ANGLE DOES NOT HAVE
//       ABSOLUTE ACCURACY AND AN UNDERFLOW IS ASSUMED.
//
// ***ROUTINES CALLED  (NONE)
// ***END PROLOGUE  ZUCHK
//
//      COMPLEX Y
function zuchk(yr, yi, ascle, tol) {
  var nz = void 0,
      ss = void 0,
      st = void 0,
      wr = void 0,
      wi = void 0;
  nz = 0;
  wr = Math.abs(yr);
  wi = Math.abs(yi);
  st = Math.min(wr, wi);
  if (st > ascle) {
    return nz;
  }
  ss = Math.max(wr, wi);
  st = st / tol;
  if (ss < st) {
    nz = 1;
  }
  return nz;
}