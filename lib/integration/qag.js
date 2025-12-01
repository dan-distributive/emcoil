Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // QAG (quadrature, adaptive, general) integration routine from the QUADPACK


var _quadgkN = require('./quadgkN.js');

var _quadgkN2 = _interopRequireDefault(_quadgkN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var qag = function () {
  function qag() {
    _classCallCheck(this, qag);

    this.dependencies = {
      quadgkN: ['q15', 'q61']
    };
  }

  _createClass(qag, null, [{
    key: 'qagIntegral',
    value: function qagIntegral(f, a, b) {
      var epsabs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1e-10;
      var epsrel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1e-6;
      var limit = arguments[5];
      var key = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var result = arguments[7];
      var abserr = arguments[8];

      var q = void 0,
          tolerance = void 0,
          aI = void 0,
          bI = void 0,
          rI = void 0,
          eI = void 0;

      if (key === 0) {
        q = _quadgkN2.default.qk15;
      } else if (key === 1) {
        q = _quadgkN2.default.qk61;
      }

      var area = new Float64Array([0]);
      var errsum = new Float64Array([0]);

      var iteration = 0;
      var roundoffType1 = 0; // eslint-disable-line no-unused-vars
      var roundoffType2 = 0; // eslint-disable-line no-unused-vars
      // let errorType = 0;

      result[0] = 0;
      abserr[0] = 0;

      if (epsabs <= 0 || epsrel < 50 * Number.EPSILON) {
        epsrel = 50 * Number.EPSILON;
      }

      var area1 = new Float64Array([0]);
      var area2 = new Float64Array([0]);
      var area12 = new Float64Array([0]);

      var error1 = new Float64Array([0]);
      var error2 = new Float64Array([0]);
      var error12 = new Float64Array([0]);

      var resasc1 = new Float64Array([0]);
      var resasc2 = new Float64Array([0]);
      var resabs1 = new Float64Array([0]);
      var resabs2 = new Float64Array([0]);

      var e0 = 0;
      var r0 = 0;

      var S = [[a, b, r0, e0]];

      area[0] = 0;
      errsum[0] = 0;

      do {
        var _S$pop = S.pop();

        var _S$pop2 = _slicedToArray(_S$pop, 4);

        aI = _S$pop2[0];
        bI = _S$pop2[1];
        rI = _S$pop2[2];
        eI = _S$pop2[3];


        var m = 0.5 * (aI + bI);

        q(f, aI, m, area1, error1, resabs1, resasc1);
        q(f, m, bI, area2, error2, resabs2, resasc2);

        area12[0] = area1[0] + area2[0];
        error12[0] = error1[0] + error2[0];

        errsum[0] = errsum[0] + error12[0] - eI;

        area[0] = area[0] + area12[0] - rI;

        if (resasc1[0] !== error1[0] && resasc2[0] !== error2[0]) {
          var delta = rI - area12[0];

          if (Math.abs(delta) <= 1.0e-6 * Math.abs(area12[0]) && error12[0] >= 0.99 * eI) {
            roundoffType1++;
            break;
          }
          if (iteration >= 10 && error12[0] > eI) {
            roundoffType2++;
            break;
          }
        }

        tolerance = Math.max(epsabs, epsrel * Math.abs(area12[0]));

        if (error1[0] > tolerance) {
          S.push([a, m, area1[0], error1[0]]);
        }
        if (error2[0] > tolerance) {
          S.push([m, b, area2[0], error2[0]]);
        }

        iteration++;
      } while (iteration < limit && errsum[0] > tolerance && S.length !== 0);

      result[0] = area[0];
      abserr[0] = errsum[0];
    }
  }]);

  return qag;
}();

exports.default = qag;