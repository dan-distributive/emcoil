Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* eslint-disable no-labels */
/* eslint-disable no-fallthrough */
// SUBROUTINE ZAIRY(ZR, ZI, ID, KODE, AIR, AII, NZ, IERR)
// ***BEGIN PROLOGUE  ZAIRY
// ***DATE WRITTEN   830501   (YYMMDD)
// ***REVISION DATE  890801   (YYMMDD)
// ***PORT TO ECMASCRIPT  201801   (YYYYMM)
// ***CATEGORY NO.  B5K
// ***KEYWORDS  AIRY FUNCTION,BESSEL FUNCTIONS OF ORDER ONE THIRD
// ***AUTHOR (FORTRAN) AMOS, DONALD E., SANDIA NATIONAL LABORATORIES
// ***AUTHOR (ECMASCRIPT) ERB, KC, KINGS DISTRIBUTED SYSTEMS
// ***PURPOSE  TO COMPUTE AIRY FUNCTIONS AI(Z) AND DAI(Z) FOR COMPLEX Z
// ***DESCRIPTION
//
//                       ***A DOUBLE PRECISION ROUTINE***
//          ON KODE=1, ZAIRY COMPUTES THE COMPLEX AIRY FUNCTION AI(Z) OR
//          ITS DERIVATIVE DAI(Z)/DZ ON ID=0 OR ID=1 RESPECTIVELY. ON
//          KODE=2, A SCALING OPTION CEXP(ZTA)*AI(Z) OR CEXP(ZTA)*
//          DAI(Z)/DZ IS PROVIDED TO REMOVE THE EXPONENTIAL DECAY IN
//          -PI/3.LT.ARG(Z).LT.PI/3 AND THE EXPONENTIAL GROWTH IN
//          PI/3.LT.ABS(ARG(Z)).LT.PI WHERE ZTA=(2/3)*Z*CSQRT(Z).
//
//          WHILE THE AIRY FUNCTIONS AI(Z) AND DAI(Z)/DZ ARE ANALYTIC IN
//          THE WHOLE Z PLANE, THE CORRESPONDING SCALED FUNCTIONS DEFINED
//          FOR KODE=2 HAVE A CUT ALONG THE NEGATIVE REAL AXIS.
//          DEFINTIONS AND NOTATION ARE FOUND IN THE NBS HANDBOOK OF
//          MATHEMATICAL FUNCTIONS (REF. 1).
//
//          INPUT      ZR,ZI ARE DOUBLE PRECISION
//            ZR,ZI  - Z=CMPLX(ZR,ZI)
//            ID     - ORDER OF DERIVATIVE, ID=0 OR ID=1
//            KODE   - A PARAMETER TO INDICATE THE SCALING OPTION
//                     KODE= 1  RETURNS
//                              AI=AI(Z)                ON ID=0 OR
//                              AI=DAI(Z)/DZ            ON ID=1
//                         = 2  RETURNS
//                              AI=CEXP(ZTA)*AI(Z)       ON ID=0 OR
//                              AI=CEXP(ZTA)*DAI(Z)/DZ   ON ID=1 WHERE
//                              ZTA=(2/3)*Z*CSQRT(Z)
//
//          OUTPUT     AIR,AII ARE DOUBLE PRECISION
//            AIR,AII- COMPLEX ANSWER DEPENDING ON THE CHOICES FOR ID AND
//                     KODE
//            NZ     - UNDERFLOW INDICATOR
//                     NZ= 0   , NORMAL RETURN
//                     NZ= 1   , AI=CMPLX(0.0D0,0.0D0) DUE TO UNDERFLOW IN
//                               -PI/3.LT.ARG(Z).LT.PI/3 ON KODE=1
//            IERR   - ERROR FLAG
//                     IERR=0, NORMAL RETURN - COMPUTATION COMPLETED
//                     IERR=1, INPUT ERROR   - NO COMPUTATION
//                     IERR=2, OVERFLOW      - NO COMPUTATION, REAL(ZTA)
//                             TOO LARGE ON KODE=1
//                     IERR=3, CABS(Z) LARGE      - COMPUTATION COMPLETED
//                             LOSSES OF SIGNIFCANCE BY ARGUMENT REDUCTION
//                             PRODUCE LESS THAN HALF OF MACHINE ACCURACY
//                     IERR=4, CABS(Z) TOO LARGE  - NO COMPUTATION
//                             COMPLETE LOSS OF ACCURACY BY ARGUMENT
//                             REDUCTION
//                     IERR=5, ERROR              - NO COMPUTATION,
//                             ALGORITHM TERMINATION CONDITION NOT MET
//
// ***LONG DESCRIPTION
//
//          AI AND DAI ARE COMPUTED FOR CABS(Z).GT.1.0 FROM THE K BESSEL
//          FUNCTIONS BY
//
//             AI(Z)=C*SQRT(Z)*K(1/3,ZTA) , DAI(Z)=-C*Z*K(2/3,ZTA)
//                            C=1.0/(PI*SQRT(3.0))
//                             ZTA=(2/3)*Z**(3/2)
//
//          WITH THE POWER SERIES FOR CABS(Z).LE.1.0.
//
//          IN MOST COMPLEX VARIABLE COMPUTATION, ONE MUST EVALUATE ELE-
//          MENTARY FUNCTIONS. WHEN THE MAGNITUDE OF Z IS LARGE, LOSSES
//          OF SIGNIFICANCE BY ARGUMENT REDUCTION OCCUR. CONSEQUENTLY, IF
//          THE MAGNITUDE OF ZETA=(2/3)*Z**1.5 EXCEEDS U1=SQRT(0.5/UR),
//          THEN LOSSES EXCEEDING HALF PRECISION ARE LIKELY AND AN ERROR
//          FLAG IERR=3 IS TRIGGERED WHERE UR=DMAX1(D1MACH(4),1.0D-18) IS
//          DOUBLE PRECISION UNIT ROUNDOFF LIMITED TO 18 DIGITS PRECISION.
//          ALSO, IF THE MAGNITUDE OF ZETA IS LARGER THAN U2=0.5/UR, THEN
//          ALL SIGNIFICANCE IS LOST AND IERR=4. IN ORDER TO USE THE INT
//          FUNCTION, ZETA MUST BE FURTHER RESTRICTED NOT TO EXCEED THE
//          LARGEST INTEGER, U3=I1MACH(9). THUS, THE MAGNITUDE OF ZETA
//          MUST BE RESTRICTED BY MIN(U2,U3). ON 32 BIT MACHINES, U1,U2,
//          AND U3 ARE APPROXIMATELY 2.0E+3, 4.2E+6, 2.1E+9 IN SINGLE
//          PRECISION ARITHMETIC AND 1.3E+8, 1.8E+16, 2.1E+9 IN DOUBLE
//          PRECISION ARITHMETIC RESPECTIVELY. THIS MAKES U2 AND U3 LIMIT-
//          ING IN THEIR RESPECTIVE ARITHMETICS. THIS MEANS THAT THE MAG-
//          NITUDE OF Z CANNOT EXCEED 3.1E+4 IN SINGLE AND 2.1E+6 IN
//          DOUBLE PRECISION ARITHMETIC. THIS ALSO MEANS THAT ONE CAN
//          EXPECT TO RETAIN, IN THE WORST CASES ON 32 BIT MACHINES,
//          NO DIGITS IN SINGLE PRECISION AND ONLY 7 DIGITS IN DOUBLE
//          PRECISION ARITHMETIC. SIMILAR CONSIDERATIONS HOLD FOR OTHER
//          MACHINES.
//
//          THE APPROXIMATE RELATIVE ERROR IN THE MAGNITUDE OF A COMPLEX
//          BESSEL FUNCTION CAN BE EXPRESSED BY P*10**S WHERE P=MAX(UNIT
//          ROUNDOFF,1.0E-18) IS THE NOMINAL PRECISION AND 10**S REPRE-
//          SENTS THE INCREASE IN ERROR DUE TO ARGUMENT REDUCTION IN THE
//          ELEMENTARY FUNCTIONS. HERE, S=MAX(1,ABS(LOG10(CABS(Z))),
//          ABS(LOG10(FNU))) APPROXIMATELY (I.E. S=MAX(1,ABS(EXPONENT OF
//          CABS(Z),ABS(EXPONENT OF FNU)) ). HOWEVER, THE PHASE ANGLE MAY
//          HAVE ONLY ABSOLUTE ACCURACY. THIS IS MOST LIKELY TO OCCUR WHEN
//          ONE COMPONENT (IN ABSOLUTE VALUE) IS LARGER THAN THE OTHER BY
//          SEVERAL ORDERS OF MAGNITUDE. IF ONE COMPONENT IS 10**K LARGER
//          THAN THE OTHER, THEN ONE CAN EXPECT ONLY MAX(ABS(LOG10(P))-K,
//          0) SIGNIFICANT DIGITS; OR, STATED ANOTHER WAY, WHEN K EXCEEDS
//          THE EXPONENT OF P, NO SIGNIFICANT DIGITS REMAIN IN THE SMALLER
//          COMPONENT. HOWEVER, THE PHASE ANGLE RETAINS ABSOLUTE ACCURACY
//          BECAUSE, IN COMPLEX ARITHMETIC WITH PRECISION P, THE SMALLER
//          COMPONENT WILL NOT (AS A RULE) DECREASE BELOW P TIMES THE
//          MAGNITUDE OF THE LARGER COMPONENT. IN THESE EXTREME CASES,
//          THE PRINCIPAL PHASE ANGLE IS ON THE ORDER OF +P, -P, PI/2-P,
//          OR -PI/2+P.
//
// ***REFERENCES  HANDBOOK OF MATHEMATICAL FUNCTIONS BY M. ABRAMOWITZ
//                  AND I. A. STEGUN, NBS AMS SERIES 55, U.S. DEPT. OF
//                  COMMERCE, 1955.
//
//                COMPUTATION OF BESSEL FUNCTIONS OF COMPLEX ARGUMENT
//                  AND LARGE ORDER BY D. E. AMOS, SAND83-0643, MAY, 1983
//
//                A SUBROUTINE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                  ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, SAND85-
//                  1018, MAY, 1985
//
//                A PORTABLE PACKAGE FOR BESSEL FUNCTIONS OF A COMPLEX
//                  ARGUMENT AND NONNEGATIVE ORDER BY D. E. AMOS, TRANS.
//                  MATH. SOFTWARE, 1986
//
// ***ROUTINES CALLED  ZACAI,ZBKNU,AZEXP,AZSQRT,I1MACH,D1MACH
// ***END PROLOGUE  ZAIRY


