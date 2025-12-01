Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ddDiv = exports.ddMul = exports.ddSub = exports.ddAdd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
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


var _ddIdefs = require('./ddIdefs.js');

var ddIdefs = _interopRequireWildcard(_ddIdefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ddNeg(a) {
  return [-a[0], -a[1]];
}

// dd_ieee_add in orig
function ddAdd(a, b) {
  var s1 = void 0,
      s2 = void 0,
      t1 = void 0,
      t2 = void 0;

  var _ddIdefs$twoSum = ddIdefs.twoSum(a[0], b[0]);

  var _ddIdefs$twoSum2 = _slicedToArray(_ddIdefs$twoSum, 2);

  s1 = _ddIdefs$twoSum2[0];
  s2 = _ddIdefs$twoSum2[1];

  var _ddIdefs$twoSum3 = ddIdefs.twoSum(a[1], b[1]);

  var _ddIdefs$twoSum4 = _slicedToArray(_ddIdefs$twoSum3, 2);

  t1 = _ddIdefs$twoSum4[0];
  t2 = _ddIdefs$twoSum4[1];

  s2 += t1;

  var _ddIdefs$quickTwoSum = ddIdefs.quickTwoSum(s1, s2);

  var _ddIdefs$quickTwoSum2 = _slicedToArray(_ddIdefs$quickTwoSum, 2);

  s1 = _ddIdefs$quickTwoSum2[0];
  s2 = _ddIdefs$quickTwoSum2[1];

  s2 += t2;

  var _ddIdefs$quickTwoSum3 = ddIdefs.quickTwoSum(s1, s2);

  var _ddIdefs$quickTwoSum4 = _slicedToArray(_ddIdefs$quickTwoSum3, 2);

  s1 = _ddIdefs$quickTwoSum4[0];
  s2 = _ddIdefs$quickTwoSum4[1];

  return [s1, s2];
}

// first arg double2[], second arg double
function ddAddDdD(a, b) {
  var s1 = void 0,
      s2 = void 0;

  var _ddIdefs$twoSum5 = ddIdefs.twoSum(a[0], b);

  var _ddIdefs$twoSum6 = _slicedToArray(_ddIdefs$twoSum5, 2);

  s1 = _ddIdefs$twoSum6[0];
  s2 = _ddIdefs$twoSum6[1];

  s2 += a[1];

  var _ddIdefs$quickTwoSum5 = ddIdefs.quickTwoSum(s1, s2);

  var _ddIdefs$quickTwoSum6 = _slicedToArray(_ddIdefs$quickTwoSum5, 2);

  s1 = _ddIdefs$quickTwoSum6[0];
  s2 = _ddIdefs$quickTwoSum6[1];

  return [s1, s2];
}

function ddSub(a, b) {
  return ddAdd(a, ddNeg(b));
}

function ddMul(a, b) {
  var p1 = void 0,
      p2 = void 0;

  var _ddIdefs$twoProd = ddIdefs.twoProd(a[0], b[0]);

  var _ddIdefs$twoProd2 = _slicedToArray(_ddIdefs$twoProd, 2);

  p1 = _ddIdefs$twoProd2[0];
  p2 = _ddIdefs$twoProd2[1];

  p2 += a[0] * b[1] + a[1] * b[0];

  var _ddIdefs$quickTwoSum7 = ddIdefs.quickTwoSum(p1, p2);

  var _ddIdefs$quickTwoSum8 = _slicedToArray(_ddIdefs$quickTwoSum7, 2);

  p1 = _ddIdefs$quickTwoSum8[0];
  p2 = _ddIdefs$quickTwoSum8[1];

  return [p1, p2];
}

// first arg double2[], second arg double
function ddMulDdD(a, b) {
  var p1 = void 0,
      p2 = void 0,
      e1 = void 0,
      e2 = void 0;

  var _ddIdefs$twoProd3 = ddIdefs.twoProd(a[0], b);

  var _ddIdefs$twoProd4 = _slicedToArray(_ddIdefs$twoProd3, 2);

  p1 = _ddIdefs$twoProd4[0];
  e1 = _ddIdefs$twoProd4[1];

  var _ddIdefs$twoProd5 = ddIdefs.twoProd(a[1], b);

  var _ddIdefs$twoProd6 = _slicedToArray(_ddIdefs$twoProd5, 2);

  p2 = _ddIdefs$twoProd6[0];
  e2 = _ddIdefs$twoProd6[1];

  var _ddIdefs$quickTwoSum9 = ddIdefs.quickTwoSum(p1, e2 + p2 + e1);

  var _ddIdefs$quickTwoSum10 = _slicedToArray(_ddIdefs$quickTwoSum9, 2);

  p1 = _ddIdefs$quickTwoSum10[0];
  e1 = _ddIdefs$quickTwoSum10[1];

  return [p1, e1];
}
// dd_accurate_div in original
function ddDiv(a, b) {
  var q1 = void 0,
      q2 = void 0,
      q3 = void 0,
      r = void 0;
  q1 = a[0] / b[0]; /* approximate quotient */

  r = ddSub(a, ddMulDdD(b, q1));

  q2 = r[0] / b[0];
  r = ddSub(r, ddMulDdD(b, q2));

  q3 = r[0] / b[0];

  var _ddIdefs$quickTwoSum11 = ddIdefs.quickTwoSum(q1, q2);

  var _ddIdefs$quickTwoSum12 = _slicedToArray(_ddIdefs$quickTwoSum11, 2);

  q1 = _ddIdefs$quickTwoSum12[0];
  q2 = _ddIdefs$quickTwoSum12[1];

  r = ddAddDdD([q1, q2], q3);
  return r;
}

exports.ddAdd = ddAdd;
exports.ddSub = ddSub;
exports.ddMul = ddMul;
exports.ddDiv = ddDiv;