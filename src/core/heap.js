const { floor, min } = Math;

// Default comparison function to be used
const defaultCmp = (x, y) => {
  if (x < y) return -1;
  if (x > y) return 1;
  return 0;
};

// Insert item x in list a, and keep it sorted assuming a is sorted.
// If x is already in a, insert it to the right of the rightmost x.
// Optional args lo (default 0) and hi (default a.length) bound the slice of a to be searched.
const insort = (a, x, lo = 0, hi, cmp = defaultCmp) => {
  if (lo < 0) throw new Error('lo must be non-negative');
  hi = hi === undefined ? a.length : hi;
  while (lo < hi) {
    const mid = floor((lo + hi) / 2);
    if (cmp(x, a[mid]) < 0) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  a.splice(lo, 0, x);
};

// Push item onto heap, maintaining the heap invariant.
const heappush = (array, item, cmp = defaultCmp) => {
  array.push(item);
  _siftdown(array, 0, array.length - 1, cmp);
};

// Pop the smallest item off the heap, maintaining the heap invariant.
const heappop = (array, cmp = defaultCmp) => {
  const lastelt = array.pop();
  if (array.length) {
    const returnitem = array[0];
    array[0] = lastelt;
    _siftup(array, 0, cmp);
    return returnitem;
  } else {
    return lastelt;
  }
};

// Pop and return the current smallest value, and add the new item.
// This is more efficient than heappop() followed by heappush(), and can be
// more appropriate when using a fixed size heap. Note that the value
// returned may be larger than item! That constrains reasonable use of
// this routine unless written as part of a conditional replacement:
//     if item > array[0]
//       item = heapreplace(array, item)
const heapreplace = (array, item, cmp = defaultCmp) => {
  const returnitem = array[0];
  array[0] = item;
  _siftup(array, 0, cmp);
  return returnitem;
};

// Fast version of a heappush followed by a heappop.
const heappushpop = (array, item, cmp = defaultCmp) => {
  if (array.length && cmp(array[0], item) < 0) {
    [item, array[0]] = [array[0], item];
    _siftup(array, 0, cmp);
  }
  return item;
};

// Transform list into a heap, in-place, in O(array.length) time.
const heapify = (array, cmp = defaultCmp) => {
  for (let i = floor(array.length / 2) - 1; i >= 0; i--) {
    _siftup(array, i, cmp);
  }
};

// Update the position of the given item in the heap.
// This function should be called every time the item is being modified.
const updateItem = (array, item, cmp = defaultCmp) => {
  const pos = array.indexOf(item);
  if (pos === -1) return;
  _siftdown(array, 0, pos, cmp);
  _siftup(array, pos, cmp);
};

// Find the n largest elements in a dataset.
const nlargest = (array, n, cmp = defaultCmp) => {
  let result = array.slice(0, n);
  if (!result.length) return result;
  heapify(result, cmp);
  for (let elem of array.slice(n)) {
    heappushpop(result, elem, cmp);
  }
  return result.sort(cmp).reverse();
};

// Find the n smallest elements in a dataset.
const nsmallest = (array, n, cmp = defaultCmp) => {
  if (n * 10 <= array.length) {
    let result = array.slice(0, n).sort(cmp);
    if (!result.length) return result;
    let los = result[result.length - 1];
    for (let elem of array.slice(n)) {
      if (cmp(elem, los) < 0) {
        insort(result, elem, 0, null, cmp);
        result.pop();
        los = result[result.length - 1];
      }
    }
    return result;
  }

  heapify(array, cmp);
  return Array.from({ length: min(n, array.length) }, () => heappop(array, cmp));
};

const _siftdown = (array, startpos, pos, cmp = defaultCmp) => {
  const newitem = array[pos];
  while (pos > startpos) {
    const parentpos = (pos - 1) >> 1;
    const parent = array[parentpos];
    if (cmp(newitem, parent) < 0) {
      array[pos] = parent;
      pos = parentpos;
      continue;
    }
    break;
  }
  array[pos] = newitem;
};

const _siftup = (array, pos, cmp = defaultCmp) => {
  const endpos = array.length;
  const startpos = pos;
  const newitem = array[pos];
  let childpos = 2 * pos + 1;
  while (childpos < endpos) {
    const rightpos = childpos + 1;
    if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
      childpos = rightpos;
    }
    array[pos] = array[childpos];
    pos = childpos;
    childpos = 2 * pos + 1;
  }
  array[pos] = newitem;
  _siftdown(array, startpos, pos, cmp);
};

export default class Heap {
  constructor(cmp = defaultCmp) {
    this.cmp = cmp;
  }

  static push = heappush;
  static pop = heappop;
  static replace = heapreplace;
  static pushpop = heappushpop;
  static heapify = heapify;
  static updateItem = updateItem;
  static nlargest = nlargest;
  static nsmallest = nsmallest;
}

