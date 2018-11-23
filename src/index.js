/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2018-11-23 12:04:29
 * @desc [utils方法]
*/

import { deepClone } from './lib/clone'
import { swap, unique, newArray } from './lib/array'
import { throttle, debounce } from './lib/throttle'
import { formatDate, duration, ago } from './lib/date'
import { qs, qsStringify } from './lib/url'
import { len, subStr, padStart, padEnd } from './lib/string'
import { thousands, fixed } from './lib/number'
import { isAndroid, isIOS, isMobile } from './lib/ua'
import { lockScroll } from './lib/body-scroll'
import { decode, encode, escapeHtml, escapeJs } from './lib/security'

const utils = {
  // clone.js
  deepClone,
  // array.js
  swap,
  unique,
  newArray,
  // throttle.js
  throttle,
  debounce,
  // date.js
  formatDate,
  duration,
  ago,
  // url.js
  qs,
  qsStringify,
  // string.js
  len,
  subStr,
  padStart,
  padEnd,
  // number.js
  thousands,
  fixed,
  // ua.js
  isAndroid,
  isIOS,
  isMobile,
  // body-scroll
  lockScroll,
  // security.js
  decode,
  encode,
  escapeHtml,
  escapeJs
}

export default utils
export {
  deepClone,
  swap,
  unique,
  newArray,
  throttle,
  debounce,
  formatDate,
  duration,
  ago,
  qs,
  qsStringify,
  len,
  subStr,
  padStart,
  padEnd,
  thousands,
  fixed,
  isAndroid,
  isIOS,
  isMobile,
  lockScroll,
  decode,
  encode,
  escapeHtml,
  escapeJs
}
