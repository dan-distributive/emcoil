Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @file     polevl.js       Evaluate polynomial
 *
 *
 *
 * SYNOPSIS:
 *
 * int N;
 * double x, y, coef[N+1], polevl[];
 *
 * y = polevl( x, coef, N );
 *
 *
 *
 * DESCRIPTION:
 *
 * Evaluates polynomial of degree N:
 *
 *                     2          N
 * y  =  C  + C x + C x  +...+ C x
 *        0    1     2          N
 *
 * Coefficients are stored in reverse order:
 *
 * coef[0] = C  , ..., coef[N] = C  .
 *            N                   0
 *
 *  The function p1evl() assumes that coef[N] = 1.0 and is
 * omitted from the array.  Its calling arguments are
 * otherwise the same as polevl().
 *
 *
 * SPEED:
 *
 * In the interest of speed, there are no checks for out
 * of bounds arithmetic.  This routine is used by most of
 * the functions in the library.  Depending on available
 * equipment features, the user may wish to rewrite the
 * program in microcode or assembly language.
 *
 * Cephes Math Library Release 2.1:  December, 1988
 * Copyright 1984, 1987, 1988 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */
function polevl(x, coef, n) {
  var ans = void 0,
      i = void 0;
  ans = coef[0];
  for (i = 1; i <= n; i++) {
    ans = ans * x + coef[i];
  }

  return ans;
}

function p1evl(x, coef, n) {
  var ans = void 0,
      i = void 0;

  ans = x + coef[0];

  for (i = 1; i < n; i++) {
    ans = ans * x + coef[i];
  }

  return ans;
};

// TODO: ratevl

exports.polevl = polevl;
exports.p1evl = p1evl;