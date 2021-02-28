<template>
<div class="d-flex flex-column mb-6">
    <v-card
      class="pa-2"
      outlined
      tile
    >
      左侧图标，中间搜索
    </v-card>
    <v-card
      class="pa-2"
      outlined
      tile
      style = "height:260px;"
    >
      一个大图标和部分介绍的话
    </v-card>
    <v-card
      class="pa-2"
      outlined
      tile
    >
      <template>
      <span
        class="myspancalss"
        v-for="(item, i) in myitems"
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
          {{item.szmc}}
        </v-btn>
      </span>
      </template>
    </v-card>
    <v-card
      class="pa-2"
      outlined
      tile
      style="margin-top:120px;"
    >
      版权所有 联系我们
    </v-card>
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
    myitems: [],
    szzu: [],
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
      console.log(item.szmc)
      this.$router.push({name: 'Szmuban', params: { szid: item.id, szmc: item.szmc }})
    },
    getszfromhoutai () {
      let that = this
      this.$post('sys/sz/listall')
        .then(res => {
          let szzu1 = res
          szzu1.forEach(element => {
            that.szzu.push({id: element.id, szmc: element.szmc})
            that.myitems.push({src: 'backgrounds/md.jpg', id: element.id, szmc: element.szmc})
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getszfromhoutai()
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
