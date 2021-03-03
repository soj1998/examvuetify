<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    sort-by="id"
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page.sync="dangqianpage"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>试题通览</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:body>
      <v-card
        class="mx-auto"
      >
        <v-list three-line>
          <template v-for="(item, index) in desserts">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            ></v-divider>

            <v-list-item
              v-else
              :key="item.id"
            >
              <v-list-item-content>
                <v-card-text class="text-start" v-html="item.timu"></v-card-text>
                <v-card-text class="text-start" v-html="item.tmxuanx"></v-card-text>
                <v-card-actions>
                  <v-btn
                    color="orange lighten-2"
                    @click="showdaan(index)"
                    text
                  >
                    显示答案
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="showdaan(index)"
                  >
                    <v-icon>{{ item.ifshow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.ifshow">
                    <v-divider></v-divider>
                    <v-card-text class="text-start">
                      {{item.daan}}
                    </v-card-text>
                    <v-card-text class="text-start">
                      {{item.jiexi}}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </template>
    <template v-slot:no-data>
      暂无数据
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    name: 'EditShuiZhong',
    headers: [
      {
        text: '序号',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: '操作', value: 'actions', sortable: false }
    ],
    desserts: [],
    totalrecord: -1,
    dangqianpage: 1,
    szlist: [],
    perpage: 5
  }),

  created () {
    this.listall(2)
  },

  methods: {
    listall (szid) {
      let that = this
      let data2 = {pageNum: that.dangqianpage, pageSize: that.perpage + 1, sid: szid} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      psz.push({url: 'sys/sz/listall', data: null})
      psz.push({url: 'sys/szexam/getcount', data: null})
      psz.push({url: 'sys/szexam/listdaicanzhanshi', data: data2})
      this.$postalldayu2(psz)
        .then(res => {
          res[0].forEach(e => {
            let it = {id: e.id, sz: e.szmc}
            that.szlist.push(it)
          })
          that.totalrecord = res[1]
          let lb = res[2]
          let ind = 1
          lb.forEach(e => {
            let tmlx = that.zhuanhuan('tmlx', e.examtype)
            let tmgs = e.que
            console.log(e.que)
            this.$post('sys/szexam/listchoi', {tid: e.id})
              .then(res => {
                let xxiang = []
                res.forEach(e1 => {
                  let ea = e1.xuanxiang
                  xxiang.push('<p>' + ea + '</p>')
                })
                let xxs = xxiang.join(' ')
                let it = {id: ind, ycid: e.id, leix: tmlx, timu: tmgs, tmxuanx: xxs, daan: e.ans, jiexi: e.jiexi, ifshow: false}
                that.desserts.push(it)
                that.desserts.push({ divider: true })
              })
              .catch(err => {
                console.log(err)
              })
          })
        }).catch(err => {
          console.log(err)
        })
    },
    zhuanhuan (zhmc, srx) {
      let rs = ''
      if (zhmc === 'sz') {
        this.szlist.forEach(e => {
          if (e.id === srx) {
            rs = e.sz
          }
        })
      }
      if (zhmc === 'szmc') {
        this.szlist.forEach(e => {
          if (e.sz === srx) {
            rs = e.id
          }
        })
      }
      if (zhmc === 'tmlx') {
        switch (srx) {
          case 'danxuan':
            rs = '单选'
            break
          case 'duoxuan':
            rs = '多选'
            break
          case 'jisuan':
            rs = '计算'
            break
          case 'panduan':
            rs = '判断'
            break
        }
      }
      if (zhmc === 'tmlxmc') {
        switch (srx) {
          case '单选':
            rs = 'danxuan'
            break
          case '多选':
            rs = 'duoxuan'
            break
          case '计算':
            rs = 'jisuan'
            break
          case '判断':
            rs = 'panduan'
            break
        }
      }
      return rs
    },
    showdaan (index) {
      this.desserts[index].ifshow = !this.desserts[index].ifshow
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
#upload {
  height: 0;
  width: 0;
  visibility: hidden;
}
</style>
