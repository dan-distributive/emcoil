Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://gcc.gnu.org/onlinedocs/gcc-3.4.4/g77/Sign-Intrinsic.html#Sign-Intrinsic
function sign(a, b) {
  var s = b >= 0 ? 1 : -1;
  return Math.abs(a) * s;
}

exports.sign = sign;