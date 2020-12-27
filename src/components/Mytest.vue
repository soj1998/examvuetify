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
      selection: [],
      categoryList: [],
      selected: {
        id: 0,
        items: []
      },
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
      t_canshu: 0,
      bianlinr: []
    }
  },
  method: {},
  watch: {
    active (newValue) {
      // console.log(this.active)
      this.bianlinr = this.active[0].qbneirong
      console.log(this.bianlinr)
      let nr
      for (var val of this.bianlinr) {
        console.log(val + '\n')
      }
      this.bianlinr.forEach(element => {
        // nr = '<p>' + nr + element.neirong + '</p>'
        nr = nr + element.neirong
      })
      this.pagecontent = nr
    }
  },
  mounted () {
    console.log('赋予初始值')
    let that = this
    this.$post('atc/gettreebyid', { parentid: 1 })
      .then(res => {
        // console.log('ok' + res)
        res.forEach(element => {
          // console.log(element)
          let json =
          {
            'id': element.id,
            'name': element.btneirong,
            'biaoti': element.biaoti,
            'rootid': element.rootid,
            'parentid': element.parentid,
            'qbneirong': element.qbneirong,
            'children': []
          }
          that.$post('atc/gettreebyid', { parentid: element.rootid })
            .then(res => {
              res.forEach(element => {
                // console.log('error' + element.btneirong)
                let json2 =
                {
                  'id': element.id,
                  'name': element.btneirong,
                  'biaoti': element.biaoti,
                  'rootid': element.rootid,
                  'parentid': element.parentid,
                  'qbneirong': element.qbneirong
                }
                // console.log(element.id + element.btneirong)
                json.children.push(json2)
              })
            })
            .catch(error => {
              console.log('error' + error)
            })
          that.t_items.push(json)
        })
        // console.log(that.t_items)
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
