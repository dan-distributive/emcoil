// static double stop = 1.37e-17;
// extern double MACHEP;
//
//
// double onef2(double a, double b, double c, double x, double *err)
// {
//     double n, a0, sum, t;
//     double an, bn, cn, max, z;
//
//     an = a;
//     bn = b;
//     cn = c;
//     a0 = 1.0;
//     sum = 1.0;
//     n = 1.0;
//     t = 1.0;
//     max = 0.0;
//
//     do {
//   if (an===0)
//       goto done;
//   if (bn===0)
//       goto error;
//   if (cn===0)
//       goto error;
//   if ((a0 > 1.0e34) || (n > 200))
//       goto error;
//   a0 *= (an * x) / (bn * cn * n);
//   sum += a0;
//   an += 1.0;
//   bn += 1.0;
//   cn += 1.0;
//   n += 1.0;
//   z = fabs(a0);
//   if (z > max)
//       max = z;
//   if (sum !== 0)
//       t = fabs(a0 / sum);
//   else
//       t = z;
//     }
//     while (t > stop);
//
//   done:
//
//     *err = fabs(MACHEP * max / sum);
//
// #if DEBUG
//     printf(" onef2 cancellation error %.5E\n", *err);
// #endif
//
//     goto xit;
//
//   error:
// #if DEBUG
//     printf("onef2 does not converge\n");
// #endif
//     *err = 1.0e38;
//
//   xit:
//
// #if DEBUG
//     printf("onef2( %.2E %.2E %.2E %.5E ) =  %.3E  %.6E\n", a, b, c, x, n,
//      sum);
// #endif
//     return (sum);
// }