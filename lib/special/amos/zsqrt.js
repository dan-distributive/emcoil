Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azsqrt = azsqrt;

var _zabs = require('./zabs.js');

function azsqrt(ar, ai) {
  var br = void 0,
      bi = void 0,
      zm = void 0,
      dtheta = void 0,
      dpi = void 0,
      drt = void 0;
  drt = 7.071067811865475244008443621e-1;
  dpi = 3.141592653589793238462643383;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        zm = (0, _zabs.azabs)(ar, ai);
        zm = Math.sqrt(zm);
        if (ar === 0.0) {
          goToLabel = 10;break;
        }
        if (ai === 0.0) {
          goToLabel = 20;break;
        }
        dtheta = Math.atan(ai / ar);
        if (dtheta <= 0.0) {
          goToLabel = 40;break;
        }
        if (ar < 0.0) dtheta = dtheta - dpi;
        goToLabel = 50;break;
      case 10:
        if (ai > 0.0) {
          goToLabel = 60;break;
        }
        if (ai < 0.0) {
          goToLabel = 70;break;
        }
        br = 0.0;
        bi = 0.0;
        break mainExecutionLoop;
      case 20:
        if (ar > 0.0) {
          goToLabel = 30;break;
        }
        br = 0.0;
        bi = Math.sqrt(Math.abs(ar));
        break mainExecutionLoop;
      case 30:
        br = Math.sqrt(ar);
        bi = 0.0;
        break mainExecutionLoop;
      case 40:
        if (ar < 0.0) dtheta = dtheta + dpi;
      case 50:
        dtheta = dtheta * 0.5;
        br = zm * Math.cos(dtheta);
        bi = zm * Math.sin(dtheta);
        break mainExecutionLoop;
      case 60:
        br = zm * drt;
        bi = zm * drt;
        break mainExecutionLoop;
      case 70:
        br = zm * drt;
        bi = -zm * drt;
      default:
        break mainExecutionLoop;
    }
  }

  return [br, bi];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE AZSQRT(AR, AI, BR, BI)
// ***BEGIN PROLOGUE  AZSQRT
// ***REFER TO  ZBESH,ZBESI,ZBESJ,ZBESK,ZBESY,ZAIRY,ZBIRY
//
//      DOUBLE PRECISION COMPLEX SQUARE ROOT, B=CSQRT(A)
//
// ***ROUTINES CALLED  AZABS
// ***END PROLOGUE  AZSQRT