<template>
  <v-data-table
    :headers="headers"
    hide-default-header
    :items="desserts"
    sort-by="id"
    class="elevation-1 something"
    :items-per-page.sync="perpage"
    :page.sync="dangqianpage"
    @click:row="rowClick"
  >
    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th v-for="h in headers" :class="h.class" :key="h.value">
            <span>{{h.text}}</span>
          </th>
        </tr>
      </thead>
    </template>
    <template v-slot:top>
      <v-toolbar
        flat
        color = "#E0F7FA"
      >
        <v-toolbar-title class="something" >学研社articles列表</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:body>
      <tbody>
      <tr v-for="(item, index) in desserts" @click="rowClick(item[index])" :key="item.ycid">
          <td v-for="h in item" :class="h.class" :key="h.value">
            <span>{{h.text}}</span>
          </td>
      </tr>
      </tbody>
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
      { text: '标题', value: 'biaoti', sortable: false, class: 'shaoweidadian' },
      { text: '学科', value: 'xueke', sortable: false, class: 'shaoweidadian' },
      { text: '知识点', value: 'zsd', sortable: false, class: 'shaoweidadian' },
      { text: '类型', value: 'leixing', sortable: false, class: 'shaoweidadian' },
      { text: '录入时间', value: 'lrsj', sortable: false, class: 'shaoweidadian' }
    ],
    desserts: [],
    dangqianpage: 1,
    perpage: 10,
    totalrecord: 1,
    slots: [
      'body',
      'body.append',
      'body.prepend',
      'footer',
      'header.data-table-select',
      'header',
      'progress',
      'item.data-table-select',
      'item.<name>',
      'no-data',
      'no-results',
      'top'
    ]
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
      let data2 = {pageNum: that.dangqianpage, pageSize: 1000} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      psz.push({url: 'wbzt/getsyxxcount'})
      psz.push({url: 'wbzt/getsyxx', data: data2})
      this.$postalldayu2(psz)
        .then(res => {
          let lb = res[1]
          let ind = 1
          lb.forEach(e => {
            let lrsj1 = that.$globalfunc.getZhiDingYYMMDD(new Date(e.lrsj))
            let leixing1 = that.$globalfunc.zhuanhuan('leixing', e.xinxiyuanleixing)
            console.log('leixing ' + leixing1)
            let it = {id: ind, ycid: e.id, biaoti: e.biaoti, biaotiid: e.biaotiid, xueke: e.sz, szid: e.szid, zsd: e.zsd, yleixing: e.xinxiyuanleixing, leixing: leixing1, xinxiyuanid: e.xinxiyuanid, lrsj: lrsj1}
            // zlid: item.ycid, zlbtid: item.biaotiid, xinxiyuanleixing: item.leixing, xinxiyuanid: item.xinxiyuanid }
            let it1 = {ycid: it.ycid, text: it.biaoti, value: 'biaoti', class: 'shaoweidadian1', biaotiid: it.biaotiid, yleixing: it.yleixing, xinxiyuanid: it.xinxiyuanid}
            let it2 = {ycid: it.ycid, text: it.xueke, value: 'xueke', class: 'shaoweidadian1', biaotiid: it.biaotiid, yleixing: it.yleixing, xinxiyuanid: it.xinxiyuanid}
            let it3 = {ycid: it.ycid, text: it.zsd, value: 'zsd', class: 'shaoweidadian1', biaotiid: it.biaotiid, yleixing: it.yleixing, xinxiyuanid: it.xinxiyuanid}
            let it4 = {ycid: it.ycid, text: leixing1, value: 'leixing1', class: 'shaoweidadian1', biaotiid: it.biaotiid, yleixing: it.yleixing, xinxiyuanid: it.xinxiyuanid}
            let it5 = {ycid: it.ycid, text: lrsj1, value: 'lrsj1', class: 'shaoweidadian1', biaotiid: it.biaotiid, yleixing: it.yleixing, xinxiyuanid: it.xinxiyuanid}
            let itgo = [it1, it2, it3, it4, it5]
            that.desserts.push(itgo)
            ind++
          })
          that.totalrecord = res[0]
          if (ind > 10) {
            for (let i = ind; i < that.totalrecord + 1; i++) {
              let myarray = {id: i}
              that.desserts.push(myarray)
            }
          }
          console.log(that.desserts)
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
      let xinxiyuanleixing1 = item.yleixing
      console.log(item.value)
      if (xinxiyuanleixing1 === 'zhuanlan') {
        this.$router.push({name: 'ZhuanLanMx', params: { zlid: item.ycid, zlbtid: item.biaotiid, xinxiyuanleixing: item.leixing, xinxiyuanid: item.xinxiyuanid }})
      }
      if (xinxiyuanleixing1 === 'exam') {
        this.$router.push({name: 'ExamMx', params: { szid: item.szid, biaoti: item.biaoti, biaotiid: item.biaotiid }})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '@/styles/base.css'

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
.something {
  color: var(--v-primary-base);
  /*background-color: var(--bg-color);*/
  font-family :"FangSong",Georgia,Serif;
}
.shaoweidadian {
  font-size: 20px!important;
  /*color: var(--bg-color)!important;*/
  font-family :"FangSong",Georgia,Serif!important;
}
.shaoweidadian1 {
  font-size: 1.2rem!important;
  margin: 0 40px!important;
  text-align:left;
}
</style>
