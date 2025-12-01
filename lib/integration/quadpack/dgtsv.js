Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dgtsv = dgtsv;

var _xerror = require('./xerror.js');

function dgtsv(n, nrhs, dl, d, du, b, ldb, info) {
  var zero = void 0,
      i = void 0,
      j = void 0,
      fact = void 0,
      temp = void 0;
  zero = 0.0e+0;
  info = 0;
  if (n < 0) {
    info = -1;
  } else if (nrhs < 0) {
    info = -2;
  } else if (ldb < Math.max(1, n)) {
    info = -7;
  }
  if (info !== 0) {
    (0, _xerror.xerror)('dgtsv ', -info);
    return info;
  }
  //
  if (n === 0) return info;
  //
  if (nrhs === 1) {
    for (i = 1; i <= n - 2; i++) {
      if (Math.abs(d[i - 1]) >= Math.abs(dl[i - 1])) {
        //
        //              no row interchange required
        //
        if (d[i - 1] !== zero) {
          fact = dl[i - 1] / d[i - 1];
          d[i + 1 - 1] = d[i + 1 - 1] - fact * du[i - 1];
          b[i][1 - 1] = b[i][1 - 1] - fact * b[i - 1][1 - 1];
        } else {
          info = i;
          return info;
        }
        dl[i - 1] = zero;
      } else {
        //
        //              interchange rows i and i+1
        //
        fact = d[i - 1] / dl[i - 1];
        d[i - 1] = dl[i - 1];
        temp = d[i + 1 - 1];
        d[i + 1 - 1] = du[i - 1] - fact * temp;
        dl[i - 1] = du[i + 1 - 1];
        du[i + 1 - 1] = -fact * dl[i - 1];
        du[i - 1] = temp;
        temp = b[i - 1][1 - 1];
        b[i - 1][1 - 1] = b[i][1 - 1];
        b[i][1 - 1] = temp - fact * b[i][1 - 1];
      }
    }

    if (n > 1) {
      i = n - 1;
      if (Math.abs(d[i - 1]) >= Math.abs(dl[i - 1])) {
        if (d[i - 1] !== zero) {
          fact = dl[i - 1] / d[i - 1];
          d[i + 1 - 1] = d[i + 1 - 1] - fact * du[i - 1];
          b[i][1 - 1] = b[i][1 - 1] - fact * b[i - 1][1 - 1];
        } else {
          info = i;
          return info;
        }
      } else {
        fact = d[i - 1] / dl[i - 1];
        d[i - 1] = dl[i - 1];
        temp = d[i + 1 - 1];
        d[i + 1 - 1] = du[i - 1] - fact * temp;
        du[i - 1] = temp;
        temp = b[i - 1][1 - 1];
        b[i - 1][1 - 1] = b[i][1 - 1];
        b[i][1 - 1] = temp - fact * b[i][1 - 1];
      }
    }
    if (d[n - 1] === zero) {
      info = n;
      return info;
    }
  } else {
    for (i = 1; i <= n - 2; i++) {
      if (Math.abs(d[i - 1]) >= Math.abs(dl[i - 1])) {
        //
        //              no row interchange required
        //
        if (d[i - 1] !== zero) {
          fact = dl[i - 1] / d[i - 1];
          d[i + 1 - 1] = d[i + 1 - 1] - fact * du[i - 1];
          for (j = 1; j <= nrhs; j++) {
            b[i][j - 1] = b[i][j - 1] - fact * b[i - 1][j - 1];
          }
        } else {
          info = i;
          return info;
        }
        dl[i - 1] = zero;
      } else {
        //
        //              interchange rows i and i+1
        //
        fact = d[i - 1] / dl[i - 1];
        d[i - 1] = dl[i - 1];
        temp = d[i + 1 - 1];
        d[i + 1 - 1] = du[i - 1] - fact * temp;
        dl[i - 1] = du[i + 1 - 1];
        du[i + 1 - 1] = -fact * dl[i - 1];
        du[i - 1] = temp;
        for (j = 1; j <= nrhs; j++) {
          temp = b[i - 1][j - 1];
          b[i - 1][j - 1] = b[i][j - 1];
          b[i][j - 1] = temp - fact * b[i][j - 1];
        }
      } // if
    } // outerloop

    if (n > 1) {
      i = n - 1;
      if (Math.abs(d[i - 1]) >= Math.abs(dl[i - 1])) {
        if (d[i - 1] !== zero) {
          fact = dl[i - 1] / d[i - 1];
          d[i + 1 - 1] = d[i + 1 - 1] - fact * du[i - 1];
          for (j = 1; j <= nrhs; j++) {
            b[i][j - 1] = b[i][j - 1] - fact * b[i - 1][j - 1];
          }
        } else {
          info = i;
          return info;
        }
      } else {
        fact = d[i - 1] / dl[i - 1];
        d[i - 1] = dl[i - 1];
        temp = d[i + 1 - 1];
        d[i + 1 - 1] = du[i - 1] - fact * temp;
        du[i - 1] = temp;
        for (j = 1; j <= nrhs; j++) {
          temp = b[i - 1][j - 1];
          b[i - 1][j - 1] = b[i][j - 1];
          b[i][j - 1] = temp - fact * b[i][j - 1];
        }
      }
    }
    if (d[n - 1] === zero) {
      info = n;
      return info;
    }
  }
  //
  //     back solve with the matrix u from the factorization.
  //
  if (nrhs <= 2) {
    if (nrhs < 1) nrhs = 1; // force at least one run
    for (j = 1; j <= nrhs; j++) {
      b[n - 1][j - 1] = b[n - 1][j - 1] / d[n - 1];
      if (n > 1) {
        b[n - 2][j - 1] = (b[n - 2][j - 1] - du[n - 2] * b[n - 1][j - 1]) / d[n - 1 - 1];
      }
      for (i = n - 2; i <= 1; i += -1) {
        b[i - 1][j - 1] = (b[i - 1][j - 1] - du[i - 1] * b[i][j - 1] - dl[i - 1] * b[i + 1][j - 1]) / d[i - 1];
      }
    }
  } else {
    for (j = 1; j <= nrhs; j++) {
      b[n - 1][j - 1] = b[n - 1][j - 1] / d[n - 1];
      if (n > 1) b[n - 2][j - 1] = (b[n - 2][j - 1] - du[n - 1 - 1] * b[n - 1][j - 1]) / d[n - 1 - 1];
      for (i = n - 2; i <= 1; i += -1) {
        b[i - 1][j - 1] = (b[i - 1][j - 1] - du[i - 1] * b[i][j - 1] - dl[i - 1] * b[i + 1][j - 1]) / d[i - 1];
      }
    }
  }
  //
  return info;
}