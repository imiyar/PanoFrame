export function msToString(time) {
  if (typeof time !== 'number') return '';

  let seconds = time;
  let timeArray = [];
  timeArray.push(Math.floor(seconds / 3600));
  seconds %= 3600;
  timeArray.push(Math.floor(seconds / 60));
  timeArray.push(Math.floor(seconds % 60));
  timeArray = timeArray.map(value => (value < 10 ? `0${value}` : value));
  return timeArray.join(':');
}

export function stringToMs(time) {
  if (typeof time !== 'string') return 0;

  const [h, m, s] = time.split(':');
  return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10);
}

export function binarySearch(arr, val, init) {
  const tolerance = 0.5;
  let right = arr.length - 1;
  let left = 0;
  let mid = 0;

  while (right >= left) {
    mid = Math.floor((right + left) / 2);
    const compare = arr[mid].time - val;
    if (compare >= tolerance) {
      right = mid - 1;
    } else if (compare < -tolerance) {
      left = mid + 1;
    } else {
      // if found, return the index
      return {
        found: true,
        index: mid,
        item: arr[mid],
      };
    }
  }
  // if not found, return the last index
  return {
    found: false,
    index: right,
    item: right === -1 ? init : arr[right],
  };
}

export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const copy = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key]);
  });

  return copy;
}

export function debounce(func, delay) {
  let timer;
  return function debouncedFunc(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
