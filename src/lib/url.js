// 获取 url 的 query
export function qs (name, options = {}) {
  let reg, ret, query, urlStr
  const { str, isHash } = options
  if (str) {
    urlStr = str
  } else {
    urlStr = isHash ? window.location.hash : window.location.search
  }
  if (name) {
    reg = new RegExp('(?|&)' + name + '=([^&#]*)')
    query = urlStr.match(reg)
    return query !== null ? decodeURIComponent(query[2]) : null
  }
  reg = new RegExp(/(\?|&)(\w+)=([^&#]*)/, 'g')
  query = urlStr.match(reg)
  if (Array.isArray(query)) {
    ret = {}
    query.forEach(v => {
      let arr = v.split('=')
      arr[0] = arr[0].slice(1) // delete `?` or `&`
      ret[arr[0]] = decodeURIComponent(arr[1])
    })
  } else {
    ret = null
  }
  return ret
}

// 将 url 参数转化为字符串
export function qsStringify (obj) {
  let ret = []
  for (let i in obj) {
    ret.push(`${i}=${decodeURIComponent(obj[i])}`)
  }
  return ret.join('&')
}

export default { qs, qsStringify }
