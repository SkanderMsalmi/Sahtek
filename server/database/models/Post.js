const mongoose = require('mongoose');
 

const post = new mongoose.Schema({
    description: String,
    time: String,
    title: String,
    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentsCount: Number,
    likesCount: Number,

    

 
})


module.exports = mongoose.model('Post',post);