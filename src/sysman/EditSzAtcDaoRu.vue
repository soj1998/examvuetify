<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="id"
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page.sync="dangqianpage"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>试题概览(非综合)</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定要删除此项导入的全部数据吗?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      暂无数据
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    name: 'EditSzAtcDaoRu',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '序号',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: '税种', value: 'szmc', sortable: false },
      { text: '类型', value: 'leix', sortable: false },
      { text: '导入时间', value: 'lrsj', sortable: false },
      { text: '操作', value: 'actions', sortable: false }
    ],
    desserts: [],
    dangqianpage: 1,
    perpage: 10,
    totalrecord: 1,
    szlist: [],
    editedIndex: -1,
    editedItem: {
      id: -1,
      ycid: 0,
      sz: '',
      zsd: '',
      leix: '',
      timu: '',
      yxbz: '',
      xuanx: [],
      xuanxids: [],
      daan: '',
      jiexi: ''
    },
    defaultItem: {
      id: 0,
      ycid: -1,
      sz: '',
      zsd: '',
      leix: '',
      timu: '',
      yxbz: '',
      xuanx: [],
      xuanxids: [],
      daan: '',
      jiexi: ''
    },
    tishisnack: ''
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
    listall () {
      let that = this
      let data2 = {pageNum: that.dangqianpage, pageSize: that.perpage + 1} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      psz.push({url: 'sys/sz/listall', data: null})
      psz.push({url: 'sys/szexam/getcount', data: null})
      psz.push({url: 'sys/szexam/listdaican', data: data2})
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
            let tmlx = that.zhuanhuan('tmlx', e.examtype)
            let tmgs = e.examque.substring(0, 15)
            let zsd1 = e.zzd.substring(0, 5)
            let xuanx1 = 'a'
            let xxiang = []
            xxiang.push(xuanx1)
            let it = {id: ind, ycid: e.id, szmc: szmc1, zsd: zsd1, leix: tmlx, timu: tmgs, yxbz: e.yxbz, xuanx: xxiang}
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
      this.$post('sys/szexam/listdaican', data)
        .then(res => {
          let ind = (dqy - 1) * pagesz + 1
          let desserts2 = []
          res.forEach(e => {
            let szmc1 = that.zhuanhuan('sz', e.szid)
            let tmlx = that.zhuanhuan('tmlx', e.examtype)
            let tmgs = e.examque.substring(0, 15)
            let zsd1 = e.zzd.substring(0, 5)
            let it = {id: ind, ycid: e.id, szmc: szmc1, zsd: zsd1, leix: tmlx, timu: tmgs, yxbz: e.yxbz}
            desserts2.push(it)
            that.desserts.splice(ind - 1, 1, it)
            ind++
          })
        }).catch(err => {
          console.log(err)
        })
    },
    delsz (szid1) {
      let sz = {szid: szid1}
      let that = this
      console.log(that.desserts.length)
      this.$post('sys/szexam/delete', sz)
        .then(res => {
          console.log(res)
          that.desserts.splice(this.editedIndex, 1)
          let ind = 1
          this.desserts.forEach(e => {
            e.id = ind
            ind++
          })
          console.log(that.desserts.length)
          that.closeDelete()
        }).catch(err => {
          console.log(err)
        })
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      // this.desserts.splice(this.edited Index, 1)
      this.delsz(this.editedItem.ycid)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
