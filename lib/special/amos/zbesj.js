Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zbesj = zbesj;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _zbinu = require('./zbinu.js');

function zbesj(zr, zi, fnu, kode, n, cyr, cyi) {
  var aa = void 0,
      alim = void 0,
      arg = void 0,
      cii = void 0,
      csgni = void 0,
      csgnr = void 0,
      dig = void 0,
      elim = void 0,
      fnul = void 0,
      hpi = void 0,
      rl = void 0,
      r1m5 = void 0,
      str = void 0,
      tol = void 0,
      zni = void 0,
      znr = void 0,
      bb = void 0,
      fn = void 0,
      az = void 0,
      ascle = void 0,
      rtol = void 0,
      atol = void 0,
      sti = void 0,
      i = void 0,
      inu = void 0,
      inuh = void 0,
      ir = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      nl = void 0,
      nz = void 0,
      ierr = void 0;

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        hpi = 1.57079632679489662e0;
        ierr = 0;
        nz = 0;
        if (fnu < 0.0e0) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (n < 1) ierr = 1;
        if (ierr !== 0) break mainExecutionLoop;
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
        rl = 1.2e0 * dig + 3.0e0;
        fnul = 10.0e0 + 6.0e0 * (dig - 3.0e0);
        // -----------------------------------------------------------------------
        //     test for proper range
        // -----------------------------------------------------------------------
        az = Math.abs(zr, zi);
        fn = fnu + (n - 1);
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
        //     calculate csgn=Math.exp(fnu*hpi*i) to minimize losses of significance
        //     when fnu is large
        // -----------------------------------------------------------------------
        cii = 1.0e0;
        inu = Math.trunc(fnu);
        inuh = Math.trunc(inu / 2);
        ir = inu - 2 * inuh;
        arg = (fnu - (inu - ir)) * hpi;
        csgnr = Math.cos(arg);
        csgni = Math.sin(arg);
        if (inuh % 2 === 0) {
          goToLabel = 40;break;
        }
        csgnr = -csgnr;
        csgni = -csgni;
      case 40:

        // -----------------------------------------------------------------------
        //     zn is in the right half plane
        // -----------------------------------------------------------------------
        znr = zi;
        zni = -zr;
        if (zi >= 0.0e0) {
          goToLabel = 50;break;
        }
        znr = -znr;
        zni = -zni;
        csgni = -csgni;
        cii = -cii;
      case 50:

        nz = (0, _zbinu.zbinu)(znr, zni, fnu, kode, n, cyr, cyi, rl, fnul, tol, elim, alim);
        if (nz < 0) {
          goToLabel = 130;break;
        }
        nl = n - nz;
        if (nl === 0) break mainExecutionLoop;
        rtol = 1.0e0 / tol;
        ascle = (0, _d1mach.d1mach)(1) * rtol * 1.0e+3;
        for (i = 1; i <= nl; i++) {
          //       str = cyr(i)*csgnr - cyi(i)*csgni
          //       cyi(i) = cyr(i)*csgni + cyi(i)*csgnr
          //       cyr(i) = str
          aa = cyr[i - 1];
          bb = cyi[i - 1];
          atol = 1.0e0;
          if (Math.max(Math.abs(aa), Math.abs(bb)) > ascle) {
            // goToLabel = 55; break;
          } else {
            aa = aa * rtol;
            bb = bb * rtol;
            atol = tol;
          }
          // case 55:

          str = aa * csgnr - bb * csgni;
          sti = aa * csgni + bb * csgnr;
          cyr[i - 1] = str * atol;
          cyi[i - 1] = sti * atol;
          str = -csgni * cii;
          csgni = csgnr * cii;
          csgnr = str;
        }
        break mainExecutionLoop;
      case 130:
        if (nz === -2) {
          goToLabel = 140;break;
        }
        nz = 0;
        ierr = 2;
        break mainExecutionLoop;
      case 140:
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
// **BEGIN PROLOGUE  ZBESJ
// **DATE WRITTEN   830501   (YYMMDD)
// **REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// **CATEGORY NO.  B5K
// **KEYWORDS  J-BESSEL FUNCTION,BESSEL FUNCTION OF COMPLEX ARGUMENT,
//            BESSEL FUNCTION OF FIRST KIND
// **AUTHOR (FORTRAN) AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// **AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// **PURPOSE  TO COMPUTE THE J-BESSEL FUNCTION OF A COMPLEX ARGUMENT
// **DESCRIPTION
//
//                      ***A DOUBLE PRECISION ROUTINE***
//         ON KODE=1, CBESJ COMPUTES AN N MEMBER  SEQUENCE OF COMPLEX
//         BESSEL FUNCTIONS CY(I)=J(FNU+I-1,Z) FOR REAL, NONNEGATIVE
//         ORDERS FNU+I-1, I=1,...,N AND COMPLEX Z IN THE CUT PLANE
//         -PI < ARG(Z) <= PI. ON KODE=2, CBESJ RETURNS THE SCALED
//         FUNCTIONS
//
//         CY(I)=MATH.EXP(-MATH.ABS(Y))*J(FNU+I-1,Z)   I = 1,...,N , Y=AIMAG(Z)
//
//         WHICH REMOVE THE EXPONENTIAL GROWTH IN BOTH THE UPPER AND
//         LOWER HALF PLANES FOR Z TO INFINITY. DEFINITIONS AND NOTATION
//         ARE FOUND IN THE NBS HANDBOOK OF MATHEMATICAL FUNCTIONS
//         (REF. 1).
//
//         INPUT      ZR,ZI,FNU ARE DOUBLE PRECISION
//           ZR,ZI  - Z=CMPLX(ZR,ZI),  -PI < ARG(Z) <= PI
//           FNU    - ORDER OF INITIAL J FUNCTION, FNU >= 0.0E0
//           KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                    KODE= 1  RETURNS
//                             CY(I)=J(FNU+I-1,Z), I=1,...,N
//                        = 2  RETURNS
//                             CY(I)=J(FNU+I-1,Z)MATH.EXP(-MATH.ABS(Y)), I=1,...,N
//           N      - NUMBER OF MEMBERS OF THE SEQUENCE, N >= 1
//
//         OUTPUT     CYR,CYI ARE DOUBLE PRECISION
//           CYR,CYI- DOUBLE PRECISION VECTORS WHOSE FIRST N COMPONENTS
//                    CONTAIN REAL AND IMAGINARY PARTS FOR THE SEQUENCE
//                    CY(I)=J(FNU+I-1,Z)  OR
//                    CY(I)=J(FNU+I-1,Z)MATH.EXP(-MATH.ABS(Y))  I=1,...,N
//                    DEPENDING ON KODE, Y=AIMAG(Z).
//           NZ     - NUMBER OF COMPONENTS SET TO ZERO DUE TO UNDERFLOW,
//                    NZ= 0   , NORMAL RETURN
//                    NZ > 0 , LAST NZ COMPONENTS OF CY SET  ZERO DUE
//                              TO UNDERFLOW, CY(I)=CMPLX(0.0E0,0.0E0),
//                              I = N-NZ+1,...,N
//           IERR   - ERROR FLAG
//                    IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                    IERR=1, INPUT ERROR   - NO COMPUTATION
//                    IERR=2, OVERFLOW      - NO COMPUTATION, AIMAG(Z)
//                            TOO LARGE ON KODE=1
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
//         THE COMPUTATION IS CARRIED OUT BY THE FORMULA
//
//         J(FNU,Z)=MATH.EXP( FNU*PI*MATH.TRUNC(I/2))*I(FNU,-I*Z)    AIMAG(Z) >= 0.0
//
//         J(FNU,Z)=MATH.EXP(-FNU*PI*MATH.TRUNC(I/2))*I(FNU, I*Z)    AIMAG(Z) < 0.0
//
//         WHERE I**2 = -1 AND I(FNU,Z) IS THE I BESSEL FUNCTION.
//
//         FOR NEGATIVE ORDERS,THE FORMULA
//
//              J(-FNU,Z) = J(FNU,Z)*MATH.COS(PI*FNU) - Y(FNU,Z)*MATH.SIN(PI*FNU)
//
//         CAN BE USED. HOWEVER,FOR LARGE ORDERS CLOSE TO INTEGERS, THE
//         THE FUNCTION CHANGES RADIY(). WHEN FNU IS A LARGE POSITIVE
//         INTEGER,THE MAGNITUDE OF J(-FNU,Z)=J(FNU,Z)*MATH.COS(PI*FNU) IS A
//         LARGE NEGATIVE POWER OF TEN. BUT WHEN FNU IS NOT AN INTEGER,
//         Y(FNU,Z) DOMINATES IN MAGNITUDE WITH A LARGE POSITIVE POWER OF
//         TEN AND THE MOST THAT THE SECOND TERM CAN BE REDUCED IS BY
//         UNIT ROUNDOFF FROM THE COEFFICIENT. THUS, WIDE CHANGES CAN
//         OCCUR WITHIN UNIT ROUNDOFF OF A LARGE INTEGER FOR FNU. HERE,
//         LARGE MEANS FNU > CABS(Z).
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
// **ROUTINES ED()  ZBINU,I1MACH,D1MACH
// **END PROLOGUE  ZBESJ
//
//     COMPLEX CI,CSGN,CY,Z,ZN