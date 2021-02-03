<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="id"
    class="elevation-1"
    :items-per-page.sync="perpage"
    :page="2"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>已保存试题概览</v-toolbar-title>
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
                      cols="12"
                      sm="6"
                      md="4"
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
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.sz"
                        :rules="[v =>  v.length > 0 || '不能为空']"
                        label="税种"
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
                @click="save"
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
            <v-card-title class="headline">确定要删除此税种吗?</v-card-title>
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
      { text: '税种', value: 'sz', sortable: false },
      { text: '知识点', value: 'sz', sortable: false },
      { text: '类型', value: 'sz', sortable: false },
      { text: '题目', value: 'sz', sortable: false },
      { text: '有效标志', value: 'yxbz', sortable: false },
      { text: '操作', value: 'actions', sortable: false }
    ],
    desserts: [],
    dangqianpage: 2,
    perpage: 10,
    editedIndex: -1,
    editedItem: {
      id: -1,
      ycid: 0,
      sz: ''
    },
    defaultItem: {
      id: 0,
      ycid: 0,
      sz: ''
    },
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
      // console.log(this.fileInfo, '文件信息')
      this.$post('sys/szexam/listall')
        .then(res => {
          let ind = 1
          res.forEach(e => {
            let it = {id: ind, ycid: e.id, sz: e.examtype, yxbz: e.yxbz}
            that.desserts.push(it)
            ind++
          })
        }).catch(err => {
          console.log(err)
        })
    },
    savesz (szid1, szmc1) {
      // console.log(this.fileInfo, '文件信息')
      let sz = {szid: szid1, szmc: szmc1}
      let that = this
      this.$post('sys/sz/add', sz)
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
      // console.log(this.fileInfo, '文件信息')
      let sz = {szid: szid1}
      let that = this
      this.$post('sys/sz/delete', sz)
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
    editItem (item) {
      console.log(item)
      this.editedIndex = this.desserts.indexOf(item)
      console.log(this.desserts.indexOf(item))
      this.editedItem = Object.assign({}, item)
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
      if (this.$refs.saveform.validate()) {
        let id1 = this.editedItem.ycid
        this.savesz(id1, this.editedItem.sz)
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
