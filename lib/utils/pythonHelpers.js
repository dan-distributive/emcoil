Object.defineProperty(exports, "__esModule", {
  value: true
});
// Python has some built-in stuff that javascript doesn't.

// frexp and ldexp from:
// http://croquetweak.blogspot.com/2014/08/deconstructing-floats-frexp-and-ldexp.html
function frexp(value) {
  if (value === 0) return [value, 0];
  var data = new DataView(new ArrayBuffer(8));
  data.setFloat64(0, value);
  var bits = data.getUint32(0) >>> 20 & 0x7FF;
  if (bits === 0) {
    // denormal
    data.setFloat64(0, value * Math.pow(2, 64)); // exp + 64
    bits = (data.getUint32(0) >>> 20 & 0x7FF) - 64;
  }
  var exponent = bits - 1022;
  var mantissa = ldexp(value, -exponent);
  return [mantissa, exponent];
}

function ldexp(mantissa, exponent) {
  var steps = Math.min(3, Math.ceil(Math.abs(exponent) / 1023));
  var result = mantissa;
  for (var i = 0; i < steps; i++) {
    result *= Math.pow(2, Math.floor((exponent + i) / steps));
  }
  return result;
}

function range(start, end, step) {
  var _end = end || start;
  var _start = end ? start : 0;
  var _step = step || 1;
  return Array((_end - _start) / _step).fill(0).map(function (v, i) {
    return _start + i * _step;
  });
}

// * It doesn't handle variadic arguments, that could be supported by js has some perf
// issues with ... (so I've heard). That could be handled like
// zip([[arr1], [arr2], [arr3]]) and then:
// (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))
// * It isn't it's own inverse like the python version. For that, use unzip
function zip(arr1, arr2) {
  return arr1.map(function (_, index) {
    return [arr1[index], arr2[index]];
  });
}

// Does the reverse of zip: [letters, numbers] = unzip( [['a',1], ['b', 2]] )
// letters = ['a', 'b']
// numbers = [1, 2]
function unzip(arr) {
  var res0 = [];
  var res1 = [];
  arr.map(function (pair) {
    res0.push(pair[0]);
    res1.push(pair[1]);
  });
  return [res0, res1];
}

// It is common to want to combine zip with the python pattern that iterates and creates arrays ([func(a) for a in alpha_s] similar to `map` in js). So this function combines the two a little more smoothly.
function zipmap(arr1, arr2, func) {
  return arr1.map(function (_, index) {
    return func(arr1[index], arr2[index]);
  });
}

// sum all elements of an array. This is much faster than reduce: https://jsperf.com/js-sum-3367890876
function sum(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

// Mimick python's get method for easier translation
function get(obj, key) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (obj.hasOwnProperty(key)) {
    return obj[key];
  } else {
    return defaultValue;
  }
}

function mod(x, y) {
  return (x % y + y) % y;
}

// divmod
function divmod(x, y) {
  return [Math.floor(x / y), mod(x, y)];
}

exports.frexp = frexp;
exports.ldexp = ldexp;
exports.range = range;
exports.zip = zip;
exports.zipmap = zipmap;
exports.unzip = unzip;
exports.sum = sum;
exports.get = get;
exports.mod = mod;
exports.divmod = divmod;