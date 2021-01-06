<template>
  <v-container>
         <v-layout>
             <v-flex>
                 <v-btn @click="upload">
                     Upload Image
                 </v-btn>
                 <input type="file" id="upload" ref="upload" @change="changeimg" accept=".docx, .jpeg, .png">
             </v-flex>
         </v-layout>
     </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selection: []
    }
  },
  methods: {
    upload () {
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    },
    async changeimg (e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      this.$postfile('say3', formData).then(res => {
        if (res.data === 0) {
          this.$router.go(-1)
        }
      }).catch(error => {
        alert('更新用户数据失败' + error)
      })
    }
  },
  watch: {
    selection (newValue, oldVal) {
      console.log('newvalue:' + newValue + ',oldvalue:' + oldVal)
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
