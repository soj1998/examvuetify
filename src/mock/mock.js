import Mock from 'mock'

const Random = Mock.Random
const produceData = function (opt) {
  console.log('opt', opt)
  let article = []
  for (let i = 0; i < 30; i++) {
    let newArticleObj = {
      title: Random.csentence(5, 30),
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'),
      author_name: Random.cname(),
      date: Random.date() + ' ' + Random.time(),
      email: Random.email(),
      name: Random.cname()
    }
    article.push(newArticleObj)
  }
  return {
    data: article
  }
}

Mock.mock('/api/mockuser', /post|get/i, produceData)
