Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.d1mach = d1mach;
// !***BEGIN PROLOGUE  D1MACH
// !***PURPOSE  Return floating point machine dependent constants.
// !***LIBRARY   SLATEC
// !***CATEGORY  R1
// !***TYPE      SINGLE PRECISION (D1MACH-S, D1MACH-D)
// !***KEYWORDS  MACHINE CONSTANTS
// !***AUTHOR  Fox, P. A., (Bell Labs)
// !           Hall, A. D., (Bell Labs)
// !           Schryer, N. L., (Bell Labs)
// !***DESCRIPTION
// !
// !   D1MACH can be used to obtain machine-dependent parameters for the
// !   local machine environment.  It is a function subprogram with one
// !   (input) argument, and can be referenced as follows:
// !
// !        A = D1MACH(I)
// !
// !   where I=1,...,5.  The (output) value of A above is determined by
// !   the (input) value of I.  The results for various values of I are
// !   discussed below.
// !
// !   D1MACH(1) = B**(EMIN-1), the smallest positive magnitude.
// !   D1MACH(2) = B**EMAX*(1 - B**(-T)), the largest magnitude.
// !   D1MACH(3) = B**(-T), the smallest relative spacing.
// !   D1MACH(4) = B**(1-T), the largest relative spacing.
// !   D1MACH(5) = LOG10(B)
// !
// !   Assume single precision numbers are represented in the T-digit,
// !   base-B form
// !
// !              sign (B**E)*( (X(1)/B) + ... + (X(T)/B**T) )
// !
// !   where 0 .LE. X(I) .LT. B for I=1,...,T, 0 .LT. X(1), and
// !   EMIN .LE. E .LE. EMAX.
// !
// !   The values of B, T, EMIN and EMAX are provided in I1MACH as
// !   follows:
// !   I1MACH(10) = B, the base.
// !   I1MACH(11) = T, the number of base-B digits.
// !   I1MACH(12) = EMIN, the smallest exponent E.
// !   I1MACH(13) = EMAX, the largest exponent E.
// !
// !
// !***REFERENCES  P. A. Fox, A. D. Hall and N. L. Schryer, Framework for
// !                 a portable library, ACM Transactions on Mathematical
// !                 Software 4, 2 (June 1978), pp. 177-188.
// !***ROUTINES CALLED  XERMSG
// !***REVISION HISTORY  (YYMMDD)
// !   790101  DATE WRITTEN
// !   960329  Modified for Fortran 90 (BE after suggestions by EHG)
// !***END PROLOGUE  D1MACH
// !
function d1mach(input) {
  switch (input) {
    case 1:
      return Number.MIN_VALUE;
    case 2:
      return Number.MAX_VALUE;
    case 3:
      return Number.EPSILON / 2; // the smallest relative spacing.
    case 4:
      return Number.EPSILON; // the largest relative spacing.
    case 5:
      return Math.log10(2);
    default:
      throw new Error('d1mach expects an integer 1-5.');
  }
}