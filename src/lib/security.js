// 解析字符串
export function decode (s) {
  try {
    s = decodeURIComponent(s)
  } catch (e) {}
  return s
}

// 编码字符串
export const encode = encodeURIComponent

// 安全 html
export function escapeHtml (s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\//g, '&#x2f;')
}

// 安全 js
export function escapeJs (s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .replace(/</g, '\\74')
    .replace(/>/g, '\\76')
    .replace(/\//g, '\\/')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v')
    .replace(/\b/g, '\\b')
    .replace(/\0/g, '\\0')
}
