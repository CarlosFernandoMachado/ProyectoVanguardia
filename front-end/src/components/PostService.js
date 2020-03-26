import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService{
    //get posts
    static async getPosts() {
        const res = await axios.get(url)
        try {
          const data = res.data
          console.log(data);
          return data.map(post => ({
            ...post,
            created_at: new Date(post.created_at)
          }))
        } catch (err) {
          return err
        }
    }
    //create posts
    static insertPost(text){
        return axios.post(url,{
            text
        });
    }

    //delete posts
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;