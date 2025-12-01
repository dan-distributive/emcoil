Object.defineProperty(exports, "__esModule", {
  value: true
});
function gammasgn(x) {
  var fx = void 0;

  if (isNaN(x)) {
    return x;
  }
  if (x > 0) {
    return 1.0;
  } else {
    fx = Math.floor(x);
    if (x - fx === 0.0) {
      return 0.0;
    } else if (fx % 2) {
      return -1.0;
    } else {
      return 1.0;
    }
  }
}

exports.gammasgn = gammasgn;