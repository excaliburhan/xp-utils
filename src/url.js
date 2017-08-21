// 获取url的query
export function query (name, isHash, str) {
  let reg, ret, query
  let urlStr = isHash ? window.location.hash : window.location.search
  if (str) urlStr = str
  urlStr = urlStr.substr(1)
  if (name) {
    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    query = urlStr.match(reg)
    return query !== null ? decodeURIComponent(query[2]) : null
  }
  reg = new RegExp(/(^|&)(\w+)=([\w]*)/, 'g')
  query = urlStr.match(reg)
  ret = {}
  query.forEach(v => {
    let arr = v.split('=')
    if (arr[0].indexOf('&') > -1) arr[0] = arr[0].slice(1)
    ret[arr[0]] = decodeURIComponent(arr[1])
  })
  return ret
}

// 从指定字符串获取query
export function queryFromStr (str, isHash) {
  query(null, isHash, str)
}

// 获取url的hash
export function hash (name) {
  query(name, true)
}

// 获取url的hostname
export function hostname () {
  return window.location.hostname
}

// 获取url的domain
export function domain () {
  let hostname = window.location.hostname
  let hostArr = hostname.split('.')
  if (hostArr.length > 2) {
    hostArr.splice(0, 1)
  }
  return hostArr.join('.')
}

// 获取url的sub
export function sub () {
  let hostname = window.location.hostname
  let hostArr = hostname.split('.')
  if (hostArr.length > 2) {
    return hostArr[1]
  }
  return ''
}

// 获取url的pathname
export function pathname () {
  return window.location.pathname
}

export default { query, hash, hostname, domain, sub, pathname }
