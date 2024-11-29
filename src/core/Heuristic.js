/**
 * @namespace PF.Heuristic
 * @description A collection of heuristic functions.
 */


/**
* Manhattan distance.
* @param {number} dx - Difference in x.
* @param {number} dy - Difference in y.
* @return {number} dx + dy
*/
export function manhattan (dx, dy) {
  return dx + dy;
}

/**
* Euclidean distance.
* @param {number} dx - Difference in x.
* @param {number} dy - Difference in y.
* @return {number} sqrt(dx * dx + dy * dy)
*/
export function euclidean(dx, dy) {
  return Math.sqrt(dx * dx + dy * dy);
}

/**
* Octile distance.
* @param {number} dx - Difference in x.
* @param {number} dy - Difference in y.
* @return {number} sqrt(dx * dx + dy * dy) for grids
*/
export function octile(dx, dy) {
  var F = Math.SQRT2 - 1;
  return (dx < dy) ? F * dx + dy : F * dy + dx;
}

/**
* Chebyshev distance.
* @param {number} dx - Difference in x.
* @param {number} dy - Difference in y.
* @return {number} max(dx, dy)
*/
export function chebyshev(dx, dy) {
  return Math.max(dx, dy);
}


