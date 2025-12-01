Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gammaprod = undefined;

var _ctx = require('../ctx.js');

var ctx = _interopRequireWildcard(_ctx);

var _complex = require('../../../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function gammaprod(a, b) {
  var _infsign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  a = a.map(function (x) {
    return ctx.convert(x);
  });
  b = b.map(function (x) {
    return ctx.convert(x);
  });
  var polesNum = [];
  var polesDen = [];
  var regularNum = [];
  var regularDen = [];

  var sign = void 0;

  a.map(function (x) {
    if (ctx.isnpint(x)) {
      polesNum.push(x);
    } else {
      regularNum.push(x);
    }
  });

  b.map(function (x) {
    if (ctx.isnpint(x)) {
      polesDen.push(x);
    } else {
      regularDen.push(x);
    }
  });

  // One more pole in numerator or denominator gives 0 or inf
  if (polesNum.length < polesDen.length) return 0;
  if (polesNum.length > polesDen.length) {
    // Get correct sign of infinity for x+h, h -> 0 from above
    // XXX: hack, this should be done properly
    if (_infsign) {
      var _a, _b;

      a = polesNum.map(function (x) {
        return x && (_complex2.default.mul(x, 1 + ctx.eps) || _complex2.default.add(x, ctx.eps));
      });
      b = polesDen.map(function (x) {
        return x && (_complex2.default.mul(x, 1 + ctx.eps) || _complex2.default.add(x, ctx.eps));
      });
      sign = ctx.sign(ctx.gammaprod((_a = a).push.apply(_a, regularNum), (_b = b).push.apply(_b, regularDen)));
      return _complex2.default.mul(sign, Infinity);
    } else {
      return Infinity;
    }
  }
  // All poles cancel
  // lim G(i)/G(j) = (-1)**(i+j) * gamma(1-j) / gamma(1-i)
  var p = 1;
  var orig = ctx.prec;
  try {
    ctx.prec = orig + 15;
    while (polesNum.length > 0) {
      var i = polesNum.pop();
      var j = polesDen.pop();
      var iPlusJ = _complex2.default.add(i, j);
      sign = _complex2.default.pow(-1, iPlusJ);
      var gammaOneMinusJ = ctx.gamma(_complex2.default.sub(1, j));
      var gammaOneMinusI = ctx.gamma(_complex2.default.sub(1, i));
      var quotient = _complex2.default.div(gammaOneMinusJ, gammaOneMinusI);
      p *= _complex2.default.mul(sign, quotient);
    }
    regularNum.forEach(function (x) {
      p = _complex2.default.mul(p, ctx.gamma(x));
    });
    regularDen.forEach(function (x) {
      p = _complex2.default.div(p, ctx.gamma(x));
    });
  } finally {
    ctx.prec = orig;
  }
  return p;
}

exports.gammaprod = gammaprod;