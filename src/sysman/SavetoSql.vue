<template>
  <div class="main">
    <v-form
       ref="uploadFileForm"
       v-model="uploadFormValid"
       lazy-validation>
      <v-select
            v-model="szselect"
            :items="szitems"
            item-text="sz"
            item-value="id"
            :rules= "[v => !!v || '税种不能为空']"
            label="税种"
            required
          ></v-select>
      <v-select
            v-model="wzlxselect"
            :items="wzlxitems"
            item-text="sz"
            item-value="id"
            :rules= "[v => !!v || '文章类型不能为空']"
            label="文章类型"
            required
          ></v-select>
      <v-text-field
        v-model="wzbanben"
        :rules="nameRules"
        :counter="20"
        :label="wzbblabel"
        v-if="gaojichu"
        required
      ></v-text-field>
      <v-text-field
        v-model="wzlaiyuan"
        :rules= "[v => !!v || '文章来源不能为空']"
        :counter="1000"
        label="文章来源"
        required
      ></v-text-field>
      <v-text-field
        v-model="wzjiagou"
        :rules= "[v => !!v || '文章架构不能为空']"
        :counter="5000"
        label="文章架构"
        v-if="gaojichu"
        required
      ></v-text-field>
      <v-file-input
            v-model="fileInfo"
            required
            :rules="[v => !!v || '文件必选']"
            show-size accept=".docx"
            @change="uploadFile"
            :disabled="loading.uploadIsLoading"
            :loading="loading.uploadIsLoading"
            label="点击选择文件，文件格后缀为：.docx">
        </v-file-input>
    </v-form>
    <v-btn
      color="success"
      class="mr-4"
      @click="submitform1"
      v-if="1!==1"
    >
      保存1
    </v-btn>
    <v-btn
      :disabled="!uploadFormValid"
      color="success"
      class="mr-4"
      @click="submitform"
    >
      保存
    </v-btn>
    <v-btn color="warning"
      class="mr-4"
      @click="clear">
      清空
    </v-btn>
    <v-snackbar
      v-model="snackbar"
    >
      {{ uploadok }}

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
  </div>
</template>

