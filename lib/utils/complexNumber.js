Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _complex = require('../utils/complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// These can be used for lightweight stuff, but they are much slower (~200 times slower)
// They should compile to c structures well
var ComplexNumber = function () {
  function ComplexNumber() {
    var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new ArrayBuffer(16);

    _classCallCheck(this, ComplexNumber);

    this.buffer = buffer;
  }

  _createClass(ComplexNumber, [{
    key: 'add',


    // example wrapper
    value: function add(complexV) {
      var result = new ComplexNumber();
      _complex2.default.add(this.buffer, 0, complexV.buffer, 0, result.buffer, 0);
      return result;
    }

    // could be created dynamically?

  }, {
    key: 'mul',
    value: function mul(complexV) {
      var result = new ComplexNumber();
      _complex2.default.mul(this.buffer, 0, complexV.buffer, 0, result.buffer, 0);
      return result;
    }

    // about 10 times faster than mul, still 20 x slower than structureless complex numbers

  }, {
    key: 'mulEql',
    value: function mulEql(complexV) {
      _complex2.default.mul(this.buffer, 0, complexV.buffer, 0, this.buffer, 0);
      return this;
    }
  }, {
    key: 'buffer',
    set: function set(buffer) {
      this._buffer = buffer;
      this._r = new Float64Array(this._buffer, 0, 1);
      this._i = new Float64Array(this._buffer, 8, 1);
    },
    get: function get() {
      return this._buffer;
    }
  }, {
    key: 'r',
    set: function set(v) {
      this._r[0] = v;
    },
    get: function get() {
      return this._r[0];
    }
  }, {
    key: 'i',
    set: function set(v) {
      this._i[0] = v;
    },
    get: function get() {
      return this._i[0];
    }
  }]);

  return ComplexNumber;
}();

exports.default = ComplexNumber;