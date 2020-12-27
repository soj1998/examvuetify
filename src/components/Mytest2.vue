<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <v-app id="inspire">
      <v-treeview
        v-model="selection"
        :items="items"
      ></v-treeview>
    </v-app>>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      selection: [],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' }
          ]
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            { id: 6, name: 'Calendar.doc' },
            { id: 7, name: 'Chrome.doc' },
            { id: 8, name: 'Webstorm.doc' }
          ]
        }
      ]
    }
  },
  methods: {
    onUpdate (selection) {
      console.log(selection)
    }
  },
  watch: {
    selection (newValue, oldVal) {
      console.log('newvalue:' + newValue + ',oldvalue:' + oldVal)
    }
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
