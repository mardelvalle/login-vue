<template>
  <div class="hello">
    <h1>{{ navigation }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Dashboard</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Posts</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Add</a></li>
      <li><a href="http://localhost:9082/logout">Sign Out</a></li>
      <br>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      navigation: 'Welcome to Your Vue.js App'
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
