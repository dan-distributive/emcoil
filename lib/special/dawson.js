Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dawson = function () {
  function dawson() {
    _classCallCheck(this, dawson);
  }

  _createClass(dawson, null, [{
    key: "dawson",
    value: function dawson(x) {
      var NMAX = 6;
      var c = new Array(NMAX);
      var H = 0.4;
      var A1 = 2.0 / 3.0;
      var A2 = 0.4;
      var A3 = 2.0 / 7.0;
      var init = true;
      var i = void 0,
          n0 = void 0,
          d1 = void 0,
          d2 = void 0,
          e1 = void 0,
          e2 = void 0,
          x2 = void 0,
          xp = void 0,
          xx = void 0,
          ans = void 0;

      if (init === true) {
        init = false;
        for (i = 0; i < NMAX; i++) {
          c[i] = Math.exp(-(((2.0 * i + 1.0) * H) ** 2));
        };
      };

      if (Math.abs(x) < 0.2) {
        x2 = x ** 2;
        ans = x * (1.0 - A1 * x2 * (1.0 - A2 * x2 * (1.0 - A3 * x2)));
      } else {
        xx = Math.abs(x);
        n0 = 2 * (0.5 * xx / H + 0.5 | 0);
        xp = xx - n0 * H;
        e1 = Math.exp(2.0 * xp * H);
        e2 = e1 ** 2;
        d1 = n0 + 1.0;
        d2 = d1 - 2.0;
        var sum = 0.0;

        for (i = 0; i < NMAX; i++, d1 += 2.0, d2 -= 2.0, e1 *= e2) {
          sum += c[i] * (e1 / d1 + 1.0 / (d2 * e1));
          ans = 0.5641895835 * sum;
          if (x < 0) {
            ans *= Math.exp(-xp * xp) * -1;
          } else {
            ans *= Math.exp(-xp * xp);
          }
        };
      };

      return ans;
    }
  }]);

  return dawson;
}();

exports.default = dawson;
;