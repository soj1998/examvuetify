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
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              新建
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
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
                        v-model="editedItem.sz"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="税种"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.zsd"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="知识点"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.leix"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="类型"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.yxbz"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="有效标志"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.timu"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="题目"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.xuanx"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="选项"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.daan"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="答案"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.jiexi"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="解析"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                :disabled="!saveform"
                color="blue darken-1"
                text
                @click="save()"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-snackbar
            v-model="snackbar"
          >
            {{ tishisnack }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                关闭
              </v-btn>
            </template>
          </v-snackbar>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定要删除此条试题吗?</v-card-title>
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
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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
    name: 'EditSzExam',
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
      { text: '知识点', value: 'zsd', sortable: false },
      { text: '类型', value: 'leix', sortable: false },
      { text: '题目', value: 'timu', sortable: false },
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
      daan: '',
      jiexi: ''
    },
    defaultItem: {
      id: 0,
      ycid: 0,
      sz: '',
      zsd: '',
      leix: '',
      timu: '',
      yxbz: '',
      xuanx: [],
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
    getxxtoedit (zsid) {
      let that = this
      let psz = []
      let data1 = {tid: zsid}
      psz.push({url: 'sys/szexam/getquebyid', data: data1})
      psz.push({url: 'sys/szexam/listchoi', data: data1})
      this.$postalldayu2(psz)
        .then(res => {
          that.editedItem.ycid = res[0].id
          that.editedItem.id = that.editedIndex + 1
          let szmc1 = that.zhuanhuan('sz', res[0].szid)
          let tmlx = that.zhuanhuan('tmlx', res[0].examtype)
          that.editedItem.sz = szmc1
          that.editedItem.leix = tmlx
          that.editedItem.zsd = res[0].zzd
          that.editedItem.timu = res[0].examque
          that.editedItem.yxbz = res[0].yxbz
          let xx = []
          res[1].sort((a, b) => {
            let val1 = a.id
            let val2 = b.id
            if (val1 < val2) {
              return -1
            } else if (val1 > val2) {
              return 1
            } else {
              return 0
            }
          })
          res[1].forEach(e => {
            xx.push(e.xuanxiang)
          })
          that.editedItem.xuanx = xx.join(that.xuanxjiange)
          that.editedItem.daan = res[0].examans
          that.editedItem.jiexi = res[0].examanal
        }).catch(err => {
          console.log(err)
        })
    },
    saveexam (item) {
      console.log('aaaa', item)
      let szmc1 = this.zhuanhuan('szmc', item.sz)
      let tmlx = this.zhuanhuan('tmlxmc', item.leix)
      let eque1 = {
        id: item.ycid,
        szid: szmc1,
        zzd: item.zsd,
        examtype: tmlx,
        examque: item.timu,
        yxbz: item.yxbz,
        examans: item.daan,
        examanal: item.jiexi
      }
      let echoilist1 = item.xuanx.split(this.xuanxjiange)
      let echoilist2 = []
      echoilist1.forEach(e => {
        let a = {xuanxiang: e}
        echoilist2.push(a)
      })
      let sz1 = {'eque': eque1, 'echoi': echoilist2}
      this.$postobject('sys/szexam/add', sz1)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      let a = 1
      if (a === 1) {
        return
      }
      let sz = {eque: eque1, echoi: echoilist2}
      let that = this
      this.$postobject('sys/szexam/add', sz)
        .then(res => {
          console.log(res)
          console.log(typeof res)
          if (typeof res === 'string' && res.indexOf('not save') > 0) {
            console.log('该税种已存在')
            that.tishisnack = '该税种已存在'
            that.snackbar = true
            return
          }
          console.log('成功保存' + res)
          if (that.editedIndex > -1) {
            Object.assign(that.desserts[that.editedIndex], that.editedItem)
          } else {
            that.editedItem.id = that.desserts.length + 1
            that.editedItem.ycid = res
            that.desserts.push(this.editedItem)
          }
          that.close()
        }).catch(err => {
          console.log(err)
          console.log('保存失败，服务器错误')
          that.tishisnack = '保存失败，服务器错误'
          that.snackbar = true
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
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      // console.log(item.ycid)
      // this.editedItem = Object.assign({}, item)
      this.getxxtoedit(item.ycid)
      console.log(this.editedItem)
      this.dialog = true
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
    },
    save () {
      let item = this.editedItem
      if (this.$refs.saveform.validate()) {
        this.saveexam(item)
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
