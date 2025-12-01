/**
 *  @file       tube-forces.js       Mathematical physics code that models the axial and radial
 *                                   forces felt by a bobin coil inside of a bi-layer conducting,
 *                                   ferromagnetic tube structure.
 *
 *  @author     Dan Desjardins, dan@distributive.network
 *  @date       November 2025
 */

// Require math functions
const Complex     = require('./lib/utils/complex.js');
const { besselI } = require('./lib/special/mpmath/functions/bessel.js');
const { besselK } = require('./lib/special/amos.js');
const { struveL } = require('./lib/special/c_misc/struve.js');
const { quad }    = require('./lib/integration/quadpack.js');

// Begin physics equations
function Lambda1(sign, k, v, f, mu1, sigma1) {
    return Complex.sqrt([k ** 2, (2 * Math.PI * f + sign * k * v) * 4 * Math.PI * 10 ** -7 * mu1 * sigma1]);
}

function Lambda2(sign, k, v, f, mu2, sigma2) {
    return Complex.sqrt([k ** 2, (2 * Math.PI * f + sign * k * v) * 4 * Math.PI * 10 ** -7 * mu2 * sigma2]);
}

function scriptA(k, Lambda1, a, mu1) {
    let Lambda1_a = Complex.mul(Lambda1, a);
    return Complex.add(
    1,
    Complex.prod([
        Complex.mul(mu1 / k, Lambda1),
        (Lambda1_a[0] < 12) ?
        Complex.div(besselI(0, Lambda1_a), besselI(1, Lambda1_a)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(128, Complex.pow(Lambda1_a, 2)),
            Complex.mul(72, Lambda1_a),
            75
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(-384, Complex.pow(Lambda1_a, 2)),
            Complex.mul(-120, Lambda1_a),
            -105
        ])
        ),
        (k * a < 12) ?
        Complex.div(besselK(1, k * a), besselK(0, k * a)) :
        (1024 * (k * a) ** 3 + 384 * (k * a) ** 2 - 120 * (k * a) + 105) /
        (1024 * (k * a) ** 3 - 128 * (k * a) ** 2 + 72 * (k * a) - 75)
    ])
    );
}

function scriptB(k, Lambda1, a, b, mu1) {
    let Lambda1_a = Complex.mul(Lambda1, a);
    let Lambda1_b = Complex.mul(Lambda1, b);
    return Complex.prod([
    (Lambda1_b[0] < 12) ?
    Complex.div(besselI(0, Lambda1_b), besselK(0, Lambda1_b)) :
    Complex.mul(
        Complex.exp(Complex.mul(-2 * (a - b), Lambda1)),
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            -75,
        ])
        )
    ),
    (Lambda1_b[0] < 12) ?
    Complex.div(besselK(1, Lambda1_a), besselI(1, Lambda1_a)) :
    Complex.div(
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
        Complex.mul(384, Complex.pow(Lambda1_a, 2)),
        Complex.mul(-120, Lambda1_a),
        105,
        ]),
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
        Complex.mul(-384, Complex.pow(Lambda1_a, 2)),
        Complex.mul(-120, Lambda1_a),
        -105,
        ])
    ),
    Complex.sub(
        1,
        Complex.prod([
        Complex.mul(mu1 / k, Lambda1),
        (Lambda1_a[0] < 12) ?
        Complex.div(besselK(0, Lambda1_a), besselK(1, Lambda1_a)) :
        Complex.div(
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_a, 2)),
            Complex.mul(72, Lambda1_a),
            -75,
            ]),
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(384, Complex.pow(Lambda1_a, 2)),
            Complex.mul(-120, Lambda1_a),
            105,
            ])
        ),
        (k * a < 12) ?
        Complex.div(besselK(1, k * a), besselK(0, k * a)) :
        (1024 * (k * a) ** 3 + 384 * (k * a) ** 2 - 120 * (k * a) + 105) /
        (1024 * (k * a) ** 3 - 128 * (k * a) ** 2 + 72 * (k * a) - 75)
        ])
    )
    ]);
}

