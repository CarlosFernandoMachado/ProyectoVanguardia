<template>
  <div>
    <div class = "container">
      <div class="form-group">
        <input 
        type="file" 
        class="form-control-file border" 
        name="file"
        id = "archivo"
        v-on:input = "archivo = $event.target.value"
        >
      </div>
    </div>
    <h1>Posts</h1>
      <button v-on:click = "leer">boton</button>
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
      text: '',
      archivo: ''
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  }, 
  methods:{
    leer(){
      const input = document.querySelector('input[type = "file"]');
      const reader = new FileReader();
      reader.onload = function(){
        const a = reader.result.split(',');
        for(var i = 0; i < a.length; i++){
          var token = a[i];
          //this.createPost(token);
          PostService.insertPost(token);
          this.posts = PostService.getPosts();
        }
      }
      reader.readAsText(input.files[0]);
    },
    async createPost(){
      await PostService.insertPost("a");
      this.posts = await PostService.getPosts();
    }
  }
  
}
</script>

<style scoped>

</style>
