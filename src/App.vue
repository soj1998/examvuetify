<template>
  <div id="app">
    <v-app>
     <v-main>
      <v-container fluid class="syappclass">
        <router-view></router-view>
      </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.syappclass {
  margin-top: 10px;
}
</style>
