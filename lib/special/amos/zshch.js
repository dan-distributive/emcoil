Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zshch = zshch;
// SUBROUTINE ZSHCH(ZR, ZI, CSHR, CSHI, CCHR, CCHI)
// ***BEGIN PROLOGUE  ZSHCH
// ***REFER TO  ZBESK,ZBESH
//
//      ZSHCH COMPUTES THE COMPLEX HYPERBOLIC FUNCTIONS CSH=SINH(X+I*Y)
//      AND CCH=COSH(X+I*Y), WHERE I**2=-1.
//
// ***ROUTINES CALLED  (NONE)
// ***END PROLOGUE  ZSHCH
//
function zshch(zr, zi) {
  var sh = Math.sinh(zr);
  var ch = Math.cosh(zr);
  var sn = Math.sin(zi);
  var cn = Math.cos(zi);
  //     [ cshr,  cshi,  cchr,  cchi]
  return [sh * cn, ch * sn, ch * cn, sh * sn];
}