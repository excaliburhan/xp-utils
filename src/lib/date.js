// 格式化时间
export function formatDate (time, fmt) {
  if (typeof time === 'string') {
    time = time.replace(/-/g, '/') // 兼容 iOS
  }
  let d = new Date(time)
  if (!fmt) return time
  var obj = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var key in obj) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1)
          ? (obj[key])
          : (('00' + obj[key]).substr(('' + obj[key]).length)))
    }
  }
  return fmt
}

// 持续时间
export function duration (sec) {
  let h = ~~(sec / 3600)
  let m = ~~(sec % 3600 / 60)
  let s = sec % 3600 % 60
  let ret = ''
  if (h) ret += `${h}时`
  if (m) ret += `${m}分`
  if (s) ret += `${s}秒`
  return ret
}

// 经过时间
export function ago (time) {
  let between = Date.now() - Number(time)
  if (between < 60) {
    return ~~between + '秒前'
  } else if (between < 3600) {
    return ~~(between / 60) + '分前'
  } else if (between < 86400) {
    return ~~(between / 3600) + '小时前'
  } else {
    return ~~(between / 86400) + '天前'
  }
}

export default { formatDate, duration, ago }
