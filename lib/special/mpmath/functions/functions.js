Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = undefined;

var _complex = require('../../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sign(ctx, x) {
  if (!x || Number.isNaN(x)) return x;
  if (ctx._isRealType(x)) {
    if (x > 0) {
      return 1;
    } else {
      return -1;
    }
  }

  return _complex2.default.div(x, _complex2.default.abs(x));
}

exports.sign = sign;