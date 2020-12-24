<template>
  <v-container class="grey lighten-5">
    <v-tabs>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
    <v-row no-gutters>
      <v-col
        cols="4"
        sm="3"
        md="2"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-treeview :items="items"></v-treeview>
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
      ]
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
