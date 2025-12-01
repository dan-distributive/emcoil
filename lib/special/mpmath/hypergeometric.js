Object.defineProperty(exports, "__esModule", {
  value: true
});
function hypercomb(func) {
  // let terms = func(...params);

  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var discardKnownZeros = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
}

exports.hypercomb = hypercomb;