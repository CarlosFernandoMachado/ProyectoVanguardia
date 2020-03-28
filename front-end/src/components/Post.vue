<template>
  <div class="container">
    <div class = "row">
      <div class = "col-sm-4">
          <div class = "container">
            <br><br>
            <!-- Movement button -->
            <div class = "card">
              <br>
              <div class = "row">
                <div class = "col"></div>
                <div class = "col"></div>
                <div class = "col"><button type="button" style="text-align:center" class="btn btn-primary" v-on:click = "Up">👆🏼</button></div>
                <div class = "col"></div>
                <div class = "col"></div>
              </div>
              <div class = "row">
                <div class = "col"></div>
                <div class = "col"><div><button type="button" class="btn btn-primary" v-on:click = "Left">👈🏼</button></div></div>
                <div class = "col"></div>
                <div class= "col"><div><button type="button" class="btn btn-primary" v-on:click = "Right">👉🏼</button></div></div>
                <div class = "col"></div>
              </div>
              <div class = "row">
                <div class = "col"></div>
                <div class = "col"></div>
                <div class = "col"><button type="button" class="btn btn-primary" v-on:click = "Down">👇🏼</button></div>
                <div class = "col"></div>
                <div class = "col"></div>
              </div>
              <br><br>
              <div class = "row">
                <div class = "col"></div>
                <div class = "col"><button type="button" class="btn btn-primary" v-on:click = "Stop">❌</button></div>
                <div class = "col"></div>
                <div class = "col"><button type="button" class="btn btn-primary" v-on:click = "leer">💾</button></div>
                <div class = "col"></div>
                <br><br>
              </div>
            </div>
          </div>
      </div>

      <div class="col-sm-8">
        <!-- Table -->
        <div class="container">
          <br>
          <h2>Movimientos</h2>           
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Movimientos</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts"
                  v-bind:item="post"
                  v-bind:index="index"
                  v-bind:key="post._id">
                <td>{{ post.data }}</td>
                <td>{{ `${post.created_at.getDate()} / ${post.created_at.getMonth()} / ${post.created_at.getFullYear()}` }}</td>  
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class = "container">
          <div class = "row">
            <div class = "col-sm-2"><button type="button" class="btn btn-primary" v-on:click = "Siguiente">Siguiente</button></div>
            <br>
            <div class = "col-sm-2"><button type="button" class="btn btn-primary" v-on:click = "Anterior">Anterior</button></div>
          </div>
        </div>
        
        <br><br>
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
      archivo: '',
      cadena: '',
      
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
      var file = new File([this.cadena], "comandos.txt", {type:"text/pain;charset=utf-8"});
      var url = window.URL.createObjectURL(file);
      var a = document.createElement("a");
      document.body.appendChild(a); 
      a.href = url; 
      a.innerHTML = "Descargar archivo";
      a.download = file.name;
      a.click();
      document.body.removeChild(a);
      const c = this.cadena.split(",");
      for(var i = 0; i < c.length-1; i++){
        var token = c[i];
        this.createPost(token);
      }
      this.cadena = '';
    },
    Up(){
      this.cadena += "Up,";
      console.log(this.cadena);
    },
    Down(){
      this.cadena += "Down,";
      console.log(this.cadena);
    },
    Right(){
      this.cadena += "Right,";
      console.log(this.cadena);
    },
    Left(){
      this.cadena += "Left,";
      console.log(this.cadena);
    },
    Stop(){
      this.cadena += "Stop,";
      console.log(this.cadena);
    },
    Anterior(){

    },
    Siguiente(){

    },
    async createPost(token){
      await PostService.insertPost(token);
      this.posts = await PostService.getPosts();
    }
  }
  
}
</script>

<style scoped>

</style>
