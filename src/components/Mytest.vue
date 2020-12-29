<template>
  <v-container class="grey lighten-5">
    <v-tabs>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
    <v-row no-gutters>
      <v-col
        cols="8"
        sm="3"
        md="2"
      >
        <v-card
          class = "pa-2 align-left"
          outlined
          tile
        >
        <v-card-title class="indigo white--text headline">
          增值税
        </v-card-title>
        <v-treeview
          :active.sync="active"
          :open.sync="openids"
          open-on-click
          activatable
          return-object
          color = "warning"
          :items = "t_items"
        ></v-treeview>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <p class="text-left"  v-cloak>
          {{pagecontent}}
        </p>
        <div class="purple darken-2 text-center">
          <span class="white--text">Lorem ipsum</span>
        </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pagecontent: '',
      active: [],
      openids: [],
      shoucidian: false,
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar' },
            { id: 3, name: 'Chrome' },
            { id: 4, name: 'Webstorm' }
          ]
        }
      ],
      t_items: []
    }
  },
  methods: {
    getPageContent (parentid1, rootid1) {
      let that = this
      console.log('parentid1:' + parentid1 + ' rootid1:' + rootid1)
      this.$post('atc/gettreeneirongbyid', {parentid: parentid1, rootid: rootid1})
        .then(res => {
          console.log('返回数')
          res.sort((a, b) => {
            return a.hangshu - b.hangshu
          })
          res.forEach(element => {
            console.log('2.' + element.hangshu + that.pagecontent + element.qbneirong)
          })
        })
        .catch(error => {
          console.log('error' + error)
        })
    },
    test () {
      console.log('error')
    }
  },
  watch: {
    active (newValue, oldValue) {
      if (!this.shoucidian && oldValue.length === 0 && this.active.length === 1) {
        console.log('active-oldvalue为空 ' + newValue[0].name)
        this.shoucidian = true
        this.getPageContent(newValue[0].parentid, newValue[0].rootid)
      }
      if (this.shoucidian && oldValue.length > 0 && newValue[0].name !== oldValue[0].name) {
        console.log('active-中间刷了 ' + newValue[0].name)
      }
    },
    openids (newValue) {
      if (newValue.length > 0) {
        console.log('openids' + newValue[newValue.length - 1].name)
        this.active = []
        this.active.push(newValue[newValue.length - 1].children[0])
        // this.getPageContent(newValue[newValue.length - 1].rootid, newValue[newValue.length - 1].children[0].rootid)
      }
    }
  },
  mounted () {
    console.log('赋予初始值')
    let that = this
    this.$post('atc/gettree', { parentid: 1 })
      .then(res => {
        res.forEach(element => {
          // console.log(element)
          let json =
          {
            'id': element.yuantou.id,
            'name': element.yuantou.btneirong,
            'biaoti': element.yuantou.biaoti,
            'rootid': element.yuantou.rootid,
            'parentid': element.yuantou.parentid,
            'children': []
          }
          element.children.forEach(e => {
            let json2 =
            {
              'id': e.id,
              'name': e.btneirong,
              'biaoti': e.biaoti,
              'rootid': e.rootid,
              'parentid': e.parentid
            }
            json.children.push(json2)
          })
          that.t_items.push(json)
        })
      })
      .catch(error => {
        console.log('error' + error)
      })
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
[v-cloak] {
    display: none;
}
</style>
