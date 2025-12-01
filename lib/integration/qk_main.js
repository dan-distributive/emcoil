Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _error_calc = require('./error_calc.js');

var _error_calc2 = _interopRequireDefault(_error_calc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var quad_kron_main = function () {
    function quad_kron_main() {
        _classCallCheck(this, quad_kron_main);

        this.dependencies = {

            error_calc: ['rescale_error']
        };
    }

    _createClass(quad_kron_main, null, [{
        key: 'qk',
        value: function qk(n, xgk, wg, wgk, fv1, fv2, f, a, b, result, abserr, resabs, resasc) {

            var center = 0.5 * (a + b);
            var half_length = 0.5 * (b - a);

            var abs_half_length = Math.abs(half_length);
            var f_center = f(center);

            var result_gauss = 0;
            var result_kronrod = f_center * wgk[n - 1];

            var fval1 = void 0,
                fval2 = void 0,
                fsum = void 0;
            var mean = void 0,
                result_asc = void 0,
                err = void 0;
            var result_abs = Math.abs(result_kronrod);

            var j = void 0;

            if (n % 2 === 0) {
                result_gauss = f_center * wg[n / 2 - 1];
            }

            n = n - 1;
            for (j = 0; j < (n - 1) / 2; j++) {
                var jtw = j * 2 + 1; /* in original fortran j=1,2,3 jtw=2,4,6 */

                var abscissa = half_length * xgk[jtw];
                fval1 = f(center - abscissa);
                fval2 = f(center + abscissa);

                fsum = fval1 + fval2;

                fv1[jtw] = fval1;
                fv2[jtw] = fval2;
                result_gauss += wg[j] * fsum;
                result_kronrod += wgk[jtw] * fsum;
                result_abs += wgk[jtw] * (Math.abs(fval1) + Math.abs(fval2));
            }

            for (j = 0; j < n / 2; j++) {
                var jtwm1 = j * 2;
                var _abscissa = half_length * xgk[jtwm1];

                fval1 = f(center - _abscissa);
                fval2 = f(center + _abscissa);

                fv1[jtwm1] = fval1;
                fv2[jtwm1] = fval2;
                result_kronrod += wgk[jtwm1] * (fval1 + fval2);
                result_abs += wgk[jtwm1] * (Math.abs(fval1) + Math.abs(fval2));
            }

            mean = result_kronrod * 0.5;

            result_asc = wgk[n - 1] * Math.abs(f_center - mean);

            for (j = 0; j < n; j++) {
                result_asc += wgk[j] * (Math.abs(fv1[j] - mean) + Math.abs(fv2[j] - mean));
            }

            /* scale by the width of the integration region */

            err = (result_kronrod - result_gauss) * half_length;

            result_kronrod = result_kronrod * half_length;
            result_abs *= abs_half_length;
            result_asc *= abs_half_length;

            result[0] = result_kronrod;
            resabs[0] = result_abs;
            resasc[0] = result_asc;
            abserr[0] = _error_calc2.default.rescale_error(err, result_abs, result_asc);
        }
    }]);

    return quad_kron_main;
}();

exports.default = quad_kron_main;