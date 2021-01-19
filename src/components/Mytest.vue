<template>
  <div class="example">hi
    <v-btn class="example">aaa</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      items: [
        {
          src: 'backgrounds/bg.jpg',
          text: 'aa'
        },
        {
          src: 'backgrounds/md.jpg'
        },
        {
          src: 'backgrounds/bg-2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        }
      ],
      model: null,
      selected: []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
    console.log(this.$route.params.userId)
  },
  methods: {
    enternext () {
      console.log('aaa')
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
.example {
  color: red;
}
</style>
