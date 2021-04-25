export function getDqYYMMDD () {
  return getZhiDingYYMMDD(new Date())
}

export function getZhiDingYYMMDD (date) {
  let yy = date.getFullYear() // 获取完整的年份(4位)
  let mm = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
  if ((mm + '').length < 2) {
    mm = '0' + mm
  }
  let dd = date.getDate() // 获取当前日(1-31)
  return yy + '-' + mm + '-' + dd
}

export function ceshiglobal () {
  return '--测试global func11---'
}

export default {
  getDqYYMMDD,
  getZhiDingYYMMDD,
  ceshiglobal
}
