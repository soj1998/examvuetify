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
          open-on-click
          activatable
          color = "warning"
          :items = "t_items"
          :load-children = "loadChildren"
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
        <p class="text-left">
          Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Fusce convallis metus id felis luctus adipiscing. Aenean massa. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.

          Nulla consequat massa quis enim. Praesent venenatis metus at tortor pulvinar varius. Donec venenatis vulputate lorem. Phasellus accumsan cursus velit. Pellentesque ut neque.
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
      active: [],
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
      t_canshu: 0
    }
  },
  watch: {
    active: {
      deep: true,
      handler () {
        this.selected.id = this.active[0].id
        const items = this.active[0]._name.split(',')
        items.map(el => {
          return {
            text: el
          }
        })
        this.selected.items = items
        console.log(this.selected)
      }
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
</style>
