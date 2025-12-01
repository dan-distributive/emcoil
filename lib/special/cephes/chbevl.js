Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file        chbevl.js        Evaluate Chebyshev series
 *
 *
 *
 *
 * SYNOPSIS:
 *
 * int N;
 * double x, y, coef[N], chebevl();
 *
 * y = chbevl( x, coef, N );
 *
 *
 *
 * DESCRIPTION:
 *
 * Evaluates the series
 *
 *        N-1
 *         - '
 *  y  =   >   coef[i] T (x/2)
 *         -            i
 *        i=0
 *
 * of Chebyshev polynomials Ti at argument x/2.
 *
 * Coefficients are stored in reverse order, i.e. the zero
 * order term is last in the array.  Note N is the number of
 * coefficients, not the order.
 *
 * If coefficients are for the interval a to b, x must
 * have been transformed to x -> 2(2x - b - a)/(b-a) before
 * entering the routine.  This maps x from (a, b) to (-1, 1),
 * over which the Chebyshev polynomials are defined.
 *
 * If the coefficients are for the inverted interval, in
 * which (a, b) is mapped to (1/b, 1/a), the transformation
 * required is x -> 2(2ab/x - b - a)/(b-a).  If b is infinity,
 * this becomes x -> 4a/x - 1.
 *
 *
 *
 * SPEED:
 *
 * Taking advantage of the recurrence properties of the
 * Chebyshev polynomials, the routine requires one more
 * addition per loop than evaluating a nested polynomial of
 * the same degree.
 *
 *
 * Cephes Math Library Release 2.0:  April, 1987
 * Copyright 1985, 1987 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */
function chbevl(x, array, n) {
  var b0 = void 0,
      b1 = void 0,
      b2 = void 0,
      i = void 0;

  b0 = array[0];
  b1 = 0.0;

  for (i = 1; i < n; i++) {
    b2 = b1;
    b1 = b0;
    b0 = x * b1 - b2 + array[i];
  }

  return 0.5 * (b0 - b2);
}

exports.chbevl = chbevl;