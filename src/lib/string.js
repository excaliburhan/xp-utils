// 字符长度计算，中文算2个字符
/* eslint-disable */
export function len(str) {
  return str.replace(/[^\x00-\xff]/g, '__').length
}

// 按照长度截取字符串，中文算2个字符
export function subStr(str, len) {
  const reg = /[\u4e00-\u9fa5]/g
  const slice = str.substring(0, len)
  const realLen = len - ~~(slice.match(reg) && slice.match(reg).length)
  return slice.substring(0, realLen || 1)
}

// from zhangxinxu
// 前置字符串补全
export function padStart(targetLength, padString) {
  // 截断数字或将非数字转换为0
  targetLength = targetLength >> 0
  padString = String(typeof padString !== 'undefined' ? padString : ' ')
  if (this.length > targetLength || padString === '') {
    return String(this)
  }
  targetLength = targetLength - this.length
  if (targetLength > padString.length) {
    // 添加到初始值以确保长度足够
    padString += padString.repeat(targetLength / padString.length)
  }
  return padString.slice(0, targetLength) + String(this)
}

// from zhangxinxu
// 后缀字符串补全
export function padEnd(targetLength, padString) {
  // 转数值或者非数值转换成0
  targetLength = targetLength >> 0
  padString = String(typeof padString !== 'undefined' ? padString : ' ')
  if (this.length > targetLength || padString === '') {
    return String(this)
  }
  targetLength = targetLength - this.length
  if (targetLength > padString.length) {
    // 添加到初始值以确保长度足够
    padString += padString.repeat(targetLength / padString.length)
  }
  return String(this) + padString.slice(0, targetLength)
}

export default { len, subStr, padStart, padEnd }
