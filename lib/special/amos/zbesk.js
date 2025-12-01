Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zbesk = zbesk;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _zabs = require('./zabs.js');

var _zuoik = require('./zuoik.js');

var _zbknu = require('./zbknu.js');

var _zacon = require('./zacon.js');

var _zbunk = require('./zbunk.js');

function zbesk(zr, zi, fnu, kode, n, cyr, cyi) {
  var aa = void 0,
      alim = void 0,
      aln = void 0,
      arg = void 0,
      az = void 0,
      dig = void 0,
      elim = void 0,
      fn = void 0,
      fnul = void 0,
      rl = void 0,
      r1m5 = void 0,
      tol = void 0,
      ufl = void 0,
      bb = void 0,
      ierr = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      mr = void 0,
      nn = void 0,
      nuf = void 0,
      nw = void 0,
      nz = void 0;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        ierr = 0;
        nz = 0;
        if (zi === 0 && zr === 0) ierr = 1;
        if (fnu < 0.0) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (n < 1) ierr = 1;
        if (ierr !== 0) break mainExecutionLoop;
        nn = n;
        // c-----------------------------------------------------------------------
        // c     set parameters related to machine constants.
        // c     tol is the approximate unit roundoff limited to 1.0e-18.
        // c     elim is the approximate exponential over- and underflow limit.
        // c     exp(-elim) < exp(-alim)=exp(-elim)/tol    and
        // c     exp(elim) > exp(alim)=exp(elim)*tol       are intervals near
        // c     underflow and overflow limits where scaled arithmetic is done.
        // c     rl is the lower boundary of the asymptotic expansion for large z.
        // c     dig = number of base 10 digits in tol = 10**(-dig).
        // c     fnul is the lower boundary of the asymptotic series for large fnu
        // c-----------------------------------------------------------------------
        tol = Math.max((0, _d1mach.d1mach)(4), 1.0e-18);
        k1 = (0, _i1mach.i1mach)(15);
        k2 = (0, _i1mach.i1mach)(16);
        r1m5 = (0, _d1mach.d1mach)(5);
        k = Math.min(Math.abs(k1), Math.abs(k2));
        elim = 2.303 * k * r1m5 - 3.0;
        k1 = (0, _i1mach.i1mach)(14) - 1;
        aa = r1m5 * k1;
        dig = Math.min(aa, 18.0);
        aa = aa * 2.303;
        alim = elim + Math.max(-aa, -41.45);
        fnul = 10.0 + 6.0 * (dig - 3.0);
        rl = 1.2 * dig + 3.0;
        // c-----------------------------------------------------------------------------
        // c     test for proper range
        // c-----------------------------------------------------------------------
        az = (0, _zabs.azabs)(zr, zi);
        fn = fnu + (nn - 1);
        aa = 0.5 / tol;
        bb = (0, _i1mach.i1mach)(9) * 0.5;
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
        // c-----------------------------------------------------------------------
        // c     overflow test on the last member of the sequence
        // c-----------------------------------------------------------------------
        // c ufl = Math.exp(-elim)
        ufl = (0, _d1mach.d1mach)(1) * 1.0e+3;
        if (az < ufl) {
          goToLabel = 180;break;
        }
        if (fnu > fnul) {
          goToLabel = 80;break;
        }
        if (fn <= 1.0) {
          goToLabel = 60;break;
        }
        if (fn > 2.0) {
          goToLabel = 50;break;
        }
        if (az > tol) {
          goToLabel = 60;break;
        }
        arg = 0.5 * az;
        aln = -fn * Math.log(arg);
        if (aln > elim) {
          goToLabel = 180;break;
        }
        goToLabel = 60;break;
      case 50:
        nuf = (0, _zuoik.zuoik)(zr, zi, fnu, kode, 2, nn, cyr, cyi, tol, elim, alim);
        if (nuf < 0) {
          goToLabel = 180;break;
        }
        nz = nz + nuf;
        nn = nn - nuf;
        // c-----------------------------------------------------------------------
        // c     here nn=n or nn=0 since nuf=0,nn, or -1 on return from cuoik
        // c     if nuf=nn, then cy(i)=czero for all i
        // c-----------------------------------------------------------------------
        if (nn === 0) {
          goToLabel = 100;break;
        }
      case 60:
        if (zr < 0.0) {
          goToLabel = 70;break;
        }
        // c-----------------------------------------------------------------------
        // c     right half plane computation, real(z) >= 0.
        // c-----------------------------------------------------------------------
        nw = (0, _zbknu.zbknu)(zr, zi, fnu, kode, nn, cyr, cyi, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 200;break;
        }
        nz = nw;
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     left half plane computation
      // c     pi/2 < arg(z) <= pi and -pi < arg(z) < -pi/2.
      // c-----------------------------------------------------------------------
      case 70:
        if (nz !== 0) {
          goToLabel = 180;break;
        }
        mr = 1;
        if (zi < 0.0) mr = -1;
        nw = (0, _zacon.zacon)(zr, zi, fnu, kode, mr, nn, cyr, cyi, rl, fnul, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 200;break;
        }
        nz = nw;
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     uniform asymptotic expansions for fnu > fnul
      // c-----------------------------------------------------------------------
      case 80:
        mr = 0;
        if (zr >= 0.0) {
          goToLabel = 90;break;
        }
        mr = 1;
        if (zi < 0.0) mr = -1;
      case 90:
        nw = (0, _zbunk.zbunk)(zr, zi, fnu, kode, mr, nn, cyr, cyi, tol, elim, alim);
        if (nw < 0) {
          goToLabel = 200;break;
        }
        nz = nz + nw;
        break mainExecutionLoop;
      case 100:
        if (zr < 0.0) {
          goToLabel = 180;break;
        }
        break mainExecutionLoop;
      case 180:
        nz = 0;
        ierr = 2;
        break mainExecutionLoop;
      case 200:
        if (nw === -1) {
          goToLabel = 180;break;
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
} /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZBESK(ZR, ZI, FNU, KODE, N, CYR, CYI, NZ, IERR)
// ***BEGIN PROLOGUE  ZBESK
// ***DATE WRITTEN   830501   (YYMMDD)
// ***REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// ***CATEGORY NO.  B5K
// ***KEYWORDS  K-BESSEL FUNCTION,COMPLEX BESSEL FUNCTION,
//              MODIFIED BESSEL FUNCTION OF THE SECOND KIND,
//              BESSEL FUNCTION OF THE THIRD KIND
// ***AUTHOR (FORTRAN) AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// **AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// ***PURPOSE  TO COMPUTE K-BESSEL FUNCTIONS OF COMPLEX ARGUMENT
// ***DESCRIPTION
//
//                       ***A DOUBLE PRECISION ROUTINE***
//
//          ON KODE=1, CBESK COMPUTES AN N MEMBER SEQUENCE OF COMPLEX
//          BESSEL FUNCTIONS CY(J)=K(FNU+J-1,Z) FOR REAL, NONNEGATIVE
//          ORDERS FNU+J-1, J=1,...,N AND COMPLEX Z.NE.CMPLX(0.0,0.0)
//          IN THE CUT PLANE -PI.LT.ARG(Z).LE.PI. ON KODE=2, CBESK
//          RETURNS THE SCALED K FUNCTIONS,
//
//          CY(J)=EXP(Z)*K(FNU+J-1,Z) , J=1,...,N,
//
//          WHICH REMOVE THE EXPONENTIAL BEHAVIOR IN BOTH THE LEFT AND
//          RIGHT HALF PLANES FOR Z TO INFINITY. DEFINITIONS AND
//          NOTATION ARE FOUND IN THE NBS HANDBOOK OF MATHEMATICAL
//          FUNCTIONS (REF. 1).
//
//          INPUT      ZR,ZI,FNU ARE DOUBLE PRECISION
//            ZR,ZI  - Z=CMPLX(ZR,ZI), Z.NE.CMPLX(0.0D0,0.0D0),
//                     -PI.LT.ARG(Z).LE.PI
//            FNU    - ORDER OF INITIAL K FUNCTION, FNU.GE.0.0D0
//            N      - NUMBER OF MEMBERS OF THE SEQUENCE, N.GE.1
//            KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                     KODE= 1  RETURNS
//                              CY(I)=K(FNU+I-1,Z), I=1,...,N
//                         = 2  RETURNS
//                              CY(I)=K(FNU+I-1,Z)*EXP(Z), I=1,...,N
//
//          OUTPUT     CYR,CYI ARE DOUBLE PRECISION
//            CYR,CYI- DOUBLE PRECISION VECTORS WHOSE FIRST N COMPONENTS
//                     CONTAIN REAL AND IMAGINARY PARTS FOR THE SEQUENCE
//                     CY(I)=K(FNU+I-1,Z), I=1,...,N OR
//                     CY(I)=K(FNU+I-1,Z)*EXP(Z), I=1,...,N
//                     DEPENDING ON KODE
//            NZ     - NUMBER OF COMPONENTS SET TO ZERO DUE TO UNDERFLOW.
//                     NZ= 0   , NORMAL RETURN
//                     NZ.GT.0 , FIRST NZ COMPONENTS OF CY SET TO ZERO DUE
//                               TO UNDERFLOW, CY(I)=CMPLX(0.0D0,0.0D0),
//                               I=1,...,N WHEN X.GE.0.0. WHEN X.LT.0.0
//                               NZ STATES ONLY THE NUMBER OF UNDERFLOWS
//                               IN THE SEQUENCE.
//
//            IERR   - ERROR FLAG
//                     IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                     IERR=1, INPUT ERROR   - NO COMPUTATION
//                     IERR=2, OVERFLOW      - NO COMPUTATION, FNU IS
//                             TOO LARGE OR CABS(Z) IS TOO SMALL OR BOTH
//                     IERR=3, CABS(Z) OR FNU+N-1 LARGE - COMPUTATION DONE
//                             BUT LOSSES OF SIGNIFCANCE BY ARGUMENT
//                             REDUCTION PRODUCE LESS THAN HALF OF MACHINE
//                             ACCURACY
//                     IERR=4, CABS(Z) OR FNU+N-1 TOO LARGE - NO COMPUTA-
//                             TION BECAUSE OF COMPLETE LOSSES OF SIGNIFI-
//                             CANCE BY ARGUMENT REDUCTION
//                     IERR=5, ERROR              - NO COMPUTATION,
//                             ALGORITHM TERMINATION CONDITION NOT MET
//
// ***LONG DESCRIPTION
//
//          EQUATIONS OF THE REFERENCE ARE IMPLEMENTED FOR SMALL ORDERS
//          DNU AND DNU+1.0 IN THE RIGHT HALF PLANE X.GE.0.0. FORWARD
//          RECURRENCE GENERATES HIGHER ORDERS. K IS CONTINUED TO THE LEFT
//          HALF PLANE BY THE RELATION
//
//          K(FNU,Z*EXP(MP)) = EXP(-MP*FNU)*K(FNU,Z)-MP*I(FNU,Z)
//          MP=MR*PI*I, MR=+1 OR -1, RE(Z).GT.0, I**2=-1
//
//          WHERE I(FNU,Z) IS THE I BESSEL FUNCTION.
//
//          FOR LARGE ORDERS, FNU.GT.FNUL, THE K FUNCTION IS COMPUTED
//          BY MEANS OF ITS UNIFORM ASYMPTOTIC EXPANSIONS.
//
//          FOR NEGATIVE ORDERS, THE FORMULA
//
//                        K(-FNU,Z) = K(FNU,Z)
//
//          CAN BE USED.
//
//          CBESK ASSUMES THAT A SIGNIFICANT DIGIT SINH(X) FUNCTION IS
//          AVAILABLE.
//
//          IN MOST COMPLEX VARIABLE COMPUTATION, ONE MUST EVALUATE ELE-
//          MENTARY FUNCTIONS. WHEN THE MAGNITUDE OF Z OR FNU+N-1 IS
//          LARGE, LOSSES OF SIGNIFICANCE BY ARGUMENT REDUCTION OCCUR.
//          CONSEQUENTLY, IF EITHER ONE EXCEEDS U1=SQRT(0.5/UR), THEN
//          LOSSES EXCEEDING HALF PRECISION ARE LIKELY AND AN ERROR FLAG
//          IERR=3 IS TRIGGERED WHERE UR=DMAX1(D1MACH(4),1.0D-18) IS
//          DOUBLE PRECISION UNIT ROUNDOFF LIMITED TO 18 DIGITS PRECISION.
//          IF EITHER IS LARGER THAN U2=0.5/UR, THEN ALL SIGNIFICANCE IS
//          LOST AND IERR=4. IN ORDER TO USE THE INT FUNCTION, ARGUMENTS
//          MUST BE FURTHER RESTRICTED NOT TO EXCEED THE LARGEST MACHINE
//          INTEGER, U3=I1MACH(9). THUS, THE MAGNITUDE OF Z AND FNU+N-1 IS
//          RESTRICTED BY MIN(U2,U3). ON 32 BIT MACHINES, U1,U2, AND U3
//          ARE APPROXIMATELY 2.0E+3, 4.2E+6, 2.1E+9 IN SINGLE PRECISION
//          ARITHMETIC AND 1.3E+8, 1.8E+16, 2.1E+9 IN DOUBLE PRECISION
//          ARITHMETIC RESPECTIVELY. THIS MAKES U2 AND U3 LIMITING IN
//          THEIR RESPECTIVE ARITHMETICS. THIS MEANS THAT ONE CAN EXPECT
//          TO RETAIN, IN THE WORST CASES ON 32 BIT MACHINES, NO DIGITS
//          IN SINGLE AND ONLY 7 DIGITS IN DOUBLE PRECISION ARITHMETIC.
//          SIMILAR CONSIDERATIONS HOLD FOR OTHER MACHINES.
//
//          THE APPROXIMATE RELATIVE ERROR IN THE MAGNITUDE OF A COMPLEX
//          BESSEL FUNCTION CAN BE EXPRESSED BY P*10**S WHERE P=MAX(UNIT
//          ROUNDOFF,1.0E-18) IS THE NOMINAL PRECISION AND 10**S REPRE-
//          SENTS THE INCREASE IN ERROR DUE TO ARGUMENT REDUCTION IN THE
//          ELEMENTARY FUNCTIONS. HERE, S=MAX(1,ABS(LOG10(CABS(Z))),
//          ABS(LOG10(FNU))) APPROXIMATELY (I.E. S=MAX(1,ABS(EXPONENT OF
//          CABS(Z),ABS(EXPONENT OF FNU)) ). HOWEVER, THE PHASE ANGLE MAY
//          HAVE ONLY ABSOLUTE ACCURACY. THIS IS MOST LIKELY TO OCCUR WHEN
//          ONE COMPONENT (IN ABSOLUTE VALUE) IS LARGER THAN THE OTHER BY
//          SEVERAL ORDERS OF MAGNITUDE. IF ONE COMPONENT IS 10**K LARGER
//          THAN THE OTHER, THEN ONE CAN EXPECT ONLY MAX(ABS(LOG10(P))-K,
//          0) SIGNIFICANT DIGITS; OR, STATED ANOTHER WAY, WHEN K EXCEEDS
//          THE EXPONENT OF P, NO SIGNIFICANT DIGITS REMAIN IN THE SMALLER
//          COMPONENT. HOWEVER, THE PHASE ANGLE RETAINS ABSOLUTE ACCURACY
//          BECAUSE, IN COMPLEX ARITHMETIC WITH PRECISION P, THE SMALLER
//          COMPONENT WILL NOT (AS A RULE) DECREASE BELOW P TIMES THE
//          MAGNITUDE OF THE LARGER COMPONENT. IN THESE EXTREME CASES,
//          THE PRINCIPAL PHASE ANGLE IS ON THE ORDER OF +P, -P, PI/2-P,
//          OR -PI/2+P.
//
// ***REFERENCES  HANDBOOK OF MATHEMATICAL FUNCTIONS BY M. ABRAMOWITZ
//                  AND I. A. STEGUN, NBS AMS SERIES 55, U.S. DEPT. OF
//                  COMMERCE, 1955.
//
//                COMPUTATION OF BESSEL FUNCTIONS OF COMPLEX ARGUMENT
//                  BY D. E. AMOS, SAND83-0083, MAY, 1983.
//
//                COMPUTATION OF BESSEL FUNCTIONS OF COMPLEX ARGUMENT
//                  AND LARGE ORDER BY D. E. AMOS, SAND83-0643, MAY, 1983.
//
//                A SUBROUTINE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                  ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, SAND85-
//                  1018, MAY, 1985
//
//                A PORTABLE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                  ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, TRANS.
//                  MATH. SOFTWARE, 1986
//
// ***ROUTINES CALLED  ZACON,ZBKNU,ZBUNK,ZUOIK,AZABS,I1MACH,D1MACH
// ***END PROLOGUE  ZBESK
//
//      COMPLEX CY,Z