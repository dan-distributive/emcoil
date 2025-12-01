Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var error_calc = function () {
    function error_calc() {
        _classCallCheck(this, error_calc);
    }

    _createClass(error_calc, null, [{
        key: "rescale_error",
        value: function rescale_error(err, result_abs, result_asc) {

            err = Math.abs(err);

            if (result_asc !== 0 && err !== 0) {
                var scale = Math.pow(200 * err / result_asc, 1.5);

                if (scale < 1) {
                    err = result_asc * scale;
                } else {
                    err = result_asc;
                }
            }
            if (result_abs > Number.MIN_VALUE / (50 * Number.EPSILON)) {
                var min_err = 50 * Number.EPSILON * result_abs;

                if (min_err > err) {
                    err = min_err;
                }
            }

            return err;
        }
    }]);

    return error_calc;
}();

exports.default = error_calc;