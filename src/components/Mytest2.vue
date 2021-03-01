<template>
  <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Your Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in myitems"
            :key="item.tab"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in myitems"
        :key="item"
      >
        <component v-bind:is="item.tabtemp">
          <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import UploadBtnHaoKan from '@/components/UploadBtnHaoKan'
export default {
  components: {
    UploadBtnHaoKan
  },
  template: '<UploadBtnHaoKan/>',
  data: () => ({
    tab: null,
    reveal: true,
    currentView: UploadBtnHaoKan,
    items: [
      'web', 'shopping', 'videos', 'images', 'news'
    ],
    myitems: [
      { tab: '学研基础', tabtemp: UploadBtnHaoKan, content: '<div><UploadBtnHaoKan></UploadBtnHaoKan></div>' },
      { tab: '学研试题', tabtemp: UploadBtnHaoKan, content: 'Tab 2 Content' }
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
      this.$router.push({name: 'Mytest', params: { userId: 12 }})
    }
  },

  mounted () {
    console.log('当前次数' + this.cishu)
    this.cishu++
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
