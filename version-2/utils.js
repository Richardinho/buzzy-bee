
export function px(val) {
  return val + 'px';
}

/*
 *  Show a different message every now and again, just for fun.
 */

export function getWallsReason() {
  const reasons = [
    'Watch out for Walls!',
    'Watch out for Walls!',
    'Watch out for Walls!',
    'Walls, DUHH!',
    'Watch out for Walls!',
    'Watch out for Walls!',
  ];

  const index = Math.floor(Math.random() * reasons.length);

  return reasons[index];
}
