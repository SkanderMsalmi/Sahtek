const mongoose = require('mongoose');
 

const post = new mongoose.Schema({
    description: String,
    time: String,
    like: Number
})


module.exports = mongoose.model('Post',post);