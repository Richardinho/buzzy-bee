import {hasCommonPoint} from './has-common-point';

/*
 *  compares two rectangular elements and returns TRUE if
 *  any part of one overlaps with the other
 */

export function hasCollision(objA, objB) {
  const {
    x: ax,
    y: ay,
    width: aw,
    height: ah,
  } = objA;

  const {
    x: bx,
    y: by,
    width: bw,
    height: bh,
  } = objB;

  const min_a_x = ax;
  const max_a_x = ax + aw;

  const min_a_y = ay;
  const max_a_y = ay + ah;

  const min_b_x = bx;
  const max_b_x = bx + bw;

  const min_b_y = by;
  const max_b_y = by + bh;

  const lineA = [min_a_x, max_a_x]
  const lineB = [min_b_x, max_b_x];

  const vlineA = [min_a_y, max_a_y]
  const vlineB = [min_b_y, max_b_y];

  let x_collision = false;
  let y_collision = false;

  if (hasCommonPoint(min_a_x, lineB)
    || hasCommonPoint(max_a_x, lineB)
    || hasCommonPoint(min_b_x, lineA)) {
    x_collision = true;
  }

  if (hasCommonPoint(min_a_y, vlineB)
    || hasCommonPoint(max_a_y, vlineB)
    || hasCommonPoint(min_b_y, vlineA)) {
    y_collision = true;
  }

  return x_collision && y_collision;
}
