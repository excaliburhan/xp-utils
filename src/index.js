/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2017-08-18 09:40:00
 * @desc [utils方法]
*/

import { deepClone } from './lib/clone.js'
import { swap, unique, newArray } from './lib/array.js'
import { throttle, debounce } from './lib/throttle.js'
import { formatDate, duration, ago } from './lib/date.js'
import { query, queryFromStr, hash, hostname, domain, sub, pathname } from './lib/url.js'
import { len, subStr } from './lib/string.js'
import { thousands, percent } from './lib/number.js'

const utils = {
  // clone.js
  deepClone,
  // array.js
  swap, unique, newArray,
  // throttle.js
  throttle, debounce,
  // date.js
  formatDate, duration, ago,
  // url.js
  query, queryFromStr, hash, hostname, domain, sub, pathname,
  // string.js
  len, subStr,
  // number.js
  thousands, percent,
}

export default utils
export {
  deepClone,
  swap, unique, newArray,
  throttle, debounce,
  formatDate, duration, ago,
  query, queryFromStr, hash, hostname, domain, sub, pathname,
  len, subStr,
  thousands, percent,
}
