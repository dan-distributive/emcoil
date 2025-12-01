Object.defineProperty(exports, "__esModule", {
  value: true
});
// NOTES
// * quad seems to accept non-string rules, but I'm not going to worry about that at the moment
// * js doesn't support variadic args followed by an opts obj so points must be explicitly an array.
function quad(f) {
  var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  throw new NotImplementedError('WIP');
  // rule = py.get(opts, 'method', 'tanh-sinh');
  // if ((typeof rule === 'string' || rule instanceof String)) {
  //   if (rule==='tanh-sinh') rule = tanhSinh; // missingfunc tanhSinh
  //   else if ( rule==='gauss-legendre') rule = gaussLegendre; // missingfunc gaussLegendre
  //   else throw new ValueError(`unknown quadrature rule: ${rule}`);
  // } else {
  //   // rule = rule(ctx)
  //   throw new ValueError('gamma function pole');
  // }
  //
  // verbose = py.get(opts, 'verbose');
  // dim = points.length;
  // orig = prec = ctx.prec;
  // epsilon = ctx.eps/8;
  // m = py.get(opts, 'maxdegree') || rule.guess_degree(prec);
  // // points = [ctx._as_points(p) for p in points]
  // try {
  //   ctx.prec += 20;
  //   if (dim===1) {
  //     v, err = rule.summation(f, points[0], prec, epsilon, m, verbose);
  //   } else if (dim===2) {
  //     // lambda x: rule.summation(f(x,y), points[1], prec, epsilon, m)[0]
  //     // [v, err] = rule.summation(, points[0], prec, epsilon, m, verbose)
  //     } else if (dim===3) {
  //       // v, err = rule.summation(lambda x: \points[0], prec, epsilon, m, verbose)
  //       // rule.summation(lambda y: ,points[1], prec, epsilon, m)[0],
  //       // rule.summation(lambda z: f(x,y,z), points[2], prec, epsilon, m)[0]
  //     } else {
  //       throw new NotImplementedError('quadrature must have dim 1, 2 or 3');
  //     }
  //   } finally {
  //     ctx.prec = orig;
  //   }
  //
  //   if (py.get(opts, 'error')) return [+v, err];
  //   return +v;
}

// function ValueError(message) {
//   this.message = message;
//   this.name = 'ValueError';
// }

// TODO, move these to a common place
function NotImplementedError() {
  this.name = 'NotImplementedError';
}

exports.quad = quad;