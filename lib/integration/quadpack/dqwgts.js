Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dqwgts = dqwgts;
function dqwgts(x, a, b, alfa, beta, integr) {
  var bmx = void 0,
      xma = void 0,
      dqwgtsResult = void 0;
  xma = x - a;
  bmx = b - x;
  dqwgtsResult = xma ** alfa * bmx ** beta;
  switch (integr) {
    case 1:
      return dqwgtsResult;
    case 3:
      return dqwgtsResult * Math.log(bmx);
    case 4:
      return dqwgtsResult * Math.log(xma) * Math.log(bmx);
    default:
      return dqwgtsResult * Math.log(xma);
  }
}