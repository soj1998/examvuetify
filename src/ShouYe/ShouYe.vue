<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="id"
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page.sync="dangqianpage"
    @click:row="rowClick"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>学研社articles列表</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      暂无数据
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    name: 'ShouYe',
    dialogDelete: false,
    headers: [
      { text: '标题', value: 'biaoti', sortable: false },
      { text: '学科', value: 'xueke', sortable: false },
      { text: '知识点', value: 'zsd', sortable: false },
      { text: '类型', value: 'leixing', sortable: false },
      { text: '录入时间', value: 'lrsj', sortable: false }
    ],
    desserts: [],
    dangqianpage: 1,
    perpage: 10,
    totalrecord: 1
  }),
  watch: {
    dangqianpage () {
      console.log('当前页: ' + this.dangqianpage)
      this.listzhiding(this.dangqianpage, this.perpage)
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.listall()
    },
    listall () {
      let that = this
      let data2 = {pageNum: that.dangqianpage, pageSize: that.perpage + 1} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      // psz.push({url: 'wbzt/getsyxxcount'})
      psz.push({url: 'wbzt/getsyxx', data: data2})
      this.$postalldayu2(psz)
        .then(res => {
          let lb = res[0]
          let ind = 1
          lb.forEach(e => {
            let lrsj1 = that.$globalfunc.getZhiDingYYMMDD(new Date(e.lrsj))
            let it = {id: ind, ycid: e.id, biaoti: e.biaoti, biaotiid: e.zlbiaotiid, xueke: e.sz, szid: e.szid, zsd: e.zsd, leixing: e.xinxiyuanleixing, xinxiyuanid: e.xinxiyuanid, lrsj: lrsj1}
            that.desserts.push(it)
            ind++
          })
          that.totalrecord = ind
          if (ind > 10) {
            for (let i = ind; i < that.totalrecord + 1; i++) {
              let myarray = {id: i}
              that.desserts.push(myarray)
            }
          }
        }).catch(err => {
          console.log(err)
        })
    },
    listzhiding (dqy, pagesz) {
      let that = this
      let data = {pageNum: dqy, pageSize: pagesz + 1}
      this.$post('sys/zhuanlan/listdaican', data)
        .then(res => {
          let ind = (dqy - 1) * pagesz + 1
          let desserts2 = []
          res.forEach(e => {
            let szmc1 = that.zhuanhuan('sz', e.atcSjk.szid)
            let it = {id: ind, ycid: e.id, szmc: szmc1, biaoti: e.zlduanluo, xilie: e.zlxilie, yxbz: e.atcSjk.yxbz}
            desserts2.push(it)
            that.desserts.splice(ind - 1, 1, it)
            ind++
          })
        }).catch(err => {
          console.log(err)
        })
    },
    rowClick (item, row) {
      let xinxiyuanleixing1 = item.leixing
      console.log(item.xinxiyuanid)
      if (xinxiyuanleixing1 === 'zhuanlan') {
        this.$router.push({name: 'ZhuanLanMx', params: { zlid: item.ycid, zlbtid: item.biaotiid, xinxiyuanleixing: item.leixing, xinxiyuanid: item.xinxiyuanid }})
      }
      if (xinxiyuanleixing1 === 'exam') {
        this.$router.push({name: 'ExamMx', params: { szid: item.szid, biaoti: item.biaoti }})
      }
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
