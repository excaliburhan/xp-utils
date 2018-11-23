var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// 对象和数组的深拷贝
function deepClone(source) {
  if (!source && (typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && _typeof(source[keys]) === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

// 交换数组中元素位置
function swap(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

// 去除数组重复元素，不支持引用类型
function unique(arr) {
  return arr.filter(function (v, i, _) {
    return _.indexOf(v) === i;
  });
}

// 快速生成有序数组
function newArray(num) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return Array(num).fill().map(function (_, i) {
    return i + from;
  });
}

// from underscore
// 节流函数，指定时间执行一次
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) context = args = null;
  };

  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}

// from underscore
// 防抖函数，到达指定时间间隔执行
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

// 格式化时间
function formatDate(time, fmt) {
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/'); // 兼容 iOS
  }
  var d = new Date(time);
  if (!fmt) return time;
  var obj = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds()
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length));
    }
  }
  return fmt;
}

// 持续时间
function duration(sec) {
  var h = ~~(sec / 3600);
  var m = ~~(sec % 3600 / 60);
  var s = sec % 3600 % 60;
  var ret = '';
  if (h) ret += h + '\u65F6';
  if (m) ret += m + '\u5206';
  if (s) ret += s + '\u79D2';
  return ret;
}

// 经过时间
function ago(time) {
  var between = Date.now() - Number(time);
  if (between < 60) {
    return ~~between + '秒前';
  } else if (between < 3600) {
    return ~~(between / 60) + '分前';
  } else if (between < 86400) {
    return ~~(between / 3600) + '小时前';
  } else {
    return ~~(between / 86400) + '天前';
  }
}

// 获取 url 的 query
function qs(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var reg = void 0,
      ret = void 0,
      query = void 0,
      urlStr = void 0;
  var str = options.str,
      isHash = options.isHash;

  if (str) {
    urlStr = str;
  } else {
    urlStr = isHash ? window.location.hash : window.location.search;
  }
  if (name) {
    reg = new RegExp('(?|&)' + name + '=([^&#]*)');
    query = urlStr.match(reg);
    return query !== null ? decodeURIComponent(query[2]) : null;
  }
  reg = new RegExp(/(\?|&)(\w+)=([^&#]*)/, 'g');
  query = urlStr.match(reg);
  if (Array.isArray(query)) {
    ret = {};
    query.forEach(function (v) {
      var arr = v.split('=');
      arr[0] = arr[0].slice(1); // delete `?` or `&`
      ret[arr[0]] = decodeURIComponent(arr[1]);
    });
  } else {
    ret = null;
  }
  return ret;
}

// 将 url 参数转化为字符串
function qsStringify(obj) {
  var ret = [];
  for (var i in obj) {
    ret.push(i + '=' + decodeURIComponent(obj[i]));
  }
  return ret.join('&');
}

// 字符长度计算，中文算2个字符
/* eslint-disable */
function len(str) {
  return str.replace(/[^\x00-\xff]/g, '__').length;
}

// 按照长度截取字符串，中文算2个字符
function subStr(str, len) {
  var reg = /[\u4e00-\u9fa5]/g;
  var slice = str.substring(0, len);
  var realLen = len - ~~(slice.match(reg) && slice.match(reg).length);
  return slice.substring(0, realLen || 1);
}

// from zhangxinxu
// 前置字符串补全
function padStart(targetLength, padString) {
  // 截断数字或将非数字转换为0
  targetLength = targetLength >> 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (this.length > targetLength || padString === '') {
    return String(this);
  }
  targetLength = targetLength - this.length;
  if (targetLength > padString.length) {
    // 添加到初始值以确保长度足够
    padString += padString.repeat(targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(this);
}

// from zhangxinxu
// 后缀字符串补全
function padEnd(targetLength, padString) {
  // 转数值或者非数值转换成0
  targetLength = targetLength >> 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (this.length > targetLength || padString === '') {
    return String(this);
  }
  targetLength = targetLength - this.length;
  if (targetLength > padString.length) {
    // 添加到初始值以确保长度足够
    padString += padString.repeat(targetLength / padString.length);
  }
  return String(this) + padString.slice(0, targetLength);
}

// 千分位
function thousands(num, fixed) {
  if (num === undefined) return '--';
  if (fixed) {
    num = num.toFixed(fixed);
  }
  num = num.toString();
  var float = '';
  var isFloat = num.indexOf('.') > -1;
  if (isFloat) {
    var arr = num.split('.');
    num = arr[0];
    float = '.' + arr[1];
  }
  return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + float;
}

// fixed 方法，默认保存两位
function fixed(num) {
  var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var rmZero = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (num === undefined) return '--';
  num = (num * 100).toFixed(fixed);
  if (rmZero) {
    num = +num;
  }
  return num;
}

// 是否是 android
function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

// 是否是 ios
function isIOS() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

// 是否是手机端
function isMobile() {
  return isIOS() || isAndroid();
}

// @flow

var firstTargetElement = null;
var allTargetElements = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;
  if (e.preventDefault) e.preventDefault();

  return false;
};
var passiveOpts = { passive: false };

var setOverflowHidden = function setOverflowHidden(options) {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(function () {
    // If previousBodyPaddingRight is already set, don't set it again.
    if (previousBodyPaddingRight === undefined) {
      var reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
      var doc = document.documentElement;
      var scrollBarGap = window.innerWidth - doc.clientWidth;

      if (reserveScrollBarGap && scrollBarGap > 0) {
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = scrollBarGap + 'px';
      }
    }
    // If previousBodyOverflowSetting is already set, don't set it again.
    if (previousBodyOverflowSetting === undefined) {
      previousBodyOverflowSetting = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  });
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  // Setting overflow on body/documentElement synchronously in Desktop Safari slows down
  // the responsiveness for some reason. Setting within a setTimeout fixes this.
  setTimeout(function () {
    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight;
      // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
      // can be set again.
      previousBodyPaddingRight = undefined;
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting;
      // Restore previousBodyOverflowSetting to undefined
      // so setOverflowHidden knows it can be set again.
      previousBodyOverflowSetting = undefined;
    }
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the top of its scroll
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  if (isMobile()) {
    // targetElement must be provided, and disableBodyScroll must not have been
    // called on this targetElement before.
    if (targetElement && !allTargetElements.includes(targetElement)) {
      allTargetElements = [].concat(toConsumableArray(allTargetElements), [targetElement]);
      targetElement.ontouchstart = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          initialClientY = event.targetTouches[0].clientY;
        }
      };
      targetElement.ontouchmove = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          handleScroll(event, targetElement);
        }
      };
      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, { passive: false });
        documentListenerAdded = true;
      }
    }
  } else {
    setOverflowHidden(options);
    if (!firstTargetElement) firstTargetElement = targetElement;
  }
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (isMobile()) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;
    allTargetElements = allTargetElements.filter(function (element) {
      return element !== targetElement;
    });
    if (documentListenerAdded && allTargetElements.length === 0) {
      document.removeEventListener('touchmove', preventDefault, passiveOpts);
      documentListenerAdded = false;
    }
  } else if (firstTargetElement === targetElement) {
    restoreOverflowSetting();
    firstTargetElement = null;
  }
};

