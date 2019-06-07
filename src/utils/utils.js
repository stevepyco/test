export function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

export function isObject(input) {
  return input != null && input != undefined && Object.prototype.toString.call(input) === '[object Object]';
}

export function isString(input) {
  return Object.prototype.toString.call(input) === "[object String]";
}

export default {
  isArray,
  isObject,
  isString
}