Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// **BEGIN PROLOGUE  ZBESY
// **DATE WRITTEN   830501   (YYMMDD)
// **REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// **CATEGORY NO.  B5K
// **KEYWORDS  Y-BESSEL FUNCTION,BESSEL FUNCTION OF COMPLEX ARGUMENT,
//            BESSEL FUNCTION OF SECOND KIND
// **AUTHOR (FORTRAN) AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// **AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// **PURPOSE  TO COMPUTE THE Y-BESSEL FUNCTION OF A COMPLEX ARGUMENT
// **DESCRIPTION
//
//                      ***A DOUBLE PRECISION ROUTINE***
//
//         ON KODE=1, CBESY COMPUTES AN N MEMBER SEQUENCE OF COMPLEX
//         BESSEL FUNCTIONS CY(I)=Y(FNU+I-1,Z) FOR REAL, NONNEGATIVE
//         ORDERS FNU+I-1, I=1,...,N AND COMPLEX Z IN THE CUT PLANE
//         -PI < ARG(Z) <= PI. ON KODE=2, CBESY RETURNS THE SCALED
//         FUNCTIONS
//
//         CY(I)=MATH.EXP(-MATH.ABS(Y))*Y(FNU+I-1,Z)   I = 1,...,N , Y=AIMAG(Z)
//
//         WHICH REMOVE THE EXPONENTIAL GROWTH IN BOTH THE UPPER AND
//         LOWER HALF PLANES FOR Z TO INFINITY. DEFINITIONS AND NOTATION
//         ARE FOUND IN THE NBS HANDBOOK OF MATHEMATICAL FUNCTIONS
//         (REF. 1).
//
//         INPUT      ZR,ZI,FNU ARE DOUBLE PRECISION
//           ZR,ZI  - Z=CMPLX(ZR,ZI), Z !== CMPLX(0.0E0,0.0E0),
//                    -PI < ARG(Z) <= PI
//           FNU    - ORDER OF INITIAL Y FUNCTION, FNU >= 0.0E0
//           KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                    KODE= 1  RETURNS
//                             CY(I)=Y(FNU+I-1,Z), I=1,...,N
//                        = 2  RETURNS
//                             CY(I)=Y(FNU+I-1,Z)*MATH.EXP(-MATH.ABS(Y)), I=1,...,N
//                             WHERE Y=AIMAG(Z)
//           N      - NUMBER OF MEMBERS OF THE SEQUENCE, N >= 1
//           CWRKR, - DOUBLE PRECISION WORK VECTORS OF DIMENSION AT
//           CWRKI    AT LEAST N
//
//         OUTPUT     CYR,CYI ARE DOUBLE PRECISION
//           CYR,CYI- DOUBLE PRECISION VECTORS WHOSE FIRST N COMPONENTS
//                    CONTAIN REAL AND IMAGINARY PARTS FOR THE SEQUENCE
//                    CY(I)=Y(FNU+I-1,Z)  OR
//                    CY(I)=Y(FNU+I-1,Z)*MATH.EXP(-MATH.ABS(Y))  I=1,...,N
//                    DEPENDING ON KODE.
//           NZ     - NZ=0 , A NORMAL RETURN
//                    NZ > 0 , NZ COMPONENTS OF CY SET TO ZERO DUE TO
//                    UNDERFLOW (GENERALLY ON KODE=2)
//           IERR   - ERROR FLAG
//                    IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                    IERR=1, INPUT ERROR   - NO COMPUTATION
//                    IERR=2, OVERFLOW      - NO COMPUTATION, FNU IS
//                            TOO LARGE OR CABS(Z) IS TOO SMALL OR BOTH
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
//         Y(FNU,Z)=0.5*(H(1,FNU,Z)-H(2,FNU,Z))/I
//
//         WHERE I**2 = -1 AND THE HANKEL BESSEL FUNCTIONS H(1,FNU,Z)
//         AND H(2,FNU,Z) ARE CALCULATED IN CBESH.
//
//         FOR NEGATIVE ORDERS,THE FORMULA
//
//              Y(-FNU,Z) = Y(FNU,Z)*MATH.COS(PI*FNU) + J(FNU,Z)*MATH.SIN(PI*FNU)
//
//         CAN BE USED. HOWEVER,FOR LARGE ORDERS CLOSE TO HALF ODD
//         INTEGERS THE FUNCTION CHANGES RADIY(). WHEN FNU IS A LARGE
//         POSITIVE HALF ODD INTEGER,THE MAGNITUDE OF Y(-FNU,Z)=J(FNU,Z)*
//         MATH.SIN(PI*FNU) IS A LARGE NEGATIVE POWER OF TEN. BUT WHEN FNU IS
//         NOT A HALF ODD INTEGER, Y(FNU,Z) DOMINATES IN MAGNITUDE WITH A
//         LARGE POSITIVE POWER OF TEN AND THE MOST THAT THE SECOND TERM
//         CAN BE REDUCED IS BY UNIT ROUNDOFF FROM THE COEFFICIENT. THUS,
//         WIDE CHANGES CAN OCCUR WITHIN UNIT ROUNDOFF OF A LARGE HALF
//         ODD INTEGER. HERE, LARGE MEANS FNU > CABS(Z).
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
//         CABS(Z),ABS(EXPONENT OF FNU)) )). HOWEVER, THE PHASE ANGLE MAY
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
// **ROUTINES CALLED  ZBESH,I1MACH,D1MACH
// **END PROLOGUE  ZBESY
//
//     COMPLEX CWRK,CY,C1,C2,EX,HCI,Z,ZU,ZV


