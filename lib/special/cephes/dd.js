Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // This is a (currently) brief translation of the Double-double precision
// arithmetic package in cephes. For now we'll add the methods we need and let
// it grow naturally.


var _ddRealIdefs = require('./dd/ddRealIdefs.js');

var ddRealIdefs = _interopRequireWildcard(_ddRealIdefs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DD = function () {
  function DD() {
    _classCallCheck(this, DD);
  }

  _createClass(DD, null, [{
    key: 'create',
    value: function create(hi) {
      var low = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return [hi, low];
    }
  }, {
    key: 'toDouble',
    value: function toDouble(a) {
      return a[0];
    }
    // TODO - let these accept non double-double args or at least do error checking
    // that they are both double doubles (i.e. arrays)

  }, {
    key: 'add',
    value: function add(a, b) {
      return ddRealIdefs.ddAdd(a, b);
    }
  }, {
    key: 'sub',
    value: function sub(a, b) {
      return ddRealIdefs.ddSub(a, b);
    }
  }, {
    key: 'mul',
    value: function mul(a, b) {
      return ddRealIdefs.ddMul(a, b);
    }
  }, {
    key: 'div',
    value: function div(a, b) {
      return ddRealIdefs.ddDiv(a, b);
    }
  }]);

  return DD;
}();

exports.default = DD;