// 禁止 body 滚动
function lockScroll(el, bool) {
  if (bool === true) {
    disableBodyScroll(el);
  } else {
    enableBodyScroll(el);
  }
}

// 解析字符串
function decode(s) {
  try {
    s = decodeURIComponent(s);
  } catch (e) {}
  return s;
}

// 编码字符串
var encode = encodeURIComponent;

// 安全 html
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2f;');
}

// 安全 js
function escapeJs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/`/g, '\\`').replace(/</g, '\\74').replace(/>/g, '\\76').replace(/\//g, '\\/').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\f/g, '\\f').replace(/\v/g, '\\v').replace(/\b/g, '\\b').replace(/\0/g, '\\0');
}

/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2018-11-23 12:04:29
 * @desc [utils方法]
*/

var utils = {
  // clone.js
  deepClone: deepClone,
  // array.js
  swap: swap,
  unique: unique,
  newArray: newArray,
  // throttle.js
  throttle: throttle,
  debounce: debounce,
  // date.js
  formatDate: formatDate,
  duration: duration,
  ago: ago,
  // url.js
  qs: qs,
  qsStringify: qsStringify,
  // string.js
  len: len,
  subStr: subStr,
  padStart: padStart,
  padEnd: padEnd,
  // number.js
  thousands: thousands,
  fixed: fixed,
  // ua.js
  isAndroid: isAndroid,
  isIOS: isIOS,
  isMobile: isMobile,
  // body-scroll
  lockScroll: lockScroll,
  // security.js
  decode: decode,
  encode: encode,
  escapeHtml: escapeHtml,
  escapeJs: escapeJs
};

export default utils;
export { deepClone, swap, unique, newArray, throttle, debounce, formatDate, duration, ago, qs, qsStringify, len, subStr, padStart, padEnd, thousands, fixed, isAndroid, isIOS, isMobile, lockScroll, decode, encode, escapeHtml, escapeJs };
