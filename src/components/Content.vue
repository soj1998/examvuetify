<template>
  <div>
    <h1>首页</h1>
    <div>
      <label class="label">
        <input type="file" ref='file' @change='up'/>
        <span class="before" :style="{width:pre+'%'}"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pre: 0
    }
  },
  methods: {
    up () {
      // var that = this
      // 获取到this 赋值个that
      var file = this.$refs.file.files[0]
      if (!file) {
        return
      } // 如果没有文件就返回
      // 拿到上传的文件
      var data = new FormData()
      // 创建一个表单数据
      data.append('file', file)
      console.log('ASas', data)
      // 把图片或文件添加到data
      let headers = {headers: {'Content-Type': 'multipart/form-data'}}
      this.$http.post('say5', data, headers).then(function (data) {
        console.log(data)
      },
      function (err) {
        console.log('err------: ')
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
