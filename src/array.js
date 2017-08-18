// 交换数组中元素位置
export function swap (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// 去除数组重复元素，不支持引用类型
export function unique (arr) {
  return arr.filter((v, i, _) => _.indexOf(v) === i)
}

// 快速生成有序数组
export function newArray (num, from = 1) {
  return Array(num).fill().map((_, i) => i + from)
}

export default {
  swap,
  unique,
  newArray,
}
