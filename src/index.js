/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2017-08-18 09:40:00
 * @desc [utils方法]
*/

import clone, { deepClone } from './clone.js'
import array, { swap, unique, newArray } from './array'
import { throtte, debounce } from './array'
import date, { formatDate, duration, ago } from './date.js'
import url, { query, hash, hostname, domain, sub, pathname } from './url.js'

const utils = Object.assign({}, clone, array, { throtte, debounce }, date, url)

export default utils
export {
  // clone.js
  deepClone,
  // array.js
  swap, unique, newArray,
  // throtte.js
  throtte, debounce,
  // date.js
  formatDate, duration, ago,
  // url.js
  query, hash, hostname, domain, sub, pathname,
}