exports.zairy = zairy;

var _zacai = require('./zacai.js');

var _zbknu = require('./zbknu.js');

var _zexp = require('./zexp.js');

var _zsqrt = require('./zsqrt.js');

var _zabs = require('./zabs.js');

var _i1mach = require('../../utils/fortran-utils/i1mach.js');

var _d1mach = require('../../utils/fortran-utils/d1mach.js');

function zairy(zr, zi, id, kode) {
  var aa = void 0,
      ad = void 0,
      aii = void 0,
      air = void 0,
      ak = void 0,
      alim = void 0,
      atrm = void 0,
      az = void 0,
      az3 = void 0,
      bk = void 0,
      cc = void 0,
      ck = void 0,
      coef = void 0,
      conei = void 0,
      coner = void 0,
      csqi = void 0,
      csqr = void 0,
      cyi = void 0,
      cyr = void 0,
      c1 = void 0,
      c2 = void 0,
      dig = void 0,
      dk = void 0,
      d1 = void 0,
      d2 = void 0,
      elim = void 0,
      fid = void 0,
      fnu = void 0,
      ptr = void 0,
      rl = void 0,
      r1m5 = void 0,
      sfac = void 0,
      sti = void 0,
      str = void 0,
      s1i = void 0,
      s1r = void 0,
      s2i = void 0,
      s2r = void 0,
      tol = void 0,
      trm1i = void 0,
      trm1r = void 0,
      trm2i = void 0,
      trm2r = void 0,
      tth = void 0,
      zeroi = void 0,
      zeror = void 0,
      ztai = void 0,
      ztar = void 0,
      z3i = void 0,
      z3r = void 0,
      alaz = void 0,
      bb = void 0,
      ierr = void 0,
      iflag = void 0,
      k = void 0,
      k1 = void 0,
      k2 = void 0,
      mr = void 0,
      nn = void 0,
      nz = void 0;
  cyr = [];
  cyi = [];
  tth = 6.66666666666666667e-01;
  c1 = 3.55028053887817240e-01;
  c2 = 2.58819403792806799e-01;
  coef = 1.83776298473930683e-01;
  zeror = 0;
  zeroi = 0;
  coner = 1;
  conei = 0;


  var goToLabel = 0;
  mainExecutionLoop: while (true) {
    switch (goToLabel) {
      case 0:
        ierr = 0;
        nz = 0;
        if (id < 0 || id > 1) ierr = 1;
        if (kode < 1 || kode > 2) ierr = 1;
        if (ierr !== 0) break mainExecutionLoop;
        az = (0, _zabs.azabs)(zr, zi);
        tol = Math.max((0, _d1mach.d1mach)(4), 1.0e-18);
        fid = id;
        if (az > 1.0) {
          goToLabel = 70;break;
        }
        // c-----------------------------------------------------------------------
        // c     power series for cabs(z) <= 1.
        // c-----------------------------------------------------------------------
        s1r = coner;
        s1i = conei;
        s2r = coner;
        s2i = conei;
        if (az < tol) {
          goToLabel = 170;break;
        }
        aa = az * az;
        if (aa < tol / az) {
          goToLabel = 40;break;
        }
        trm1r = coner;
        trm1i = conei;
        trm2r = coner;
        trm2i = conei;
        atrm = 1.0;
        str = zr * zr - zi * zi;
        sti = zr * zi + zi * zr;
        z3r = str * zr - sti * zi;
        z3i = str * zi + sti * zr;
        az3 = az * aa;
        ak = 2.0 + fid;
        bk = 3.0 - fid - fid;
        ck = 4.0 - fid;
        dk = 3.0 + fid + fid;
        d1 = ak * dk;
        d2 = bk * ck;
        ad = Math.min(d1, d2);
        ak = 24.0 + 9.0 * fid;
        bk = 30.0 - 9.0 * fid;
        // do 30 k=1,25
        for (k = 1; k <= 25; k++) {
          str = (trm1r * z3r - trm1i * z3i) / d1;
          trm1i = (trm1r * z3i + trm1i * z3r) / d1;
          trm1r = str;
          s1r = s1r + trm1r;
          s1i = s1i + trm1i;
          str = (trm2r * z3r - trm2i * z3i) / d2;
          trm2i = (trm2r * z3i + trm2i * z3r) / d2;
          trm2r = str;
          s2r = s2r + trm2r;
          s2i = s2i + trm2i;
          atrm = atrm * az3 / ad;
          d1 = d1 + ak;
          d2 = d2 + bk;
          ad = Math.min(d1, d2);
          if (atrm < tol * ad) break; // go to 40
          ak = ak + 18.0;
          bk = bk + 18.0;
        }
        // 30 continue
        // 40 continue
        if (id === 1) {
          goToLabel = 50;break;
        }
        air = s1r * c1 - c2 * (zr * s2r - zi * s2i);
        aii = s1i * c1 - c2 * (zr * s2i + zi * s2r);
        if (kode === 1) break mainExecutionLoop;

        var _azsqrt = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt2 = _slicedToArray(_azsqrt, 2);

        str = _azsqrt2[0];
        sti = _azsqrt2[1];

        ztar = tth * (zr * str - zi * sti);
        ztai = tth * (zr * sti + zi * str);

        var _azexp = (0, _zexp.azexp)(ztar, ztai);

        var _azexp2 = _slicedToArray(_azexp, 2);

        str = _azexp2[0];
        sti = _azexp2[1];

        ptr = air * str - aii * sti;
        aii = air * sti + aii * str;
        air = ptr;
        break mainExecutionLoop;
      case 50:
        air = -s2r * c2;
        aii = -s2i * c2;
        if (az <= tol) {
          goToLabel = 60;break;
        }
        str = zr * s1r - zi * s1i;
        sti = zr * s1i + zi * s1r;
        cc = c1 / (1.0 + fid);
        air = air + cc * (str * zr - sti * zi);
        aii = aii + cc * (str * zi + sti * zr);
      case 60:
        if (kode === 1) break mainExecutionLoop;

        var _azsqrt3 = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt4 = _slicedToArray(_azsqrt3, 2);

        str = _azsqrt4[0];
        sti = _azsqrt4[1];

        ztar = tth * (zr * str - zi * sti);
        ztai = tth * (zr * sti + zi * str);

        var _azexp3 = (0, _zexp.azexp)(ztar, ztai);

        var _azexp4 = _slicedToArray(_azexp3, 2);

        str = _azexp4[0];
        sti = _azexp4[1];

        ptr = str * air - sti * aii;
        aii = str * aii + sti * air;
        air = ptr;
        break mainExecutionLoop;
      // c-----------------------------------------------------------------------
      // c     case for cabs(z) > 1.0
      // c-----------------------------------------------------------------------
      case 70:
        fnu = (1.0 + fid) / 3.0;
        // c-----------------------------------------------------------------------
        // c     set parameters related to machine constants.
        // c     tol is the approximate unit roundoff limited to 1.0e-18.
        // c     elim is the approximate exponential over- and underflow limit.
        // c     exp(-elim) < exp(-alim)=exp(-elim)/tol    and
        // c     exp(elim) > exp(alim)=exp(elim)*tol       are intervals near
        // c     underflow and overflow limits where scaled arithmetic is done.
        // c     rl is the lower boundary of the asymptotic expansion for large z.
        // c     dig = number of base 10 digits in tol = 10**(-dig).
        // c-----------------------------------------------------------------------
        k1 = (0, _i1mach.i1mach)(15);
        k2 = (0, _i1mach.i1mach)(16);
        r1m5 = (0, _d1mach.d1mach)(5);
        k = Math.min(Math.abs(k1), Math.abs(k2));
        elim = 2.303 * (k * r1m5 - 3.0);
        k1 = (0, _i1mach.i1mach)(14) - 1;
        aa = r1m5 * k1;
        dig = Math.min(aa, 18.0);
        aa = aa * 2.303;
        alim = elim + Math.max(-aa, -41.45);
        rl = 1.2 * dig + 3.0;
        alaz = Math.log(az);
        // c--------------------------------------------------------------------------
        // c     test for proper range
        // c-----------------------------------------------------------------------
        aa = 0.5 / tol;
        bb = (0, _i1mach.i1mach)(9) * 0.5;
        aa = Math.min(aa, bb);
        aa = aa ** tth;
        if (az > aa) {
          goToLabel = 260;break;
        }
        aa = Math.sqrt(aa);
        if (az > aa) ierr = 3;

        var _azsqrt5 = (0, _zsqrt.azsqrt)(zr, zi);

        var _azsqrt6 = _slicedToArray(_azsqrt5, 2);

        csqr = _azsqrt6[0];
        csqi = _azsqrt6[1];

        ztar = tth * (zr * csqr - zi * csqi);
        ztai = tth * (zr * csqi + zi * csqr);
        // c-----------------------------------------------------------------------
        // c     re(zta) <= 0 when re(z) < 0, especially when im(z) is small
        // c-----------------------------------------------------------------------
        iflag = 0;
        sfac = 1.0;
        ak = ztai;
        if (zr >= 0.0) {
          goToLabel = 80;break;
        }
        bk = ztar;
        ck = -Math.abs(bk);
        ztar = ck;
        ztai = ak;
      case 80:
        if (zi !== 0.0) {
          goToLabel = 90;break;
        }
        if (zr > 0.0) {
          goToLabel = 90;break;
        }
        ztar = 0.0;
        ztai = ak;
      case 90:
        aa = ztar;
        if (aa >= 0.0 && zr > 0.0) {
          goToLabel = 110;break;
        }
        if (kode === 2) {
          goToLabel = 100;break;
        }
        // c-----------------------------------------------------------------------
        // c     overflow test
        // c-----------------------------------------------------------------------
        if (aa > -alim) {
          goToLabel = 100;break;
        }
        aa = -aa + 0.25 * alaz;
        iflag = 1;
        sfac = tol;
        if (aa > elim) {
          goToLabel = 270;break;
        }
      case 100:
        // c-----------------------------------------------------------------------
        // c     cbknu and cacon return exp(zta)*k(fnu,zta) on kode=2
        // c-----------------------------------------------------------------------
        mr = 1;
        if (zi < 0.0) mr = -1;
        nn = (0, _zacai.zacai)(ztar, ztai, fnu, kode, mr, 1, cyr, cyi, rl, tol, elim, alim);
        if (nn < 0) {
          goToLabel = 280;break;
        }
        nz = nz + nn;
        goToLabel = 130;break;
      case 110:
        if (kode === 2) {
          goToLabel = 120;break;
        }
        // c-----------------------------------------------------------------------
        // c     underflow test
        // c-----------------------------------------------------------------------
        if (aa < alim) {
          goToLabel = 120;break;
        }
        aa = -aa - 0.25 * alaz;
        iflag = 2;
        sfac = 1.0 / tol;
        if (aa < -elim) {
          goToLabel = 210;break;
        }
      case 120:
        nz = (0, _zbknu.zbknu)(ztar, ztai, fnu, kode, 1, cyr, cyi, tol, elim, alim);
      case 130:
        s1r = cyr[0] * coef;
        s1i = cyi[0] * coef;
        if (iflag !== 0) {
          goToLabel = 150;break;
        }
        if (id === 1) {
          goToLabel = 140;break;
        }
        air = csqr * s1r - csqi * s1i;
        aii = csqr * s1i + csqi * s1r;
        break mainExecutionLoop;
      case 140:
        air = -(zr * s1r - zi * s1i);
        aii = -(zr * s1i + zi * s1r);
        break mainExecutionLoop;
      case 150:
        s1r = s1r * sfac;
        s1i = s1i * sfac;
        if (id === 1) {
          goToLabel = 160;break;
        }
        str = s1r * csqr - s1i * csqi;
        s1i = s1r * csqi + s1i * csqr;
        s1r = str;
        air = s1r / sfac;
        aii = s1i / sfac;
        break mainExecutionLoop;
      case 160:
        str = -(s1r * zr - s1i * zi);
        s1i = -(s1r * zi + s1i * zr);
        s1r = str;
        air = s1r / sfac;
        aii = s1i / sfac;
        break mainExecutionLoop;
      case 170:
        aa = 1.0e+3 * (0, _d1mach.d1mach)(1);
        s1r = zeror;
        s1i = zeroi;
        if (id === 1) {
          goToLabel = 190;break;
        }
        if (az <= aa) {
          goToLabel = 180;break;
        }
        s1r = c2 * zr;
        s1i = c2 * zi;
      case 180:
        air = c1 - s1r;
        aii = -s1i;
        break mainExecutionLoop;
      case 190:
        air = -c2;
        aii = 0.0;
        aa = Math.sqrt(aa);
        if (az <= aa) {
          goToLabel = 200;break;
        }
        s1r = 0.5 * (zr * zr - zi * zi);
        s1i = zr * zi;
      case 200:
        air = air + c1 * s1r;
        aii = aii + c1 * s1i;
        break mainExecutionLoop;
      case 210:
        nz = 1;
        air = zeror;
        aii = zeroi;
        break mainExecutionLoop;
      case 270:
        nz = 0;
        ierr = 2;
        break mainExecutionLoop;
      case 280:
        if (nn === -1) {
          goToLabel = 270;break;
        }
        nz = 0;
        ierr = 5;
        break mainExecutionLoop;
      case 260:
        ierr = 4;
        nz = 0;
      default:
        break mainExecutionLoop;
    }
  }

  return [air, aii, nz, ierr];
}