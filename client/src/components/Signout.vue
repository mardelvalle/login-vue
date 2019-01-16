<template>
  <div class="hello">
        <main>
            <form class="login" @submit.prevent="login">
                <h1>Sign in</h1>
                <label>User name</label>
                <input @input="changed" required v-model="username" type="text"/>
                <label>Password</label>
                <input @input="changed" required v-model="password" type="password"/>
                <hr/>
                <button type="submit">Login</button>
            </form>
            <h3>Or use Google:</h3>
            <button class="google-btn btn btn-info log" @click="handleLogin()">Google</button>
            <!-- <a href='https://accounts.google.com/signin/oauth/identifier?client_id=856193954105-93249jrjql0dnv3bkii5fb1a59geidkr.apps.googleusercontent.com&as=kDWnQUm6Sv13wr05zaD_Pw&destination=http%3A%2F%2Flocalhost%3A8081&approval_state=!ChRwSmJEeTZtZ2NYeTY5VmprNF9RNhIfQXhqZjdTUVVuQjBac0NEZU1wUEotOVlaSlhuTGZoWQ%E2%88%99APNbktkAAAAAXCVXiDUdXAtOnRTJhN5gJB7nNG9nJTlT&oauthgdpr=1&xsrfsig=AHgIfE_IWnx3zi5kfXI7dNRLrLkQV0uA6g&flowName=GeneralOAuthFlow'</a> -->
        </main>
        <div v-for="signout in signout" :key="signout.id">
            <p>
                <span><b>{{ signout.title }}</b></span><br />
                <span>{{ signout.description }}</span>
        </p>
      </div>
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
    },
    changed (event) {
      alert(event.target.value)
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
