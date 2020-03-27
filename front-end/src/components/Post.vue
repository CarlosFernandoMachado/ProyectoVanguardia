<template>
  <div>
      <!-- Modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Modal Heading</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <p>Seleccione el archivo que desea guardar</p>
                <div class="form-group">
                  <input 
                  type="file" 
                  class="form-control-file border" 
                  name="file"
                  id = "archivo"
                  v-on:input = "archivo = $event.target.value"
                  >
                </div>
                <br><br>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click = "leer" data-dismiss="modal">Guardar</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    <!-- Button to Open the Modal -->
    <div class = "container">
      <br><br>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
        Seleccionar archivo
      </button>
    </div>

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
      var _this = this;
      reader.onload = function(){
        const a = reader.result.split(',');
        for(var i = 0; i < a.length; i++){
          var token = a[i];
          _this.createPost(token);
        }
      }
      reader.readAsText(input.files[0]);
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
