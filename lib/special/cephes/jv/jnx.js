Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jnx = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _airy3 = require('../airy.js');

var _polevl = require('../polevl.js');

var _jnt = require('./jnt.js');

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Asymptotic expansion for large n.
* AMS55 #9.3.35.
*/
var lambda = [1.0, 1.041666666666666666666667E-1, 8.355034722222222222222222E-2, 1.282265745563271604938272E-1, 2.918490264641404642489712E-1, 8.816272674437576524187671E-1, 3.321408281862767544702647E+0, 1.499576298686255465867237E+1, 7.892301301158651813848139E+1, 4.744515388682643231611949E+2, 3.207490090890661934704328E+3];

var mu = [1.0, -1.458333333333333333333333E-1, -9.874131944444444444444444E-2, -1.433120539158950617283951E-1, -3.172272026784135480967078E-1, -9.424291479571202491373028E-1, -3.511203040826354261542798E+0, -1.572726362036804512982712E+1, -8.228143909718594444224656E+1, -4.923553705236705240352022E+2, -3.316218568547972508762102E+3];

var P1 = [-2.083333333333333333333333E-1, 1.250000000000000000000000E-1];

var P2 = [3.342013888888888888888889E-1, -4.010416666666666666666667E-1, 7.031250000000000000000000E-2];

var P3 = [-1.025812596450617283950617E+0, 1.846462673611111111111111E+0, -8.912109375000000000000000E-1, 7.324218750000000000000000E-2];

var P4 = [4.669584423426247427983539E+0, -1.120700261622299382716049E+1, 8.789123535156250000000000E+0, -2.364086914062500000000000E+0, 1.121520996093750000000000E-1];

var P5 = [-2.8212072558200244877E1, 8.4636217674600734632E1, -9.1818241543240017361E1, 4.2534998745388454861E1, -7.3687943594796316964E0, 2.27108001708984375E-1];

var P6 = [2.1257013003921712286E2, -7.6525246814118164230E2, 1.0599904525279998779E3, -6.9957962737613254123E2, 2.1819051174421159048E2, -2.6491430486951555525E1, 5.7250142097473144531E-1];

var P7 = [-1.9194576623184069963E3, 8.0617221817373093845E3, -1.3586550006434137439E4, 1.1655393336864533248E4, -5.3056469786134031084E3, 1.2009029132163524628E3, -1.0809091978839465550E2, 1.7277275025844573975E0];

function jnx(n, x) {
  var zeta = void 0,
      sqz = void 0,
      zz = void 0,
      zp = void 0,
      np = void 0,
      cbn = void 0,
      n23 = void 0,
      t = void 0,
      z = void 0,
      sz = void 0,
      pp = void 0,
      qq = void 0,
      z32i = void 0,
      zzi = void 0,
      ak = void 0,
      bk = void 0,
      akl = void 0,
      bkl = void 0,
      sign = void 0,
      doa = void 0,
      dob = void 0,
      nflg = void 0,
      k = void 0,
      s = void 0,
      tk = void 0,
      tkp1 = void 0,
      m = void 0,
      ai = void 0,
      aip = void 0,
      bi = void 0,
      bip = void 0,
      uArr = void 0;
  uArr = new Float64Array(8);

  /* Test for x very close to n. Use expansion for transition region if so. */
  cbn = Math.cbrt(n);
  z = (x - n) / cbn;
  if (Math.abs(z) <= 0.7) return (0, _jnt.jnt)(n, x);

  z = x / n;
  zz = 1.0 - z * z;
  if (zz === 0.0) return 0.0;

  if (zz > 0.0) {
    sz = Math.sqrt(zz);
    t = 1.5 * (Math.log((1.0 + sz) / z) - sz); /* zeta ** 3/2          */
    zeta = Math.cbrt(t * t);
    nflg = 1;
  } else {
    sz = Math.sqrt(-zz);
    t = 1.5 * (sz - Math.acos(1.0 / z));
    zeta = -Math.cbrt(t * t);
    nflg = -1;
  }
  z32i = Math.abs(1.0 / t);
  sqz = Math.cbrt(t);

  /* Airy function */
  n23 = Math.cbrt(n * n);
  t = n23 * zeta;

  /* polynomials in expansion */
  var _airy = (0, _airy3.airy)(t, ai, aip, bi, bip);

  var _airy2 = _slicedToArray(_airy, 4);

  ai = _airy2[0];
  aip = _airy2[1];
  bi = _airy2[2];
  bip = _airy2[3];
  uArr[0] = 1.0;
  zzi = 1.0 / zz;
  uArr[1] = (0, _polevl.polevl)(zzi, P1, 1) / sz;
  uArr[2] = (0, _polevl.polevl)(zzi, P2, 2) / zz;
  uArr[3] = (0, _polevl.polevl)(zzi, P3, 3) / (sz * zz);
  pp = zz * zz;
  uArr[4] = (0, _polevl.polevl)(zzi, P4, 4) / pp;
  uArr[5] = (0, _polevl.polevl)(zzi, P5, 5) / (pp * sz);
  pp *= zz;
  uArr[6] = (0, _polevl.polevl)(zzi, P6, 6) / pp;
  uArr[7] = (0, _polevl.polevl)(zzi, P7, 7) / (pp * sz);

  pp = 0.0;
  qq = 0.0;
  np = 1.0;
  /* flags to stop when terms get larger */
  doa = 1;
  dob = 1;
  akl = Infinity;
  bkl = Infinity;

  for (k = 0; k <= 3; k++) {
    tk = 2 * k;
    tkp1 = tk + 1;
    zp = 1.0;
    ak = 0.0;
    bk = 0.0;
    for (s = 0; s <= tk; s++) {
      if (doa) {
        if ((s & 3) > 1) sign = nflg;else sign = 1;
        ak += sign * mu[s] * zp * uArr[tk - s];
      }

      if (dob) {
        m = tkp1 - s;
        if ((m + 1 & 3) > 1) sign = nflg;else sign = 1;
        bk += sign * lambda[s] * zp * uArr[m];
      }
      zp *= z32i;
    }

    if (doa) {
      ak *= np;
      t = Math.abs(ak);
      if (t < akl) {
        akl = t;
        pp += ak;
      } else {
        doa = 0;
      }
    }

    if (dob) {
      bk += lambda[tkp1] * zp * uArr[0];
      bk *= -np / sqz;
      t = Math.abs(bk);
      if (t < bkl) {
        bkl = t;
        qq += bk;
      } else {
        dob = 0;
      }
    }

    if (np < constants.MACHEP) break;
    np /= n * n;
  }

  /* normalizing factor ( 4*zeta/(1 - z**2) )**1/4    */
  t = 4.0 * zeta / zz;
  t = Math.sqrt(Math.sqrt(t));

  t *= ai * pp / Math.cbrt(n) + aip * qq / (n23 * n);
  return t;
}

exports.jnx = jnx;