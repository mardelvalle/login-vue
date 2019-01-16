<template>
  <div class="posts">
    <h1>Add Post</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import PostsService from '@/services/PostsService'
export default {
  name: 'addpost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  created () {
    axios.get(`http://localhost:9082/posts`)
      .then(response => {
        if (response.data[0].authentication === false) {
          console.log(this + 'thing')
          // this.$router.push({
          //   name: 'signout'
          // })
        } else {
          console.log(this + 'pwen')
          this.posts = response.data
        }
      })
      .catch(e => {
        this.errors.push(e)
        // if (e.response.status === 401) {
        //   this.$router.push({
        //     name: 'signout'
        //   })
        // }
      })
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        title: this.title,
        description: this.description
      })
      this.$swal(
        'Great!',
        `Your post has been added!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
