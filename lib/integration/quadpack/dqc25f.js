Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqc25f = dqc25f;

var _dqwgtf = require('./dqwgtf.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _dqk15w = require('./dqk15w.js');

var _dgtsv = require('./dgtsv.js');

var _dqcheb = require('./dqcheb.js');

function dqc25f(f, a, b, omega, integr, nrmom, maxp1, ksave, result, abserr, neval, resabs, resasc, momcom, chebmo) {
  var ac = void 0,
      an = void 0,
      an2 = void 0,
      as = void 0,
      asap = void 0,
      ass = void 0,
      centr = void 0,
      cheb12 = void 0,
      cheb24 = void 0,
      conc = void 0,
      cons = void 0,
      cospar = void 0,
      d = void 0,
      d1 = void 0,
      d2 = void 0,
      estc = void 0,
      ests = void 0,
      fval = void 0,
      hlgth = void 0,
      oflow = void 0,
      parint = void 0,
      par2 = void 0,
      par22 = void 0,
      p2 = void 0,
      p3 = void 0,
      p4 = void 0,
      resc12 = void 0,
      resc24 = void 0,
      ress12 = void 0,
      ress24 = void 0,
      sinpar = void 0,
      v = void 0,
      x = void 0,
      i = void 0,
      iers = void 0,
      isym = void 0,
      j = void 0,
      k = void 0,
      m = void 0,
      noequ = void 0,
      noeq1 = void 0;

  cheb12 = new Float64Array(13);
  cheb24 = new Float64Array(25);
  d = new Float64Array(25);
  d1 = new Float64Array(25);
  d2 = new Float64Array(225);
  fval = new Float64Array(25);
  v = new Float64Array(28);
  x = new Float64Array(11);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        //
        //           the vector x contains the values Math.cos(k*pMath.trunc(i/24))
        //           k = 1, ...,11, to be used for the chebyshev expansion of f
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
        oflow = (0, _d1mach.d1mach)(2);
        //
        centr = 0.5e+00 * (b + a);
        hlgth = 0.5e+00 * (b - a);
        parint = omega * hlgth;
        //
        //           compute the integral using the 15-point gauss-kronrod
        //           formula if the value of the parameter in the integrand
        //           is small.
        //
        if (Math.abs(parint) > 0.2e+01) {
          goToLabel = 10;break;
        }
        (0, _dqk15w.dqk15w)(f, _dqwgtf.dqwgtf, omega, p2, p3, p4, integr, a, b, result, abserr, resabs, resasc);
        neval = 15;
        goToLabel = 170;break;
      //
      //           compute the integral using the generalized clenshaw-
      //           curtis method.
      //
      case 10:
        conc = hlgth * Math.cos(centr * omega);
        cons = hlgth * Math.sin(centr * omega);
        resasc = oflow;
        neval = 25;
        //
        //           check whether the chebyshev moments for this interval
        //           have already been computed.
        //
        if (nrmom < momcom || ksave === 1) {
          goToLabel = 120;break;
        }
        //
        //           compute a new set of chebyshev moments.
        //
        m = momcom + 1;
        par2 = parint * parint;
        par22 = par2 + 0.2e+01;
        sinpar = Math.sin(parint);
        cospar = Math.cos(parint);
        //
        //           compute the chebyshev moments with respect to cosine.
        //
        v[0] = 0.2e+01 * sinpar / parint;
        v[1] = (0.8e+01 * cospar + (par2 + par2 - 0.8e+01) * sinpar / parint) / par2;
        v[2] = (0.32e+02 * (par2 - 0.12e+02) * cospar + 0.2e+01 * ((par2 - 0.80e+02) * par2 + 0.192e+03) * sinpar / parint) / (par2 * par2);
        ac = 0.8e+01 * cospar;
        as = 0.24e+02 * parint * sinpar;
        if (Math.abs(parint) > 0.24e+02) {
          goToLabel = 30;break;
        }
        //
        //           compute the chebyshev moments as the solutions of a
        //           boundary value problem with 1 initial value (v(3)) and 1
        //           end value (computed using an asymptotic formula).
        //
        noequ = 25;
        noeq1 = noequ - 1;
        an = 0.6e+01;
        for (k = 1; k <= noeq1; k++) {
          an2 = an * an;
          d[k - 1] = -0.2e+01 * (an2 - 0.4e+01) * (par22 - an2 - an2);
          d2[k - 1] = (an - 0.1e+01) * (an - 0.2e+01) * par2;
          d1[k] = (an + 0.3e+01) * (an + 0.4e+01) * par2;
          v[k + 2] = as - (an2 - 0.4e+01) * ac;
          an = an + 0.2e+01;
        }
        an2 = an * an;
        d[noequ - 1] = -0.2e+01 * (an2 - 0.4e+01) * (par22 - an2 - an2);
        v[noequ + 2] = as - (an2 - 0.4e+01) * ac;
        v[3] = v[3] - 0.56e+02 * par2 * v[2];
        ass = parint * sinpar;
        asap = (((((0.210e+03 * par2 - 0.1e+01) * cospar - (0.105e+03 * par2 - 0.63e+02) * ass) / an2 - (0.1e+01 - 0.15e+02 * par2) * cospar + 0.15e+02 * ass) / an2 - cospar + 0.3e+01 * ass) / an2 - cospar) / an2;
        v[noequ + 2] = v[noequ + 2] - 0.2e+01 * asap * par2 * (an - 0.1e+01) * (an - 0.2e+01);
        //
        //           solve the tridiagonal system by means of gaussian
        //           elimination with partial pivoting.
        //
        //* **        to() dgtsl has been replaced by to()
        //* **        lapack routine dgtsv
        //
        //      dgtsl(noequ,d1,d,d2,v(4),iers)
        (0, _dgtsv.dgtsv)(noequ, 1, d1[1], d, d2, v[3], noequ, iers);
        goToLabel = 50;break;
      //
      //           compute the chebyshev moments by means of forward
      //           recursion.
      //
      case 30:
        an = 0.4e+01;
        for (i = 4; i <= 13; i++) {
          an2 = an * an;
          v[i - 1] = ((an2 - 0.4e+01) * (0.2e+01 * (par22 - an2 - an2) * v[i - 2] - ac) + as - par2 * (an + 0.1e+01) * (an + 0.2e+01) * v[i - 3]) / (par2 * (an - 0.1e+01) * (an - 0.2e+01));
          an = an + 0.2e+01;
        }
      case 50:
        for (j = 1; j <= 13; j++) {
          chebmo[m - 1][2 * j - 2] = v[j - 1];
        }

        //
        //           compute the chebyshev moments with respect to sine.
        //
        v[0] = 0.2e+01 * (sinpar - parint * cospar) / par2;
        v[1] = (0.18e+02 - 0.48e+02 / par2) * sinpar / par2 + (-0.2e+01 + 0.48e+02 / par2) * cospar / parint;
        ac = -0.24e+02 * parint * cospar;
        as = -0.8e+01 * sinpar;
        if (Math.abs(parint) > 0.24e+02) {
          goToLabel = 80;break;
        }
        //
        //           compute the chebyshev moments as the solutions of a boundary
        //           value problem with 1 initial value (v(2)) and 1 end value
        //           (computed using an asymptotic formula).
        //
        an = 0.5e+01;
        for (k = 1; k <= noeq1; k++) {
          an2 = an * an;
          d[k - 1] = -0.2e+01 * (an2 - 0.4e+01) * (par22 - an2 - an2);
          d2[k - 1] = (an - 0.1e+01) * (an - 0.2e+01) * par2;
          d1[k] = (an + 0.3e+01) * (an + 0.4e+01) * par2;
          v[k + 1] = ac + (an2 - 0.4e+01) * as;
          an = an + 0.2e+01;
        }
        an2 = an * an;
        d[noequ - 1] = -0.2e+01 * (an2 - 0.4e+01) * (par22 - an2 - an2);
        v[noequ + 1] = ac + (an2 - 0.4e+01) * as;
        v[2] = v[2] - 0.42e+02 * par2 * v[1];
        ass = parint * cospar;
        asap = (((((0.105e+03 * par2 - 0.63e+02) * ass + (0.210e+03 * par2 - 0.1e+01) * sinpar) / an2 + (0.15e+02 * par2 - 0.1e+01) * sinpar - 0.15e+02 * ass) / an2 - 0.3e+01 * ass - sinpar) / an2 - sinpar) / an2;

        v[noequ + 1] = v[noequ + 1] - 0.2e+01 * asap * par2 * (an - 0.1e+01) * (an - 0.2e+01);
        //
        //           solve the tridiagonal system by means of gaussian
        //           elimination with partial pivoting.
        //
        //* **        to() dgtsl has been replaced by to()
        //* **        lapack routine dgtsv
        //
        //      dgtsl(noequ,d1,d,d2,v(3),iers)
        (0, _dgtsv.dgtsv)(noequ, 1, d1[1], d, d2, v[2], noequ, iers);
        goToLabel = 100;break;
      //
      //           compute the chebyshev moments by means of forward recursion.
      //
      case 80:
        an = 0.3e+01;
        for (i = 3; i <= 12; i++) {
          an2 = an * an;
          v[i - 1] = ((an2 - 0.4e+01) * (0.2e+01 * (par22 - an2 - an2) * v[i - 2] + as) + ac - par2 * (an + 0.1e+01) * (an + 0.2e+01) * v[i - 3]) / (par2 * (an - 0.1e+01) * (an - 0.2e+01));
          an = an + 0.2e+01;
        }
      case 100:
        for (j = 1; j <= 12; j++) {
          chebmo[m - 1][2 * j - 1] = v[j - 1];
        }

      case 120:
        if (nrmom < momcom) m = nrmom + 1;
        if (momcom < maxp1 - 1 && nrmom >= momcom) momcom = momcom + 1;
        //
        //           compute the coefficients of the chebyshev expansions
        //           of degrees 12 and 24 of the function f.
        //
        fval[0] = 0.5e+00 * f(centr + hlgth);
        fval[12] = f(centr);
        fval[24] = 0.5e+00 * f(centr - hlgth);
        for (i = 2; i <= 12; i++) {
          isym = 26 - i;
          fval[i - 1] = f(hlgth * x[i - 2] + centr);
          fval[isym - 1] = f(centr - hlgth * x[i - 2]);
        }
        (0, _dqcheb.dqcheb)(x, fval, cheb12, cheb24);
        //
        //           compute the integral and error estimates.
        //
        resc12 = cheb12[12] * chebmo[m - 1][12];
        ress12 = 0.0e+00;
        k = 11;
        for (j = 1; j <= 6; j++) {
          resc12 = resc12 + cheb12[k - 1] * chebmo[m - 1][k - 1];
          ress12 = ress12 + cheb12[k] * chebmo[m - 1][k];
          k = k - 2;
        }
        resc24 = cheb24[24] * chebmo[m - 1][24];
        ress24 = 0.0e+00;
        resabs = Math.abs(cheb24[24]);
        k = 23;
        for (j = 1; j <= 12; j++) {
          resc24 = resc24 + cheb24[k - 1] * chebmo[m - 1][k - 1];
          ress24 = ress24 + cheb24[k] * chebmo[m - 1][k];
          resabs = Math.abs(cheb24[k - 1]) + Math.abs(cheb24[k]);
          k = k - 2;
        }
        estc = Math.abs(resc24 - resc12);
        ests = Math.abs(ress24 - ress12);
        resabs = resabs * Math.abs(hlgth);
        if (integr === 2) {
          goToLabel = 160;break;
        }
        result = conc * resc24 - cons * ress24;
        abserr = Math.abs(conc * estc) + Math.abs(cons * ests);
        goToLabel = 170;break;
      case 160:
        result = conc * ress24 + cons * resc24;
        abserr = Math.abs(conc * ests) + Math.abs(cons * estc);
      case 170:

      default:
        break mainExecutionLoop;
    }
  }
  return [result, abserr, neval, resabs, resasc, momcom, chebmo];
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */