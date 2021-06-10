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
        <v-toolbar-title>专栏文章概览</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定要删除此条专栏吗?</v-card-title>
            <v-form
              ref="saveform"
              v-model="saveform"
              lazy-validation>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="30"
                      sm="16"
                      md="10"
                    >
                      <v-text-field
                        v-model="editedItem.id"
                        label="序号"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.ycid"
                        v-if="1!==1"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.szmc"
                        label="税种"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.biaoti"
                        label="标题"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.xilie"
                        label="系列"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.yxbz"
                        label="有效标志"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
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
    name: 'EditSzZhuanLan',
    dialogDelete: false,
    headers: [
      {
        text: '序号',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: '学科', value: 'szmc', sortable: false },
      { text: '标题', value: 'biaoti', sortable: false },
      { text: '系列', value: 'xilie', sortable: false },
      { text: '有效标志', value: 'yxbz', sortable: false },
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
    xuanxjiange: '||',
    saveform: false,
    snackbar: false,
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
      return rs
    },
    listall () {
      let that = this
      let data2 = {pageNum: that.dangqianpage, pageSize: that.perpage + 1} // 加一了删除一个有补得 删除两个有补得 就加2
      let psz = []
      psz.push({url: 'sys/sz/listall', data: null})
      psz.push({url: 'sys/zhuanlan/getcount', data: null})
      psz.push({url: 'sys/zhuanlan/listdaican', data: data2})
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
            let it = {id: ind, ycid: e.id, szmc: szmc1, biaoti: e.biaoti, xilie: e.zlxilie, yxbz: e.yxbz}
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
            let it = {id: ind, ycid: e.id, szmc: szmc1, biaoti: e.zlduanluo, xilie: e.zlxilie, yxbz: e.yxbz}
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
      this.$post('sys/zhuanlan/delete', sz)
        .then(res => {
          console.log(res)
          that.desserts.splice(this.editedIndex, 1)
          let ind = 1
          this.desserts.forEach(e => {
            e.id = ind
            ind++
          })
          that.closeDelete()
        }).catch(err => {
          console.log(err)
        })
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      console.log(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
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