function scriptC(k, Lambda1, a, mu1) {
    let Lambda1_a = Complex.mul(Lambda1, a);
    return Complex.sub(
    1,
    Complex.prod([
        Complex.mul(mu1 / k, Lambda1),
        (Lambda1_a[0] < 12) ?
        Complex.div(besselI(0, Lambda1_a), besselI(1, Lambda1_a)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(128, Complex.pow(Lambda1_a, 2)),
            Complex.mul(72, Lambda1_a),
            75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(-384, Complex.pow(Lambda1_a, 2)),
            Complex.mul(-120, Lambda1_a),
            -105,
        ])
        ),
        (k * a < 12) ?
        Complex.div(besselI(1, k * a), besselI(0, k * a)) :
        (1024 * (k * a) ** 3 - 384 * (k * a) ** 2 - 120 * (k * a) - 105) /
        (1024 * (k * a) ** 3 + 128 * (k * a) ** 2 + 72 * (k * a) + 75)
    ])
    );
}

function scriptD(k, Lambda1, a, b, mu1) {
    let Lambda1_a = Complex.mul(Lambda1, a);
    let Lambda1_b = Complex.mul(Lambda1, b);
    return Complex.prod([
    (Lambda1_b[0] < 12) ?
    Complex.div(besselI(0, Lambda1_b), besselK(0, Lambda1_b)) :
    Complex.mul(
        Complex.exp(Complex.mul(-2 * (a - b), Lambda1)),
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            -75,
        ])
        )
    ),
    (Lambda1_b[0] < 12) ?
    Complex.div(besselK(1, Lambda1_a), besselI(1, Lambda1_a)) :
    Complex.div(
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
        Complex.mul(384, Complex.pow(Lambda1_a, 2)),
        Complex.mul(-120, Lambda1_a),
        105,
        ]),
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
        Complex.mul(-384, Complex.pow(Lambda1_a, 2)),
        Complex.mul(-120, Lambda1_a),
        -105,
        ])
    ),
    Complex.add(
        1,
        Complex.prod([
        Complex.mul(mu1 / k, Lambda1),
        (Lambda1_a[0] < 12) ?
        Complex.div(besselK(0, Lambda1_a), besselK(1, Lambda1_a)) :
        Complex.div(
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_a, 2)),
            Complex.mul(72, Lambda1_a),
            -75,
            ]),
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_a, 3)),
            Complex.mul(+384, Complex.pow(Lambda1_a, 2)),
            Complex.mul(-120, Lambda1_a),
            105,
            ])
        ),
        (k * a < 12) ?
        Complex.div(besselI(1, k * a), besselI(0, k * a)) :
        (1024 * (k * a) ** 3 - 384 * (k * a) ** 2 - 120 * (k * a) - 105) /
        (1024 * (k * a) ** 3 + 128 * (k * a) ** 2 + 72 * (k * a) + 75)
        ])
    )
    ]);
}

function scriptE(k, Lambda1, Lambda2, b, mu1, mu2) {
    let Lambda1_b = Complex.mul(Lambda1, b);
    let Lambda2_b = Complex.mul(Lambda2, b);
    return Complex.add(
    1,
    Complex.prod([
        Complex.div(Complex.mul(mu2, Lambda2), Complex.mul(mu1, Lambda1)),
        (Lambda2_b[0] < 12) ?
        Complex.div(besselI(0, Lambda2_b), besselI(1, Lambda2_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(128, Complex.pow(Lambda2_b, 2)),
            Complex.mul(72, Lambda2_b),
            75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(-384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            -105,
        ])
        ),
        (Lambda1_b[0] < 12) ?
        Complex.div(besselK(1, Lambda1_b), besselK(0, Lambda1_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(384, Complex.pow(Lambda1_b, 2)),
            Complex.mul(-120, Lambda1_b),
            105,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            -75,
        ])
        )
    ])
    );
}

function scriptF(k, Lambda1, Lambda2, b, mu1, mu2) {
    let Lambda1_b = Complex.mul(Lambda1, b);
    let Lambda2_b = Complex.mul(Lambda2, b);
    return Complex.sub(
    1,
    Complex.prod([
        Complex.div(Complex.mul(mu2, Lambda2), Complex.mul(mu1, Lambda1)),
        (Lambda2_b[0] < 12) ?
        Complex.div(besselK(0, Lambda2_b), besselK(1, Lambda2_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda2_b, 2)),
            Complex.mul(72, Lambda2_b),
            -75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            105,
        ])
        ),
        (Lambda1_b[0] < 12) ?
        Complex.div(besselK(1, Lambda1_b), besselK(0, Lambda1_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(384, Complex.pow(Lambda1_b, 2)),
            Complex.mul(-120, Lambda1_b),
            105,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            -75,
        ])
        )
    ])
    );
}

