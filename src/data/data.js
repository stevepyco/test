import { isArray, isString } from '../utils/utils'

/**
 * @export store function
 * @param {array}
 * @returns {string}
 */
export function store(array) {
  let result = '';
  if (isArray(array) && array.length > 0) {
    result = array.map(el =>
      Object.entries(el)
        .map(item => item.join('='))
        .join(';')
    ).join('\n');
  }
  return result;
}

/**
 *
 *
 * @export load function
 * @param {string} text
 * @returns {Array}
 */
export function load(text) {
	let result = [];
  if (!isString(text) || !text) return result;
  
  result = text.split('\n').map(item => {
    const obj = {};
    item.split(';').forEach(data => {
      if (data) {
        const key = data.substring(0, data.indexOf('=v'));
        const value = data.substring(data.indexOf('=v') + 1);
        obj[key] = value;
      }
    });
    return obj;
  });

  return result;
}

export default {
  store,
  load
}