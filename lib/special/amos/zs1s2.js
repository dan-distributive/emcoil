Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // SUBROUTINE ZS1S2(ZRR, ZRI, S1R, S1I, S2R, S2I, NZ, ASCLE, ALIM, IUF)
// ***BEGIN PROLOGUE  ZS1S2
// ***REFER TO  ZBESK,ZAIRY
//
//      ZS1S2 TESTS FOR A POSSIBLE UNDERFLOW RESULTING FROM THE
//      ADDITION OF THE I AND K FUNCTIONS IN THE ANALYTIC CON-
//      TINUATION FORMULA WHERE S1=K FUNCTION AND S2=I FUNCTION.
//      ON KODE=1 THE I AND K FUNCTIONS ARE DIFFERENT ORDERS OF
//      MAGNITUDE, BUT FOR KODE=2 THEY CAN BE OF THE SAME ORDER
//      OF MAGNITUDE AND THE MAXIMUM MUST BE AT LEAST ONE
//      PRECISION ABOVE THE UNDERFLOW LIMIT.
//
// ***ROUTINES CALLED  AZABS,AZEXP,AZLOG
// ***END PROLOGUE  ZS1S2


exports.zs1s2 = zs1s2;

var _zabs = require('./zabs.js');

var _zexp = require('./zexp.js');

var _zlog = require('./zlog.js');

function zs1s2(zrr, zri, s1r, s1i, s2r, s2i, ascle, alim, iuf) {
  var aa = void 0,
      aln = void 0,
      as1 = void 0,
      as2 = void 0,
      c1i = void 0,
      c1r = void 0,
      s1di = void 0,
      s1dr = void 0,
      zeroi = void 0,
      zeror = void 0,
      nz = void 0;
  zeror = 0;
  zeroi = 0;
  nz = 0;
  as1 = (0, _zabs.azabs)(s1r, s1i);
  as2 = (0, _zabs.azabs)(s2r, s2i);
  if (s1r === 0 && s1i === 0 || as1 === 0) {
    // go to 10
  } else {
    aln = -zrr - zrr + Math.log(as1);
    s1dr = s1r;
    s1di = s1i;
    s1r = zeror;
    s1i = zeroi;
    as1 = zeror;
    if (aln < -alim) {
      // go to 10
    } else {
      var _azlog = (0, _zlog.azlog)(s1dr, s1di);

      var _azlog2 = _slicedToArray(_azlog, 2);

      c1r = _azlog2[0];
      c1i = _azlog2[1];

      c1r = c1r - zrr - zrr;
      c1i = c1i - zri - zri;

      var _azexp = (0, _zexp.azexp)(c1r, c1i);

      var _azexp2 = _slicedToArray(_azexp, 2);

      s1r = _azexp2[0];
      s1i = _azexp2[1];

      as1 = (0, _zabs.azabs)(s1r, s1i);
      iuf = iuf + 1;
    }
  }
  // 10 continue
  aa = Math.max(as1, as2);
  if (aa > ascle) {
    return [s1r, s1i, s2r, s2i, nz, iuf];
  }
  s1r = zeror;
  s1i = zeroi;
  s2r = zeror;
  s2i = zeroi;
  nz = 1;
  iuf = 0;
  return [s1r, s1i, s2r, s2i, nz, iuf];
}