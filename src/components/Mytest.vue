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
        <div class="text-left teal cyan lighten-5"  v-cloak>
          <div v-html="pagecontent"></div>
        </div>12
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
          that.pagecontent = []
          let neir = res.neirong
          let zhangj = res.zhangjie
          let pcsz = []
          neir.forEach(element => {
            // console.log('2.' + element.hangshu + that.pagecontent + element.qbneirong)
            let json =
            {
              'hangshu': element.hangshu,
              'biaoti': 0,
              'nr': element.qbneirong
            }
            pcsz.push(json)
          })
          zhangj.forEach(element => {
            // console.log('3.' + element.hangshu + that.pagecontent + element.btneirong + element.biaoti)
            let json =
            {
              'hangshu': element.hangshu,
              'biaoti': element.biaoti,
              'nr': element.btneirong
            }
            pcsz.push(json)
          })
          pcsz.sort((n1, n2) => {
            return n1.hangshu - n2.hangshu
          })
          // console.log(pcsz)
          pcsz.forEach(e => {
            if (e.biaoti > 0) {
              e.nr = that.syhji(e.biaoti, e.nr)
            } else {
              e.nr = '<p>' + e.nr + '</p>'
            }
            that.pagecontent = that.pagecontent + e.nr
          })
        })
        .catch(error => {
          console.log('error' + error)
        })
    },
    test () {
      console.log('error')
    },
    syhji (hsz, nr) {
      switch (hsz) {
        case 1: {
          return '<h1>' + nr + '</h1>'
        }
        case 2: {
          return '<h2>' + nr + '</h2>'
        }
        case 3: {
          return '<h3>' + nr + '</h3>'
        }
        case 4: {
          return '<h4>' + nr + '</h4>'
        }
        case 5: {
          return '<h5>' + nr + '</h5>'
        }
        case 6: {
          return '<h6>' + nr + '</h6>'
        }
        default: {
          return '<p>' + nr + '</p>'
        }
      }
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
        this.getPageContent(newValue[0].parentid, newValue[0].rootid)
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
