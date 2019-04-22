<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    const api = '';
    this.$http.get()
  },
}
</script>

<style lang="scss">
  @import "./assets/all"
</style>
