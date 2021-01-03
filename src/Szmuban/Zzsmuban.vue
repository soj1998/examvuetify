<template>
  <v-container class="grey lighten-5" id="dingtop">
    <v-tabs>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
    <v-row no-gutters>
      <v-col
        cols="4"
        sm="2"
        md="3"
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
          hoverable
          return-object
          color = "warning"
          :items = "t_items"
        ></v-treeview>
        </v-card>
      </v-col>
      <v-col
        cols="10"
        md="7"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <div class="text-left teal cyan lighten-5"  v-cloak>
          <div v-html="pagecontent"></div>
        </div>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        md="2"
      >
        <v-card-title class="indigo white--text headline">
          文章内导航
        </v-card-title>
        <v-treeview
          return-object
          color = "pink lighten-3"
          :items = "t_items2"
          open-on-click
          activatable
          :active.sync="active2"
        ></v-treeview>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Zzsmuban',
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
      t_items: [],
      t_items2: [],
      active2: []
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
          that.t_items2 = []
          pcsz.forEach(e => {
            if (e.biaoti > 0) {
              let btnr = {
                id: 'a' + e.hangshu,
                name: e.nr
              }
              // console.log(btnr)
              that.t_items2.push(btnr)
              e.nr = that.syhji(e.biaoti + 2, e.nr, 'a' + e.hangshu)
            } else {
              e.nr = '<p>' + e.nr + '</p>'
            }
            that.pagecontent = that.pagecontent + e.nr
          })
          that.pagecontent = '<div class="text-body-1" style="margin-top: 10px">' + that.pagecontent + '</div>'
        })
        .catch(error => {
          console.log('error' + error)
        })
    },
    test () {
      console.log('error')
    },
    scrollviewtop (e) {
      document.querySelector('#dingtop').scrollIntoView(true)
    },
    syhji (hsz, nr, hangshu) {
      switch (hsz) {
        case 1: {
          return '<div id= "' + hangshu + '" class="text-h1 text-center">' + nr + '</div>'
        }
        case 2: {
          return '<div id= "' + hangshu + '" class="text-h2 text-center">' + nr + '</div>'
        }
        case 3: {
          return '<div id= "' + hangshu + '" class="text-h3 text-center">' + nr + '</div>'
          // return '<div  :id="a' + hangshu + '" @click="scrollviewtop(index)">哈哈哈</div>'
        }
        case 4: {
          return '<div ref= "' + hangshu + '" class="text-h4 text-center">' + nr + '</div>'
        }
        default: {
          return '<div ref= "' + hangshu + '" class="text-h5 text-center">' + nr + '</div>'
        }
      }
    }
  },
  watch: {
    active (newValue, oldValue) {
      console.log('newValue ' + JSON.stringify(newValue))
      console.log('oldValue ' + JSON.stringify(oldValue))
      if (!this.shoucidian && oldValue.length === 0 && this.active.length === 1 && newValue.length > 0) {
        console.log('active-oldvalue为空 ' + newValue[0].name)
        this.shoucidian = true
        this.getPageContent(newValue[0].parentid, newValue[0].rootid)
      }
      if (this.shoucidian && oldValue.length > 0 && newValue.length > 0 && newValue[0].name !== oldValue[0].name) {
        console.log('active-中间刷了 ' + newValue[0].name)
        this.getPageContent(newValue[0].parentid, newValue[0].rootid)
      }
    },
    openids (newValue) {
      if (newValue.length > 0) {
        // console.log(JSON.stringify(this.openids))
        this.active = []
        this.active.push(newValue[newValue.length - 1].children[0])
        // this.getPageContent(newValue[newValue.length - 1].rootid, newValue[newValue.length - 1].children[0].rootid)
      }
    },
    active2 (newValue, oldValue) {
      console.log('newValue ' + JSON.stringify(newValue))
      console.log('oldValue ' + JSON.stringify(oldValue))
      this.scrollviewtop(newValue[newValue.length - 1].id)
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
        this.getPageContent(that.t_items[0].children[0].parentid, that.t_items[0].children[0].rootid)
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
#divmar {
  color: red;
}
#zzsdh-title-right {
  width: 5px;
  height: 23px;
  background: #AB0B22;
  display: inline-block;
  margin-top: 3px;
  vertical-align: top;
  margin-right: 10px;
}
</style>
