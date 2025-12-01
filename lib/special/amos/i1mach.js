Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i1mach = i1mach;
// import * as py from '../../utils/pythonHelpers.js';
// !DECK I1MACH
//       INTEGER FUNCTION I1MACH (I)
//       IMPLICIT NONE
//       INTEGER :: I
//       REAL :: X
//       DOUBLE PRECISION :: XX
// !***BEGIN PROLOGUE  I1MACH
// !***PURPOSE  Return integer machine dependent constants.
// !***LIBRARY   SLATEC
// !***CATEGORY  R1
// !***TYPE      INTEGER (I1MACH-I)
// !***KEYWORDS  MACHINE CONSTANTS
// !***AUTHOR  Fox, P. A., (Bell Labs)
// !           Hall, A. D., (Bell Labs)
// !           Schryer, N. L., (Bell Labs)
// !***DESCRIPTION
// !
// !   I1MACH can be used to obtain machine-dependent parameters for the
// !   local machine environment.  It is a function subprogram with one
// !   (input) argument and can be referenced as follows:
// !
// !        K = I1MACH(I)
// !
// !   where I=1,...,16.  The (output) value of K above is determined by
// !   the (input) value of I.  The results for various values of I are
// !   discussed below.
// !
// !   I/O unit numbers:
// !     I1MACH( 1) = the standard input unit.
// !     I1MACH( 2) = the standard output unit.
// !     I1MACH( 3) = the standard punch unit.
// !     I1MACH( 4) = the standard error message unit.
// !
// !   Words:
// !     I1MACH( 5) = the number of bits per integer storage unit.
// !     I1MACH( 6) = the number of characters per integer storage unit.
// !
// !   Integers:
// !     assume integers are represented in the S-digit, base-A form
// !
// !                sign ( X(S-1)*A**(S-1) + ... + X(1)*A + X(0) )
// !
// !                where 0 .LE. X(I) .LT. A for I=0,...,S-1.
// !     I1MACH( 7) = A, the base.
// !     I1MACH( 8) = S, the number of base-A digits.
// !     I1MACH( 9) = A**S - 1, the largest magnitude.
// !
// !   Floating-Point Numbers:
// !     Assume floating-point numbers are represented in the T-digit,
// !     base-B form
// !                sign (B**E)*( (X(1)/B) + ... + (X(T)/B**T) )
// !
// !                where 0 .LE. X(I) .LT. B for I=1,...,T,
// !                0 .LT. X(1), and EMIN .LE. E .LE. EMAX.
// !     I1MACH(10) = B, the base.
// !
// !   Single-Precision:
// !     I1MACH(11) = T, the number of base-B digits.
// !     I1MACH(12) = EMIN, the smallest exponent E.
// !     I1MACH(13) = EMAX, the largest exponent E.
// !
// !   Double-Precision:
// !     I1MACH(14) = T, the number of base-B digits.
// !     I1MACH(15) = EMIN, the smallest exponent E.
// !     I1MACH(16) = EMAX, the largest exponent E.
// !
// !   To alter this function for a particular environment, the desired
// !   set of DATA statements should be activated by removing the C from
// !   column 1.  Also, the values of I1MACH(1) - I1MACH(4) should be
// !   checked for consistency with the local operating system.
// !
// !***REFERENCES  P. A. Fox, A. D. Hall and N. L. Schryer, Framework for
// !                 a portable library, ACM Transactions on Mathematical
// !                 Software 4, 2 (June 1978), pp. 177-188.
// !***ROUTINES CALLED  (NONE)
// !***REVISION HISTORY  (YYMMDD)
// !   750101  DATE WRITTEN
// !   960411  Modified for Fortran 90 (BE after suggestions by EHG).
// !   980727  Modified value of I1MACH(6) (BE after suggestion by EHG).
// !***END PROLOGUE  I1MACH
// !
function i1mach(input) {
  var bitSize = 64; // JS is always 64bit
  // The following can be computed with the help of the frexp function in
  // utils/pythonHelpers:
  var digits = 53; // py.frexp(Number.MAX_SAFE_INTEGER)[1];
  var maxExponent = 1024; // py.frexp(Number.MAX_VALUE)[1];
  var minExponent = -1073; // py.frexp(Number.MIN_VALUE)[1];
  switch (input) {
    case 1:
      return 5;
    case 2:
      return 6;
    case 3:
      return 0;
    case 4:
      return 0;
    case 5:
      return bitSize;
    case 6:
      return 4;
    case 7:
      return 2;
    case 8:
      return bitSize - 1;
    case 9:
      return Number.MAX_VALUE;
    case 10:
      return 2;
    case 11:
      return digits;
    case 12:
      return minExponent;
    case 13:
      return maxExponent;
    case 14:
      return digits;
    case 15:
      return minExponent;
    case 16:
      return maxExponent;
    default:
      throw new Error('i1mach expects an integer 1-16.');
  }
}