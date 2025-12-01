Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azlog = azlog;

var _zabs = require('./zabs.js');

function azlog(ar, ai, br, bi, ierr) {
  var zm = void 0,
      dtheta = void 0,
      dpi = void 0,
      dhpi = void 0;
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        dpi = 3.141592653589793238462643383;
        // double precision ar, ai, br, bi, zm, dtheta, dpi, dhpi
        // double precision azabs

        dhpi = 1.570796326794896619231321696;

        ierr = 0;
        if (ar === 0.0e+0) {
          goToLabel = 10;break;
        }
        if (ai === 0.0e+0) {
          goToLabel = 20;break;
        }
        dtheta = Math.atan(ai / ar);
        if (dtheta <= 0.0e+0) {
          goToLabel = 40;break;
        }
        if (ar < 0.0e+0) dtheta = dtheta - dpi;
        goToLabel = 50;break;
      case 10:
        if (ai === 0.0e+0) {
          goToLabel = 60;break;
        }
        bi = dhpi;
        br = Math.log(Math.abs(ai));
        if (ai < 0.0e+0) bi = -bi;
        break mainExecutionLoop;
      case 20:
        if (ar > 0.0e+0) {
          goToLabel = 30;break;
        }
        br = Math.log(Math.abs(ar));
        bi = dpi;
        break mainExecutionLoop;
      case 30:
        br = Math.log(ar);
        bi = 0.0e+0;
        break mainExecutionLoop;
      case 40:
        if (ar < 0.0e+0) dtheta = dtheta + dpi;
      case 50:
        zm = (0, _zabs.azabs)(ar, ai);
        br = Math.log(zm);
        bi = dtheta;
        break mainExecutionLoop;
      case 60:

        ierr = 1;
      default:
        break mainExecutionLoop;
    }
  }
  return [br, bi, ierr];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
//     DOUBLE PRECISION COMPLEX LOGARITHM B=CLOG(A)
//     IERR=0,NORMAL RETURN      IERR=1, Z=CMPLX(0.0,0.0)