<script>
export default {
  name: 'SavetoSql',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loading: {uploadIsLoading: false},
      fileInfo: '',
      wzbanben: '',
      wzbblabel: '版本',
      wzjiagou: '',
      wzlaiyuan: '',
      nameRules: [
        v => !!v || '版本号不能为空',
        v => /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){3}$/.test(v) || '格式:1.0.0.0'
      ],
      uploadFormValid: false,
      wzlxitems: [],
      wzlxselect: null,
      wzlxselectmc: '',
      szitems: [],
      szselect: null,
      uploadok: '',
      snackbar: false,
      gaoshiti: false,
      gaojichu: false
    }
  },
  methods: {
    submitform1 () {
      // console.log(this.fileInfo, '文件信息');
      console.log(this.wzlxselect)
      this.snackbar = true
    },
    submitform () {
      // console.log(this.fileInfo, '文件信息');
      if (!this.$refs.uploadFileForm.validate()) {
        console.log(this.wzlxselect)
        return
      }
      if (this.gaoshiti) {
        this.loading.uploadIsLoading = true
        let formData = new window.FormData()
        formData.append('file', this.fileInfo)
        formData.append('wzlx', this.wzlxselect)
        formData.append('sz', this.szselect)
        formData.append('wzlaiyuan', this.wzlaiyuan)
        this.zhidingurlpost('sys/szexam/uploadsave', formData)
      }
      let a = 1
      if (a === 1) {
        // alert(this.wzlxselect)
        // return
      }
      if (!this.gaojichu) {
        console.log('不是搞基础类，不要继续往下了，下面是提交基础文章')
        return
      }
      if (this.gaojichu && this.$refs.uploadFileForm.validate()) {
        this.loading.uploadIsLoading = true
        let formData = new window.FormData()
        formData.append('file', this.fileInfo)
        formData.append('wzlx', this.wzlxselect)
        formData.append('sz', this.szselect)
        formData.append('wzversion', this.wzbanben)
        formData.append('wzjiagou', this.wzjiagou)
        formData.append('wzlaiyuan', this.wzlaiyuan)
        this.zhidingurlpost('sys/szwz/uploadsave', formData)
      }
    },
    zhidingurlpost (url, formData) {
      let that = this
      this.$postfile(url, formData)
        .then(res => {
          that.loading.uploadIsLoading = false
          that.uploadDialog = false
          that.uploadok = '上传成功'
          that.snackbar = true
          that.clear()
        }).catch(err => {
          console.log(err)
          that.uploadok = '失败，服务器故障'
          that.snackbar = true
          that.loading.uploadIsLoading = false
        })
    },
    clear () {
      // this.$refs.uploadFileForm.reset()
      this.fileInfo = ''
      this.szselect = null
      this.wzlxselect = null
      this.wzbanben = ''
      this.wzjiagou = ''
      this.wzlaiyuan = ''
      this.uploadFormValid = false
    },
    uploadFile1 () {
      // console.log(this.fileInfo, '文件信息');
      if (this.$refs.uploadFileForm.validate()) {
        this.loading.uploadIsLoading = true
        var formData = new window.FormData()
        formData.append('file', this.fileInfo)
        let that = this
        this.$postfile('say3', formData)
          .then(res => {
            that.loading.uploadIsLoading = false
            that.$refs.notify.show('文件上传成功', {timeout: 1000, color: 'success'})
            that.uploadDialog = false
            that.search()
          }).catch(err => {
            console.log(err)
            that.loading.uploadIsLoading = false
          })
      }
    },
    test () {
      console.log('error')
    },
    b (e) {
      console.log('ref ' + JSON.stringify(this.$refs))
      console.log('e  ' + e)
      this.active.push(1)
    },
    syhji (hsz, nr) {
      switch (hsz) {
        case 1: {
          return '<div class="text-h1 text-center">' + nr + '</div>'
        }
        case 2: {
          return '<div class="text-h2 text-center">' + nr + '</div>'
        }
        case 3: {
          return '<div class="text-h3 text-center">' + nr + '</div>'
        }
        case 4: {
          return '<div class="text-h4 text-center">' + nr + '</div>'
        }
        default: {
          return '<div class="text-h5 text-center">' + nr + '</div>'
        }
      }
    },
    getselectedwzlxmc () {
      let that = this
      this.wzlxitems.forEach(e => {
        if (e.id === that.wzlxselect) {
          that.wzlxselectmc = e.sz
        }
      })
    },
    getandputsz () {
      let that = this
      // console.log(this.fileInfo, '文件信息')
      this.$post('sys/sz/listall')
        .then(res => {
          res.forEach(e => {
            let it = {id: e.id, sz: e.szmc}
            that.szitems.push(it)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    getandputwzlx () {
      let that = this
      // console.log(this.fileInfo, '文件信息')
      this.$post('sys/wzlx/listall')
        .then(res => {
          res.forEach(e => {
            let it = {id: e.id, sz: e.wzlxmc}
            that.wzlxitems.push(it)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    getandrefreshbanben (szid, wzlxid) {
      if (szid === null) {
        this.wzbblabel = '版本号'
        return
      }
      if (wzlxid === null) {
        this.wzbblabel = '版本号'
        return
      }
      let that = this
      // console.log(this.fileInfo, '文件信息')
      let data = {szid: szid, wzlxid: wzlxid}
      this.$post('sys/szwz/getbanben', data)
        .then(res => {
          if (res.length > 0) {
            console.log('aa' + res[0].version)
            that.wzbblabel = '当前最新版本为' + res[0].version
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    uploadFormValid (newValue, oldValue) {
      console.log('uploadFormValid ' + newValue)
    },
    wzlxselect () {
      this.getselectedwzlxmc()
      if (this.wzlxselectmc.indexOf('基础') >= 0) {
        console.log('选中了搞基础 ')
        this.gaojichu = true
        this.getandrefreshbanben(this.szselect, this.wzlxselect)
      } else {
        this.gaojichu = false
      }
      if (this.wzlxselectmc.indexOf('试题') >= 0) {
        this.gaoshiti = true
      } else {
        this.gaoshiti = false
      }
    },
    szselect () {
      if (this.gaojichu) {
        this.getandrefreshbanben(this.szselect, this.wzlxselect)
      }
    }
  },
  mounted () {
    console.log('准备搞文件上传')
    this.uploadFormValid = false
    // 取得文章类型 和 税种 并列举
    this.getandputsz()
    this.getandputwzlx()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}

.nav a {
  text-decoration: none;
  color: #333;
  padding: 0 10px;
  margin: 0 5px;
  background: #9e9e9e;
  line-height: 2;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.item{
    margin-top: 20px;
}

.title{
    background: #9e9e9e;
    line-height: 2;
}
.content {
  height: 300px;
  background: #eeeeee;
}
</style>
