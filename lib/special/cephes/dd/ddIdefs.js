Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*
 * Ported to ECMAScript 2018 by KC Erb of Kings Distributed Systems from
 * original C code which contained the following:
 *
 * This work was supported by the Director, Office of Science, Division
 * of Mathematical, Information, and Computational Sciences of the
 * U.S. Department of Energy under contract numbers DE-AC03-76SF00098 and
 * DE-AC02-05CH11231.
 *
 * Copyright (c) 2003-2009, The Regents of the University of California,
 * through Lawrence Berkeley National Laboratory (subject to receipt of
 * any required approvals from U.S. Dept. of Energy) All rights reserved.
 *
 * By downloading or using this software you are agreeing to the modified
 * BSD license "BSD-LBNL-License.doc" (see LICENSE.txt).
 */
/*
 * Contains small functions (suitable for inlining) in the double-double
 * arithmetic package.
 */
var _DD_SPLIT_THRESH = 6.69692879491417e+299; // = 2^996
var _DD_SPLITTER = 134217729.0; // = 2^27 + 1

function twoSum(a, b) {
  var s = a + b;
  var c = s - a;
  var d = b - c;
  var e = s - c;
  var err = a - e + d;
  return [s, err];
}

function quickTwoSum(a, b) {
  var s = a + b;
  var c = s - a;
  var err = b - c;
  return [s, err];
}

/* Computes fl(a*b) and err(a*b). */
function twoProd(a, b) {
  var aHi = void 0,
      aLo = void 0,
      bHi = void 0,
      bLo = void 0,
      c = void 0,
      d = void 0,
      err = void 0;
  var p = a * b;

  var _twoSplit = twoSplit(a);

  var _twoSplit2 = _slicedToArray(_twoSplit, 2);

  aHi = _twoSplit2[0];
  aLo = _twoSplit2[1];

  var _twoSplit3 = twoSplit(b);

  var _twoSplit4 = _slicedToArray(_twoSplit3, 2);

  bHi = _twoSplit4[0];
  bLo = _twoSplit4[1];

  c = aHi * bHi - p;
  d = c + aHi * bLo + aLo * bHi;
  err = d + aLo * bLo;
  return [p, err];
}

/* Computes high word and lo word of a */
function twoSplit(a) {
  var temp = void 0,
      tempma = void 0,
      hi = void 0,
      lo = void 0;
  if (a > _DD_SPLIT_THRESH || a < -_DD_SPLIT_THRESH) {
    a *= 3.7252902984619140625e-09; // 2^-28
    temp = _DD_SPLITTER * a;
    tempma = temp - a;
    hi = temp - tempma;
    lo = a - hi;
    hi *= 268435456.0; // 2^28
    lo *= 268435456.0; // 2^28
  } else {
    temp = _DD_SPLITTER * a;
    tempma = temp - a;
    hi = temp - tempma;
    lo = a - hi;
  }
  return [hi, lo];
}

exports.twoSum = twoSum;
exports.quickTwoSum = quickTwoSum;
exports.twoProd = twoProd;