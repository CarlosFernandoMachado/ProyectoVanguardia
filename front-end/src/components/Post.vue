<template>
  <div>
    <h1>Posts</h1>
      <hr>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="post-container">
        <div class="post"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >
          {{ `${post.created_at.getDate()} / ${post.created_at.getMonth()} / ${post.created_at.getFullYear()}` }}
          <p class="text">{{ post.data }}</p>
        </div>
      </div>
  </div>
</template>

<script>
import PostService from './PostService';

export default {
  name: 'Post',
  data(){
    return{
      posts:[],
      error: '',
      text: ''
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
