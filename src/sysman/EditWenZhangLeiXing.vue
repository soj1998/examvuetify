<template>
  <div class="main">
    <v-select
          v-model="szselect"
          :items="szitems"
          :rules= "[v => !!v || '税种不能为空']"
          label="税种"
          required
        ></v-select>
    <v-select
          v-model="wzlxselect"
          :items="wzlxitems"
          :rules= "[v => !!v || '文章类型不能为空']"
          label="文章类型"
          required
        ></v-select>
    <v-form
       ref="uploadFileForm"
       v-model="uploadFormValid"
       lazy-validation>
       <v-text-field
        v-model="wzlx"
        :rules="nameRules"
        :counter="10"
        label="文章类型"
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
      wzlx: '',
      nameRules: [
        v => !!v || '文章类型不能为空'
      ],
      uploadFormValid: false,
      wzlxitems: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      wzlxselect: null,
      szitems: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      szselect: null
    }
  },
  methods: {
    returnTop () {
      console.log('ref ' + JSON.stringify(this.$refs))
      document.querySelector('#header').scrollIntoView(true)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'start' // 上边框与视窗顶部平齐。默认值
      })
    },
    submitform () {
      // console.log(this.fileInfo, '文件信息');
      if (this.$refs.uploadFileForm.validate()) {
        this.loading.uploadIsLoading = true
        var formData = new window.FormData()
        formData.append('file', this.fileInfo)
        formData.append('wzlx', this.wzlx)
        let that = this
        this.$postfile('say3', formData)
          .then(res => {
            that.loading.uploadIsLoading = false
            that.$refs.notify.show('文件上传成功', {timeout: 1000, color: 'success'})
            that.uploadDialog = false
            that.clear()
          }).catch(err => {
            console.log(err)
            that.loading.uploadIsLoading = false
          })
      }
    },
    clear () {
      // this.$refs.uploadFileForm.reset()
      this.fileInfo = ''
      this.wzlx = ''
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
    }
  },
  watch: {
    uploadFormValid (newValue, oldValue) {
      console.log('uploadFormValid ' + newValue)
    }
  },
  mounted () {
    console.log('准备搞文件上传')
    this.uploadFormValid = false
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