function scriptG(k, Lambda1, Lambda2, b, mu1, mu2) {
    let Lambda1_b = Complex.mul(Lambda1, b);
    let Lambda2_b = Complex.mul(Lambda2, b);
    return Complex.add(
    1,
    Complex.prod([
        Complex.div(Complex.mul(mu2, Lambda2), Complex.mul(mu1, Lambda1)),
        (Lambda2_b[0] < 12) ?
        Complex.div(besselK(0, Lambda2_b), besselK(1, Lambda2_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(-128, Complex.pow(Lambda2_b, 2)),
            Complex.mul(72, Lambda2_b),
            -75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            105,
        ])
        ),
        (Lambda1_b[0] < 12) ?
        Complex.div(besselI(1, Lambda1_b), besselI(0, Lambda1_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-384, Complex.pow(Lambda1_b, 2)),
            Complex.mul(-120, Lambda1_b),
            -105,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            75,
        ])
        )
    ])
    );
}

function scriptH(k, Lambda1, Lambda2, b, mu1, mu2) {
    let Lambda1_b = Complex.mul(Lambda1, b);
    let Lambda2_b = Complex.mul(Lambda2, b);
    return Complex.sub(
    1,
    Complex.prod([
        Complex.div(Complex.mul(mu2, Lambda2), Complex.mul(mu1, Lambda1)),
        (Lambda2_b[0] < 12) ?
        Complex.div(besselI(0, Lambda2_b), besselI(1, Lambda2_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(128, Complex.pow(Lambda2_b, 2)),
            Complex.mul(72, Lambda2_b),
            75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(-384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            -105,
        ])
        ),
        (Lambda1_b[0] < 12) ?
        Complex.div(besselI(1, Lambda1_b), besselI(0, Lambda1_b)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(-384, Complex.pow(Lambda1_b, 2)),
            Complex.mul(-120, Lambda1_b),
            -105,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda1_b, 3)),
            Complex.mul(128, Complex.pow(Lambda1_b, 2)),
            Complex.mul(72, Lambda1_b),
            75,
        ])
        )
    ])
    );
}

function scriptI(k, Lambda2, c, mu2) {
    let Lambda2_c = Complex.mul(Lambda2, c);
    return Complex.add(
    1,
    Complex.prod([
        Complex.mul(mu2 / k, Lambda2),
        (Lambda2_c[0] < 12) ?
        Complex.div(besselK(0, Lambda2_c), besselK(1, Lambda2_c)) :
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
            Complex.mul(-128, Complex.pow(Lambda2_c, 2)),
            Complex.mul(72, Lambda2_c),
            -75,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
            Complex.mul(384, Complex.pow(Lambda2_c, 2)),
            Complex.mul(-120, Lambda2_c),
            105,
        ])
        ),
        (k * c < 12) ?
        Complex.div(besselI(1, k * c), besselI(0, k * c)) :
        (1024 * (k * c) ** 3 - 384 * (k * c) ** 2 - 120 * (k * c) - 105) /
        (1024 * (k * c) ** 3 + 128 * (k * c) ** 2 + 72 * (k * c) + 75)
    ])
    );
}

