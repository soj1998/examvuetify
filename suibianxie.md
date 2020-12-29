res.forEach(element => {
          // console.log(element)
          let json =
          {
            'id': element.id,
            'name': element.btneirong,
            'biaoti': element.biaoti,
            'rootid': element.rootid,
            'parentid': element.parentid,
            'children': []
          }
          that.$post('atc/gettreebyid', { parentid: element.rootid })
            .then(res => {
              res.forEach(element => {
                // console.log('error' + element.btneirong)
                let json2 =
                {
                  'id': element.id,
                  'name': element.btneirong,
                  'biaoti': element.biaoti,
                  'rootid': element.rootid,
                  'parentid': element.parentid
                }
                // console.log(element.id + element.btneirong)
                json.children.push(json2)
              })
            })
            .catch(error => {
              console.log('error' + error)
            })
          that.t_items.push(json)
        })
        // console.log(that.t_items)


--es6 数组排序

let arr = [2, 1, 3, 5, 4]
console.log(arr)
arr = arr.sort((n1, n2) => {
  console.log(n1, n2)
  return n1 - n2
  // return -1; //返回负值  交换顺序
  // return 0 或者 1   //返回正值   保持顺序不变
  // n2 - n1  从大到小
  // n1 - n2  从小到大         
})
console.log(arr)