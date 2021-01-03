<template>
  <div class="main">
    <!-- 菜单 -->
     <div v-for="(item,index) in list" :key="index" >
      <div  :id="'a'+index" @click="b(index)">哈哈哈</div>
    </div>
    <div class="nav">
      <a href="javascript:" @click="goAnchor('#Java')">Java</a>
      <a href="javascript:" @click="goAnchor('#Python')">Python</a>
      <a href="javascript:" @click="goAnchor('#Javascript')">Javascript</a>
    </div>
    <!-- 内容 -->
    <div class="item">
      <div class="title" id="Java" ref ="java">Java</div>
      <div class="content"></div>
    </div>
    <div class="item">
      <div class="title" id="Python">Python</div>
      <div class="content"></div>
    </div>
    <div class="item">
      <div class="title" id="Javascript">Javascript</div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      active: [],
      openids: [],
      shoucidian: false,
      list: [1, 2, 3],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar' },
            { id: 3, name: 'Chrome' },
            { id: 4, name: 'Webstorm' }
          ]
        }
      ],
      t_items: [],
      t_items2: []
    }
  },
  methods: {
    returnTop () {
      console.log('ref ' + JSON.stringify(this.$refs))
      document.querySelector('#header').scrollIntoView(true)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start' // 上边框与视窗顶部平齐。默认值
      })
    },
    test () {
      console.log('error')
    },
    b (e) {
      console.log('ref ' + JSON.stringify(this.$refs))
      console.log('e  ' + e)
      this.active.push(1)
    },
    syhji (hsz, nr) {
      switch (hsz) {
        case 1: {
          return '<div class="text-h1 text-center">' + nr + '</div>'
        }
        case 2: {
          return '<div class="text-h2 text-center">' + nr + '</div>'
        }
        case 3: {
          return '<div class="text-h3 text-center">' + nr + '</div>'
        }
        case 4: {
          return '<div class="text-h4 text-center">' + nr + '</div>'
        }
        default: {
          return '<div class="text-h5 text-center">' + nr + '</div>'
        }
      }
    }
  },
  watch: {
    active (newValue, oldValue) {
      console.log('ref ' + JSON.stringify(this.$refs))
    },
    openids (newValue) {
      if (newValue.length > 0) {
        console.log('openids' + newValue[newValue.length - 1].name)
        this.active = []
        this.active.push(newValue[newValue.length - 1].children[0])
        // this.getPageContent(newValue[newValue.length - 1].rootid, newValue[newValue.length - 1].children[0].rootid)
      }
    }
  },
  mounted () {
    console.log('赋予初始值')
    let that = this
    this.$post('atc/gettree', { parentid: 1 })
      .then(res => {
        res.forEach(element => {
          // console.log(element)
          let json =
          {
            'id': element.yuantou.id,
            'name': element.yuantou.btneirong,
            'biaoti': element.yuantou.biaoti,
            'rootid': element.yuantou.rootid,
            'parentid': element.yuantou.parentid,
            'children': []
          }
          element.children.forEach(e => {
            let json2 =
            {
              'id': e.id,
              'name': e.btneirong,
              'biaoti': e.biaoti,
              'rootid': e.rootid,
              'parentid': e.parentid
            }
            json.children.push(json2)
          })
          that.t_items.push(json)
        })
      })
      .catch(error => {
        console.log('error' + error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}

.nav a {
  text-decoration: none;
  color: #333;
  padding: 0 10px;
  margin: 0 5px;
  background: #9e9e9e;
  line-height: 2;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.item{
    margin-top: 20px;
}

.title{
    background: #9e9e9e;
    line-height: 2;
}
.content {
  height: 300px;
  background: #eeeeee;
}
</style>
