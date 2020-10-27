
/*
 *  return TRUE if x_a lies between points x_b1 and x_b2
 */

export function hasCommonPoint(x_a, [x_b1, x_b2]) {
  return x_a > x_b1 && x_a < x_b2;
}
