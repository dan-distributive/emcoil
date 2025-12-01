Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azabs = azabs;
// DOUBLE PRECISION FUNCTION AZABS(ZR, ZI)
// ***BEGIN PROLOGUE  AZABS
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZBESY,ZAIRY,ZBIRY
//
//      AZABS COMPUTES THE ABSOLUTE VALUE OR MAGNITUDE OF A DOUBLE
//      PRECISION COMPLEX VARIABLE CMPLX(ZR,ZI)
//
// ***ROUTINES CALLED  (NONE)
// ***END PROLOGUE  AZABS
function azabs(zr, zi) {
  var u = void 0,
      v = void 0,
      q = void 0,
      s = void 0;
  u = Math.abs(zr);
  v = Math.abs(zi);
  s = u + v;

  if (s === 0) return 0;
  if (u > v) {
    q = v / u;
    return u * Math.sqrt(1 + q * q);
  }
  q = u / v;
  return v * Math.sqrt(1 + q * q);
}