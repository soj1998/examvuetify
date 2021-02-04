<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      items: [
        {
          src: 'backgrounds/bg.jpg',
          text: 'aa'
        },
        {
          src: 'backgrounds/md.jpg'
        },
        {
          src: 'backgrounds/bg-2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        },
        {
          src: 'backgrounds/md2.jpg'
        }
      ],
      model: null,
      selected: [],
      page: 1,
      pageCount: 60,
      itemsPerPage: 2,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  mounted () {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8]
    console.log(arr)
    arr.splice(2, 2, 'hello')
    let day = '0'
    switch (new Date().getDay()) {
      case 0:
        day = '7'
        break
      case 1:
        day = '1'
        break
      case 2:
        day = '2'
        break
      case 3:
        day = '3'
        break
      case 4:
        day = '4'
        break
      case 5:
        day = '5'
        break
      case 6:
        day = '6'
        break
    }
    console.log(day)
  },
  methods: {
    enternext () {
      console.log('aaa')
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
