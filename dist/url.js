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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
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

/***/ })

/******/ });
});