// 千分位
export function thousands (num) {
  if (num === undefined) return '--'
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

// 百分比，默认保存两位
export function percent (num, fixed = 2) {
  if (num === undefined) return '--'
  return (num * 100).toFixed(fixed) + '%'
}

export default { thousands, percent }
