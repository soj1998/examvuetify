<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      dark
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <template>
          <Zzsmuban></Zzsmuban>
          </template>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Exam></Exam>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <ZhuanLanLieBiao></ZhuanLanLieBiao>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Zzsmuban from '@/Szmuban/Zzsmuban'
import ZhuanLanLieBiao from '@/Szmuban/ZhuanLanLieBiao'
import Exam from '@/Szmuban/Exam'
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
        { tab: '学研基础' },
        { tab: '学研试题', content: 'Tab 2 Content' },
        { tab: '学研专栏', content: 'Tab 3 Content' }
      ],
      fuyuchushicishu: 0,
      ymszmc: ''
    }
  },

  methods: {
    test () {
      console.log('error')
    },
    fuyuchushi2 () {
      console.log('次数' + this.fuyuchushicishu)
      this.fuyuchushicishu++
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
