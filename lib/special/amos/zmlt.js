Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zmlt = zmlt;
// SUBROUTINE ZMLT(AR, AI, BR, BI, CR, CI)
// ***BEGIN PROLOGUE  ZMLT
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZBESY,ZAIRY,ZBIRY
//
//      DOUBLE PRECISION COMPLEX MULTIPLY, C=A*B.
//
// ***ROUTINES CALLED  (NONE)
// ***END PROLOGUE  ZMLT
function zmlt(ar, ai, br, bi) {
  return [ar * br - ai * bi, ar * bi + ai * br];
}