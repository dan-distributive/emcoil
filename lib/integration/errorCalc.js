Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var errorCalc = function () {
    function errorCalc() {
        _classCallCheck(this, errorCalc);
    }

    _createClass(errorCalc, null, [{
        key: "rescaleError",
        value: function rescaleError(err, resultAbs, resultAsc) {
            err = Math.abs(err);

            if (resultAsc !== 0 && err !== 0) {
                var scale = Math.pow(200 * err / resultAsc, 1.5);

                if (scale < 1) {
                    err = resultAsc * scale;
                } else {
                    err = resultAsc;
                }
            }
            if (resultAbs > Number.MIN_VALUE / (50 * Number.EPSILON)) {
                var minErr = 50 * Number.EPSILON * resultAbs;

                if (minErr > err) {
                    err = minErr;
                }
            }

            return err;
        }
    }]);

    return errorCalc;
}();

exports.default = errorCalc;