function scriptK(k, Lambda2, b, c, mu2) {
    let Lambda2_b = Complex.mul(Lambda2, b);
    let Lambda2_c = Complex.mul(Lambda2, c);
    return Complex.prod([
    (Lambda2_c[0] < 12) ?
    Complex.div(besselK(1, Lambda2_b), besselI(1, Lambda2_b)) :
    Complex.mul(
        Complex.exp(Complex.mul(-2 * (b - c), Lambda2)),
        Complex.div(
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            105,
        ]),
        Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_b, 3)),
            Complex.mul(-384, Complex.pow(Lambda2_b, 2)),
            Complex.mul(-120, Lambda2_b),
            -105,
        ])
        )
    ),
    (Lambda2_c[0] < 12) ?
    Complex.div(besselI(1, Lambda2_c), besselK(1, Lambda2_c)) :
    Complex.div(
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
        Complex.mul(-384, Complex.pow(Lambda2_c, 2)),
        Complex.mul(-120, Lambda2_c),
        -105,
        ]),
        Complex.sum([
        Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
        Complex.mul(384, Complex.pow(Lambda2_c, 2)),
        Complex.mul(-120, Lambda2_c),
        105,
        ])
    ),
    Complex.sub(
        1,
        Complex.prod([
        Complex.mul(mu2 / k, Lambda2),
        (Lambda2_c[0] < 12) ?
        Complex.div(besselI(0, Lambda2_c), besselI(1, Lambda2_c)) :
        Complex.div(
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
            Complex.mul(128, Complex.pow(Lambda2_c, 2)),
            Complex.mul(72, Lambda2_c),
            75,
            ]),
            Complex.sum([
            Complex.mul(1024, Complex.pow(Lambda2_c, 3)),
            Complex.mul(-384, Complex.pow(Lambda2_c, 2)),
            Complex.mul(-120, Lambda2_c),
            -105,
            ])
        ),
        (k * c < 12) ?
        Complex.div(besselI(1, k * c), besselI(0, k * c)) :
        (1024 * (k * c) ** 3 - 384 * (k * c) ** 2 - 120 * (k * c) - 105) /
        (1024 * (k * c) ** 3 + 128 * (k * c) ** 2 + 72 * (k * c) + 75)
        ])
    )
    ]);
}

function c1(k, Lambda1, Lambda2, a, b, c, mu1, mu2) {
    let termEIFK = Complex.sub(
    Complex.mul(
        scriptE(k, Lambda1, Lambda2, b, mu1, mu2),
        scriptI(k, Lambda2, c, mu2)
    ),
    Complex.mul(
        scriptF(k, Lambda1, Lambda2, b, mu1, mu2),
        scriptK(k, Lambda2, b, c, mu2)
    )
    );
    let termHIGK = Complex.sub(
    Complex.mul(
        scriptH(k, Lambda1, Lambda2, b, mu1, mu2),
        scriptI(k, Lambda2, c, mu2)
    ),
    Complex.mul(
        scriptG(k, Lambda1, Lambda2, b, mu1, mu2),
        scriptK(k, Lambda2, b, c, mu2)
    )
    );
    return Complex.div(
    Complex.add(
        Complex.mul(scriptC(k, Lambda1, a, mu1), termEIFK),
        Complex.mul(scriptD(k, Lambda1, a, b, mu1), termHIGK)
    ),
    Complex.add(
        Complex.mul(scriptA(k, Lambda1, a, mu1), termEIFK),
        Complex.mul(scriptB(k, Lambda1, a, b, mu1), termHIGK)
    )
    );
}

function axialForce(f, v, i, n, wc, l, wa, R, w1, sigma1, mu1, w2, sigma2, mu2) {

    let func = function(x) {

    if (x == 0 || x == 1 || v == 0) return 0;

    let a = R;
    let b = R - w1;
    let c = R - w1 - w2;
    let ri = R + wa;
    let ro = R + wa + wc;
    let g = (1 / a + 1 / b + 1 / c + 1 / ri + 1 / ro + 2 * Math.PI * f / (v + 1)) * 1 / 6;
    let k = g * x / (1 - x);

    let coilFcn;
    (k * ro < 12) ?
    coilFcn = Complex.prod([
        Math.sin((k * l) / 2) ** 2 * k ** -3,
        Complex.pow(
            Complex.sub(
            Complex.add(
                Complex.prod([besselK(1, k * ro), struveL(0, k * ro), ro]),
                Complex.prod([besselK(0, k * ro), struveL(1, k * ro), ro])
            ),
            Complex.add(
                Complex.prod([besselK(1, k * ri), struveL(0, k * ri), ri]),
                Complex.prod([besselK(0, k * ri), struveL(1, k * ri), ri])
            )
            ), 2
        ),
        Complex.div(besselI(0, k * a), besselK(0, k * a))
        ]):

        coilFcn = Math.sin((k * l) / 2) ** 2 * 2 / (Math.PI ** 2 * k ** 4) * (
        Math.sqrt(ri) * (1 + 7 / (8 * k * ri) - 71 / (128 * (k * ri) ** 2)) -
        Math.sqrt(ro) * (1 + 7 / (8 * k * ro) - 71 / (128 * (k * ro) ** 2)) *
        Math.exp(-k * (ro - ri))) ** 2 * Math.exp(-2 * k * (ri - a)) * (
        (1024 * (k * a) ** 3 + 128 * (k * a) ** 2 + 72 * (k * a) + 75) /
        (1024 * (k * a) ** 3 - 128 * (k * a) ** 2 + 72 * (k * a) - 75));

    let tubeFcn = Complex.sub(
        c1(k,
        Lambda1(1, k, v, f, mu1, sigma1),
        Lambda2(1, k, v, f, mu2, sigma2),
        a, b, c, mu1, mu2
        ),
        c1(k,
        Lambda1(-1, k, v, f, mu1, sigma1),
        Lambda2(-1, k, v, f, mu2, sigma2),
        a, b, c, mu1, mu2
        )
    )[1];

    return 2 * Math.PI * (Math.PI * n * i) ** 2 * 10 ** -7 * coilFcn * tubeFcn * g / (x - 1) ** 2;
    };

    let min = 0;
    let max = 1;
    let [result, absErr] = quad(func, min, max, {
    limit: 100
    });

    return result;
}

