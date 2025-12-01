Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errorCalc = require('./errorCalc.js');

var _errorCalc2 = _interopRequireDefault(_errorCalc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var quadKronMain = function () {
  function quadKronMain() {
    _classCallCheck(this, quadKronMain);

    this.dependencies = {

      errorCalc: ['rescaleError']
    };
  }

  _createClass(quadKronMain, null, [{
    key: 'qk',
    value: function qk(n, xgk, wg, wgk, fv1, fv2, f, a, b, result, abserr, resabs, resasc) {
      var center = 0.5 * (a + b);
      var halfLength = 0.5 * (b - a);

      var absHalfLength = Math.abs(halfLength);
      var fCenter = f(center);

      var resultGauss = 0;
      var resultKonrad = fCenter * wgk[n - 1];

      var fval1 = void 0,
          fval2 = void 0,
          fsum = void 0,
          mean = void 0,
          resultAsc = void 0,
          err = void 0,
          j = void 0;
      var resultAbs = Math.abs(resultKonrad);

      if (n % 2 === 0) {
        resultGauss = fCenter * wg[n / 2 - 1];
      }

      n = n - 1;
      for (j = 0; j < (n - 1) / 2; j++) {
        var jtw = j * 2 + 1; /* in original fortran j=1,2,3 jtw=2,4,6 */

        var abscissa = halfLength * xgk[jtw];
        fval1 = f(center - abscissa);
        fval2 = f(center + abscissa);

        fsum = fval1 + fval2;

        fv1[jtw] = fval1;
        fv2[jtw] = fval2;
        resultGauss += wg[j] * fsum;
        resultKonrad += wgk[jtw] * fsum;
        resultAbs += wgk[jtw] * (Math.abs(fval1) + Math.abs(fval2));
      }

      for (j = 0; j < n / 2; j++) {
        var jtwm1 = j * 2;
        var _abscissa = halfLength * xgk[jtwm1];

        fval1 = f(center - _abscissa);
        fval2 = f(center + _abscissa);

        fv1[jtwm1] = fval1;
        fv2[jtwm1] = fval2;
        resultKonrad += wgk[jtwm1] * (fval1 + fval2);
        resultAbs += wgk[jtwm1] * (Math.abs(fval1) + Math.abs(fval2));
      }

      mean = resultKonrad * 0.5;

      resultAsc = wgk[n - 1] * Math.abs(fCenter - mean);

      for (j = 0; j < n; j++) {
        resultAsc += wgk[j] * (Math.abs(fv1[j] - mean) + Math.abs(fv2[j] - mean));
      }

      /* scale by the width of the integration region */
      err = (resultKonrad - resultGauss) * halfLength;

      resultKonrad = resultKonrad * halfLength;
      resultAbs *= absHalfLength;
      resultAsc *= absHalfLength;

      result[0] = resultKonrad;
      resabs[0] = resultAbs;
      resasc[0] = resultAsc;
      abserr[0] = _errorCalc2.default.rescaleError(err, resultAbs, resultAsc);
    }
  }]);

  return quadKronMain;
}();

exports.default = quadKronMain;