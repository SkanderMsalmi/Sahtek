const mongoose = require('mongoose');
 

const comment = new mongoose.Schema({
    description: String,
    time: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
 
})


module.exports = mongoose.model('Comment',comment);