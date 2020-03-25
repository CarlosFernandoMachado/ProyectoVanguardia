const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/datadb',{
    useNewUrlParser: true
})
    .then(db => console.log('Database connected successfully'))
    .catch(err => console.log(err));