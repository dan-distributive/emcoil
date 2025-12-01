Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zbesh = zbesh;

var _fortranHelpers = require('../../utils/fortranHelpers.js');

var fortranHelpers = _interopRequireWildcard(_fortranHelpers);

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _zuoik = require('./zuoik.js');

var _zbknu = require('./zbknu.js');

var _zacon = require('./zacon.js');

var _zbunk = require('./zbunk.js');

var _zabs = require('./zabs.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// **BEGIN PROLOGUE  ZBESH
// **DATE WRITTEN   830501   (YYMMDD)
// **REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// **CATEGORY NO.  B5K
// **KEYWORDS  H-BESSEL FUNCTIONS,BESSEL FUNCTIONS OF COMPLEX ARGUMENT,
//            BESSEL FUNCTIONS OF THIRD KIND,HANKEL FUNCTIONS
// **AUTHOR (FORTRAN) AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// **AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// **PURPOSE  TO COMPUTE THE H-BESSEL FUNCTIONS OF A COMPLEX ARGUMENT
// **DESCRIPTION
//
//                      ***A DOUBLE PRECISION ROUTINE***
//         ON KODE=1, ZBESH COMPUTES AN N MEMBER SEQUENCE OF COMPLEX
//         HANKEL (BESSEL) FUNCTIONS CY(J)=H(M,FNU+J-1,Z) FOR KINDS M=1
//         OR 2, REAL, NONNEGATIVE ORDERS FNU+J-1, J=1,...,N, AND COMPLEX
//         Z !== CMPLX(0.0,0.0) IN THE CUT PLANE -PI < ARG(Z) <= PI.
//         ON KODE=2, ZBESH RETURNS THE SCALED HANKEL FUNCTIONS
//
//         CY(I)=MATH.EXP(-MM*Z*I)*H(M,FNU+J-1,Z)       MM=3-2*M,   I**2=-1.
//
//         WHICH REMOVES THE EXPONENTIAL BEHAVIOR IN BOTH THE UPPER AND
//         LOWER HALF PLANES. DEFINITIONS AND NOTATION ARE FOUND IN THE
//         NBS HANDBOOK OF MATHEMATICAL FUNCTIONS (REF. 1).
//
//         INPUT      ZR,ZI,FNU ARE DOUBLE PRECISION
//           ZR,ZI  - Z=CMPLX(ZR,ZI), Z !== CMPLX(0.0E0,0.0E0),
//                    -PT < ARG(Z) <= PI
//           FNU    - ORDER OF INITIAL H FUNCTION, FNU >= 0.0E0
//           KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                    KODE= 1  RETURNS
//                             CY(J)=H(M,FNU+J-1,Z),   J=1,...,N
//                        = 2  RETURNS
//                             CY(J)=H(M,FNU+J-1,Z)*MATH.EXP(-I*Z*(3-2M))
//                                  J=1,...,N  ,  I**2=-1
//           M      - KIND OF HANKEL FUNCTION, M=1 OR 2
//           N      - NUMBER OF MEMBERS IN THE SEQUENCE, N >= 1
//
//         OUTPUT     CYR,CYI ARE DOUBLE PRECISION
//           CYR,CYI- DOUBLE PRECISION VECTORS WHOSE FIRST N COMPONENTS
//                    CONTAIN REAL AND IMAGINARY PARTS FOR THE SEQUENCE
//                    CY(J)=H(M,FNU+J-1,Z)  OR
//                    CY(J)=H(M,FNU+J-1,Z)*MATH.EXP(-I*Z*(3-2M))  J=1,...,N
//                    DEPENDING ON KODE, I**2=-1.
//           NZ     - NUMBER OF COMPONENTS SET TO ZERO DUE TO UNDERFLOW,
//                    NZ= 0   , NORMAL RETURN
//                    NZ > 0 , FIRST NZ COMPONENTS OF CY SET TO ZERO DUE
//                              TO UNDERFLOW, CY(J)=CMPLX(0.0E0,0.0E0)
//                              J=1,...,NZ WHEN Y > 0.0 AND M=1 OR
//                              Y < 0.0 AND M=2. FOR THE COMPLMENTARY
//                              HALF PLANES, NZ STATES ONLY THE NUMBER
//                              OF UNDERFLOWS.
//           IERR   - ERROR FLAG
//                    IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                    IERR=1, INPUT ERROR   - NO COMPUTATION
//                    IERR=2, OVERFLOW      - NO COMPUTATION, FNU TOO
//                            LARGE OR CABS(Z) TOO SMALL OR BOTH
//                    IERR=3, CABS(Z) OR FNU+N-1 LARGE - COMPUTATION DONE
//                            BUT LOSSES OF SIGNIFCANCE BY ARGUMENT
//                            REDUCTION PRODUCE LESS THAN HALF OF MACHINE
//                            ACCURACY
//                    IERR=4, CABS(Z) OR FNU+N-1 TOO LARGE - NO COMPUTA-
//                            TION BECAUSE OF COMPLETE LOSSES OF SIGNIFI-
//                            CANCE BY ARGUMENT REDUCTION
//                    IERR=5, ERROR              - NO COMPUTATION,
//                            ALGORITHM TERMINATION CONDITION NOT MET
//
// **LONG DESCRIPTION
//
//         THE COMPUTATION IS CARRIED OUT BY THE RELATION
//
//         H(M,FNU,Z)=(MATH.TRUNC(1/M)P)*MATH.EXP(-MP*FNU)*K(FNU,Z*MATH.EXP(-MP))
//             MP=MM*HPI*I,  MM=3-2*M,  HPI=PMATH.TRUNC(I/2),  I**2=-1
//
//         FOR M=1 OR 2 WHERE THE K BESSEL FUNCTION IS COMPUTED FOR THE
//         RIGHT HALF PLANE RE(Z) >= 0.0. THE K FUNCTION IS CONTINUED
//         TO THE LEFT HALF PLANE BY THE RELATION
//
//         K(FNU,Z*MATH.EXP(MP)) = MATH.EXP(-MP*FNU)*K(FNU,Z)-MP*I(FNU,Z)
//         MP=MR*PI*I, MR=+1 OR -1, RE(Z) > 0, I**2=-1
//
//         WHERE I(FNU,Z) IS THE I BESSEL FUNCTION.
//
//         EXPONENTIAL DECAY OF H(M,FNU,Z) OCCURS IN THE UPPER HALF Z
//         PLANE FOR M=1 AND THE LOWER HALF Z PLANE FOR M=2.  EXPONENTIAL
//         GROWTH OCCURS IN THE COMPLEMENTARY HALF PLANES.  SCALING
//         BY MATH.EXP(-MM*Z*I) REMOVES THE EXPONENTIAL BEHAVIOR IN THE
//         WHOLE Z PLANE FOR Z TO INFINITY.
//
//         FOR NEGATIVE ORDERS,THE FORMULAE
//
//               H(1,-FNU,Z) = H(1,FNU,Z)*CEXP( PI*FNU*I)
//               H(2,-FNU,Z) = H(2,FNU,Z)*CEXP(-PI*FNU*I)
//                         I**2=-1
//
//         CAN BE USED.
//
//         IN MOST COMPLEX VARIABLE COMPUTATION, ONE MUST EVALUATE ELE-
//         MENTARY FUNCTIONS. WHEN THE MAGNITUDE OF Z OR FNU+N-1 IS
//         LARGE, LOSSES OF SIGNIFICANCE BY ARGUMENT REDUCTION OCCUR.
//         CONSEQUENTLY, IF EITHER ONE EXCEEDS U1=MATH.SQRT(0.5/UR), {
//         LOSSES EXCEEDING HALF PRECISION ARE LIKELY AND AN ERROR FLAG
//         IERR=3 IS TRIGGERED WHERE UR=MATH.MAX(D1MACH(4),1.0E-18) IS
//         DOUBLE PRECISION UNIT ROUNDOFF LIMITED TO 18 DIGITS PRECISION.
//         IF EITHER IS LARGER THAN U2=0.5/UR, { ALL SIGNIFICANCE IS
//         LOST AND IERR=4. IN ORDER TO USE THE INT FUNCTION, ARGUMENTS
//         MUST BE FURTHER RESTRICTED NOT TO EXCEED THE LARGEST MACHINE
//         INTEGER, U3=I1MACH(9). THUS, THE MAGNITUDE OF Z AND FNU+N-1 IS
//         RESTRICTED BY MATH.MIN(U2,U3). ON 32 BIT MACHINES, U1,U2, AND U3
//         ARE APPROXIMATELY 2.0E+3, 4.2E+6, 2.1E+9 IN SINGLE PRECISION
//         ARITHMETIC AND 1.3E+8, 1.8E+16, 2.1E+9 IN DOUBLE PRECISION
//         ARITHMETIC RESPECTIVELY. THIS MAKES U2 AND U3 LIMITING IN
//         THEIR RESPECTIVE ARITHMETICS. THIS MEANS THAT ONE CAN EXPECT
//         TO RETAIN, IN THE WORST CASES ON 32 BIT MACHINES, NO DIGITS
//         IN SINGLE AND ONLY 7 DIGITS IN DOUBLE PRECISION ARITHMETIC.
//         SIMILAR CONSIDERATIONS HOLD FOR OTHER MACHINES.
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
//         THE PRINCIPAL PHASE ANGLE IS ON THE ORDER OF +P, -P, PMATH.TRUNC(I/2)-P,
//         OR -PMATH.TRUNC(I/2)+P.
//
// **REFERENCES  HANDBOOK OF MATHEMATICAL FUNCTIONS BY M. ABRAMOWITZ
//                 AND I. A. STEGUN, NBS AMS SERIES 55, U.S. DEPT. OF
//                 COMMERCE, 1955.
//
//               COMPUTATION OF BESSEL FUNCTIONS OF COMPLEX ARGUMENT
//                 BY D. E. AMOS, SAND83-0083, MAY, 1983.
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
// **ROUTINES ED()  ZACON,ZBKNU,ZBUNK,ZUOIK,AZABS,I1MACH,D1MACH
// **END PROLOGUE  ZBESH
//
//     COMPLEX CY,Z,ZN,ZT,CSGN
function zbesh(zr, zi, fnu, kode, m, n, cyr, cyi) {
  var aa = void 0,
      alim = void 0,
      aln = void 0,
      arg = void 0,
      az = void 0,
      dig = void 0,
      elim = void 0,
      fmm = void 0,
      fn = void 0,
      fnul = void 0,
      hpi = void 0,
      rhpi = void 0,
      rl = void 0,
      r1m5 = void 0,
      sgn = void 0,
      str = void 0,
      tol = void 0,
      ufl = void 0,
      zni = void 0,
      znr = void 0,
      zti = void 0,
      bb = void 0,
      ascle = void 0,
      rtol = void 0,
      atol = void 0,
      sti = void 0,
      csgnr = void 0,
      csgni = void 0,
      i = void 0,
      inu = void 0,
      inuh = void 0,
      ir = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      mm = void 0,
      mr = void 0,
      nn = void 0,
      nuf = void 0,
      nw = void 0,
      nz = void 0,
      ierr = void 0;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        hpi = 1.57079632679489662e0;
        ierr = 0;
        nz = 0;
        if (zr === 0.0e0 && zi === 0.0e0) ierr = 1;
        if (fnu < 0.0e0) ierr = 1;
        if (m < 1 || m > 2) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (n < 1) ierr = 1;
        if (ierr !== 0) break mainExecutionLoop;
        nn = n;
        // -----------------------------------------------------------------------
        //     set parameters related to machine constants.
        //     tol is the approximate unit roundoff limited to 1.0e-18.
        //     elim is the approximate exponential over- and underflow limit.
        //     Math.exp(-elim) < Math.exp(-alim)=Math.exp(-elim)/tol    and
        //     Math.exp(elim) > Math.exp(alim)=Math.exp(elim)*tol       are intervals near
        //     underflow and overflow limits where scaled arithmetic is done.
        //     rl is the lower boundary of the asymptotic expansion for large z.
        //     dig = number of base 10 digits in tol = 10**(-dig).
        //     fnul is the lower boundary of the asymptotic series for large fnu
        // -----------------------------------------------------------------------
        tol = Math.max((0, _d1mach.d1mach)(4), 1.0e-18);
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
        fnul = 10.0e0 + 6.0e0 * (dig - 3.0e0);
        rl = 1.2e0 * dig + 3.0e0;
        fn = fnu + (nn - 1);
        mm = 3 - m - m;
        fmm = mm;
        znr = fmm * zi;
        zni = -fmm * zr;
        // -----------------------------------------------------------------------
        //     test for proper range
        // -----------------------------------------------------------------------
        az = (0, _zabs.azabs)(zr, zi);
        aa = 0.5e0 / tol;
        bb = (0, _i1mach.i1mach)(9) * 0.5e0;
        aa = Math.min(aa, bb);
        if (az > aa) {
          goToLabel = 260;break;
        }
        if (fn > aa) {
          goToLabel = 260;break;
        }
        aa = Math.sqrt(aa);
        if (az > aa) ierr = 3;
        if (fn > aa) ierr = 3;
        // -----------------------------------------------------------------------
        //     overflow test on the last member of the sequence
        // -----------------------------------------------------------------------
        ufl = (0, _d1mach.d1mach)(1) * 1.0e+3;
        if (az < ufl) {
          goToLabel = 230;break;
        }
        if (fnu > fnul) {
          goToLabel = 90;break;
        }
        if (fn <= 1.0e0) {
          goToLabel = 70;break;
        }
        if (fn > 2.0e0) {
          goToLabel = 60;break;
        }
        if (az > tol) {
          goToLabel = 70;break;
        }
        arg = 0.5e0 * az;
        aln = -fn * Math.log(arg);
        if (aln > elim) {
          goToLabel = 230;break;
        }
        goToLabel = 70;break;
      case 60:

        nuf = (0, _zuoik.zuoik)(znr, zni, fnu, kode, 2, nn, cyr, cyi, tol, elim, alim);
        if (nuf < 0) {
          goToLabel = 230;break;
        }
        nz = nz + nuf;
        nn = nn - nuf;
        // -----------------------------------------------------------------------
        //     here nn=n or nn=0 since nuf=0,nn, or -1 on return from cuoik
        //     if nuf=nn, { cy(i)=czero for all i
        // -----------------------------------------------------------------------
        if (nn === 0) {
          goToLabel = 140;break;
        }
      case 70:

        if (znr < 0.0e0 || znr === 0.0e0 && zni < 0.0e0 && m === 2) {
          goToLabel = 80;break;
        }
        // -----------------------------------------------------------------------
        //     right half plane computation, xn >= 0. && (xn !== 0. ||
        //     yn >= 0. || m=1)
        // -----------------------------------------------------------------------
        nz = (0, _zbknu.zbknu)(znr, zni, fnu, kode, nn, cyr, cyi, tol, elim, alim);
        goToLabel = 110;break;
      // -----------------------------------------------------------------------
      //     left half plane computation
      // -----------------------------------------------------------------------
      case 80:

        mr = -mm;
        nw = (0, _zacon.zacon)(znr, zni, fnu, kode, mr, nn, cyr, cyi, rl, fnul, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 240;break;
        }
        nz = nw;
        goToLabel = 110;break;
      case 90:

        // -----------------------------------------------------------------------
        //     uniform asymptotic expansions for fnu > fnul
        // -----------------------------------------------------------------------
        mr = 0;
        if (znr >= 0.0e0 && (znr !== 0.0e0 || zni >= 0.0e0 || m !== 2)) {
          goToLabel = 100;break;
        }
        mr = -mm;
        if (znr !== 0.0e0 || zni >= 0.0e0) {
          goToLabel = 100;break;
        }
        znr = -znr;
        zni = -zni;
      case 100:

        nw = (0, _zbunk.zbunk)(znr, zni, fnu, kode, mr, nn, cyr, cyi, nw, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 240;break;
        }
        nz = nz + nw;
      case 110:

        // -----------------------------------------------------------------------
        //     h(m,fnu,z) = -fmm*(i/hpi)*(zt**fnu)*k(fnu,-z*zt)
        //
        //     zt=Math.exp(-fmm*hpi*i) = cmplx(0.0,-fmm), fmm=3-2*m, m=1,2
        // -----------------------------------------------------------------------
        sgn = fortranHelpers.sign(hpi, -fmm);
        // -----------------------------------------------------------------------
        //     calculate Math.exp(fnu*hpi*i) to minimize losses of significance
        //     when fnu is large
        // -----------------------------------------------------------------------
        inu = Math.trunc(fnu);
        inuh = Math.trunc(inu / 2);
        ir = inu - 2 * inuh;
        arg = (fnu - (inu - ir)) * sgn;
        rhpi = 1.0e0 / sgn;
        //     zni = rhpi*Math.cos(arg)
        //     znr = -rhpi*Math.sin(arg)
        csgni = rhpi * Math.cos(arg);
        csgnr = -rhpi * Math.sin(arg);
        if (inuh % 2 === 0) {
          goToLabel = 120;break;
        }
        //     znr = -znr
        //     zni = -zni
        csgnr = -csgnr;
        csgni = -csgni;
      case 120:

        zti = -fmm;
        rtol = 1.0e0 / tol;
        ascle = ufl * rtol;
        for (i = 1; i <= nn; i++) {
          //       str = cyr(i)*znr - cyi(i)*zni
          //       cyi(i) = cyr(i)*zni + cyi(i)*znr
          //       cyr(i) = str
          //       str = -zni*zti
          //       zni = znr*zti
          //       znr = str
          aa = cyr[i - 1];
          bb = cyi[i - 1];
          atol = 1.0e0;
          if (Math.max(Math.abs(aa), Math.abs(bb)) > ascle) {
            // goToLabel = 135; break;
          } else {
            aa = aa * rtol;
            bb = bb * rtol;
            atol = tol;
          }
          // case 135:
          str = aa * csgnr - bb * csgni;
          sti = aa * csgni + bb * csgnr;
          cyr[i - 1] = str * atol;
          cyi[i - 1] = sti * atol;
          str = -csgni * zti;
          csgni = csgnr * zti;
          csgnr = str;
        }
        break mainExecutionLoop;
      case 140:

        if (znr < 0.0e0) {
          goToLabel = 230;break;
        }
        break mainExecutionLoop;
      case 230:

        nz = 0;
        ierr = 2;
        break mainExecutionLoop;
      case 240:

        if (nw === -1) {
          goToLabel = 230;break;
        }
        nz = 0;
        ierr = 5;
        break mainExecutionLoop;
      case 260:

        nz = 0;
        ierr = 4;

      default:
        break mainExecutionLoop;
    }
  }
  return [nz, ierr];
}