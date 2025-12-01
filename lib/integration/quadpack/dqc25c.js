Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqc25c = dqc25c;

var _dqwgtc = require('./dqwgtc.js');

var _dqk15w = require('./dqk15w.js');

var _dqcheb = require('./dqcheb.js');

function dqc25c(f, a, b, c, result, abserr, krul, neval) {
  var ak22 = void 0,
      amom0 = void 0,
      amom1 = void 0,
      amom2 = void 0,
      cc = void 0,
      centr = void 0,
      cheb12 = void 0,
      cheb24 = void 0,
      fval = void 0,
      hlgth = void 0,
      p2 = void 0,
      p3 = void 0,
      p4 = void 0,
      resabs = void 0,
      resasc = void 0,
      res12 = void 0,
      res24 = void 0,
      u = void 0,
      x = void 0,
      i = void 0,
      isym = void 0,
      k = void 0,
      kp = void 0;

  x = new Float64Array(11);
  fval = new Float64Array(25);
  cheb12 = new Float64Array(13);
  cheb24 = new Float64Array(25);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //           the vector x contains the values Math.cos(k*pMath.trunc(i/24)),
        //           k = 1, ..., 11, to be used for the chebyshev series
        //           expansion of f
        //
        x[0] = 0.991444861373810411144557526928563e0;
        x[1] = 0.965925826289068286749743199728897e0;
        x[2] = 0.923879532511286756128183189396788e0;
        x[3] = 0.866025403784438646763723170752936e0;
        x[4] = 0.793353340291235164579776961501299e0;
        x[5] = 0.707106781186547524400844362104849e0;
        x[6] = 0.608761429008720639416097542898164e0;
        x[7] = 0.500000000000000000000000000000000e0;
        x[8] = 0.382683432365089771728459984030399e0;
        x[9] = 0.258819045102520762348898837624048e0;
        x[10] = 0.130526192220051591548406227895489e0;
        cc = (0.2e+01 * c - b - a) / (b - a);
        if (Math.abs(cc) < 0.11e+01) {
          goToLabel = 10;break;
        }
        //
        //           apply the 15-point gauss-kronrod scheme.
        //
        krul = krul - 1;
        (0, _dqk15w.dqk15w)(f, _dqwgtc.dqwgtc, c, p2, p3, p4, kp, a, b, result, abserr, resabs, resasc);
        neval = 15;
        if (resasc === abserr) krul = krul + 1;
        goToLabel = 50;break;
      //
      //           use the generalized clenshaw-curtis method.
      //
      case 10:
        hlgth = 0.5e+00 * (b - a);
        centr = 0.5e+00 * (b + a);
        neval = 25;
        fval[0] = 0.5e+00 * f(hlgth + centr);
        fval[12] = f(centr);
        fval[24] = 0.5e+00 * f(centr - hlgth);
        for (i = 2; i <= 12; i++) {
          u = hlgth * x[i - 2];
          isym = 26 - i;
          fval[i - 1] = f(u + centr);
          fval[isym - 1] = f(centr - u);
        }
        //
        //           compute the chebyshev series expansion.
        //
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        //
        //           the modified chebyshev moments are computed by forward
        //           recursion, using amom0 and amom1 as starting values.
        //
        amom0 = Math.log(Math.abs((0.1e+01 - cc) / (0.1e+01 + cc)));
        amom1 = 0.2e+01 + cc * amom0;
        res12 = cheb12[0] * amom0 + cheb12[1] * amom1;
        res24 = cheb24[0] * amom0 + cheb24[1] * amom1;
        for (k = 3; k <= 13; k++) {
          amom2 = 0.2e+01 * cc * amom1 - amom0;
          ak22 = (k - 2) * (k - 2);
          if (Math.trunc(k / 2) * 2 === k) amom2 = amom2 - 0.4e+01 / (ak22 - 0.1e+01);
          res12 = res12 + cheb12[k - 1] * amom2;
          res24 = res24 + cheb24[k - 1] * amom2;
          amom0 = amom1;
          amom1 = amom2;
        }
        for (k = 14; k <= 25; k++) {
          amom2 = 0.2e+01 * cc * amom1 - amom0;
          ak22 = (k - 2) * (k - 2);
          if (Math.trunc(k / 2) * 2 === k) amom2 = amom2 - 0.4e+01 / (ak22 - 0.1e+01);
          res24 = res24 + cheb24[k - 1] * amom2;
          amom0 = amom1;
          amom1 = amom2;
        }
        result = res24;
        abserr = Math.abs(res24 - res12);
      case 50:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, krul, neval];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */