// 节流函数，指定时间执行一次
export function throttle (fn, waitTime, immediate, isDebounce) {
  let timer = null
  let lastTime = 0 // last execute time

  return function () {
    function exec () {
      lastTime = +new Date()
      fn.apply(context, args)
    }

    function clear () {
      timer = null
    }

    let context = this
    let args = arguments
    let nowTime = +new Date()
    let passTime = nowTime - lastTime

    if (isDebounce && !timer) {
      exec()
    }

    if (timer) {
      clearTimeout(timer)
    }

    if (immediate && !timer) {
      exec()
    }

    if (!isDebounce && passTime > waitTime) {
      exec()
    } else {
      if (isDebounce) {
        timer = setTimeout(clear, waitTime)
      } else {
        timer = setTimeout(exec, waitTime - passTime)
      }
    }
  }
}

// 防抖函数，到达指定时间间隔执行
export function debounce (fn, waitTime, immediate) {
  return throttle(fn, waitTime, immediate, true)
}

export default { throttle, debounce }
