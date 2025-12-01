Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lgam;
/* Logarithm of Gamma function */
// TODO - Handle `sign` pointer conversion properly.
function lgam(x) {
  var sign = null;
  return lgam_sgn(x, sign);
};