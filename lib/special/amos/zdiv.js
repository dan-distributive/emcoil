Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zdiv = zdiv;

var _zabs = require('./zabs.js');

function zdiv(ar, ai, br, bi) {
  var cr = void 0,
      ci = void 0,
      bm = void 0,
      ca = void 0,
      cb = void 0,
      cc = void 0,
      cd = void 0;
  bm = 1 / (0, _zabs.azabs)(br, bi);
  cc = br * bm;
  cd = bi * bm;
  ca = (ar * cc + ai * cd) * bm;
  cb = (ai * cc - ar * cd) * bm;
  cr = ca;
  ci = cb;
  return [cr, ci];
} // SUBROUTINE ZDIV(AR, AI, BR, BI, CR, CI)
// ***BEGIN PROLOGUE  ZDIV
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZBESY,ZAIRY,ZBIRY
//
//      DOUBLE PRECISION COMPLEX DIVIDE C=A/B.
//
// ***ROUTINES CALLED  AZABS
// ***END PROLOGUE  ZDIV