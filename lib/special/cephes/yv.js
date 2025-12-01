Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yv = undefined;

var _jv = require('./jv.js');

var _yn = require('./yn.js');

/**
 * @file     yv.js    Bessel function of second kind of non-integer order
 *
 * Cephes Math Library Release 2.8: June, 2000
 * Copyright 1984, 1987, 2000 by Stephen L. Moshier
 * Ported to ECMAScript 2018
 * Copyright (c) 2018, Kings Distributed Systems
 *
 * @author      KC Erb, kc@kcerb.com
 * @date        April 2018
 */
function yv(v, x) {
  var y = void 0,
      t = void 0,
      n = void 0;
  n = Math.trunc(v);
  if (n === v) {
    y = (0, _yn.yn)(n, x);
    return y;
  } else if (v === Math.floor(v)) {
    /* Zero in denominator. */
    // mtherr('yv', DOMAIN);
    return NaN;
  }

  t = Math.PI * v;
  y = (Math.cos(t) * (0, _jv.jv)(v, x) - (0, _jv.jv)(-v, x)) / Math.sin(t);

  if (!isFinite(y)) {
    if (v > 0) {
      // mtherr('yv', OVERFLOW);
      return -Infinity;
    } else if (v < -1e10) {
      /* Whether it's +inf or -inf is numerically ill-defined. */
      // mtherr('yv', DOMAIN);
      return NaN;
    }
  }

  return y;
}

exports.yv = yv;