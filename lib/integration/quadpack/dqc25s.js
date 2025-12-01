Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqc25s = dqc25s;

var _dqwgts = require('./dqwgts.js');

var _dqk15w = require('./dqk15w.js');

var _dqcheb = require('./dqcheb.js');

function dqc25s(f, a, b, bl, br, alfa, beta, ri, rj, rg, rh, result, abserr, resasc, integr, nev) {
  var centr = void 0,
      cheb12 = void 0,
      cheb24 = void 0,
      dc = void 0,
      factor = void 0,
      fix = void 0,
      fval = void 0,
      hlgth = void 0,
      resabs = void 0,
      res12 = void 0,
      res24 = void 0,
      u = void 0,
      x = void 0,
      i = void 0,
      isym = void 0;

  cheb12 = new Float64Array(13);
  cheb24 = new Float64Array(25);
  fval = new Float64Array(25);
  x = new Float64Array(11);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //           the vector x contains the values Math.cos(k*pMath.trunc(i/24))
        //           k = 1, ..., 11, to be used for the computation of the
        //           chebyshev series expansion of f.
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
        nev = 25;
        if (bl === a && (alfa !== 0.0e+00 || integr === 2 || integr === 4)) {
          goToLabel = 10;break;
        }
        if (br === b && (beta !== 0.0e+00 || integr === 3 || integr === 4)) {
          goToLabel = 140;break;
        }
        //
        //           if a > bl and b < br, apply the 15-point gauss-kronrod
        //           scheme.
        //
        //
        (0, _dqk15w.dqk15w)(f, _dqwgts.dqwgts, a, b, alfa, beta, integr, bl, br, result, abserr, resabs, resasc);
        nev = 15;
        goToLabel = 270;break;
      //
      //           this part of the program is executed only if a = bl.
      //           ----------------------------------------------------
      //
      //           compute the chebyshev series expansion of the
      //           following function
      //           f1 = (0.5*(b+b-br-a)-0.5*(br-a)*x)**beta
      //                  *f(0.5*(br-a)*x+0.5*(br+a))
      //
      case 10:
        hlgth = 0.5e+00 * (br - bl);
        centr = 0.5e+00 * (br + bl);
        fix = b - centr;
        fval[0] = 0.5e+00 * f(hlgth + centr) * (fix - hlgth) ** beta;
        fval[12] = f(centr) * fix ** beta;
        fval[24] = 0.5e+00 * f(centr - hlgth) * (fix + hlgth) ** beta;
        for (i = 2; i <= 12; i++) {
          u = hlgth * x[i - 2];
          isym = 26 - i;
          fval[i - 1] = f(u + centr) * (fix - u) ** beta;
          fval[isym - 1] = f(centr - u) * (fix + u) ** beta;
        }
        factor = hlgth ** (alfa + 0.1e+01);
        result = 0.0e+00;
        abserr = 0.0e+00;
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        if (integr > 2) {
          goToLabel = 70;break;
        }
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        //
        //           integr = 1  (or 2)
        //
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * ri[i - 1];
          res24 = res24 + cheb24[i - 1] * ri[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * ri[i - 1];
        }
        if (integr === 1) {
          goToLabel = 130;break;
        }
        //
        //           integr = 2
        //
        dc = Math.log(br - bl);
        result = res24 * dc;
        abserr = Math.abs((res24 - res12) * dc);
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rg[i - 1];
          res24 = res12 + cheb24[i - 1] * rg[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rg[i - 1];
        }
        goToLabel = 130;break;
      //
      //           compute the chebyshev series expansion of the
      //           following function
      //           f4 = f1*Math.log(0.5*(b+b-br-a)-0.5*(br-a)*x)
      //
      case 70:
        fval[0] = fval[0] * Math.log(fix - hlgth);
        fval[12] = fval[12] * Math.log(fix);
        fval[24] = fval[24] * Math.log(fix + hlgth);
        for (i = 2; i <= 12; i++) {
          u = hlgth * x[i - 2];
          isym = 26 - i;
          fval[i - 1] = fval[i - 1] * Math.log(fix - u);
          fval[isym - 1] = fval[isym - 1] * Math.log(fix + u);
        }
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        //
        //           integr = 3  (or 4)
        //
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * ri[i - 1];
          res24 = res24 + cheb24[i - 1] * ri[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * ri[i - 1];
        }
        if (integr === 3) {
          goToLabel = 130;break;
        }
        //
        //           integr = 4
        //
        dc = Math.log(br - bl);
        result = res24 * dc;
        abserr = Math.abs((res24 - res12) * dc);
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rg[i - 1];
          res24 = res24 + cheb24[i - 1] * rg[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rg[i - 1];
        }
      case 130:
        result = (result + res24) * factor;
        abserr = (abserr + Math.abs(res24 - res12)) * factor;
        goToLabel = 270;break;
      //
      //           this part of the program is executed only if b = br.
      //           ----------------------------------------------------
      //
      //           compute the chebyshev series expansion of the
      //           following function
      //           f2 = (0.5*(b+bl-a-a)+0.5*(b-bl)*x)**alfa
      //                *f(0.5*(b-bl)*x+0.5*(b+bl))
      //
      case 140:
        hlgth = 0.5e+00 * (br - bl);
        centr = 0.5e+00 * (br + bl);
        fix = centr - a;
        fval[0] = 0.5e+00 * f(hlgth + centr) * (fix + hlgth) ** alfa;
        fval[12] = f(centr) * fix ** alfa;
        fval[24] = 0.5e+00 * f(centr - hlgth) * (fix - hlgth) ** alfa;
        for (i = 2; i <= 12; i++) {
          u = hlgth * x[i - 2];
          isym = 26 - i;
          fval[i - 1] = f(u + centr) * (fix + u) ** alfa;
          fval[isym - 1] = f(centr - u) * (fix - u) ** alfa;
        }
        factor = hlgth ** (beta + 0.1e+01);
        result = 0.0e+00;
        abserr = 0.0e+00;
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        if (integr === 2 || integr === 4) {
          goToLabel = 200;break;
        }
        //
        //           integr = 1  (or 3)
        //
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rj[i - 1];
          res24 = res24 + cheb24[i - 1] * rj[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rj[i - 1];
        }
        if (integr === 1) {
          goToLabel = 260;break;
        }
        //
        //           integr = 3
        //
        dc = Math.log(br - bl);
        result = res24 * dc;
        abserr = Math.abs((res24 - res12) * dc);
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rh[i - 1];
          res24 = res24 + cheb24[i - 1] * rh[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rh[i - 1];
        }
        goToLabel = 260;break;
      //
      //           compute the chebyshev series expansion of the
      //           following function
      //           f3 = f2*Math.log(0.5*(b-bl)*x+0.5*(b+bl-a-a))
      //
      case 200:
        fval[0] = fval[0] * Math.log(hlgth + fix);
        fval[12] = fval[12] * Math.log(fix);
        fval[24] = fval[24] * Math.log(fix - hlgth);
        for (i = 2; i <= 12; i++) {
          u = hlgth * x[i - 2];
          isym = 26 - i;
          fval[i - 1] = fval[i - 1] * Math.log(u + fix);
          fval[isym - 1] = fval[isym - 1] * Math.log(fix - u);
        }
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        //
        //           integr = 2  (or 4)
        //
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rj[i - 1];
          res24 = res24 + cheb24[i - 1] * rj[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rj[i - 1];
        }
        if (integr === 2) {
          goToLabel = 260;break;
        }
        dc = Math.log(br - bl);
        result = res24 * dc;
        abserr = Math.abs((res24 - res12) * dc);
        res12 = 0.0e+00;
        res24 = 0.0e+00;
        //
        //           integr = 4
        //
        for (i = 1; i <= 13; i++) {
          res12 = res12 + cheb12[i - 1] * rh[i - 1];
          res24 = res24 + cheb24[i - 1] * rh[i - 1];
        }
        for (i = 14; i <= 25; i++) {
          res24 = res24 + cheb24[i - 1] * rh[i - 1];
        }
      case 260:
        result = (result + res24) * factor;
        abserr = (abserr + Math.abs(res24 - res12)) * factor;
      case 270:
      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, resasc, integr, nev];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */