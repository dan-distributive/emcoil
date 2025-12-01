Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azexp = azexp;
// SUBROUTINE AZEXP(AR, AI, BR, BI)
// ***BEGIN PROLOGUE  AZEXP
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZBESY,ZAIRY,ZBIRY
//
//      DOUBLE PRECISION COMPLEX EXPONENTIAL FUNCTION B=EXP(A)
//
// ***ROUTINES CALLED  (NONE)
// ***END PROLOGUE  AZEXP
function azexp(ar, ai) {
  var zm = Math.exp(ar);
  return [zm * Math.cos(ai), zm * Math.sin(ai)];
}