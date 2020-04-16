<template>
  <div id="app">
    <PeopleComponent/>
  </div>
</template>

<script>
import PeopleComponent from './components/PeopleComponent.vue'

export default {
  name: 'App',
  components: {
    PeopleComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
