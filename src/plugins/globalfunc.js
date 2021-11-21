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
  if ((dd + '').length < 2) {
    dd = '0' + dd
  }
  return yy + '-' + mm + '-' + dd
}

export function ceshiglobal () {
  return '--测试global func11---'
}

export function strNotNil (obj) {
  if (obj !== null && (String)(obj).length > 0) {
    return true
  }
  return false
}

const leixing = [{'sz': 'zhuanlan', 'id': '专栏'}, {'sz': 'shiti', 'id': '试题'}]
export function zhuanhuan (obj1, obj2) {
  let rs = ''
  let shuzu = []
  if (obj1 === 'sz') {
    shuzu.forEach(e => {
      if (e.id === obj2) {
        rs = e.sz
      }
    })
  }
  if (obj1 === 'szmc') {
    shuzu.forEach(e => {
      if (e.sz === obj2) {
        rs = e.id
      }
    })
  }
  if (obj1 === 'leixing') {
    shuzu = leixing
    shuzu.forEach(e => {
      if (e.sz === obj2) {
        rs = e.id
      }
    })
  }
  return rs
}

export default {
  getDqYYMMDD,
  getZhiDingYYMMDD,
  ceshiglobal,
  strNotNil,
  zhuanhuan
}
