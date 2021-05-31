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
        <v-toolbar-title>专栏文章概览</v-toolbar-title>
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
    name: 'ZhuanLanLieBiao',
    dialogDelete: false,
    headers: [
      {
        text: '序号',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: '标题', value: 'biaoti', sortable: false },
      { text: '系列', value: 'xilie', sortable: false }
    ],
    desserts: [],
    dangqianpage: 1,
    perpage: 10,
    totalrecord: 1,
    szlist: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新建' : '编辑'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
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
      return rs
    },
    listall () {
      console.log(typeof (this.$route.params.szmc))
      if (this.$route.params.szmc === undefined) {
        console.log('router没有带过来')
        return
      }
      let cdszid = this.$route.params.szid
      let that = this
      let data2 = {pageNum: that.dangqianpage, pageSize: that.perpage + 1, szid: cdszid} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      psz.push({url: 'sys/sz/listall', data: null})
      psz.push({url: 'sys/zhuanlan/getcountbysz', data: {szid: cdszid}})
      psz.push({url: 'sys/zhuanlan/listdaicanzhanshi', data: data2})
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
            let szmc1 = that.zhuanhuan('sz', e.szid)
            let it
            if (e.btid === -1) {
              it = {id: ind, ycid: e.id, szmc: szmc1, biaotiid: e.btid, biaoti: e.zlduanluo, xilie: e.zlxilie, yxbz: e.yxbz}
            }
            if (e.btid === -100) {
              let a = (String)(e.zlzhenggetxt).substr(0, 10)
              console.log(a)
              it = {id: ind, ycid: e.id, szmc: szmc1, biaotiid: e.btid, biaoti: a, xilie: e.zlxilie, yxbz: e.yxbz}
            }
            that.desserts.push(it)
            ind++
          })
          that.dangqianpage = 1
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
      this.$router.push({name: 'ZhuanLanMx', params: { zlid: item.ycid, zlbtid: item.biaotiid }})
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
