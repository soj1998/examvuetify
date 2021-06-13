<template>
  <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-toolbar-title>{{szsyszmingzi}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        ></v-text-field>
        <v-btn icon @click="gohome">
          <v-icon x-large>mdi-home</v-icon>
        </v-btn>
        <template v-slot:extension>
        <v-tabs
          v-model="tab"
          slider-color="yellow"
          grow
        >
          <v-tab
            v-for="item in myitems"
            :key="item.tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in myitems"
        :key="item"
      >
        <component v-bind:is="item.tabtemp">
          <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Zzsmuban from '@/Szmuban/Zzsmuban'
import ZhuanLanLieBiao from '@/Szmuban/ZhuanLanLieBiao'
import Exam from '@/Szmuban/ExamMx'
import UploadBtnHaoKan from '@/components/UploadBtnHaoKan'
export default {
  name: 'Szmuban',
  components: {
    Zzsmuban,
    UploadBtnHaoKan,
    ZhuanLanLieBiao,
    Exam
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      szsyszmingzi: '',
      active: [],
      openids: [],
      shoucidian: false,
      t_items: [],
      t_items2: [],
      active2: [],
      gotop: false, // 判断是否应该上滚
      atcid: 1,
      tab: null,
      items: [
        { tab: '学研基础', tabtemp: Zzsmuban, content: 'Tab 1 Content' },
        { tab: '学研试题', tabtemp: Exam, content: 'Tab 2 Content' },
        { tab: '学研专栏', tabtemp: ZhuanLanLieBiao, content: 'Tab 3 Content', ifshow: false }
      ],
      myitems: [],
      fuyuchushicishu: 0,
      ymszmc: ''
    }
  },

  methods: {
    test () {
      console.log('error')
    },
    fuyuchushi2 () {
      console.log(typeof (this.$route.params.szid))
      if (this.$route.params.szid === undefined) {
        console.log('router没有带过来')
        return
      }
      let szid1 = this.$route.params.szid
      let data = {szid: szid1}
      let that = this
      this.$post('wbzt/gettab', data)
        .then(res => {
          if (res.jichu > 0) {
            that.myitems.push({ tab: '学研基础', tabtemp: Zzsmuban, content: 'Tab 1 Content' })
          }
          if (res.xiti > 0) {
            that.myitems.push({ tab: '学研试题', tabtemp: Exam, content: 'Tab 2 Content' })
          }
          if (res.zhuanlan > 0) {
            that.myitems.push({ tab: '学研专栏', tabtemp: ZhuanLanLieBiao, content: 'Tab 3 Content' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    gohome () {
      this.$router.push({name: 'SzLianjieShouye'})
    }
  },

  created () {
    this.fuyuchushi2()
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
