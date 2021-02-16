<template>
 <v-card
    class="mx-auto"
  >
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            <v-card-actions>
            <v-btn
              color="orange lighten-2"
              @click="showdaan(index)"
              text
            >
              显示答案
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="showdaan(index)"
            >
              <v-icon>{{ item.ifshow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="item.ifshow">
              <v-divider></v-divider>
              <v-card-text class="text-start">
                {{daan}}
              </v-card-text>
              <v-card-text class="text-start">
                {{jiexi}}
              </v-card-text>
            </div>
          </v-expand-transition>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          ifshow: false
        },
        { divider: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
          ifshow: false
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
          ifshow: false
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
          ifshow: false
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          ifshow: false
        }
      ],
      show: false,
      model: null,
      selected: [],
      page: 1,
      pageCount: 60,
      itemsPerPage: 2,
      daan: 'aaaaa',
      jiexi: 'bbbb'
    }
  },
  mounted () {
    let arr = [{id: 1, xx: 'ddd'}, {id: 2, xx: 'xxx'}]
    console.log(arr)
    arr.sort((a, b) => {
      let val1 = a.id
      let val2 = b.id
      if (val1 < val2) {
        return 1
      } else if (val1 > val2) {
        return -1
      } else {
        return 0
      }
    })
    console.log(arr)
  },
  methods: {
    showdaan (index) {
      this.items[index].ifshow = !this.items[index].ifshow
    },
    toTop () {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    },
    postone () {
      return this.$post('sys/sz/listall')
        .then(res => {
          res.forEach(e => {
            console.log(e)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    posttwo () {
      return this.$post('sys/wzlx/listall')
        .then(res => {
          res.forEach(e => {
            console.log(e)
          })
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: white;
  color: #000000;
}
.example {
  color: red;
}
</style>
