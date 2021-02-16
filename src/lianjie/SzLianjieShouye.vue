<template>
  <div>
    <span
      class="myspancalss"
      v-for="(item, i) in items"
      :key="i"
      cols="12"
      md="6">
      <v-btn
        x-large
        color="success"
        dark
        class="mybtncalss"
        @click="daohangsz(item)"
      >
        {{item.text}}
      </v-btn>
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'SzLianjieShouye',
    items: [
      {
        src: 'backgrounds/bg.jpg',
        text: '增值税',
        sz: 'zzs'
      },
      {
        src: 'backgrounds/md.jpg',
        text: '企业所得税',
        sz: 'qysds'
      },
      {
        src: 'backgrounds/bg-2.jpg',
        text: '个人所得税',
        sz: 'grsds'
      },
      {
        src: 'backgrounds/md2.jpg',
        text: '消费税',
        sz: 'xfs'
      }
    ],
    selected: []
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

  methods: {
    daohangsz (item) {
      console.log(item.text)
      let zhaodao = false
      this.$post('sys/sz/listall')
        .then(res => {
          let szzu = res
          let szid2 = 0
          szzu.forEach(element => {
            if (element.szmc === item.text) {
              szid2 = element.id
              this.$router.push({name: 'Szmuban', params: { szid: szid2, szmc: item.text }})
              zhaodao = true
            }
          })
          if (!zhaodao) {
            console.log('没有找到对应的税种,无法导航到下一界面')
            alert('没有找到对应的税种,无法导航到下一界面')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buttonhw {
    height: 138;
    width: 120;
    color: red;
  }
  .myspancalss {
    margin: 6px;
  }
  .mybtncalss {
    margin: 6px;
  }
</style>