exports.zbesy = zbesy;

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _zbesh5 = require('./zbesh.js');

function zbesy(zr, zi, fnu, kode, n, cyr, cyi) {
  var c1i = void 0,
      c1r = void 0,
      c2i = void 0,
      c2r = void 0,
      elim = void 0,
      exi = void 0,
      exr = void 0,
      ey = void 0,
      hcii = void 0,
      sti = void 0,
      str = void 0,
      tay = void 0,
      ascle = void 0,
      rtol = void 0,
      atol = void 0,
      aa = void 0,
      bb = void 0,
      tol = void 0,
      i = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      nz1 = void 0,
      nz2 = void 0,
      cwrkr = void 0,
      cwrki = void 0,
      ierr = void 0,
      nz = void 0,
      r1m5 = void 0;

  cwrkr = new Array(n);
  cwrki = new Array(n);

  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        ierr = 0;
        nz = 0;
        if (zr === 0.0e0 && zi === 0.0e0) ierr = 1;
        if (fnu < 0.0e0) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (n < 1) ierr = 1;
        if (ierr !== 0) break mainExecutionLoop;
        hcii = 0.5e0;

        var _zbesh = (0, _zbesh5.zbesh)(zr, zi, fnu, kode, 1, n, cyr, cyi);

        var _zbesh2 = _slicedToArray(_zbesh, 2);

        nz1 = _zbesh2[0];
        ierr = _zbesh2[1];

        if (ierr !== 0 && ierr !== 3) {
          goToLabel = 170;break;
        }

        var _zbesh3 = (0, _zbesh5.zbesh)(zr, zi, fnu, kode, 2, n, cwrkr, cwrki);

        var _zbesh4 = _slicedToArray(_zbesh3, 2);

        nz2 = _zbesh4[0];
        ierr = _zbesh4[1];

        if (ierr !== 0 && ierr !== 3) {
          goToLabel = 170;break;
        }
        nz = Math.min(nz1, nz2);
        if (kode === 2) {
          goToLabel = 60;break;
        }
        for (i = 1; i <= n; i++) {
          str = cwrkr[i - 1] - cyr[i - 1];
          sti = cwrki[i - 1] - cyi[i - 1];
          cyr[i - 1] = -sti * hcii;
          cyi[i - 1] = str * hcii;
        }
        break mainExecutionLoop;
      case 60:

        tol = Math.max((0, _d1mach.d1mach)(4), 1.0e-18);
        k1 = (0, _i1mach.i1mach)(15);
        k2 = (0, _i1mach.i1mach)(16);
        k = Math.min(Math.abs(k1), Math.abs(k2));
        r1m5 = (0, _d1mach.d1mach)(5);
        // -----------------------------------------------------------------------
        //     elim is the approximate exponential under- and overflow limit
        // -----------------------------------------------------------------------
        elim = 2.303e0 * (k * r1m5 - 3.0e0);
        exr = Math.cos(zr);
        exi = Math.sin(zr);
        ey = 0.0e0;
        tay = Math.abs(zi + zi);
        if (tay < elim) ey = Math.exp(-tay);
        if (zi < 0.0e0) {
          goToLabel = 90;break;
        }
        c1r = exr * ey;
        c1i = exi * ey;
        c2r = exr;
        c2i = -exi;
      case 70:

        nz = 0;
        rtol = 1.0e0 / tol;
        ascle = (0, _d1mach.d1mach)(1) * rtol * 1.0e+3;
        for (i = 1; i <= n; i++) {
          //       str = c1r*cyr(i) - c1i*cyi(i)
          //       sti = c1r*cyi(i) + c1i*cyr(i)
          //       str = -str + c2r*cwrkr(i) - c2i*cwrki(i)
          //       sti = -sti + c2r*cwrki(i) + c2i*cwrkr(i)
          //       cyr(i) = -sti*hcii
          //       cyi(i) = str*hcii
          aa = cwrkr[i - 1];
          bb = cwrki[i - 1];
          atol = 1.0e0;
          if (Math.max(Math.abs(aa), Math.abs(bb)) > ascle) {
            // goToLabel = 75; break;
          } else {
            aa = aa * rtol;
            bb = bb * rtol;
            atol = tol;
          }
          // case 75:

          str = (aa * c2r - bb * c2i) * atol;
          sti = (aa * c2i + bb * c2r) * atol;
          aa = cyr[i - 1];
          bb = cyi[i - 1];
          atol = 1.0e0;
          if (Math.max(Math.abs(aa), Math.abs(bb)) > ascle) {
            // goToLabel = 85; break;
          } else {
            aa = aa * rtol;
            bb = bb * rtol;
            atol = tol;
          }
          // case 85:

          str = str - (aa * c1r - bb * c1i) * atol;
          sti = sti - (aa * c1i + bb * c1r) * atol;
          cyr[i - 1] = -sti * hcii;
          cyi[i - 1] = str * hcii;
          if (str === 0.0e0 && sti === 0.0e0 && ey === 0.0e0) {
            nz = nz + 1;
          }
        }
        break mainExecutionLoop;
      case 90:

        c1r = exr;
        c1i = exi;
        c2r = exr * ey;
        c2i = -exi * ey;
        goToLabel = 70;break;
      case 170:

        nz = 0;
      default:
        break mainExecutionLoop;
    }
  }
  return [nz, ierr];
}