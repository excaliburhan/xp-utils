(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xpUtils = {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

// 节流函数，指定时间执行一次
function throttle(fn, waitTime, immediate, isDebounce) {
  var timer = null;
  var lastTime = 0; // last execute time

  return function () {
    function exec() {
      lastTime = +new Date();
      fn.apply(context, args);
    }

    function clear() {
      timer = null;
    }

    var context = this;
    var args = arguments;
    var nowTime = +new Date();
    var passTime = nowTime - lastTime;

    if (isDebounce && !timer) {
      exec();
    }

    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !timer) {
      exec();
    }

    if (!isDebounce && passTime > waitTime) {
      exec();
    } else {
      if (isDebounce) {
        timer = setTimeout(clear, waitTime);
      } else {
        timer = setTimeout(exec, waitTime - passTime);
      }
    }
  };
}

// 防抖函数，到达指定时间间隔执行
function debounce(fn, waitTime, immediate) {
  return throttle(fn, waitTime, immediate, true);
}

// 格式化时间
function formatDate(time, fmt) {
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

// 获取url的query
function query(name) {
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
  urlStr = urlStr.substr(1);
  if (name) {
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    query = urlStr.match(reg);
    return query !== null ? decodeURIComponent(query[2]) : null;
  }
  reg = new RegExp(/(^|&)(\w+)=([\w]*)/, 'g');
  query = urlStr.match(reg);
  if (Array.isArray(query)) {
    ret = {};
    query.forEach(function (v) {
      var arr = v.split('=');
      if (arr[0].indexOf('&') > -1) arr[0] = arr[0].slice(1);
      ret[arr[0]] = decodeURIComponent(arr[1]);
    });
  } else {
    ret = null;
  }
  return ret;
}

// 从指定字符串获取query
function queryFromStr(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var splitKey = '?';
  if (options.isHash) {
    splitKey = '#';
  }
  var strArr = str.split(splitKey);
  strArr.shift();
  str = splitKey + strArr.join(splitKey);
  return query('', { str: str, isHash: options.isHash });
}

// 获取url的hash
function hash(name) {
  return query(name, { isHash: true });
}

// 获取url的hostname
function hostname() {
  return window.location.hostname;
}

// 获取url的domain
function domain() {
  var hostname = window.location.hostname;
  var hostArr = hostname.split('.');
  if (hostArr.length > 2) {
    hostArr.splice(0, 1);
  }
  return hostArr.join('.');
}

// 获取url的sub
function sub() {
  var hostname = window.location.hostname;
  var hostArr = hostname.split('.');
  if (hostArr.length > 2) {
    return hostArr[1];
  }
  return '';
}

// 获取url的pathname
function pathname() {
  return window.location.pathname;
}

// 字符长度计算
/* eslint-disable */
function len(str) {
  return str.replace(/[^\x00-\xff]/g, '__').length;
}

// 按照长度截取字符串
function subStr(str, len) {
  var reg = /[\u4e00-\u9fa5]/g;
  var slice = str.substring(0, len);
  var realLen = len - ~~(slice.match(reg) && slice.match(reg).length);
  return slice.substring(0, realLen || 1);
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

// 百分比，默认保存两位
function percent(num) {
  var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (num === undefined) return '--';
  return (num * 100).toFixed(fixed) + '%';
}

/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-18 09:40:00
 * @modify date 2017-08-18 09:40:00
 * @desc [utils方法]
*/

var utils = {
  // clone.js
  deepClone: deepClone,
  // array.js
  swap: swap, unique: unique, newArray: newArray,
  // throtte.js
  throttle: throttle, debounce: debounce,
  // date.js
  formatDate: formatDate, duration: duration, ago: ago,
  // url.js
  query: query, queryFromStr: queryFromStr, hash: hash, hostname: hostname, domain: domain, sub: sub, pathname: pathname,
  // string.js
  len: len, subStr: subStr,
  // number.js
  thousands: thousands, percent: percent
};

exports['default'] = utils;
exports.deepClone = deepClone;
exports.swap = swap;
exports.unique = unique;
exports.newArray = newArray;
exports.throttle = throttle;
exports.debounce = debounce;
exports.formatDate = formatDate;
exports.duration = duration;
exports.ago = ago;
exports.query = query;
exports.queryFromStr = queryFromStr;
exports.hash = hash;
exports.hostname = hostname;
exports.domain = domain;
exports.sub = sub;
exports.pathname = pathname;
exports.len = len;
exports.subStr = subStr;
exports.thousands = thousands;
exports.percent = percent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
