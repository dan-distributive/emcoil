Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqmomo = dqmomo;
/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
function dqmomo(alfa, beta, ri, rj, rg, rh, integr) {
  var alfp1 = void 0,
      alfp2 = void 0,
      an = void 0,
      anm1 = void 0,
      betp1 = void 0,
      betp2 = void 0,
      ralf = void 0,
      rbet = void 0,
      i = void 0,
      im1 = void 0;
  var goToLabel = 0;

  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        alfp1 = alfa + 0.1e+01;
        betp1 = beta + 0.1e+01;
        alfp2 = alfa + 0.2e+01;
        betp2 = beta + 0.2e+01;
        ralf = 0.2e+01 ** alfp1;
        rbet = 0.2e+01 ** betp1;
        //
        //           compute ri, rj using a forward recurrence relation.
        //
        ri[0] = ralf / alfp1;
        rj[0] = rbet / betp1;
        ri[1] = ri[0] * alfa / alfp2;
        rj[1] = rj[0] * beta / betp2;
        an = 0.2e+01;
        anm1 = 0.1e+01;
        for (i = 3; i <= 25; i++) {
          ri[i - 1] = -(ralf + an * (an - alfp2) * ri[i - 2]) / (anm1 * (an + alfp1));
          rj[i - 1] = -(rbet + an * (an - betp2) * rj[i - 2]) / (anm1 * (an + betp1));
          anm1 = an;
          an = an + 0.1e+01;
        }
        if (integr === 1) {
          goToLabel = 70;break;
        }
        if (integr === 3) {
          goToLabel = 40;break;
        }
        //
        //           compute rg using a forward recurrence relation.
        //
        rg[0] = -ri[0] / alfp1;
        rg[1] = -(ralf + ralf) / (alfp2 * alfp2) - rg[0];
        an = 0.2e+01;
        anm1 = 0.1e+01;
        im1 = 2;
        for (i = 3; i <= 25; i++) {
          rg[i - 1] = -(an * (an - alfp2) * rg[im1 - 1] - an * ri[im1 - 1] + anm1 * ri[i - 1]) / (anm1 * (an + alfp1));
          anm1 = an;
          an = an + 0.1e+01;
          im1 = i;
        }
        if (integr === 2) {
          goToLabel = 70;break;
        }
      //
      //           compute rh using a forward recurrence relation.
      //
      case 40:
        rh[0] = -rj[0] / betp1;
        rh[1] = -(rbet + rbet) / (betp2 * betp2) - rh[0];
        an = 0.2e+01;
        anm1 = 0.1e+01;
        im1 = 2;
        for (i = 3; i <= 25; i++) {
          rh[i - 1] = -(an * (an - betp2) * rh[im1 - 1] - an * rj[im1 - 1] + anm1 * rj[i - 1]) / (anm1 * (an + betp1));
          anm1 = an;
          an = an + 0.1e+01;
          im1 = i;
        }
        for (i = 2; i <= 25; i += 2) {
          rh[i - 1] = -rh[i - 1];
        }
      case 70:
        for (i = 2; i <= 25; i += 2) {
          rj[i - 1] = -rj[i - 1];
        }
      case 90:
      default:
        break mainExecutionLoop;
    }
  }
  return [ri, rj, rg, rh, integr];
}