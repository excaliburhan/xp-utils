(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepClone = deepClone;
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

exports.default = { deepClone: deepClone };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.duration = duration;
exports.ago = ago;
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

exports.default = { formatDate: formatDate, duration: duration, ago: ago };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.hash = hash;
exports.hostname = hostname;
exports.domain = domain;
exports.sub = sub;
exports.pathname = pathname;
// 获取url的query
function query(name, isHash) {
  var reg = void 0,
      ret = void 0,
      query = void 0;
  var urlStr = isHash ? window.location.hash : window.location.search;
  urlStr = urlStr.substr(1);
  if (name) {
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    query = urlStr.match(reg);
    return query !== null ? decodeURIComponent(query[2]) : null;
  }
  reg = new RegExp(/(^|&)(\w+)=([\w]*)/, 'g');
  query = urlStr.match(reg);
  ret = {};
  query.forEach(function (v) {
    var arr = v.split('=');
    if (arr[0].indexOf('&') > -1) arr[0] = arr[0].slice(1);
    ret[arr[0]] = decodeURIComponent(arr[1]);
  });
  return ret;
}

// 获取url的hash
function hash(name) {
  query(name, true);
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

exports.default = { query: query, hash: hash, hostname: hostname, domain: domain, sub: sub, pathname: pathname };

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathname = exports.sub = exports.domain = exports.hostname = exports.hash = exports.query = exports.ago = exports.duration = exports.formatDate = exports.deepClone = undefined;

var _clone = __webpack_require__(0);

var _clone2 = _interopRequireDefault(_clone);

var _date = __webpack_require__(1);

var _date2 = _interopRequireDefault(_date);

var _url = __webpack_require__(2);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = Object.assign({}, _clone2.default, _date2.default, _url2.default); /**
                                                                                * @author xiaoping
                                                                                * @email edwardhjp@gmail.com
                                                                                * @create date 2017-08-18 09:40:00
                                                                                * @modify date 2017-08-18 09:40:00
                                                                                * @desc [utils方法]
                                                                               */

exports.default = utils;
exports.deepClone = _clone.deepClone;
exports.formatDate = _date.formatDate;
exports.duration = _date.duration;
exports.ago = _date.ago;
exports.query = _url.query;
exports.hash = _url.hash;
exports.hostname = _url.hostname;
exports.domain = _url.domain;
exports.sub = _url.sub;
exports.pathname = _url.pathname;

/***/ })
/******/ ]);
});