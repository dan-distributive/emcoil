Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// **BEGIN PROLOGUE  ZBIRY
// **DATE WRITTEN   830501   (YYMMDD)
// **REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// **CATEGORY NO.  B5K
// **KEYWORDS  AIRY FUNCTION, BESSEL FUNCTIONS OF ORDER ONE THIRD
// **AUTHOR (FORTRAN)  AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// **AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// **PURPOSE  TO COMPUTE AIRY FUNCTIONS BI(Z) AND DBI(Z) FOR COMPLEX Z
// **DESCRIPTION
//
//                      ***A DOUBLE PRECISION ROUTINE***
//         ON KODE=1, CBIRY COMPUTES THE COMPLEX AIRY FUNCTION BI(Z) OR
//         ITS DERIVATIVE DBI(Z)/DZ ON ID=0 OR ID=1 RESPECTIVELY. ON
//         KODE=2, A SCALING OPTION CEXP(-AXZTA)*BI(Z) OR CEXP(-AXZTA)*
//         DBI(Z)/DZ IS PROVIDED TO REMOVE THE EXPONENTIAL BEHAVIOR IN
//         BOTH THE LEFT AND RIGHT HALF PLANES WHERE
//         ZTA=(MATH.TRUNC(2/3))*Z*CSQRT(Z)=CMPLX(XZTA,YZTA) AND AXZTA=MATH.ABS(XZTA).
//         DEFINITIONS AND NOTATION ARE FOUND IN THE NBS HANDBOOK OF
//         MATHEMATICAL FUNCTIONS (REF. 1).
//
//         INPUT      ZR,ZI ARE DOUBLE PRECISION
//           ZR,ZI  - Z=CMPLX(ZR,ZI)
//           ID     - ORDER OF DERIVATIVE, ID=0 OR ID=1
//           KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                    KODE= 1  RETURNS
//                             BI=BI(Z)                 ON ID=0 OR
//                             BI=DBI(Z)/DZ             ON ID=1
//                        = 2  RETURNS
//                             BI=CEXP(-AXZTA)*BI(Z)     ON ID=0 OR
//                             BI=CEXP(-AXZTA)*DBI(Z)/DZ ON ID=1 WHERE
//                             ZTA=(MATH.TRUNC(2/3))*Z*CSQRT(Z)=CMPLX(XZTA,YZTA)
//                             AND AXZTA=MATH.ABS(XZTA)
//
//         OUTPUT     BIR,BII ARE DOUBLE PRECISION
//           BIR,BII- COMPLEX ANSWER DEPENDING ON THE CHOICES FOR ID AND
//                    KODE
//           IERR   - ERROR FLAG
//                    IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                    IERR=1, INPUT ERROR   - NO COMPUTATION
//                    IERR=2, OVERFLOW      - NO COMPUTATION, REAL(Z)
//                            TOO LARGE ON KODE=1
//                    IERR=3, CABS(Z) LARGE      - COMPUTATION COMPLETED
//                            LOSSES OF SIGNIFCANCE BY ARGUMENT REDUCTION
//                            PRODUCE LESS THAN HALF OF MACHINE ACCURACY
//                    IERR=4, CABS(Z) TOO LARGE  - NO COMPUTATION
//                            COMPLETE LOSS OF ACCURACY BY ARGUMENT
//                            REDUCTION
//                    IERR=5, ERROR              - NO COMPUTATION,
//                            ALGORITHM TERMINATION CONDITION NOT MET
//
// **LONG DESCRIPTION
//
//         BI AND DBI ARE COMPUTED FOR CABS(Z) > 1.0 FROM THE I BESSEL
//         FUNCTIONS BY
//
//                BI(Z)=C*MATH.SQRT(Z)*( I(-MATH.TRUNC(1/3),ZTA) + I(MATH.TRUNC(1/3),ZTA) )
//               DBI(Z)=C *  Z  * ( I(-MATH.TRUNC(2/3),ZTA) + I(MATH.TRUNC(2/3),ZTA) )
//                               C=1.0/MATH.SQRT(3.0)
//                             ZTA=(MATH.TRUNC(2/3))*Z**(MATH.TRUNC(3/2))
//
//         WITH THE POWER SERIES FOR CABS(Z) <= 1.0.
//
//         IN MOST COMPLEX VARIABLE COMPUTATION, ONE MUST EVALUATE ELE-
//         MENTARY FUNCTIONS. WHEN THE MAGNITUDE OF Z IS LARGE, LOSSES
//         OF SIGNIFICANCE BY ARGUMENT REDUCTION OCCUR. CONSEQUENTLY, IF
//         THE MAGNITUDE OF ZETA=(MATH.TRUNC(2/3))*Z**1.5 EXCEEDS U1=MATH.SQRT(0.5/UR),
//         { LOSSES EXCEEDING HALF PRECISION ARE LIKELY AND AN ERROR
//         FLAG IERR=3 IS TRIGGERED WHERE UR=MATH.MAX(D1MACH(4),1.0E-18) IS
//         DOUBLE PRECISION UNIT ROUNDOFF LIMITED TO 18 DIGITS PRECISION.
//         ALSO, IF THE MAGNITUDE OF ZETA IS LARGER THAN U2=0.5/UR, {
//         ALL SIGNIFICANCE IS LOST AND IERR=4. IN ORDER TO USE THE INT
//         FUNCTION, ZETA MUST BE FURTHER RESTRICTED NOT TO EXCEED THE
//         LARGEST INTEGER, U3=I1MACH(9). THUS, THE MAGNITUDE OF ZETA
//         MUST BE RESTRICTED BY MATH.MIN(U2,U3). ON 32 BIT MACHINES, U1,U2,
//         AND U3 ARE APPROXIMATELY 2.0E+3, 4.2E+6, 2.1E+9 IN SINGLE
//         PRECISION ARITHMETIC AND 1.3E+8, 1.8E+16, 2.1E+9 IN DOUBLE
//         PRECISION ARITHMETIC RESPECTIVELY. THIS MAKES U2 AND U3 LIMIT-
//         ING IN THEIR RESPECTIVE ARITHMETICS. THIS MEANS THAT THE MAG-
//         NITUDE OF Z CANNOT EXCEED 3.1E+4 IN SINGLE AND 2.1E+6 IN
//         DOUBLE PRECISION ARITHMETIC. THIS ALSO MEANS THAT ONE CAN
//         EXPECT TO RETAIN, IN THE WORST CASES ON 32 BIT MACHINES,
//         NO DIGITS IN SINGLE PRECISION AND ONLY 7 DIGITS IN DOUBLE
//         PRECISION ARITHMETIC. SIMILAR CONSIDERATIONS HOLD FOR OTHER
//         MACHINES.
//
//         THE APPROXIMATE RELATIVE ERROR IN THE MAGNITUDE OF A COMPLEX
//         BESSEL FUNCTION CAN BE EXPRESSED BY P*10**S WHERE P=MATH.MAX(UNIT
//         ROUNDOFF,1.0E-18) IS THE NOMINAL PRECISION AND 10**S REPRE-
//         SENTS THE INCREASE IN ERROR DUE TO ARGUMENT REDUCTION IN THE
//         ELEMENTARY FUNCTIONS. HERE, S=MATH.MAX(1,MATH.ABS(MATH.LOG10(CABS(Z))),
//         MATH.ABS(MATH.LOG10(FNU))) APPROXIMATELY (I.E. S=MATH.MAX(1,MATH.ABS(EXPONENT OF
//         CABS(Z),ABS(EXPONENT OF FNU))) ). HOWEVER, THE PHASE ANGLE MAY
//         HAVE ONLY ABSOLUTE ACCURACY. THIS IS MOST LIKELY TO OCCUR WHEN
//         ONE COMPONENT (IN ABSOLUTE VALUE) IS LARGER THAN THE OTHER BY
//         SEVERAL ORDERS OF MAGNITUDE. IF ONE COMPONENT IS 10**K LARGER
//         THAN THE OTHER, { ONE CAN EXPECT ONLY MATH.MAX(MATH.ABS(MATH.LOG10(P))-K,
//         0) SIGNIFICANT DIGITS; OR, STATED ANOTHER WAY, WHEN K EXCEEDS
//         THE EXPONENT OF P, NO SIGNIFICANT DIGITS REMAIN IN THE SMALLER
//         COMPONENT. HOWEVER, THE PHASE ANGLE RETAINS ABSOLUTE ACCURACY
//         BECAUSE, IN COMPLEX ARITHMETIC WITH PRECISION P, THE SMALLER
//         COMPONENT WILL NOT (AS A RULE) DECREASE BELOW P TIMES THE
//         MAGNITUDE OF THE LARGER COMPONENT. IN THESE EXTREME CASES,
//         THE PRINCIPAL PHASE ANGLE IS ON THE ORDER OF +P, -P, PI/2-P,
//         OR -PI/2+P.
//
// **REFERENCES  HANDBOOK OF MATHEMATICAL FUNCTIONS BY M. ABRAMOWITZ
//                 AND I. A. STEGUN, NBS AMS SERIES 55, U.S. DEPT. OF
//                 COMMERCE, 1955.
//
//               COMPUTATION OF BESSEL FUNCTIONS OF COMPLEX ARGUMENT
//                 AND LARGE ORDER BY D. E. AMOS, SAND83-0643, MAY, 1983
//
//               A SUBROUTINE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                 ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, SAND85-
//                 1018, MAY, 1985
//
//               A PORTABLE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                 ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, TRANS.
//                 MATH. SOFTWARE, 1986
//
// **ROUTINES ED()  ZBINU,AZABS,ZDIV,AZSQRT,D1MACH,I1MACH
// **END PROLOGUE  ZBIRY
//     COMPLEX BI,CONE,CSQ,CY,S1,S2,TRM1,TRM2,Z,ZTA,Z3


