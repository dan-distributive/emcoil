Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ikvAsymptoticUniform = undefined;

var _constants = require('../constants.js');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/*
* Compute Iv, Kv from (AMS5 9.7.7 + 9.7.8), asymptotic expansion for large v
*/
var N_UFACTORS = 11;
var N_UFACTOR_TERMS = 31;

/*
* Uniform asymptotic expansion factors, (AMS5 9.3.9; AMS5 9.3.10)
*/
var asymptoticUfactors = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.20833333333333334, 0.0, 0.125, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3342013888888889, 0.0, -0.40104166666666669, 0.0, 0.0703125, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1.0258125964506173, 0.0, 1.8464626736111112, 0.0, -0.89121093750000002, 0.0, 0.0732421875, 0.0, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4.6695844234262474, 0.0, -11.207002616222995, 0.0, 8.78912353515625, 0.0, -2.3640869140624998, 0.0, 0.112152099609375, 0.0, 0.0, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -28.212072558200244, 0.0, 84.636217674600744, 0.0, -91.818241543240035, 0.0, 42.534998745388457, 0.0, -7.3687943594796312, 0.0, 0.22710800170898438, 0.0, 0.0, 0.0, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 212.5701300392171, 0.0, -765.25246814118157, 0.0, 1059.9904525279999, 0.0, -699.57962737613275, 0.0, 218.19051174421159, 0.0, -26.491430486951554, 0.0, 0.57250142097473145, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 0, 0, 0, -1919.4576623184068, 0.0, 8061.7221817373083, 0.0, -13586.550006434136, 0.0, 11655.393336864536, 0.0, -5305.6469786134048, 0.0, 1200.9029132163525, 0.0, -108.09091978839464, 0.0, 1.7277275025844574, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0, 0, 0, 0, 0, 0, 20204.291330966149, 0.0, -96980.598388637503, 0.0, 192547.0012325315, 0.0, -203400.17728041555, 0.0, 122200.46498301747, 0.0, -41192.654968897557, 0.0, 7109.5143024893641, 0.0, -493.915304773088, 0.0, 6.074042001273483, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0, 0, 0, -242919.18790055133, 0.0, 1311763.6146629769, 0.0, -2998015.9185381061, 0.0, 3763271.2976564039, 0.0, -2813563.2265865342, 0.0, 1268365.2733216248, 0.0, -331645.17248456361, 0.0, 45218.768981362737, 0.0, -2499.8304818112092, 0.0, 24.380529699556064, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [3284469.8530720375, 0.0, -19706819.11843222, 0.0, 50952602.492664628, 0.0, -74105148.211532637, 0.0, 66344512.274729028, 0.0, -37567176.660763353, 0.0, 13288767.166421819, 0.0, -2785618.1280864552, 0.0, 308186.40461266245, 0.0, -13886.089753717039, 0.0, 110.01714026924674, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]];
function ikvAsymptoticUniform(v, x) {
  // CHECK: I believe the following is equivalent to what we had before ....
  var iValue = 0;
  var kValue = null;
  var iPrefactor = void 0,
      kPrefactor = void 0,
      t = void 0,
      t2 = void 0,
      eta = void 0,
      z = void 0,
      iSum = void 0,
      kSUm = void 0,
      term = void 0,
      divisor = void 0,
      k = void 0,
      n = void 0;
  var sign = 1;

  if (v < 0) {
    /* Negative v; compute I_{-v} and K_{-v} and use (AMS 9.6.2) */
    sign = -1;
    v = -v;
  }

  z = x / v;
  t = 1 / Math.sqrt(1 + z * z);
  t2 = t * t;
  eta = Math.sqrt(1 + z * z) + Math.log(z / (1 + 1 / t));

  iPrefactor = Math.sqrt(t / (2 * Math.PI * v)) * Math.exp(v * eta);
  iSum = 1.0;

  kPrefactor = Math.sqrt(Math.PI * t / (2 * v)) * Math.exp(-v * eta);
  kSUm = 1.0;

  divisor = v;
  for (n = 1; n < N_UFACTORS; ++n) {
    /*
    * Evaluate u_k(t) with Horner's scheme;
    * (using the knowledge about which coefficients are zero)
    */
    term = 0;
    for (k = N_UFACTOR_TERMS - 1 - 3 * n; k < N_UFACTOR_TERMS - n; k += 2) {
      term *= t2;
      term += asymptoticUfactors[n][k];
    }
    for (k = 1; k < n; k += 2) {
      term *= t2;
    }
    if (n % 2 === 1) {
      term *= t;
    }

    /* Sum terms */
    term /= divisor;
    iSum += term;
    kSUm += n % 2 === 0 ? term : -term;

    /* Check convergence */
    if (Math.abs(term) < constants.MACHEP) {
      break;
    }

    divisor *= v;
  }

  if (Math.abs(term) > 1e-3 * Math.abs(iSum)) {
    /* Didn't converge */
    // mtherr("ikvAsymptoticUniform", TLOSS);
  }
  if (Math.abs(term) > constants.MACHEP * Math.abs(iSum)) {
    /* Some precision lost */
    // mtherr("ikvAsymptoticUniform", PLOSS);
  }

  if (kValue !== null) {
    /* symmetric in v */
    kValue = kPrefactor * kSUm;
  }

  if (iValue !== null) {
    if (sign === 1) {
      iValue = iPrefactor * iSum;
    } else {
      /* (AMS 9.6.2) */
      iValue = iPrefactor * iSum + 2 / Math.PI * Math.sin(Math.PI * v) * kPrefactor * kSUm;
    }
  }

  return [iValue, kValue];
}

exports.ikvAsymptoticUniform = ikvAsymptoticUniform;