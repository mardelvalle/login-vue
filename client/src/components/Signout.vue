<template>
  <div class="hello">
        <main>
            <!-- <form class="login" @submit.prevent="login">
                <h1>Sign in</h1>
                <label>User name</label>
                <input required v-model="username" type="text" placeholder="Snoopy"/>
                <label>Password</label>
                <input required v-model="password" type="password" placeholder="Password"/>
                <hr/>
                <button type="submit">Login</button>
            </form> -->
            <h3>Or use Google:</h3>
            <button class="google-btn btn btn-info log" @click="handleLogin()">Google+</button>
            <!-- <a href='https://accounts.google.com/signin/oauth/identifier?client_id=856193954105-93249jrjql0dnv3bkii5fb1a59geidkr.apps.googleusercontent.com&as=kDWnQUm6Sv13wr05zaD_Pw&destination=http%3A%2F%2Flocalhost%3A8081&approval_state=!ChRwSmJEeTZtZ2NYeTY5VmprNF9RNhIfQXhqZjdTUVVuQjBac0NEZU1wUEotOVlaSlhuTGZoWQ%E2%88%99APNbktkAAAAAXCVXiDUdXAtOnRTJhN5gJB7nNG9nJTlT&oauthgdpr=1&xsrfsig=AHgIfE_IWnx3zi5kfXI7dNRLrLkQV0uA6g&flowName=GeneralOAuthFlow'</a> -->
        </main>
        <div v-for="signout in signout" :key="signout.id">
            <p>
                <span><b>{{ signout.title }}</b></span><br />
                <span>{{ signout.description }}</span>
        </p>
      </div>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Dashboard</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Posts</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Add</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Sign Out</a></li>
      <br>
    </ul>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  name: 'signout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      signout: []
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.signout = response.data
    },
    handleLogin () {
      window.location = 'http://localhost:9082/auth/google'
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