exports.zbiry = zbiry;

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _zbinu = require('./zbinu.js');

var _zdiv3 = require('./zdiv.js');

var _zsqrt = require('./zsqrt.js');

var _zabs = require('./zabs.js');

function zbiry(zr, zi, id, kode) {
  var aa = void 0,
      ad = void 0,
      ak = void 0,
      alim = void 0,
      atrm = void 0,
      az = void 0,
      az3 = void 0,
      bb = void 0,
      bk = void 0,
      bii = void 0,
      bir = void 0,
      cc = void 0,
      ck = void 0,
      coef = void 0,
      conei = void 0,
      coner = void 0,
      csqi = void 0,
      csqr = void 0,
      cyi = void 0,
      cyr = void 0,
      c1 = void 0,
      c2 = void 0,
      dig = void 0,
      dk = void 0,
      d1 = void 0,
      d2 = void 0,
      eaa = void 0,
      elim = void 0,
      fid = void 0,
      fmr = void 0,
      fnu = void 0,
      fnul = void 0,
      pi = void 0,
      rl = void 0,
      r1m5 = void 0,
      sfac = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      tol = void 0,
      trm1i = void 0,
      trm1r = void 0,
      trm2i = void 0,
      trm2r = void 0,
      tth = void 0,
      ztai = void 0,
      ztar = void 0,
      z3i = void 0,
      z3r = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      nz = void 0,
      ierr = void 0;

  cyr = new Float64Array(2);
  cyi = new Float64Array(2);
  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        tth = 6.66666666666666667e-01;
        c1 = 6.14926627446000736e-01;
        c2 = 4.48288357353826359e-01;
        coef = 5.77350269189625765e-01;
        pi = 3.14159265358979324e+00;

        //* **first executable statement  zbiry
        coner = 1.0e0;
        conei = 0.0e0;
        ierr = 0;
        nz = 0;
        if (id < 0 || id > 1) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (ierr !== 0) return;
        az = (0, _zabs.azabs)(zr, zi);
        tol = Math.max((0, _d1mach.d1mach)(4), 1.0e-18);
        fid = id;
        if (az > 1.0e0) {
          goToLabel = 70;break;
        }
        // -----------------------------------------------------------------------
        //     power series for cabs(z) <= 1.
        // -----------------------------------------------------------------------
        s1r = coner;
        s1i = conei;
        s2r = coner;
        s2i = conei;
        if (az < tol) {
          goToLabel = 130;break;
        }
        aa = az * az;
        if (aa < tol / az) {
          goToLabel = 40;break;
        }
        trm1r = coner;
        trm1i = conei;
        trm2r = coner;
        trm2i = conei;
        atrm = 1.0e0;
        str = zr * zr - zi * zi;
        sti = zr * zi + zi * zr;
        z3r = str * zr - sti * zi;
        z3i = str * zi + sti * zr;
        az3 = az * aa;
        ak = 2.0e0 + fid;
        bk = 3.0e0 - fid - fid;
        ck = 4.0e0 - fid;
        dk = 3.0e0 + fid + fid;
        d1 = ak * dk;
        d2 = bk * ck;
        ad = Math.min(d1, d2);
        ak = 24.0e0 + 9.0e0 * fid;
        bk = 30.0e0 - 9.0e0 * fid;
        for (k = 1; k <= 25; k++) {
          str = (trm1r * z3r - trm1i * z3i) / d1;
          trm1i = (trm1r * z3i + trm1i * z3r) / d1;
          trm1r = str;
          s1r = s1r + trm1r;
          s1i = s1i + trm1i;
          str = (trm2r * z3r - trm2i * z3i) / d2;
          trm2i = (trm2r * z3i + trm2i * z3r) / d2;
          trm2r = str;
          s2r = s2r + trm2r;
          s2i = s2i + trm2i;
          atrm = atrm * az3 / ad;
          d1 = d1 + ak;
          d2 = d2 + bk;
          ad = Math.min(d1, d2);
          if (atrm < tol * ad) break;
          ak = ak + 18.0e0;
          bk = bk + 18.0e0;
        }
      case 40:

        if (id === 1) {
          goToLabel = 50;break;
        }
        bir = c1 * s1r + c2 * (zr * s2r - zi * s2i);
        bii = c1 * s1i + c2 * (zr * s2i + zi * s2r);
        if (kode === 1) break mainExecutionLoop;

        var _azsqrt = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt2 = _slicedToArray(_azsqrt, 2);

        str = _azsqrt2[0];
        sti = _azsqrt2[1];

        ztar = tth * (zr * str - zi * sti);
        ztai = tth * (zr * sti + zi * str);
        aa = ztar;
        aa = -Math.abs(aa);
        eaa = Math.exp(aa);
        bir = bir * eaa;
        bii = bii * eaa;
        return;
      case 50:

        bir = s2r * c2;
        bii = s2i * c2;
        if (az <= tol) {
          goToLabel = 60;break;
        }
        cc = c1 / (1.0e0 + fid);
        str = s1r * zr - s1i * zi;
        sti = s1r * zi + s1i * zr;
        bir = bir + cc * (str * zr - sti * zi);
        bii = bii + cc * (str * zi + sti * zr);
      case 60:

        if (kode === 1) return;

        var _azsqrt3 = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt4 = _slicedToArray(_azsqrt3, 2);

        str = _azsqrt4[0];
        sti = _azsqrt4[1];

        ztar = tth * (zr * str - zi * sti);
        ztai = tth * (zr * sti + zi * str);
        aa = ztar;
        aa = -Math.abs(aa);
        eaa = Math.exp(aa);
        bir = bir * eaa;
        bii = bii * eaa;
        return;
      // -----------------------------------------------------------------------
      //     case for cabs(z) > 1.0
      // -----------------------------------------------------------------------
      case 70:

        fnu = (1.0e0 + fid) / 3.0e0;
        // -----------------------------------------------------------------------
        //     set parameters related to machine constants.
        //     tol is the approximate unit roundoff limited to 1.0e-18.
        //     elim is the approximate exponential over- and underflow limit.
        //     Math.exp(-elim) < Math.exp(-alim)=Math.exp(-elim)/tol    and
        //     Math.exp(elim) > Math.exp(alim)=Math.exp(elim)*tol       are intervals near
        //     underflow and overflow limits where scaled arithmetic is done.
        //     rl is the lower boundary of the asymptotic expansion for large z.
        //     dig = number of base 10 digits in tol = 10**(-dig).
        //     fnul is the lower boundary of the asymptotic series for large fnu.
        // -----------------------------------------------------------------------
        k1 = (0, _i1mach.i1mach)(15);
        k2 = (0, _i1mach.i1mach)(16);
        r1m5 = (0, _d1mach.d1mach)(5);
        k = Math.min(Math.abs(k1), Math.abs(k2));
        elim = 2.303e0 * (k * r1m5 - 3.0e0);
        k1 = (0, _i1mach.i1mach)(14) - 1;
        aa = r1m5 * k1;
        dig = Math.min(aa, 18.0e0);
        aa = aa * 2.303e0;
        alim = elim + Math.max(-aa, -41.45e0);
        rl = 1.2e0 * dig + 3.0e0;
        fnul = 10.0e0 + 6.0e0 * (dig - 3.0e0);
        // -----------------------------------------------------------------------
        //     test for range
        // -----------------------------------------------------------------------
        aa = 0.5e0 / tol;
        bb = (0, _i1mach.i1mach)(9) * 0.5e0;
        aa = Math.min(aa, bb);
        aa = aa ** tth;
        if (az > aa) {
          goToLabel = 260;break;
        }
        aa = Math.sqrt(aa);
        if (az > aa) ierr = 3;

        var _azsqrt5 = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt6 = _slicedToArray(_azsqrt5, 2);

        csqr = _azsqrt6[0];
        csqi = _azsqrt6[1];

        ztar = tth * (zr * csqr - zi * csqi);
        ztai = tth * (zr * csqi + zi * csqr);
        // -----------------------------------------------------------------------
        //     re(zta) <= 0 when re(z) < 0, especially when im(z) is small
        // -----------------------------------------------------------------------
        sfac = 1.0e0;
        ak = ztai;
        if (zr >= 0.0e0) {
          goToLabel = 80;break;
        }
        bk = ztar;
        ck = -Math.abs(bk);
        ztar = ck;
        ztai = ak;
      case 80:

        if (zi !== 0.0e0 || zr > 0.0e0) {
          goToLabel = 90;break;
        }
        ztar = 0.0e0;
        ztai = ak;
      case 90:

        aa = ztar;
        if (kode === 2) {
          goToLabel = 100;break;
        }
        // -----------------------------------------------------------------------
        //     overflow test
        // -----------------------------------------------------------------------
        bb = Math.abs(aa);
        if (bb < alim) {
          goToLabel = 100;break;
        }
        bb = bb + 0.25e0 * Math.log(az);
        sfac = tol;
        if (bb > elim) {
          goToLabel = 190;break;
        }
      case 100:

        fmr = 0.0e0;
        if (aa >= 0.0e0 && zr > 0.0e0) {
          goToLabel = 110;break;
        }
        fmr = pi;
        if (zi < 0.0e0) fmr = -pi;
        ztar = -ztar;
        ztai = -ztai;
      case 110:

        // -----------------------------------------------------------------------
        //     aa=factor for analytic continuation of i(fnu,zta)
        //     kode=2 returns Math.exp(-Math.abs(xzta))*i(fnu,zta) from cbesi
        // -----------------------------------------------------------------------
        nz = (0, _zbinu.zbinu)(ztar, ztai, fnu, kode, 1, cyr, cyi, rl, fnul, tol, elim, alim);
        if (nz < 0) {
          goToLabel = 200;break;
        }
        aa = fmr * fnu;
        z3r = sfac;
        str = Math.cos(aa);
        sti = Math.sin(aa);
        s1r = (str * cyr[0] - sti * cyi[0]) * z3r;
        s1i = (str * cyi[0] + sti * cyr[0]) * z3r;
        fnu = (2.0e0 - fid) / 3.0e0;
        nz = (0, _zbinu.zbinu)(ztar, ztai, fnu, kode, 2, cyr, cyi, rl, fnul, tol, elim, alim);
        cyr[0] = cyr[0] * z3r;
        cyi[0] = cyi[0] * z3r;
        cyr[1] = cyr[1] * z3r;
        cyi[1] = cyi[1] * z3r;
        // -----------------------------------------------------------------------
        //     backward recur one step for orders -Math.trunc(1/3) or -Math.trunc(2/3)
        // -----------------------------------------------------------------------

        var _zdiv = (0, _zdiv3.zdiv)(cyr[0], cyi[0], ztar, ztai);

        var _zdiv2 = _slicedToArray(_zdiv, 2);

        str = _zdiv2[0];
        sti = _zdiv2[1];

        s2r = (fnu + fnu) * str + cyr[1];
        s2i = (fnu + fnu) * sti + cyi[1];
        aa = fmr * (fnu - 1.0e0);
        str = Math.cos(aa);
        sti = Math.sin(aa);
        s1r = coef * (s1r + s2r * str - s2i * sti);
        s1i = coef * (s1i + s2r * sti + s2i * str);
        if (id === 1) {
          goToLabel = 120;break;
        }
        str = csqr * s1r - csqi * s1i;
        s1i = csqr * s1i + csqi * s1r;
        s1r = str;
        bir = s1r / sfac;
        bii = s1i / sfac;
        break mainExecutionLoop;
      case 120:

        str = zr * s1r - zi * s1i;
        s1i = zr * s1i + zi * s1r;
        s1r = str;
        bir = s1r / sfac;
        bii = s1i / sfac;
        break mainExecutionLoop;
      case 130:
        aa = c1 * (1.0e0 - fid) + fid * c2;
        bir = aa;
        bii = 0.0e0;
        break mainExecutionLoop;
      case 190:

        ierr = 2;
        nz = 0;
        break mainExecutionLoop;
      case 200:

        if (nz === -1) {
          goToLabel = 190;break;
        }
        nz = 0;
        ierr = 5;
        break mainExecutionLoop;
      case 260:

        ierr = 4;
        nz = 0;

      default:
        break mainExecutionLoop;
    }
  }
  return [bir, bii, nz, ierr];
}