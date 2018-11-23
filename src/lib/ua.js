// 是否是 android
export function isAndroid () {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

// 是否是 ios
export function isIOS () {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 是否是手机端
export function isMobile () {
  return isIOS() || isAndroid()
}
