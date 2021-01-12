<template>
  <div class="footer">
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <p>我是一只小可爱</p>
    <div class="gotop" v-show="gotop" @click="toTop">Top</div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      gotop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll () {
      // 注意不同浏览器之间的兼容性
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    toTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: white;
  color: #000000;
}
</style>
