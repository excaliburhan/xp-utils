// 千分位
export function thousands (num, fixed) {
  if (num === undefined) return '--'
  if (fixed) {
    num = num.toFixed(fixed)
  }
  num = num.toString()
  let float = ''
  const isFloat = num.indexOf('.') > -1
  if (isFloat) {
    const arr = num.split('.')
    num = arr[0]
    float = '.' + arr[1]
  }
  return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + float
}

// fixed 方法，默认保存两位
export function fixed (num, fixed = 2, rmZero = false) {
  if (num === undefined) return '--'
  num = (num * 100).toFixed(fixed)
  if (rmZero) {
    num = +num
  }
  return num
}

export default { thousands, fixed }
