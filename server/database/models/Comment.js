const mongoose = require('mongoose');
 

const comment = new mongoose.Schema({
    description: String,
    time: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        
    },
 
})


module.exports = mongoose.model('Comment',comment);