function radialForce(f, v, i, n, wc, l, wa, R, w1, sigma1, mu1, w2, sigma2, mu2) {

    let func = function(x) {

    if (x == 1 || f == 0 && v == 0) return 0;

    let a = R;
    let b = R - w1;
    let c = R - w1 - w2;
    let ri = R + wa;
    let ro = R + wa + wc;
    let g = (1 / a + 1 / b + 1 / c + 1 / ri + 1 / ro + 2 * Math.PI * f / (v + 1)) * 1 / 6;
    let k = g * x / (1 - x);


    let coilFcn;
    (k * ro < 12) ?
    coilFcn = Complex.prod([
        Math.sin((k * l) / 2) ** 2 * k ** -3,
        Complex.sub(
            Complex.add(
            Complex.prod([besselK(1, k * ro), struveL(0, k * ro), ro]),
            Complex.prod([besselK(0, k * ro), struveL(1, k * ro), ro])
            ),
            Complex.add(
            Complex.prod([besselK(1, k * ri), struveL(0, k * ri), ri]),
            Complex.prod([besselK(0, k * ri), struveL(1, k * ri), ri])
            )
        ),
        Complex.sub(Complex.mul(ro, besselK(1, k * ro)), Complex.mul(ri, besselK(1, k * ri))),
        Complex.div(besselI(0, k * a), besselK(0, k * a))
        ]):

        coilFcn = Math.sin((k * l) / 2) ** 2 / (Math.PI * k ** 4) *
        (Math.sqrt(ri) * (1 + 7 / (8 * k * ri) - 71 / (128 * (k * ri) ** 2)) -
        Math.sqrt(ro) * (1 + 7 / (8 * k * ro) - 71 / (128 * (k * ro) ** 2)) *
        Math.exp(-k * (ro - ri))) *
        (-Math.sqrt(ri) * (1 + 3 / (8 * k * ri) - 15 / (128 * (k * ri) ** 2)) +
        Math.sqrt(ro) * (1 + 3 / (8 * k * ro) - 15 / (128 * (k * ro) ** 2)) *
        Math.exp(-k * (ro - ri))) *
        (1024 * (k * a) ** 3 + 128 * (k * a) ** 2 + 72 * (k * a) + 75) /
        (1024 * (k * a) ** 3 - 128 * (k * a) ** 2 + 72 * (k * a) - 75) *
        Math.exp(-2 * k * (ri - a));


    let tubeFcn = Complex.add(
        c1(k,
        Lambda1(1, k, v, f, mu1, sigma1),
        Lambda2(1, k, v, f, mu2, sigma2),
        a, b, c, mu1, mu2
        ),
        c1(k,
        Lambda1(-1, k, v, f, mu1, sigma1),
        Lambda2(-1, k, v, f, mu2, sigma2),
        a, b, c, mu1, mu2
        )
    )[0];

    return (2 * Math.PI * n * i) ** 2 * 10 ** -7 * coilFcn * tubeFcn * g / (x - 1) ** 2;
    };

    let min = 0;
    let max = 1;
    let [result, absErr] = quad(func, min, max, {
    limit: 100
    });

    return result;
}

exports.axialForce = axialForce;
exports.radialForce = radialForce;