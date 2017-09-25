// 字符长度计算
export function len (str) {
  return str.replace(/[^\x00-\xff]/g, '__').length
}

// 按照长度截取字符串
export function subStr (str, len) {
  const reg = /[\u4e00-\u9fa5]/g
  const slice = str.substring(0, len)
  const realLen = len - (~~(slice.match(reg) && slice.match(reg).length))
  return slice.substring(0, realLen || 1)
}
