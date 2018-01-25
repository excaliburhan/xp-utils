/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2017-08-18 09:40:00
 * @desc [utils方法]
*/

import clone, { deepClone } from './lib/clone.js'
import array, { swap, unique, newArray } from './lib/array.js'
import { throttle, debounce } from './lib/throtte.js'
import date, { formatDate, duration, ago } from './lib/date.js'
import url, { query, queryFromStr, hash, hostname, domain, sub, pathname } from './lib/url.js'
import string, { len, subStr } from './lib/string.js'
import number, { thousands, percent } from './lib/number.js'

const utils = Object.assign({}, clone, array, { throttle, debounce }, date, url, number)

export default utils
export {
  // clone.js
  deepClone,
  // array.js
  swap, unique, newArray,
  // throtte.js
  throttle, debounce,
  // date.js
  formatDate, duration, ago,
  // url.js
  query, queryFromStr, hash, hostname, domain, sub, pathname,
  // string.js
  string, len, subStr,
  // number.js
  number, thousands, percent,
}
