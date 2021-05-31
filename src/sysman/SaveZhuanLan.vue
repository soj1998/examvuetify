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
            label="学科"
            required
      ></v-select>
      <v-text-field
        v-model="wzriqi"
        :rules="riqiRules"
        :counter="100"
        label="文章日期"
      ></v-text-field>
      <v-text-field
        v-model="wzlaiyuan"
        :rules= "[v => !!v || '文章来源不能为空']"
        :counter="1000"
        label="文章来源"
        required
      ></v-text-field>
      <v-text-field
        v-model="wzzsd"
        :rules= "[v => !!v || '文章知识点不能为空']"
        :counter="1000"
        label="文章知识点，用***分层级"
        required
      ></v-text-field>
      <v-text-field
        v-model="wzxilie"
        :counter="1000"
        label="文章系列"
      ></v-text-field>
      <div id="div1"></div>
    </v-form>
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
  name: 'dangezhuanlan1',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      loading: {uploadIsLoading: false},
      riqiRules: [
        v => !!v || '日期不能为空',
        v => /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/.test(v) || '格式:yyyy-mm-dd'
      ],
      uploadFormValid: false,
      szitems: [],
      szselect: null,
      wzriqi: '',
      wzlaiyuan: '',
      wzzsd: '',
      wzxilie: '',
      uploadok: '',
      snackbar: false,
      editorw: null
    }
  },
  methods: {
    submitform () {
      let a = 2
      // console.log(this.fileInfo, '文件信息');
      // 提交的文档字符串长度不能超过8000
      if (!this.$refs.uploadFileForm.validate()) {
        console.log('验证未通过')
        return
      }
      let wznr = this.editorw.txt.html()
      if (wznr === null || wznr.length === 0) {
        console.log('富文本编辑器内容为空')
        this.editorw.txt.html('<p>***请删除，编辑器内容不能为空</p>')
        return
      }
      let wznr2 = this.editorw.txt.text()
      if (wznr2.indexOf('***请删除，编辑器内容不能为空') >= 0) {
        console.log('没有删除指定的提示语')
        this.uploadok = '没有删除指定的提示语'
        this.snackbar = true
        return
      }
      if ((String)(wznr).length > 8000) {
        console.log('文字内容长度已超过8000，不能保存')
        this.editorw.txt.html('<p>***请删除，文字内容长度已超过8000，不能保存</p>')
        return
      }
      if (a === 1) {
        return
      }
      this.loading.uploadIsLoading = true
      let data = {'szid': this.szselect,
        'wzriqi': this.wzriqi,
        'wzlaiyuan': this.wzlaiyuan,
        'wzxilie': this.wzxilie,
        'wzquanbu': this.editorw.txt.html(),
        'wzquanbutxt': this.editorw.txt.text(),
        'wzzsd': this.wzzsd
      }
      this.zhidingurlpost('sys/zhuanlan/uploadztsave', data)
    },
    zhidingurlpost (url, formData) {
      let that = this
      this.$post(url, formData)
        .then(res => {
          if (res === 'ok') {
            console.log('ok')
            that.uploadok = '上传成功'
          } else {
            that.uploadok = '存在问题，未能更新成功'
          }
          that.loading.uploadIsLoading = false
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
      this.wzxilie = ''
      this.wzriqi = this.$globalfunc.getDqYYMMDD()
      this.wzlaiyuan = ''
      this.uploadFormValid = false
      this.editorw.txt.clear()
    },
    test () {
      console.log('error')
    },
    getandputsz () {
      let that = this
      this.$post('sys/sz/listall')
        .then(res => {
          res.forEach(e => {
            let it = {id: e.id, sz: e.szmc}
            that.szitems.push(it)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    uploadFormValid (newValue, oldValue) {
      console.log('uploadFormValid ' + newValue)
    }
  },
  mounted () {
    console.log('准备搞单个专栏文章的保存' + this.$globalfunc.getDqYYMMDD())
    const E = window.wangEditor
    this.editorw = new E('#div1')
    this.editorw.config.uploadImgServer = 'http://localhost:8080/houtai/sys/zhuanlan/uploadimg'
    this.editorw.config.onchangeTimeout = 500 // 修改为 500ms
    this.editorw.config.withCredentials = true
    // 配置alt选项
    this.editorw.config.showLinkImgAlt = false
    // 配置超链接
    this.editorw.config.showLinkImgHref = false
    this.editorw.create()
    this.wzriqi = this.$globalfunc.getDqYYMMDD()
    this.uploadFormValid = false
    this.getandputsz()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.example {
  color: red;
  background: red;
}
</style>
