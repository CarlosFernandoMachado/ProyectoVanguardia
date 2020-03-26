const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get post
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//add post
router.post('/', async (req,res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        data: req.body.data,
        created_at: new Date() 
    });
    res.status(201).send();
});

//delete post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
        ('mongodb+srv://Jarvis:jarvis123@cluster0-xlcla.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    return client.db('Robotcito').collection('posts');
}

module.exports = router;