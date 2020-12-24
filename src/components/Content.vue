<template>
<v-app>
<v-app-bar app></v-app-bar>
<v-main>
  <v-container>
    Hello World
    <v-btn
      elevation="2"
      rounded
      large
      @click="change"
    >按我</v-btn>
  </v-container>
</v-main>
</v-app>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    change: function () {
      console.log('局部组件中methods方法')
      let that = this
      that.$fetch('/', '')
        .then(function (res) {
          console.log('ok' + res)
        })
        .catch(function (error) {
          console.log('error' + error)
        })
        /**
        that.$axios({
          method: 'get',
          url: '/',
          data: {
            abc: 'abc'
          }
        })
          .then(function (res) {
            console.log('接口成功返回结果执行')
          })
          .catch(function (error) {
            console.log(error + '请求失败或者接口返回失败或者.then()中的代码发生错误')
          })
        */
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
