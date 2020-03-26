<template>
  <div id = "app">
    <HelloWorld />
    <Post />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import Post from './components/Post.vue'

  export default{
    name: 'app',
    components:{
      HelloWorld,
      Post
    }
  }
</script>

<style>

</style>
