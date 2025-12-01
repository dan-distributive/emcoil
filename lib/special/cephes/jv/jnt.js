Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jnt = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _airy3 = require('../airy.js');

var _polevl = require('../polevl.js');

/* Asymptotic expansion for transition region,
* n large and x close to n.
* AMS55 #9.3.23.
*/
var PF2 = [-9.0000000000000000000e-2, 8.5714285714285714286e-2];

var PF3 = [1.3671428571428571429e-1, -5.4920634920634920635e-2, -4.4444444444444444444e-3];

var PF4 = [1.3500000000000000000e-3, -1.6036054421768707483e-1, 4.2590187590187590188e-2, 2.7330447330447330447e-3];

var PG1 = [-2.4285714285714285714e-1, 1.4285714285714285714e-2];

var PG2 = [-9.0000000000000000000e-3, 1.9396825396825396825e-1, -1.1746031746031746032e-2];

var PG3 = [1.9607142857142857143e-2, -1.5983694083694083694e-1, 6.3838383838383838384e-3];

function jnt(n, x) {
  var z = void 0,
      zz = void 0,
      z3 = void 0,
      cbn = void 0,
      n23 = void 0,
      cbtwo = void 0,
      ai = void 0,
      aip = void 0,
      bi = void 0,
      bip = void 0,
      nk = void 0,
      fk = void 0,
      gk = void 0,
      pp = void 0,
      qq = void 0,
      k = void 0;

  var fArr = new Float64Array(5);
  var gArr = new Float64Array(4);

  cbn = Math.cbrt(n);
  z = (x - n) / cbn;
  cbtwo = Math.cbrt(2.0);

  /* Airy function */
  zz = -cbtwo * z;

  /* polynomials in expansion */
  var _airy = (0, _airy3.airy)(zz, ai, aip, bi, bip);

  var _airy2 = _slicedToArray(_airy, 4);

  ai = _airy2[0];
  aip = _airy2[1];
  bi = _airy2[2];
  bip = _airy2[3];
  zz = z * z;
  z3 = zz * z;
  fArr[0] = 1.0;
  fArr[1] = -z / 5.0;
  fArr[2] = (0, _polevl.polevl)(z3, PF2, 1) * zz;
  fArr[3] = (0, _polevl.polevl)(z3, PF3, 2);
  fArr[4] = (0, _polevl.polevl)(z3, PF4, 3) * z;
  gArr[0] = 0.3 * zz;
  gArr[1] = (0, _polevl.polevl)(z3, PG1, 1);
  gArr[2] = (0, _polevl.polevl)(z3, PG2, 2) * z;
  gArr[3] = (0, _polevl.polevl)(z3, PG3, 2) * zz;

  pp = 0.0;
  qq = 0.0;
  nk = 1.0;
  n23 = Math.cbrt(n * n);

  for (k = 0; k <= 4; k++) {
    fk = fArr[k] * nk;
    pp += fk;
    if (k !== 4) {
      gk = gArr[k] * nk;
      qq += gk;
    }

    nk /= n23;
  }

  fk = cbtwo * ai * pp / cbn + Math.cbrt(4.0) * aip * qq / n;
  return fk;
}

exports.jnt = jnt;