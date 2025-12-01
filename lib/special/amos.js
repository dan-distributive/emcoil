Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.airyB = exports.airyA = exports.besselH = exports.besselK = exports.besselI = exports.besselY = exports.besselJ = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _complex = require('../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

var _zbesj = require('./amos/zbesj.js');

var _zbesy = require('./amos/zbesy.js');

var _zbesi = require('./amos/zbesi.js');

var _zbesk = require('./amos/zbesk.js');

var _zbesh = require('./amos/zbesh.js');

var _zairy = require('./amos/zairy.js');

var _zbiry = require('./amos/zbiry.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INPUT_ERROR = 'INPUT ERROR - NO COMPUTATION';
var OVERFLOW = 'OVERFLOW - NO COMPUTATION, ';
var DEFAULT_OVERFLOW = 'FNU IS TOO LARGE OR CABS(Z) IS TOO SMALL OR BOTH';
var HALF_ACCURACY = 'CABS(Z) OR FNU+N-1 LARGE - COMPUTATION DONE BUT LOSSES OF' + ' SIGNIFICANCE BY ARGUMENT REDUCTION PRODUCE LESS THAN HALF OF MACHINE ACCURACY.';
var TOO_LARGE = 'CABS(Z) OR FNU+N-1 TOO LARGE - NO COMPUTATION BECAUSE OF' + ' COMPLETE LOSSES OF SIGNIFICANCE BY ARGUMENT REDUCTION.';
var TERMINATION = 'ERROR - NO COMPUTATION ALGORITHM TERMINATION CONDITION NOT MET';

function besselCommon(nu, z, func, overflowMessage) {
  var hankelType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var nz = void 0,
      ierr = void 0;
  z = _complex2.default.ensureComplex(z);
  var n = 1;
  var cyr = new Array(1);
  var cyi = new Array(1);
  if (hankelType) {
    var _func = func(z[0], z[1], nu, 1, hankelType, n, cyr, cyi);

    var _func2 = _slicedToArray(_func, 2);

    nz = _func2[0];
    ierr = _func2[1];
  } else {
    var _func3 = func(z[0], z[1], nu, 1, n, cyr, cyi);

    var _func4 = _slicedToArray(_func3, 2);

    nz = _func4[0];
    ierr = _func4[1];
  }

  checkUnderflow(nz, func);
  checkErrorCode(ierr, overflowMessage, func);
  return [cyr[0], cyi[0]];
}

function airyCommon(z, func, overflowMessage) {
  z = _complex2.default.ensureComplex(z);

  var _func5 = func(z[0], z[1], 0, 1),
      _func6 = _slicedToArray(_func5, 4),
      air = _func6[0],
      aii = _func6[1],
      nz = _func6[2],
      ierr = _func6[3];

  checkUnderflow(nz, func);
  checkErrorCode(ierr, overflowMessage, func);
  return [air, aii];
}

function besselJ(nu, z) {
  var overflowMessage = 'AIMAG(Z) TOO LARGE ON KODE=1';
  return besselCommon(nu, z, _zbesj.zbesj, overflowMessage);
}

function besselY(nu, z) {
  var overflowMessage = DEFAULT_OVERFLOW;
  return besselCommon(nu, z, _zbesy.zbesy, overflowMessage);
}

function besselI(nu, z) {
  var overflowMessage = 'REAL(Z) TOO LARGE ON KODE=1';
  return besselCommon(nu, z, _zbesi.zbesi, overflowMessage);
}

function besselK(nu, z) {
  var overflowMessage = DEFAULT_OVERFLOW;
  return besselCommon(nu, z, _zbesk.zbesk, overflowMessage);
}

// Hankel functions type 1 or type 2
function besselH(nu, z, type) {
  var overflowMessage = DEFAULT_OVERFLOW;
  return besselCommon(nu, z, _zbesh.zbesh, overflowMessage, type);
}

function airyA(z) {
  var overflowMessage = 'REAL(ZTA) TOO LARGE ON KODE=1';
  return airyCommon(z, _zairy.zairy, overflowMessage);
}

function airyB(z) {
  var overflowMessage = 'REAL(Z) TOO LARGE ON KODE=1';
  return airyCommon(z, _zbiry.zbiry, overflowMessage);
}

function checkUnderflow(nz, func) {
  if (nz !== 0) {
    console.warn(func.name + ' returned nonzero number of underflows');
  }
}

function checkErrorCode(ierr, overflowMessage, func) {
  switch (ierr) {
    case 0:
      // NORMAL RETURN - COMPUTATION COMPLETED
      break;
    case 1:
      throw new Error(INPUT_ERROR);
    case 2:
      throw new Error(OVERFLOW + overflowMessage);
    case 3:
      throw new Error(HALF_ACCURACY);
    case 4:
      throw new Error(TOO_LARGE);
    case 5:
      throw new Error(TERMINATION);
    default:
      throw new Error('Unexpected error code from ' + func.name);
  }
}

exports.besselJ = besselJ;
exports.besselY = besselY;
exports.besselI = besselI;
exports.besselK = besselK;
exports.besselH = besselH;
exports.airyA = airyA;
exports.airyB = airyB;