<template>
  <v-container class="grey lighten-5" id="dingtop">
    <v-row no-gutters>
      <v-col
        cols="4"
        sm="2"
        md="3"
      >
        <v-card
          class = "pa-2 align-left"
          outlined
          tile
        >
        <v-card-title class="indigo white--text headline">
          {{ymszmc}}
        </v-card-title>
        <v-treeview
          :active.sync="active"
          :open.sync="openids"
          open-on-click
          activatable
          hoverable
          return-object
          color = "warning"
          :items = "t_items"
        ></v-treeview>
        </v-card>
      </v-col>
      <v-col
        cols="10"
        md="7"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <div class="text-left teal cyan lighten-5"  v-cloak>
          <div v-html="pagecontent"></div>
        </div>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        md="2"
      >
        <v-card-title class="blue lighten-3 white--text headline">
          文章内导航
        </v-card-title>
        <v-treeview
          return-object
          color = "pink lighten-3"
          :items = "t_items2"
          open-on-click
          activatable
          :active.sync="active2"
        ></v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Zzsmuban',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      active: [],
      openids: [],
      shoucidian: false,
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
      t_items2: [],
      active2: [],
      gotop: false, // 判断是否应该上滚
      atcid: 1,
      fuyuchushicishu: 0,
      ymszmc: ''
    }
  },
  methods: {
    getPageContent (parentid1, rootid1, atcid) {
      let that = this
      console.log('parentid1:' + parentid1 + ' rootid1:' + rootid1)
      this.$post('atc/gettreeneirongbyid', {parentid: parentid1, rootid: rootid1, atctreenodesjkid: atcid})
        .then(res => {
          console.log('返回数')
          that.pagecontent = []
          let neir = res.neirong
          let zhangj = res.zhangjie
          let pcsz = []
          neir.forEach(element => {
            // console.log('2.' + element.hangshu + that.pagecontent + element.qbneirong)
            let json =
            {
              'hangshu': element.hangshu,
              'biaoti': 0,
              'nr': element.qbneirong
            }
            pcsz.push(json)
          })
          zhangj.forEach(element => {
            // console.log('3.' + element.hangshu + that.pagecontent + element.btneirong + element.biaoti)
            let json =
            {
              'hangshu': element.hangshu,
              'biaoti': element.biaoti,
              'nr': element.btneirong
            }
            pcsz.push(json)
          })
          pcsz.sort((n1, n2) => {
            return n1.hangshu - n2.hangshu
          })
          // console.log(pcsz)
          that.t_items2 = []
          pcsz.forEach(e => {
            if (e.biaoti > 0) {
              let btnr = {
                id: 'a' + e.hangshu,
                name: e.nr
              }
              // console.log(btnr)
              that.t_items2.push(btnr)
              e.nr = that.syhji(e.biaoti + 2, e.nr, 'a' + e.hangshu)
            } else {
              e.nr = '<p>' + e.nr + '</p>'
            }
            that.pagecontent = that.pagecontent + e.nr
          })
          that.pagecontent = '<div class="text-body-1" style="margin-top: 10px">' + that.pagecontent + '</div>'
          that.toTop()
        })
        .catch(error => {
          console.log('error' + error)
        })
    },
    test () {
      console.log('error')
    },
    scrollviewtop (e) {
      document.querySelector('#dingtop').scrollIntoView(true)
    },
    syhji (hsz, nr, hangshu) {
      switch (hsz) {
        case 1: {
          return '<div id= "' + hangshu + '" class="text-h1 text-center">' + nr + '</div>'
        }
        case 2: {
          return '<div id= "' + hangshu + '" class="text-h2 text-center">' + nr + '</div>'
        }
        case 3: {
          return '<div id= "' + hangshu + '" class="text-h3 text-center">' + nr + '</div>'
          // return '<div  :id="a' + hangshu + '" @click="scrollviewtop(index)">哈哈哈</div>'
        }
        case 4: {
          return '<div ref= "' + hangshu + '" class="text-h4 text-center">' + nr + '</div>'
        }
        default: {
          return '<div ref= "' + hangshu + '" class="text-h5 text-center">' + nr + '</div>'
        }
      }
    },
    handleScroll () {
      // 注意不同浏览器之间的兼容性
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    toTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      console.log('滚不滚' + top)
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    fuyuchushi2 () {
      console.log('次数zzsmuban' + this.fuyuchushicishu)
      this.fuyuchushicishu++
    },
    fuyuchushi () {
      console.log('赋予初始值2')
      // console.log(this.$route.params.szid) // szid grsds zzs
      console.log(typeof (this.$route.params.szmc))
      if (this.$route.params.szmc === undefined) {
        console.log('router没有带过来')
        return
      }
      let cdszmc = this.$route.params.szmc
      let szid = this.$route.params.szid
      this.ymszmc = this.ymszmc + cdszmc
      let cdwzmc = '基础'
      var grade = 'A'
      switch (grade) {
        case 'A': {
          console.log('Excellent')
          break
        }
        case 'B': {
          console.log('Good')
          break
        }
        case 'C': {
          console.log('Fair')
          break
        }
        case 'D': {
          console.log('Poor')
          break
        }
        default: {
          console.log('Invalid choice')
          break
        }
      }
      window.addEventListener('scroll', this.handleScroll, true)
      let that = this
      this.atcid = 3
      this.$post('sys/wzlx/listall', null).then(res => {
        let wzzu = res
        let wzid = 0
        wzzu.forEach(element => {
          console.log(element)
          if (element.wzlxmc.indexOf(cdwzmc) >= 0) {
            wzid = element.id
          }
        })
        console.log('now: ' + szid + ', ' + wzid)
        that.$post('atc/getatcidbyszwzlx', { szid: szid, wzlxid: wzid })
          .then(res => {
            if (!res || res.length < 1) {
              console.log('还没有这种类型的文章')
              that.ymszmc = that.ymszmc + '还没有这种类型的文章'
              return
            }
            console.log(res[0].id)
            that.atcid = res[0].id
            that.$post('atc/gettree', { parentid: 1, atctreenodesjkid: that.atcid })
              .then(res => {
                console.log(res.length + typeof res)
                if (res.length === 0) {
                  return
                }
                res.forEach(element => {
                  console.log(element)
                  let json =
                  {
                    'id': element.yuantou.id,
                    'name': element.yuantou.btneirong,
                    'biaoti': element.yuantou.biaoti,
                    'rootid': element.yuantou.rootid,
                    'parentid': element.yuantou.parentid,
                    'children': []
                  }
                  if (element.children.length === 0) {
                    return
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
                that.getPageContent(that.t_items[0].children[0].parentid, that.t_items[0].children[0].rootid, that.atcid)
              })
              .catch(error => {
                console.log('error' + error)
              })
          })
          .catch(error => {
            console.log('error' + error)
          })
      }).catch(error => {
        console.log('error' + error)
      })
    }
  },
  watch: {
    active (newValue, oldValue) {
      console.log('newValue ' + JSON.stringify(newValue))
      console.log('oldValue ' + JSON.stringify(oldValue))
      if (!this.shoucidian && oldValue.length === 0 && this.active.length === 1 && newValue.length > 0) {
        console.log('active-oldvalue为空 ' + newValue[0].name)
        this.shoucidian = true
        this.getPageContent(newValue[0].parentid, newValue[0].rootid, this.atcid)
      }
      if (this.shoucidian && oldValue.length > 0 && newValue.length > 0 && newValue[0].name !== oldValue[0].name) {
        console.log('active-中间刷了 ' + newValue[0].name)
        this.getPageContent(newValue[0].parentid, newValue[0].rootid, this.atcid)
      }
    },
    openids (newValue) {
      if (newValue.length > 0) {
        // console.log(JSON.stringify(this.openids))
        this.active = []
        this.active.push(newValue[newValue.length - 1].children[0])
        // this.getPageContent(newValue[newValue.length - 1].rootid, newValue[newValue.length - 1].children[0].rootid)
      }
    },
    active2 (newValue, oldValue) {
      console.log('newValue ' + JSON.stringify(newValue))
      console.log('oldValue ' + JSON.stringify(oldValue))
      this.scrollviewtop(newValue[newValue.length - 1].id)
    }
  },

  mounted () {
    this.fuyuchushi()
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
[v-cloak] {
    display: none;
}
#divmar {
  color: red;
}
#zzsdh-title-right {
  width: 5px;
  height: 23px;
  background: #AB0B22;
  display: inline-block;
  margin-top: 3px;
  vertical-align: top;
  margin-right: 10px;
}
</style>
